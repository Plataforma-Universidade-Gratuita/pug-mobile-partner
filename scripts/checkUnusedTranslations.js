const fs = require("fs");
const path = require("path");

const en = require("../public/locales/en-US/common.json");

function flattenKeys(json, prefix = "") {
	const keys = [];

	for (const key of Object.keys(json)) {
		const full = prefix ? `${prefix}.${key}` : key;

		if (typeof json[key] === "object" && json[key] !== null) {
			keys.push(...flattenKeys(json[key], full));
		} else {
			keys.push(full);
		}
	}

	return keys;
}

const allKeys = flattenKeys(en);

const ROOT = path.resolve(__dirname, "..");
const SCAN_DIRS = [
	"api",
	"app",
	"components",
	"constants",
	"features",
	"hooks",
	"schemas",
	"store",
	"utils",
];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);

function collectFiles(dir) {
	const results = [];

	if (!fs.existsSync(dir)) return results;

	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			results.push(...collectFiles(full));
		} else if (EXTENSIONS.has(path.extname(entry.name))) {
			results.push(full);
		}
	}

	return results;
}

const sourceFiles = SCAN_DIRS.flatMap(d => collectFiles(path.join(ROOT, d)));

// Static keys:  t("some.key")  or  t('some.key')
const STATIC_KEY_RE = /\bt\(\s*["']([^"']+)["']/g;

// Dynamic keys:  t(`prefix.${var}.suffix`)
// Captures the static prefix and suffix around the interpolation
const DYNAMIC_KEY_RE = /\bt\(\s*`([^`]*?\$\{[^}]*}[^`]*)`/g;

// Indirect string values that look like i18n keys (dot-separated, start with
// an uppercase or lowercase letter, at least two segments) stored in constants
// and config objects.  These are passed to t() at runtime.
const INDIRECT_KEY_RE =
	/["']([A-Za-z][A-Za-z0-9]*\.[A-Za-z][A-Za-z0-9-]*(?:\.[A-Za-z][A-Za-z0-9-]*)*)["']/g;

const usedStaticKeys = new Set();
const dynamicPatterns = []; // { prefix: string, suffix: string }

for (const file of sourceFiles) {
	const source = fs.readFileSync(file, "utf8");

	// Static keys
	let match;
	while ((match = STATIC_KEY_RE.exec(source)) !== null) {
		usedStaticKeys.add(match[1]);
	}

	// Dynamic keys – turn the template literal into a prefix/suffix pair
	while ((match = DYNAMIC_KEY_RE.exec(source)) !== null) {
		const raw = match[1]; // e.g. "docs.accordion.structure.items.${key}.title"
		const parts = raw.split(/\$\{[^}]*}/);

		if (parts.length >= 2) {
			dynamicPatterns.push({
				prefix: parts[0], // "docs.accordion.structure.items."
				suffix: parts[parts.length - 1], // ".title"
			});
		}
	}

	// Indirect keys – strings that look like translation keys in config files
	while ((match = INDIRECT_KEY_RE.exec(source)) !== null) {
		usedStaticKeys.add(match[1]);
	}
}

function isKeyUsed(key) {
	if (usedStaticKeys.has(key)) return true;

	// Check if the key matches any dynamic pattern
	for (const { prefix, suffix } of dynamicPatterns) {
		if (key.startsWith(prefix) && key.endsWith(suffix)) return true;
	}

	return false;
}

const unusedKeys = allKeys.filter(key => !isKeyUsed(key));

if (unusedKeys.length > 0) {
	console.warn(`\n⚠  Found ${unusedKeys.length} unused translation key(s):\n`);

	for (const key of unusedKeys) {
		console.warn(`   • ${key}`);
	}

	console.warn("");
	throw new Error(
		`${unusedKeys.length} translation key(s) are defined but never referenced in source code.`,
	);
} else {
	console.log("\n✔  All translation keys are referenced in source code.\n");
}

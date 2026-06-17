import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function parseEnvFile(filePath) {
	const content = readFileSync(filePath, "utf8");
	const entries = {};

	for (const rawLine of content.split(/\r?\n/u)) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#")) continue;

		const separatorIndex = line.indexOf("=");
		if (separatorIndex <= 0) continue;

		const key = line.slice(0, separatorIndex).trim();
		let value = line.slice(separatorIndex + 1).trim();

		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		entries[key] = value;
	}

	return entries;
}

const [, , envFile, command, ...args] = process.argv;

if (!envFile || !command) {
	console.error(
		"Usage: node ./scripts/with-env.mjs <env-file> <command> [args...]",
	);
	process.exit(1);
}

const envPath = resolve(process.cwd(), envFile);
const envEntries = parseEnvFile(envPath);

const child = spawn(command, args, {
	cwd: process.cwd(),
	env: {
		...process.env,
		...envEntries,
	},
	stdio: "inherit",
	shell: true,
});

child.on("exit", code => {
	process.exit(code ?? 0);
});

child.on("error", error => {
	console.error(error);
	process.exit(1);
});

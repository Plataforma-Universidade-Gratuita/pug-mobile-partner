const en = require("../public/locales/en-US/common.json");
const pt = require("../public/locales/pt-BR/common.json");

const flatten = json => {
	const result = new Map();

	const traverse = (translation, prefix = "") => {
		Object.keys(translation).forEach(key => {
			if (typeof translation[key] === "object") {
				traverse(translation[key], prefix + key + ".");
			} else {
				result.set(prefix + key, translation[key]);
			}
		});
	};

	traverse(json);
	return result;
};

const unique = array => {
	const result = [];

	array.forEach(item => {
		const existingItem = result.find(entry => entry.key === item.key);

		if (!existingItem) {
			result.push({ ...item, onlyCommonFileMissingThisTranslation: false });
			return;
		}

		existingItem.onlyCommonFileMissingThisTranslation = true;
	});

	return result;
};

const flatEn = flatten(en);
const flatPt = flatten(pt);

const missingInPt = [];
const missingInEn = [];

flatPt.forEach((ptValue, key) => {
	if (!flatEn.has(key)) {
		missingInEn.push({ key, ptValue });
	}
});

flatEn.forEach((enValue, key) => {
	if (!flatPt.has(key)) {
		missingInPt.push({ key, enValue });
	}
});

const uniqueKeysMissingInPt = unique(missingInPt);
const uniqueKeysMissingInEn = unique(missingInEn);

console.warn("Missing translations in pt-BR:", uniqueKeysMissingInPt);
console.warn("Missing translations in en-US:", uniqueKeysMissingInEn);

if (missingInPt.length > 0 || missingInEn.length > 0) {
	throw new Error("Some translations are missing from the locale files.");
}

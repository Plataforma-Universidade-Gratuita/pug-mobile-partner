const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function reorderKeys(value) {
	if (typeof value !== "object" || value === null) {
		return value;
	}

	const sortedObject = {};
	const sortedKeys = Object.keys(value).sort((left, right) =>
		left.localeCompare(right),
	);

	for (const key of sortedKeys) {
		sortedObject[key] = reorderKeys(value[key]);
	}

	return sortedObject;
}

function reorderJsonKeys(inputFilePath, outputFilePath) {
	try {
		const resolvedInputPath = path.resolve(__dirname, inputFilePath);
		const resolvedOutputPath = path.resolve(__dirname, outputFilePath);

		if (!fs.existsSync(resolvedInputPath)) {
			console.error(`Input file does not exist: ${resolvedInputPath}`);
			return;
		}

		const outputDirectory = path.dirname(resolvedOutputPath);
		if (!fs.existsSync(outputDirectory)) {
			fs.mkdirSync(outputDirectory, { recursive: true });
		}

		const rawData = fs.readFileSync(resolvedInputPath, "utf8");
		const jsonData = JSON.parse(rawData);
		const reorderedData = reorderKeys(jsonData);

		fs.writeFileSync(
			resolvedOutputPath,
			JSON.stringify(reorderedData, null, 4),
			"utf8",
		);
	} catch (error) {
		console.error("Error processing JSON:", error.message);
	}
}

const inputAndOutputFiles = [
	"../public/locales/en-US/common.json",
	"../public/locales/pt-BR/common.json",
];

function isDev() {
	return process.argv.includes("dev");
}

function hasGitChanges() {
	try {
		const result = execSync("git status --porcelain", { encoding: "utf8" });
		return result.trim().length > 0;
	} catch (error) {
		console.error("Error checking git status:", error.message);
		return false;
	}
}

inputAndOutputFiles.forEach(file => {
	reorderJsonKeys(file, file);
});

if (hasGitChanges() && !isDev()) {
	throw new Error(
		"Git changes detected! Run npm run trans and commit your changes.\nExiting pipeline...",
	);
}

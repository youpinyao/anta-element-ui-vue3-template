const path = require('path');
const fs = require('fs-extra');

module.exports = function (entry) {
	const modules = Object.values(entry).flat();
	const dllPath = path.resolve(process.cwd(), '.dll');
	const versionName = 'version.json';
	const versionPath = path.resolve(dllPath, versionName);
	const versions = {};
	let preVersions;

	if (!fs.existsSync(dllPath)) {
		fs.mkdirSync(dllPath);
	}

	if (fs.existsSync(versionPath)) {
		preVersions = fs.readJSONSync(versionPath);
	} else {
		preVersions = {};
	}

	modules.forEach((item) => {
		const packagePath = path.resolve(
			process.cwd(),
			'node_modules',
			item,
			'package.json'
		);
		if (fs.existsSync(packagePath)) {
			versions[item] = require(packagePath).version;
		}
	});

	if (
		Object.entries(versions).flat().join('-') ===
		Object.entries(preVersions).flat().join('-')
	) {
		fs.writeJSONSync(versionPath, versions);
		process.exit(0);
	} else {
		fs.removeSync(dllPath);
		fs.mkdirSync(dllPath);
		fs.writeJSONSync(versionPath, versions);
	}
};

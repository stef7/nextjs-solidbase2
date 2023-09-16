const path = require("node:path");

const eslintFileNameRegex = /\.(?:[cm][tj]s|[tj]sx?)$/i;
const cwd = process.cwd();

/** @type {import("lint-staged").Config} */
const config = (filenames) => {
  try {
    const relativePaths = filenames.map((f) => path.relative(cwd, f));

    const commands = [`prettier --write --ignore-unknown ${relativePaths.join(" ")}`];

    const eslintFilePaths = relativePaths.filter((f) => eslintFileNameRegex.test(f));
    if (eslintFilePaths.length) commands.unshift(`next lint --fix --file ${eslintFilePaths.join(" --file ")}`);

    return commands;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = config;

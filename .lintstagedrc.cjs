/** @type {import("lint-staged").Config} */
const config = {
  "**/*": "prettier --write --ignore-unknown",
};

module.exports = config;

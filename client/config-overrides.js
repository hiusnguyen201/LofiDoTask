const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  // Add Webpack alias
  addWebpackAlias({
    "~": path.resolve(__dirname, "src/"),
  })
);

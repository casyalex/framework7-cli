const generateNpmScripts = require("./generate-npm-scripts");

module.exports = function generatePackageJson(options) {
  const { type, name, framework, bundler, cssPreProcessor, cordova, theming } =
    options;

  // Dependencies
  const dependencies = [
    "framework7@5",
    "dom7@2",
    "template7",
    ...(theming.iconFonts ? ["framework7-icons@4"] : []),
    ...(framework === "vue" ? ["framework7-vue@5", "vue@2"] : []),
    ...(framework === "react"
      ? ["framework7-react@5", "react", "react-dom", "prop-types"]
      : []),
    ...(framework === "svelte" ? ["framework7-svelte@5", "svelte"] : []),
  ];

  const devDependencies = [];
  if (bundler === "webpack") {
    devDependencies.push(
      ...[
        "@babel/core",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-runtime",
        "@babel/preset-env",
        "@babel/runtime",
        "babel-loader",
        "chalk@4",
        ...(type.indexOf("cordova") >= 0 &&
        cordova.platforms.indexOf("electron") >= 0
          ? ["concurrently"]
          : []),
        "copy-webpack-plugin@6",
        "cross-env",
        "css-loader@5",
        "file-loader",
        "html-webpack-plugin@4",
        "mini-css-extract-plugin@1",
        "optimize-css-assets-webpack-plugin@5",
        "ora@5",
        "postcss-loader@4",
        "postcss-preset-env",
        "rimraf",
        "style-loader@2",
        ...(cssPreProcessor === "stylus" ? ["stylus", "stylus-loader"] : []),
        ...(cssPreProcessor === "less" ? ["less", "less-loader"] : []),
        ...(cssPreProcessor === "scss" ? ["node-sass", "sass-loader@10"] : []),
        "terser-webpack-plugin@4.2.3",
        "url-loader",
        "webpack@4",
        "webpack-cli@3",
        "webpack-dev-server@3",
        ...(type.indexOf("pwa") >= 0 ? ["workbox-webpack-plugin"] : []),
        ...(framework === "core" ? ["framework7-component-loader"] : []),
        ...(framework === "react" ? ["@babel/preset-react"] : []),
        ...(framework === "svelte" ? ["svelte-loader"] : []),
        ...(framework === "vue"
          ? ["vue-loader@15", "vue-style-loader", "vue-template-compiler"]
          : []),
      ]
    );
  }
  if (bundler !== "webpack") {
    devDependencies.push("http-server");
  }
  if (!bundler && type.indexOf("cordova") >= 0) {
    devDependencies.push(...["cpy", "rimraf"]);
  }
  if (theming.iconFonts) {
    devDependencies.push("cpy-cli");
  }

  // Scripts
  const scripts = {};
  generateNpmScripts(options).forEach((s) => {
    scripts[s.name] = s.script;
  });
  const postInstall = [];

  if (theming.iconFonts) {
    postInstall.push(
      `cpy ./node_modules/framework7-icons/fonts/*.* ./${
        bundler ? "src" : "www"
      }/fonts/`
    );
  }

  if (postInstall.length) {
    scripts.postinstall = postInstall.join(" && ");
  }

  // Content
  const content = `
{
  "name": "${name
    .toLowerCase()
    .replace(/[ ]{2,}/, " ")
    .replace(/ /g, "-")}",
  "private": true,
  "version": "1.0.0",
  "description": "${name}",
  "repository" : "",
  "license" : "UNLICENSED",
  "scripts" : ${JSON.stringify(scripts)},
  "browserslist": [
    "Android >= 7",
    "IOS >= 11",
    "Safari >= 11",
    "Chrome >= 49",
    "Firefox >= 31",
    "Samsung >= 5"
  ],
  "dependencies": {},
  "devDependencies": {}
}
`.trim();

  return {
    content,
    dependencies,
    devDependencies,
    postInstall,
  };
};

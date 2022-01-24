const exec = require("exec-sh");
const path = require("path");
const rm = require("rimraf");
const cpy = require("cpy");
const fse = require("../../utils/fs-extra");
const generateConfigXml = require("./generate-config-xml");

module.exports = (options) => {
  const cwd = options.cwd || process.cwd();
  const isRunningInCwd = cwd === process.cwd();
  const { pkg, name, cordova } = options;
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      if (!isRunningInCwd) {
        await exec.promise(
          `cd ${cwd.replace(/ /g, "\\ ")} && cordova create ${
            cordova.folder
          } ${pkg} XXXXXX`,
          true
        );
      } else {
        await exec.promise(
          `cordova create ${cordova.folder} ${pkg} XXXXXX`,
          true
        );
      }
    } catch (err) {
      reject(err);
      return;
    }
    // Modify Name
    ["package.json", "config.xml"].forEach((f) => {
      const contents = fse.readFileSync(path.resolve(cwd, cordova.folder, f));
      fse.writeFileSync(
        path.resolve(cwd, cordova.folder, f),
        contents.replace(/XXXXXX/g, name)
      );
    });
    // Install plugins
    const plugins = cordova.plugins; // eslint-disable-line

    // Install cordova plugins
    if (plugins.length) {
      try {
        if (!isRunningInCwd) {
          await exec.promise(
            `cd ${cwd.replace(/ /g, "\\ ")} && cd ${
              cordova.folder
            } && cordova plugin add ${plugins.join(" ")}`,
            true
          );
        } else {
          await exec.promise(
            `cd ${cordova.folder} && cordova plugin add ${plugins.join(" ")}`,
            true
          );
        }
      } catch (err) {
        reject(err);
        return;
      }
    }

    // Modify config.xml
    let configXmlContent = fse.readFileSync(
      path.resolve(cwd, cordova.folder, "config.xml")
    );
    configXmlContent = `${
      configXmlContent.split("</widget>")[0]
    }${generateConfigXml(options)}</widget>`;
    fse.writeFileSync(
      path.resolve(cwd, cordova.folder, "config.xml"),
      configXmlContent
    );

    // Upload res files
    try {
      await new Promise((subResolve, subReject) => {
        rm(path.resolve(cwd, cordova.folder, "res"), (err) => {
          if (err) subReject(err);
          else subResolve();
        });
      });
    } catch (err) {
      reject(err);
      return;
    }

    try {
      await cpy("**/*.*", path.resolve(cwd, cordova.folder, "res"), {
        parents: true,
        cwd: path.resolve(__dirname, "common", "cordova-res"),
      });
    } catch (err) {
      reject(err);
      return;
    }

    // Add electron settings
    if (cordova.platforms.indexOf("electron") >= 0) {
      const electronConfig = {
        browserWindow: {
          webPreferences: {
            nodeIntegration: true,
          },
        },
      };
      fse.writeFileSync(
        path.resolve(cwd, cordova.folder, "electron-settings.json"),
        JSON.stringify(electronConfig, "", 2)
      );
    }

    // Add cordova platforms
    const platforms = cordova.platforms.map((platform) => {
      return platform === "ios" ? "ios@6" : platform;
    });
    try {
      if (!isRunningInCwd) {
        await exec.promise(
          `cd ${cwd.replace(/ /g, "\\ ")} && cd ${
            cordova.folder
          } && cordova platform add ${platforms.join(" ")}`,
          true
        );
      } else {
        await exec.promise(
          `cd ${cordova.folder} && cordova platform add ${platforms.join(" ")}`,
          true
        );
      }
    } catch (err) {
      reject(err);
      return;
    }
    resolve();
  });
};

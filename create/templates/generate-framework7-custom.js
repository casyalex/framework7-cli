const indent = require('../utils/indent');

module.exports = (options) => {
  const {
    themes = [],
    rtl = false,
    lightTheme = true,
    darkTheme = true,
    components = [],
  } = options.customBuildConfig || {};

  const filterCharts = (comps) => {
    return comps.filter((c) => {
      if (c === 'gauge' || c === 'area-chart' || c === 'pie-chart') return false;
      return true;
    });
  };

  const { framework } = options;

  const componentsImportsJS = filterCharts(components).map((c) => {
    const name = c
      .split('-')
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join('');
    return `import ${name} from 'framework7/components/${c}';`;
  });
  const componentsNamesJS = filterCharts(components).map((c) => {
    return c
      .split('-')
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join('');
  });

  // prettier-ignore
  const scripts = indent(0, `
    import Framework7, { request, utils, getDevice, createStore } from '${framework === 'core' ? 'framework7' : 'framework7/lite'}';
    ${componentsImportsJS.join('\n    ')}

    Framework7.use([
      ${componentsNamesJS.join(',\n      ')}
    ]);

    export default Framework7;
    export { request, utils, getDevice, createStore };
  `);

  const componentsImportsLESS = components.map((c) => {
    return `@import 'framework7/components/${c}/${c}.less';`;
  });
  // prettier-ignore
  const styles = indent(0, `
    & {
      @import 'framework7/framework7.less';
      ${componentsImportsLESS.join('\n      ')}

      @includeIosTheme: ${themes.indexOf('ios') >= 0};
      @includeMdTheme: ${themes.indexOf('md') >= 0};
      @includeAuroraTheme: ${themes.indexOf('aurora') >= 0};
      @includeDarkTheme: ${darkTheme || false};
      @includeLightTheme: ${lightTheme || false};
      @rtl: ${rtl}
    }
  `);

  return {
    styles,
    scripts,
  };
};

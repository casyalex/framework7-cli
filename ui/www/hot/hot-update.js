webpackHotUpdate("main",{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/pages/create.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/create.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var framework7_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! framework7-vue */ \"./node_modules/framework7-vue/framework7-vue.esm.js\");\n/* harmony import */ var _utils_log_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/log-text */ \"./src/utils/log-text.js\");\n/* harmony import */ var _utils_get_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/get-log */ \"./src/utils/get-log.js\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    f7Page: framework7_vue__WEBPACK_IMPORTED_MODULE_0__[\"f7Page\"],\n    f7Navbar: framework7_vue__WEBPACK_IMPORTED_MODULE_0__[\"f7Navbar\"],\n    f7BlockTitle: framework7_vue__WEBPACK_IMPORTED_MODULE_0__[\"f7BlockTitle\"],\n    f7BlockHeader: framework7_vue__WEBPACK_IMPORTED_MODULE_0__[\"f7BlockHeader\"],\n    f7Block: framework7_vue__WEBPACK_IMPORTED_MODULE_0__[\"f7Block\"],\n    f7List: framework7_vue__WEBPACK_IMPORTED_MODULE_0__[\"f7List\"],\n    f7ListInput: framework7_vue__WEBPACK_IMPORTED_MODULE_0__[\"f7ListInput\"],\n    f7ListItem: framework7_vue__WEBPACK_IMPORTED_MODULE_0__[\"f7ListItem\"],\n    f7Button: framework7_vue__WEBPACK_IMPORTED_MODULE_0__[\"f7Button\"]\n  },\n  data: function data() {\n    return {\n      loading: false,\n      log: [],\n      done: false,\n      error: false,\n      cwd: '',\n      name: 'My App',\n      type: [],\n      pkg: 'io.framework7.myapp',\n      platform: ['ios', 'android'],\n      framework: 'core',\n      template: 'single-view',\n      bundler: 'webpack',\n      cssPreProcessor: false,\n      customColor: false,\n      color: ''\n    };\n  },\n  mounted: function mounted() {\n    var self = this;\n    self.$request.json('/api/cwd/', function (_ref) {\n      var cwd = _ref.cwd;\n      self.cwd = cwd;\n    });\n  },\n  methods: {\n    logText: _utils_log_text__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    toggleType: function toggleType(type, checked) {\n      if (checked && this.type.indexOf(type) < 0) {\n        this.type.push(type);\n      } else if (!checked && this.type.indexOf(type) >= 0) {\n        this.type.splice(this.type.indexOf(type), 1);\n      }\n    },\n    togglePlatform: function togglePlatform(platform, checked) {\n      if (checked && this.platform.indexOf(platform) < 0) {\n        this.platform.push(platform);\n      } else if (!checked && this.platform.indexOf(platform) >= 0) {\n        this.platform.splice(this.platform.indexOf(platform), 1);\n      }\n    },\n    getOptions: function getOptions() {\n      var self = this;\n      var name = self.name,\n          type = self.type,\n          pkg = self.pkg,\n          platform = self.platform,\n          framework = self.framework,\n          template = self.template,\n          bundler = self.bundler,\n          cssPreProcessor = self.cssPreProcessor,\n          customColor = self.customColor,\n          color = self.color;\n      var options = {\n        type: type,\n        name: name,\n        framework: framework,\n        template: template,\n        bundler: bundler,\n        cssPreProcessor: cssPreProcessor,\n        customColor: customColor\n      };\n\n      if (options.bundler !== 'webpack') {\n        options.cssPreProcessor = false;\n      }\n\n      if (type.indexOf('cordova') >= 0) {\n        options.pkg = pkg;\n        options.platform = platform;\n      }\n\n      if (customColor) {\n        if (color.replace(/#/g, '').trim()) {\n          options.color = color.replace(/#/g, '').trim();\n        }\n      }\n\n      return options;\n    },\n    showError: function showError(message) {\n      var self = this;\n      self.$f7.dialog.alert(message);\n    },\n    getLog: function getLog() {\n      var self = this;\n\n      Object(_utils_get_log__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(self, '/api/create/');\n    },\n    createApp: function createApp() {\n      var self = this;\n      if (self.loading) return;\n      var options = self.getOptions();\n\n      if (!options.type.length) {\n        self.showError('You must specify app type (Web app, PWA or Cordova app)');\n        return;\n      }\n\n      if (options.type.indexOf('cordova') >= 0) {\n        if (!options.pkg.trim()) {\n          self.showError('You must specify app package (bundle ID)');\n          return;\n        }\n\n        if (!options.platform.length) {\n          self.showError('You must specify target cordova platform');\n          return;\n        }\n      }\n\n      if (!options.name) {\n        self.showError('You must specify app name');\n        return;\n      }\n\n      self.loading = true;\n      self.$f7.request.postJSON('/api/create/', {\n        options: options\n      }, function () {\n        self.getLog();\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/pages/create.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ })

})
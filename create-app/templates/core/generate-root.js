const generateHomePage = require('./generate-home-page');
const indent = require('../../utils/indent');
const templateIf = require('../../utils/template-if');

module.exports = (options) => {
  const {
    template,
    bundler,
  } = options;

  // Panels
  const leftPanelPlain = `
    <!-- Left panel with cover effect-->
    <div class="panel panel-left panel-cover theme-dark panel-init">
      <div class="view">
        <div class="page">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
              <div class="title">Left Panel</div>
            </div>
          </div>
          <div class="page-content">
            <div class="block">Left panel content goes here</div>
          </div>
        </div>
      </div>
    </div>
  `.trim();

  const leftPanelWithView = `
    <!-- Left panel with cover effect -->
    <div class="panel panel-left panel-cover theme-dark panel-init" data-visible-breakpoint="960">
      <div class="view view-init" data-view="left">
        <div class="page">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner sliding">
              <div class="title">Left Panel</div>
            </div>
          </div>
          <div class="page-content">
            <div class="block-title">Left View Navigation</div>
            <div class="list links-list">
              <ul>
                <li><a href="/left-page-1/">Left Page 1</a></li>
                <li><a href="/left-page-2/">Left Page 2</a></li>
              </ul>
            </div>
            <div class="block-title">Control Main View</div>
            <div class="list links-list">
              <ul>
                <li>
                  <a href="/about/" data-view=".view-main" class="panel-close">About</a>
                </li>
                <li>
                  <a href="/form/" data-view=".view-main" class="panel-close">Form</a>
                </li>
                <li>
                  <a href="#" data-view=".view-main" class="back panel-close">Back in history</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  const leftPanel = template === 'split-view' ? leftPanelWithView : leftPanelPlain;
  const rightPanel = `
    <!-- Right panel with reveal effect-->
    <div class="panel panel-right panel-reveal theme-dark">
      <div class="view">
        <div class="page">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
              <div class="title">Right Panel</div>
            </div>
          </div>
          <div class="page-content">
            <div class="block">Right panel content goes here</div>
          </div>
        </div>
      </div>
    </div>
  `.trim();

  // Views
  let views = '';
  if (template === 'single-view' || template === 'split-view') {
    views = indent(4, `
      <!-- Your main view, should have "view-main" class -->
      ${templateIf(bundler === 'webpack', () => `
      <div class="view view-main view-init safe-areas" data-url="/"></div>
      `, () => `
      <div class="view view-main view-init safe-areas">
        ${indent(8, generateHomePage(options)).trim()}
      </div>
      `)}
    `);
  }
  if (template === 'tabs') {
    views = indent(4, `
    <!-- Views/Tabs container -->
    <div class="views tabs safe-areas">
      <!-- Tabbar for switching views-tabs -->
      <div class="toolbar toolbar-bottom tabbar-labels">
        <div class="toolbar-inner">
          <a href="#view-home" class="tab-link tab-link-active">
            <i class="icon f7-icons if-not-md">house_fill</i>
            <i class="icon material-icons if-md">home</i>
            <span class="tabbar-label">Home</span>
          </a>
          <a href="#view-catalog" class="tab-link">
            <i class="icon f7-icons if-not-md">square_list_fill</i>
            <i class="icon material-icons if-md">view_list</i>
            <span class="tabbar-label">Catalog</span>
          </a>
          <a href="#view-settings" class="tab-link">
            <i class="icon f7-icons if-not-md">gear</i>
            <i class="icon material-icons if-md">settings</i>
            <span class="tabbar-label">Settings</span>
          </a>
        </div>
      </div>

      <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
      ${templateIf(bundler === 'webpack', () => `
      <div id="view-home" class="view view-main view-init tab tab-active" data-url="/">
        <!-- Home page will be loaded here dynamically from / route -->
      </div>
      `, () => `
      <div id="view-home" class="view view-main view-init tab tab-active">
        ${indent(8, generateHomePage(options)).trim()}
      </div>
      `)}

      <!-- Catalog View -->
      <div id="view-catalog" class="view view-init tab" data-view="catalog" data-url="/catalog/">
        <!-- Catalog page will be loaded here dynamically from /catalog/ route -->
      </div>

      <!-- Settings View -->
      <div id="view-settings" class="view view-init tab" data-view="settings" data-url="/settings/">
        <!-- Settings page will be loaded here dynamically from /settings/ route -->
      </div>
    </div>
    `);
  }

  const htmlTemplate = `
    ${leftPanel}
    ${rightPanel}
    ${views}

    <!-- Popup -->
    <div class="popup" id="my-popup">
      <div class="view">
        <div class="page">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
              <div class="title">Popup</div>
              <div class="right">
                <a href="#" class="link popup-close">Close</a>
              </div>
            </div>
          </div>
          <div class="page-content">
            <div class="block">
              <p>Popup content goes here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Screen -->
    <div class="login-screen" id="my-login-screen">
      <div class="view">
        <div class="page">
          <div class="page-content login-screen-content">
            <div class="login-screen-title">Login</div>
            <div class="list">
              <ul>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Username</div>
                    <div class="item-input-wrap">
                      ${templateIf(bundler, () => `
                        <input type="text" name="username" placeholder="Your username" value="{{username}}" @input="updateUsername">
                      `)}
                      ${templateIf(!bundler, () => `
                        <input type="text" name="username" placeholder="Your username">
                      `)}
                    </div>
                  </div>
                </li>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Password</div>
                    <div class="item-input-wrap">
                      ${templateIf(bundler, () => `
                        <input type="password" name="password" placeholder="Your password" value="{{password}}" @input="updatePassword">
                      `)}
                      ${templateIf(!bundler, () => `
                        <input type="password" name="password" placeholder="Your password">
                      `)}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="list">
              <ul>
                <li>
                  ${templateIf(bundler, () => `
                  <a href="#" class="item-link list-button login-button" @click="alertLoginData">Sign In</a>
                  `)}
                  ${templateIf(!bundler, () => `
                  <a href="#" class="item-link list-button login-button">Sign In</a>
                  `)}
                </li>
              </ul>
              <div class="block-footer">Some text about login information.<br>Click "Sign In" to close Login Screen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  if (bundler === 'webpack') {
    return indent(0, `
      <template>
        <div id="app">
          ${indent(10, htmlTemplate)}
        </div>
      </template>
      <script>
        export default {
          data() {
            return {
              user: {
                firstName: 'John',
                lastName: 'Doe',
              },
              // Login screen demo data
              username: '',
              password: '',
              ${templateIf(template === 'tabs', () => `
              // Demo products for Catalog section
              products: [
                {
                  id: '1',
                  title: 'Apple iPhone 8',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
                },
                {
                  id: '2',
                  title: 'Apple iPhone 8 Plus',
                  description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
                },
                {
                  id: '3',
                  title: 'Apple iPhone X',
                  description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
                },
              ]
              `)}
            };
          },
          methods: {
            helloWorld() {
              this.$f7.dialog.alert('Hello World!', () => {
                this.$f7.loginScreen.close()
              });
            },
            updateUsername(e) {
              this.username = e.target.value;
              this.$update();
            },
            updatePassword(e) {
              this.password = e.target.value;
              this.$update();
            },
            alertLoginData() {
              this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password);
            }
          },
        }
      </script>
    `);
  }
  return htmlTemplate;
};

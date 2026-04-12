body > div[style] {
  height: 0 !important;
}
body > settings-manager {
  display: none !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Header Row
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser .vivaldi-v,
#browser .expand-arrow,
#tabs-container > .vivaldi svg,
#toggle-toolbars,
#tabs-container .button-toolbar-menu-indicator,
#browser .tabbar-workspace-button > button,
#browser .tabbar-workspace-button > button > .button-title,
#browser.tabs-top .tabbar-workspace-button > button svg,
#browser .tabbar-workspace-button .button-toolbar-menu-indicator {
  display: none !important;
}
#browser:not(.fullscreen) > #header {
  min-height: 30px !important;
}
#browser.win.normal #tabs-tabbar-container {
  min-height: 30px !important;
  height: 30px !important;
  margin-top: 2px !important;
  padding: 0px !important;
}
#browser.win.maximized #tabs-tabbar-container {
  min-height: 31px !important;
}
#tabs-container > .vivaldi {
  background: url(/style/icons/vivaldi24.png) center no-repeat !important;
  border-radius: 0 !important;
  left: 0px !important;
  height: 24px !important;
  margin: 0 !important;
  opacity: .7 !important;
  padding: 0 !important;
  position: absolute !important;
  width: 24px !important;
}
#browser.normal #tabs-container > .vivaldi {
  top: 0px !important;
}
#browser.maximized #tabs-container > .vivaldi {
  top: 2px !important;
}
#tabs-container > .vivaldi:hover {
  opacity: 1 !important;
}
#browser[toolbar-toggle] #toggle-toolbars {
  background: url(/style/icons/mask24.png) center no-repeat !important;
  display: block !important;
  height: 24px !important;
  left: 31px !important;
  opacity: .6 !important;
  position: absolute !important;
  width: 24px !important;
}
#browser.normal[toolbar-toggle] #toggle-toolbars {
  top: 2px !important;
}
#browser.maximized[toolbar-toggle] #toggle-toolbars {
  top: 4px !important;
}
#browser[toolbar-toggle] #toggle-toolbars:hover {
  border: 1px solid transparent !important;
  opacity: 1 !important;
}
#browser[toolbar-toggle][toggle-toolbars] #toggle-toolbars {
  background: url(/style/icons/mask24On.png) center no-repeat !important;
}
#browser .tabbar-workspace-button {
  background-color: #111 !important;
  border: none !important;
  border-radius: 0 !important;
  margin-right: 10px !important;
}
#browser[show-workspaces] .tabbar-workspace-button > button svg {
  display: none !important;
}
#browser[show-workspaces] .tabbar-workspace-button > button {
  background: url(/style/icons/workspaces2.png) center no-repeat !important;
}
#browser[show-workspaces] #tabs-tabbar-container .tabbar-workspace-button > button {
  background: url(/style/icons/pinned24.png) center no-repeat !important;
  border: 1px solid transparent !important;
  display: flex !important;
  height: 24px !important;
  opacity: .7 !important;
  position: absolute !important;
  width: 24px !important;
}
#browser #tabs-container > .resize {
  position: relative !important;
  z-index: 9 !important;
}
#browser.normal .resize {
  left: 20px  !important;
}
#browser.normal[toolbar-toggle] .tabbar-workspace-button > button {
  left: 32px  !important;
}
#browser.normal[toolbar-toggle] #tabs-container > .resize {
  left: 48px  !important;
}
#browser.normal[toolbar-toggle][show-workspaces] #tabs-tabbar-container .tabbar-workspace-button > button {
  left: 54px !important;
}
#browser.normal[toolbar-toggle][show-workspaces] #tabs-container > .resize {
  left: 74px !important;
}
#browser.normal[show-workspaces] #tabs-tabbar-container .tabbar-workspace-button > button {
  left: 26px !important;
}
#browser.normal[show-workspaces] #tabs-container > .resize {
  left: 46px !important;
}
#browser.maximized #tabs-container > .resize {
  left: 20px  !important;
  margin-right: 22px  !important;
}
#browser.maximized[toolbar-toggle] .tabbar-workspace-button > button {
  left: 32px  !important;
}
#browser.maximized[toolbar-toggle] #tabs-container > .resize {
  left: 48px  !important;
  margin-right: 48px  !important;
}
#browser.maximized[toolbar-toggle][show-workspaces] #tabs-tabbar-container .tabbar-workspace-button > button {
  left: 56px !important;
}
#browser.maximized[toolbar-toggle][show-workspaces] #tabs-container > .resize {
  left: 74px !important;
  margin-right: 74px  !important;
}
#browser.maximized[show-workspaces] .tabbar-workspace-button > button {
  left: 24px  !important;
}
#browser.maximized[show-workspaces] #tabs-container > .resize {
  left: 44px  !important;
  margin-right: 44px  !important;
}
#browser.normal #tabs-container > .resize {
  margin-right: 20px !important;
}
#browser.normal[toolbar-toggle] #tabs-container > .resize,
#browser.normal[show-workspaces] #tabs-container > .resize {
  margin-right: 48px !important;
}
#browser.normal[toolbar-toggle][show-workspaces] #tabs-container > .resize {
  margin-right: 74px !important;
}
#browser[show-workspaces] #tabs-tabbar-container .tabbar-workspace-button > button:hover {
  opacity: 1 !important;
}
#browser[show-workspaces] #tabs-tabbar-container .button-toolbar > button[title="Workspaces"].button-pressed {
  background: url(/style/icons/pinned24On.png) center no-repeat !important;
  opacity: 1 !important;
}
#browser[show-workspaces] .tabbar-workspace-button > button > span {
  margin: 0 !important;
}
#browser.fullscreen .tab-strip {
  max-height: 0 !important;
}
#tab-1063345030-favicon > span > svg {
  left: 4px !important;
  position: relative !important;
  top: 4px !important;
}
#browser .toolbar:has(.window-buttongroup.on-mainbar) {
  padding-right: 0 !important;
}
#browser.win .window-buttongroup > button > svg {
  display: none !important;
}
#browser.win .window-buttongroup {
  bottom: auto !important;
  border-radius: 4px !important;
  height: 30px !important;
  margin: 0 !important;
  padding: 0 !important;
  position: fixed !important;
  right: 2px !important;
  top: 2px !important;
  width: 82px !important;
}
#browser.win .window-buttongroup > button { 
  border-radius: 4px !important;
  color: #FFF !important;
  height: 26px !important;
  margin: 0px !important;
  padding: 0px !important;
  width: 26px !important;
}
#browser.win .window-buttongroup > .window-minimize {
  background: url(/style/icons/windowMinimize.png) center no-repeat !important;
}
#browser.win.normal .window-buttongroup > .window-maximize {
  background: url(/style/icons/windowNormal.png) center no-repeat !important;
}
#browser.win.maximized .window-buttongroup > .window-maximize {
  background: url(/style/icons/windowMaximize.png) center no-repeat !important;
}
#browser.win .window-buttongroup > .window-close {
  background: url(/style/icons/windowClose.png) center no-repeat !important;
}
#browser.win .window-buttongroup > .window-maximize:hover {
  background-color: #0066CC !important;
}
#browser.win .window-buttongroup > .window-minimize:hover {
  background-color: #00B306 !important;
}
#browser.win .window-buttongroup > .window-close:hover {
  background-color: #B30600 !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Footer Row
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.fullscreen #footer {
  height: 0 !important;
}
#browser #footer > .toolbar-statusbar {
  font-size: 14px !important;
  padding: 0 !important;
  height: 36px !important;
}
#optionsButton {
  border: 1px solid transparent !important;
  height: 28px !important;
  opacity: 1 !important;
  width: 32px !important;
}
#optionsMenu {
  display: none !important;
}
#browser[options-menu] #optionsMenu {
  background: #1D1E22 !important;
  border: 1px solid #666 !important;
  box-shadow: 4px 4px 6px #000 !important;
  display: flex !important;
  flex-basis: 100% !important;
  flex-direction: column !important;
  overflow: auto !important;
  padding: 0 4px !important;
  position: absolute !important;
  z-index: 9 !important;
}
#div0 {
  background-color: #000 !important;
  border-radius: 0 !important;
  height: 52px !important;
  margin: 0 -4px !important;
  padding-right: 4px !important;
}
#position-menu {
  background-image: url(/style/icons/position.png) !important;
  background-color:transparent !important;
  border: none !important;
  height: 25px !important;
  float: left !important;
  width: 25px !important;
}
#position1,
#position2,
#position3,
#position4 {
  position: absolute !important;
}
#position1,
#position2,
#position3 {
  top: 4px !important;
}
#position1 {
  left: 4px !important;
}
#position2 {
  left: 26px !important;
}
#position3 {
  left: 46px !important;
}
#position4 {
  left: 26px !important;
  top: 26px !important;
}
#div0 > input[type=radio]:not(:checked):hover {
  box-shadow: 0 1px 2px #CCC inset, inset 0 0 0 5px #AAA !important;
}
#div0 > input[type=radio]:checked {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset, inset 0 0 0 5px lime !important;
}
#spanMenuText {
  color: lime !important;
  left: 118px !important;
  opacity: 1 !important;
  position: absolute !important;
  top: 16px !important;
}
#optionsMenuClose {
  background-image: url(/style/icons/close24.png) !important;
  background-color:transparent !important;
  border: none !important;
  border-radius: 6px !important;
  height: 24px !important;
  float: right !important;
  margin-top: 14px !important;
  width: 24px !important;
}
#positionMenu:hover,
#optionsMenuClose:hover {
  background-color: #FFF !important;
  border-radius: 6px !important;
}
#label0 {
  background: transparent !important;
}
#label0 > .icon > svg {
  float: left !important;
  margin-left: 0 !important;
}
#span0 > svg {
  height: 16px !important;
  position: relative !important;
  top: 2px !important;
  width: 16px !important;
}
#span0a {
  background: transparent !important;
  margin-left: 5px !important;
  position: relative !important;
  top: -1px !important;
}
#input0 {
  background-color: transparent !important;
  border: 1px solid transparent !important;
  border-radius: 4px !important;
  color: #FFF !important;
  float: right !important;
  height: 26px !important;
  margin: 0 -5px 0 4px !important;
  position: relative !important;
  text-align: right !important;
  top: -3px !important;
  width: 106px !important;
}
#input0:hover,
#input0:focus-within {
  border: 1px solid #FFF !important;
}
#optionsMenu > label {
  border: 1px solid transparent !important;
  border-radius: 6px !important;
  color: #FFF !important;
  height: 27px !important;
  margin: 0 !important;
  padding: 3px 4px 0 2px !important;
  pointer-events: all !important;
}
#optionsMenu > label > span {
  position: relative !important;
  top: 2px !important;
}
#optionsMenu > label[disabled] {
  opacity: .5 !important;
  pointer-events: none !important;
}
#optionsMenu > label > input:not(#input0) {
  background-color: #23242B !important;
  border-color: #666 !important;
  border-radius: 4px !important;
  margin-right: 4px !important;
  outline: none !important;
}
#optionsMenu > label > input[type=checkbox]:before,
#optionsMenu > label > input[type=checkbox]:after {
  background-color: lime !important;
}
#optionsMenu > .indent {
  margin-left: 54px !important;
}
#optionsMenu > .label:hover {
  background-color: rgba(0, 0, 0, .35) !important;
  border-color: #666 !important;
}
#optionsMenu > #label3 > #button3,
#optionsMenu > #label22 > #button22 {
  background: #23242B !important;
  border: 1px solid #666 !important;
  border-radius: 4px !important;
  display: block !important;
  float: right !important;
  height: 26px !important;
  margin: -3px -5px 0 0 !important;
  opacity: .3 !important;
  outline: none !important;
  padding: 1px 4px !important;
}
#optionsMenu > #label3 > #button3:hover,
#optionsMenu > #label22 > #button22:hover {
  background: rgba(0, 0, 0, .5) !important;
  border: 1px solid #FFF !important;
}
#browser[show-date] #label3 #button3,
#browser[show-time] #label22 #button22 {
  cursor: pointer !important;
  opacity: 1 !important;
}
#label6 {
  opacity: .3 !important;
  pointer-events: none !important;
}
#div10 {
  border: 1px solid transparent !important;
  margin-top: 2px !important;
}
#div10 > span {
  margin-right: 6px !important;
  position: relative !important;
  top: 1px !important;
}
#div10 > input {
  border: 1px solid #666 !important;
  border-radius: 3px !important;
  height: 21px !important;
  width: 48px !important;
}
#div10 > #input10a {
  margin-right: 16px !important;
}
#div10 > #input10a:hover,
#div10 > #input10b:hover {
  border: 1px solid #FFF !important;
}
#optionsMenu #svg10 {
  margin-right: 4px !important;
}
#div12 {
  margin: 4px auto !important;
}
#div12 > .button {
  background: #23242B !important;
  border-color: #666 !important;
  border-radius: 4px !important;
  color: #FFF !important;
  cursor: pointer !important;
  height: 26px !important;
  margin: 0px 4px !important;
}
#div12 > .button:hover {
  border-color: #FFF !important;
}
#optionsMenu #svg13 {
  width: 34px !important;
}
#svg16 {
  margin-left: 139px !important;
}
#svg17 {
  margin-left: 94px !important;
}
#svg18 {
  margin-left: 128px !important;
}
#div20 {
  background: #000 !important;
  border: 1px solid transparent !important;
  color: lime !important;
  margin: 5px -4px 0 -4px !important;
  padding: 4px 0 0 0 !important;
  text-align: center !important;
}
#div20:hover {
  border: 1px solid transparent !important;
}
#optionsMenu .svg,
#currentI {
  height: 16px !important;
  margin: 1px 0 2px 16px !important;
  width: 16px !important;
  float: right !important;
}
#rewindIcon > svg {
  margin-right: -2px !important;
  transform: scale(.8) !important;
  width: 34px !important;
}
#optionsMenu > span {
  color: #CCC !important;
  margin: auto !important;
  padding: 3px 0 !important;
}
#optionsMenu > span > button,
#optionsMenu > span > input {
  background-color: #23242B !important;
  border: 1px solid #666 !important;
  border-radius: 6px !important;
  color: #FFF !important;
  height: 26px !important;
  outline: none !important;
  text-align: center !important;
}
#optionsMenu > span > button:hover {
  border: 1px solid #CCC !important;
}
#optionsMenu .input-timer:hover,
#optionsMenu .input-timer:focus {
  background-color: rgba(0, 0, 0, .5) !important;
  border-color: #999 !important;
}
#input21 {
  border: 1px solid #666 !important;
  border-radius: 4px 0 0 4px !important;
  border-right: none !important;
  caret-color: #23242B !important;
  color: #FFF !important;
  cursor: default !important;
  font-family: monospace !important;
  font-size: 105% !important;
  left: 11px !important;
  margin: 6px auto auto auto !important;
  pointer-events: none !important;
  position: relative !important;
  user-select: none !important;
  width: 254px !important;
}
#input21::selection {
  background: transparent !important;
  color: #FFF !important;
}
#browser #svg21 {
  border: 1px solid #666 !important;
  cursor: pointer !important;
  height: 28px !important;
  left: -11px !important;
  position: relative !important;
  top: 5px !important;
  width: 28px !important;
}
#browser[toggle-toolbars] #optionsMenu {
  display: none !important;
}
#calendar {
  display: none !important;
}
#browser[show-date] #calendar {
  border: 1px solid transparent !important;
  border-radius: 4px !important;
  display: block !important;
  flex: none !important;
  padding: 4px 4px 4px 2px !important;
}
#clock {
  font-weight: normal !important;
  margin: 0 !important;
  padding: 0 !important;
}
#clock {
  background: transparent !important;
  border: 1px solid transparent !important;
  border-radius: 4px !important;
}
#digitalClock,
#browser[show-time] #clock {
  display: none !important;
}
#browser[show-time] #digitalClock {
  border: 1px solid transparent !important;
  border-radius: 4px !important;
  display: block !important;
  margin-right: 6px !important;
  padding: 4px 4px 4px 0 !important;
  text-align: center !important;
}
#browser[show-time] #digitalClock:hover {
  border: 1px solid #999 !important;
}
#browser[show-time*='1'] #digitalClock {
  min-width: 60px !important;
}
#browser[show-time*='2'] #digitalClock {
  min-width: 80px !important;
}
#browser[show-time*='3'] #digitalClock {
  min-width: 40px !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Bookmark Bar Row
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#main > .bookmark-bar .spacer {
  display: none !important;
}
#main > .bookmark-bar {
  border: none !important;
  height: 30px !important;
}
#browser[custom-folder] .folder > .sd > g {
  display: none !important;
}
#browser[custom-folder] .folder > svg:not(.sd) {
  background: url(/style/icons/folder.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[custom-folder] .folder > .sd {
  background: url(/style/icons/speeddial.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title="chrome://extensions/"] > img {
  background: url(/style/icons/extensions.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title*="https://github.com/Razzano"] > img {
  background: url(/style/icons/github.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title*="https://accounts.google.com"] > img,
button[title*="https://mail.google.com"] > img {
  background: url(/style/icons/gmail.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title="chrome://settings/"] > img {
  background: url(/style/icons/vivaldi16.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title*="chrome://extensions/"] > img {
  background: url(/style/icons/extension.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title*="gemini"] > img {
  background: url(/style/icons/gemini.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title*="path=general"] > span > svg {
  background: url(/style/icons/settings.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title="https://truthsocial.com/"] > img {
  background: url(/style/icons/truth.png) !important;
  height: 16px !important;
  width: 16px !important;
}
button[title*="https://tv.youtube.com"] > img {
  background: url(/style/icons/youtubetv.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title*="https://powershell"] > img {
  background: url(/style/icons/powershell.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title*="https://www.romulusathleticcenter"] > img {
  background: url(/style/icons/rac.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title^="https://www.google.com/search?q=SLB"] > img {
  background: url(/style/icons/slb.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
button[title^="https://www.google.com/search?q=SoFi"] > img {
  background: url(/style/icons/sofi.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
.toolbar > .button-toolbar button {
  min-height: 26px !important;
}
#browser.tabs-top > #main > .bookmark-bar button[title="---"],
#browser.tabs-top > #main > .bookmark-bar button[title="---"]:hover {
  background: transparent !important;
  border: 1px solid transparent !important;
}
#browser.tabs-top .bookmark-bar button[title="---"]:hover {
  background: var(--colorAccentBorder) !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Mainbar Row
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.fullscreen .mainbar,
#browser.fullscreen[rewind-forward] #rewindForward {
  display: none !important;
}
#browser[toggle-toolbars] .mainbar {
  height: 0 !important;
}
#browser[toggle-toolbars] .mainbar > .toolbar-mainbar {
  bottom: auto !important;
  top: -37px !important;
}
#browser[home-to-restart] #restartButton {
  margin-left: -3px !important;
  opacity: 1 !important;
}
#browser[home-to-restart] .toolbar-mainbar #restartButton:hover {
  background-color: #0066CC !important;
  border: none !important;
  border-radius: 4px !important;
}
#browser[home-to-restart] #restartButton > span {
  display: none !important;
}
div[title="Rewind"],
div[title="Fast Forward"] {
  display: none !important;
}
#browser .toolbar-mainbar button[name="Rewind"],
#browser .toolbar-mainbar button[name="FastForward"] {
  width: 26px !important;
}
#browser[rewind-forward] div[title="Rewind"],
#browser[rewind-forward] div[title="Fast Forward"] {
  display: flex !important;
}
#browser #main .button-toolbar > button[name="Home"] {
  margin-left: -3px !important;
}
#browser .UrlBar button[title="Bookmark Page"] {
  height: 22px !important;
  margin-top: -1px !important;
}
#browser .mainbar > .toolbar-mainbar {
  border-bottom: none !important;
  min-height: 30px !important;
}
#browser .UrlField {
  bottom: unset !important;
  margin-right: 24px !important;
  top: -1px !important;
}
#browser .UrlBar-AddressField,
#browser .UrlBar-SearchField.iconmenu-container.SearchField {
  border-radius: 8px !important;
  box-shadow: none !important;
  height: 30px !important;
  outline:none !important;
}
#browser .UrlBar-AddressField .button-toolbar.ContentBlocker-Control > .ToolbarButton-Button:hover,
#browser .UrlBar-AddressField > .button-addressfield:hover,
#browser .UrlBar-AddressField .toolbar > .BookmarkButton:hover .ToolbarButton-Button {
  background-color: transparent !important;
  border-radius: 4px !important;
}
#browser .UrlBar-SearchField {
  display: none !important;
}
#browser[searchbar] .UrlBar-SearchField {
  display: flex !important;
}
#browser[fav-in-url] .button-addressfield.SiteInfoButton {
  height: 22px !important;
  margin: 1px 0 0 -1px !important;
  width: 22px !important;
}
#browser[fav-in-url] .button-addressfield.SiteInfoButton.secure svg {
  background: url(/style/icons/lock1.png) center no-repeat !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[fav-in-url] .button-addressfield.SiteInfoButton.certified svg {
  background: url(/style/icons/lock3.png) center no-repeat !important;
  height: 16px !important;
  padding-left: 18px !important;
  width: 0 !important;
}
#browser[fav-in-url] .button-addressfield.SiteInfoButton.warning svg {
  background: url(/style/icons/warning.png) center no-repeat !important;
  height: 16px !important;
  padding-left: 18px !important;
  width: 0 !important;
}
#browser[fav-in-url] .UrlBar div[title^="Caution!"],
#browser[fav-in-url] .toolbar.toolbar-small.toolbar-insideinput {
  margin-right: 3px !important;
}
#browser[fav-in-url] .button-toolbar.BookmarkButton-Button > button svg {
  background: url(/style/icons/bookmark.png) center no-repeat !important;
  height: 17px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser #favImg {
  display: none !important;
}
#browser[fav-in-url] #favImg {
  display: block !important;
  margin: 3px 0 0 3px !important;
  height: 16px !important;
  width: 16px !important;
}
#browser .UrlBar-UrlFieldWrapper {
  background: transparent !important;
}
#browser[fav-in-url] .UrlFragment-Wrapper {
  margin: 2px 0 0 24px !important;
}
#browser[fav-in-url] .UrlBar-UrlFieldWrapper > div > div > input {
  padding-left: 8px !important;
}
#browser[fav-in-url] .tab .favicon.jstest-favicon-image > img[src="chrome://favicon/chrome://extensions/"] {
  background: url(/style/icons/extensions.png) !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[fav-in-url] .tab .favicon.jstest-favicon-image > img[srcset*="gemini"] {
  background: url(/style/icons/gemini.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[fav-in-url] .tab .favicon.jstest-favicon-image > img[srcset*="gmail.ico"] {
  background: url(/style/icons/gmail.png) !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[fav-in-url] div[title*="Romulus Athletic Center"] .favicon.jstest-favicon-image > img {
  background: url(/style/icons/rac.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[fav-in-url] .tab .favicon.jstest-favicon-image > img[srcset*="https://tv.youtube.com"] {
  background: url(/style/icons/youtubetv.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[fav-in-url] .tab .favicon.jstest-favicon-image > img[srcset*="https://powershell"] {
  background: url(/style/icons/powershell.png) !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[fav-in-url] .tab .favicon.jstest-favicon-image > img[srcset*="tampermonkey"] {
  background: url(/style/icons/tampermonkey16.png) !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[fav-in-url] .UrlBar-AddressField button[title="Reader View"],
#browser[fav-in-url] .UrlBar-UrlObfuscationWarning {
  display: none !important;
}
#browser[fav-in-url] .UrlBar-AddressField button[title="Reader View"] svg {
  background: url(/style/icons/reader.png) center no-repeat !important;
}
#browser[fav-in-url] .UrlBar-UrlObfuscationWarning > svg {
  background: url(/style/icons/warning.png) center no-repeat !important;
  position: relative !important;
  z-index: 9 !important;
}
#browser[fav-in-url] .UrlBar-AddressField button[title="Reader View"],
#browser[fav-in-url] .UrlBar-UrlObfuscationWarning {
  margin: 0 2px 0 4px !important;
}
#browser[fav-in-url] .UrlBar-UrlObfuscationWarning {
  display: none !important;
}
#browser[fav-in-url] .permission-popup > button {
  margin: 0 0 0 2px !important;
}
#browser[fav-in-url] .button-toolbar.BookmarkButton-Button > button {
  margin: 0 !important;
  padding: 2px !important;
}
#browser[fav-in-url] .permission-popup svg > path {
  display: none !important;
}
#browser[fav-in-url] .permission-popup svg,
#browser .addressfield-popup-container > section > header > span > svg {
  background: url(/style/icons/location.png) center no-repeat !important;
}
#browser .addressfield-popup-container > section > header > span > svg > path {
  display: none !important;
}
#browser[fav-in-url] #favImg[src^="chrome-extension://cjpalhdlnbpafiamejdnhcphjbkeiagm/"] {
  background: url(/style/icons/warning.png) center no-repeat !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[fav-in-url] .siteinfo-text {
  margin-top: 4px !important;
}
#browser[fav-in-url] .warning {
  margin-left: 2px !important;
}
#browser[fav-in-url] .tab-position .tab.active .tab-header .favicon:not(.svg) {
  filter: none !important;
}
#browser .button-toolbar.BookmarkButton-Button > .button-on svg {
  filter: grayscale(0) brightness(1) !important;
}
#browser .UrlBar-AddressField .pageload,
#browser .UrlBar-AddressField .pageload:not(.unstarted).progress-done,
#browser .UrlBar-AddressField .pageload:not(.unstarted).stopped {
  opacity: 0 !important;
}
#browser .UrlBar-AddressField .pageload:not(.unstarted).progressing {
  opacity: 1 !important;
}
#browser .UrlBar-AddressField .pageload .pageload-indicator {
  height: 25px !important;
  left: 76px !important;
  opacity: 1 !important;
}
#browser .mainbar .toolbar-extensions > .button-toolbar {
  background-color: transparent !important;
}
#browser .toolbar-extensions button {
  max-height: 30px !important;
  min-width: 20px !important;
}
#browser[extension-icons] .toolbar-extensions button {
  height: 30px !important;
  min-width: 30px !important;
}
#browser .toolbar-extensions button[title="Image to Base64 Encoder"] > img {
  background: url(/style/icons/encoder16.png) center no-repeat !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[extension-icons] .toolbar-extensions button[title="Image to Base64 Encoder"] > img {
  background: url(/style/icons/encoder26.png) center no-repeat !important;
  filter: none !important;
  padding-left: 26px !important;
  width: 0 !important;
}
#browser .toolbar-extensions button[name="mpeepmfabickbdbckcejbflkpfamgcon"] > img {
  background: url(/style/icons/spellcheck.png) center no-repeat !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0px !important;
}
#browser[extension-icons] .toolbar-extensions button[name="mpeepmfabickbdbckcejbflkpfamgcon"] > img {
  background: url(/style/icons/spellcheck26.png) center no-repeat !important;
  height: 26px !important;
  padding-left: 26px !important;
  width: 0 !important;
}
#browser .toolbar-extensions button[name="kdllaademhdfbdhmphefcionnblmobff"] > img {
  background: url(/style/icons/darkmode.png) center no-repeat !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[extension-icons] .toolbar-extensions button[name="kdllaademhdfbdhmphefcionnblmobff"] > img {
  background: url(/style/icons/darkmode26.png) center no-repeat !important;
  height: 26px !important;
  padding-left: 26px !important;
  width: 0 !important;
}
#browser .mainbar button[title="Toggle extensions"] > span,
#browser .UrlBar-AddressField .pageload .pageload-ticker {
  display: none !important;
}
#browser .mainbar button[title="Toggle extensions"] {
  background: url(/style/icons/extension.png) center no-repeat !important;
  display: flex !important;
  margin: 0 2px !important;
  min-width: 30px !important;
}
#browser[extension-icons] .mainbar button[title="Toggle extensions"] {
  background: url(/style/icons/extension26.png) center no-repeat !important;
}
#browser .mainbar .toolbar-extensions .button-toolbar > button > img[alt] {
  height: 16px !important;
  width: 16px !important;
}
#browser[extension-icons] .mainbar .toolbar-extensions .button-toolbar > button > img[alt] {
  flex-basis: 26px !important;
  height: 26px !important;
  width: 26px !important;
}
#browser[extension-icons] .toolbar-extensions .ExtensionIcon img {
  flex-basis: 16px !important;
  height: 26px !important;
  width: 26px !important;
}
#browser[fav-in-url] .mainbar .UrlField > img#favImg[src="/style/icons/settings.png"] {
  filter: invert(0%) !important;
}
#browser[fav-in-url] .tab .favicon.jstest-favicon-image > img[srcset*="fav-black"] {
  background-color: #FFF !important;
}
#browser[fav-in-url] .tab .favicon.jstest-favicon-image > img[srcset*="https://github.githubassets.com"] {
  background: url(/style/icons/github.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser[fav-in-url] .secure:hover,
#browser[fav-in-url] .toolbar-mainbar > .button-toolbar.ExtensionIcon > button:hover {
  background-color: rgba(0, 0, 0, .5) !important;
  border: 1px solid #999 !important;
}  
#browser[fav-in-url] .warning {
  color: yellow !important;
}
#browser[fav-in-url] .certified {
  color: lime !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Inner
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser[toggle-toolbars][hide-footer] #footer,
#browser[toggle-toolbars][hide-bookmark] .bookmark-bar,
#browser[toggle-toolbars][hide-mainbar] .toolbar-mainbar {
  display: none !important;
  min-height: 0 !important;
}
#browser[toggle-toolbars] .inner,
#browser[toggle-toolbars][footer-in-header][hide-footer] .inner,
#browser[toggle-toolbars][hide-bookmark] .inner,
#browser[toggle-toolbars][footer-in-header][hide-footer][hide-bookmark] .inner {
  top: 40px !important;
}
#browser[toggle-toolbars][hide-mainbar] .inner,
#browser[toggle-toolbars][footer-in-header][hide-footer][hide-mainbar] .inner,
#browser[toggle-toolbars][hide-mainbar][hide-bookmark] .inner,
#browser[toggle-toolbars][footer-in-header][hide-footer][hide-mainbar][hide-bookmark] .inner {
  top: 0px !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Global
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser button[disabled] {
  opacity: .3 !important;
}
#browser .ToolbarButton-Button,
button[name="Back"],
button[name="Forward"],
button[name="Reload"],
#rewindForward > div:nth-child(1) > button,
#rewindForward > div:nth-child(2) > button,
button[title^="Show Closed Tabs"],
button[name="PanelToggle"],
button[title^="Connected to Sync as"],
#browser .button-toolbar.synced-tabs-button > button,
#browser .tabbar-workspace-button > button,
button[name="BreakMode"],
button[name="Home"] {
  background-color: transparent !important;
  border: 1px solid transparent !important;
  opacity: 1 !important;
  border-radius: 4px !important;
  height: 29px !important;
}
#browser .toolbar .toolbar-spacer-flexible {
  flex: 0 !important;
}
#browser .ToolbarButton-.custom-button {
  opacity: .6 !important;
  width: 32px !important;
}
button:hover svg,
#footer button[title^="Hide Panel"],
#browser .button-toolbar > button:active,
#browser .button-toolbar > .button-pressed,
#browser .button-toolbar > .button-pressed[title="Page Actions"] svg {
  opacity: 1 !important;
}
#browser .edit-bookmark footer.dialog-footer {
  display: flex !important;
}
#browser .button-toolbar > .button-pressed svg {
  color: lime !important;
  filter: invert(0%) !important;
}
#browser.tabs-top .separator {
  border-radius: 0 !important;
  margin-right: -12px !important;
  pointer-events: none !important;
}
::spelling-error {
  text-decoration-line: none !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Break Mode
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.win.break-mode > :not(button) {
  display: none !important;
}
#browser > button {
  opacity: .1 !important;
}
#browser > button:hover {
  opacity: 1 !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Themes Dark
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.theme-dark #optionsButton {
  background: url(/style/icons/options.png) center no-repeat !important;
}
#browser.theme-dark .bookmarkbarItem {
  background: transparent !important;
  border: 1px solid transparent !important;
  border-radius: 4px !important;
}
#browser.theme-dark #restartButton {
  background: url(/style/icons/restart.png) center no-repeat !important;
}
#browser.theme-dark #main #footer .button-toolbar .toolbar .ToolbarButton-Button:hover {
  background-color: #000 !important;
}
#browser.theme-dark #optionsMenu #input0 {
  background-color: #000 !important;
  border-color: #666 !important;
}
#browser.theme-dark #optionsMenu #svg21:hover,
#browser.theme-dark #optionsMenu #input0:hover {
  border-color: #FFF !important;
}
#browser.theme-dark.tabs-top .separator {
  border-color: #FFF !important;
}
#browser.win.theme-dark .window-buttongroup button {
  color: #FFF !important;
}
#browser.theme-dark #webpage-stack .ThemePreviews {
  background: rgba(0, 0, 0, .2) !important;
}
#browser.theme-dark #webpage-stack .TabbedView-List,
#browser.theme-dark #webpage-stack .TabbedView-Footer {
  background: rgba(0, 0, 0, .5) !important;
}
#browser.theme-dark ::-webkit-scrollbar {
  appearance: none !important;
  background: #111 !important;
  border-width: 0 !important;
  border-radius: 10px !important;
}
#browser.theme-dark ::-webkit-scrollbar-thumb {
  appearance: none !important;
  border-width: 0 !important;
  border-radius: 10px !important;
} 
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Themes Light
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.theme-light #footer .StatusInfo,
#browser.theme-light #footer #calendar,
#browser.theme-light #ooter #digitalClock,
#browser.theme-light #footer .ClockButton > #clock,
#browser.theme-light #footer .ClockButton > #clock:hover {
  color: black !important;
}
#browser.theme-light #restartButton {
  background: url(/style/icons/restart2.png) center no-repeat !important;
}
#browser.theme-light #restartButton:hover {
  background: url(/style/icons/restart.png) center no-repeat !important;
}
#browser.theme-light .mainbar button[title="Toggle extensions"] {
  background: url(/style/icons/extension2.png) center no-repeat !important;
}
#browser.theme-light[extension-icons] .mainbar button[title="Toggle extensions"] {
  background: url(/style/icons/extension226.png) center no-repeat !important;
}
#browser.theme-light #optionsButton {
  background: url(/style/icons/options2.png) center no-repeat !important;
}
#browser.theme-light.tabs-top .separator {
  border-color: #000 !important;
}
#browser.win.theme-light .window-buttongroup button {
  color: #000 !important;
}
#browser.win.theme-light button[title*="chrome://extensions/"] > img {
  background: url(/style/icons/extension2.png) !important;
}
#browser.win.theme-light button[title*="path=general"] > span > svg {
  background: url(/style/icons/settings2.png) !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Vivaldi Theme In Vivaldi's 🖌 Themes Library:
   Custom CSS For theme-id-Vivaldi3x
   Dark Theme - Issuna Theme
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.normal.theme-id-Vivaldi3x[toolbar-toggle][custom-css] #toggle-toolbars,
#browser.maximized.theme-id-Vivaldi3x[toolbar-toggle][custom-css] #toggle-toolbars {
  left: 30px !important;
}
#browser.theme-id-Vivaldi3x[toolbar-toggle][custom-css] #toggle-toolbars {
  filter: invert(0%) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #tabs-container > .resize {
  height: 32px !important;
}
#browser.normal.theme-id-Vivaldi3x[custom-css] #tabs-container > .resize {
  left: -4px  !important;
  margin-right: 0px  !important;
}
#browser.normal.theme-id-Vivaldi3x[toolbar-toggle][custom-css] .tabbar-workspace-button > button {
  left: 32px  !important;
}
#browser.normal.theme-id-Vivaldi3x[toolbar-toggle][custom-css] #tabs-container > .resize {
  left: 26px  !important;
  margin-right: 30px  !important;
}
#browser.normal.theme-id-Vivaldi3x[toolbar-toggle][show-workspaces][custom-css] #tabs-tabbar-container .tabbar-workspace-button > button {
  left: 6px !important;
}
#browser.normal.theme-id-Vivaldi3x[toolbar-toggle][show-workspaces][custom-css] #tabs-container > .resize {
  left: 26px !important;
  margin-right: 30px  !important;
}
#browser.normal.theme-id-Vivaldi3x[show-workspaces][custom-css] #tabs-tabbar-container .tabbar-workspace-button > button {
  left: -4px !important;
}
#browser.normal.theme-id-Vivaldi3x[show-workspaces][custom-css] #tabs-container > .resize {
  left: 18px !important;
  margin-right: 22px  !important;
}
#browser.maximized.theme-id-Vivaldi3x[custom-css] #tabs-container > .resize {
  left: -4px  !important;
  margin-right: 0px  !important;
}
#browser.maximized.theme-id-Vivaldi3x[toolbar-toggle][custom-css] .tabbar-workspace-button > button {
  left: 32px  !important;
}
#browser.maximized.theme-id-Vivaldi3x[toolbar-toggle][custom-css] #tabs-container > .resize {
  left: 30px  !important;
  margin-right: 34px  !important;
}
#browser.maximized.theme-id-Vivaldi3x[toolbar-toggle][show-workspaces][custom-css] #tabs-tabbar-container .tabbar-workspace-button > button {
  left: 6px !important;
}
#browser.maximized.theme-id-Vivaldi3x[toolbar-toggle][show-workspaces][custom-css] #tabs-container > .resize {
  left: 26px !important;
  margin-right: 30px  !important;
}
#browser.maximized.theme-id-Vivaldi3x[show-workspaces][custom-css] #tabs-tabbar-container .tabbar-workspace-button > button {
  left: -4px !important;
}
#browser.maximized.theme-id-Vivaldi3x[show-workspaces][custom-css] #tabs-container > .resize {
  left: 18px !important;
  margin-right: 22px  !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #tabs-container > .resize {
  margin-right: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #tabs-tabbar-container {
  background-color: #1D1E21 !important;
  border-bottom: 1px solid #999 !important;
}
#browser.normal.theme-id-Vivaldi3x[custom-css] #tabs-container {
  background: #000 !important;
  margin-top: -1px !important;
  padding-left: 18px !important;
}
#browser.maximized.theme-id-Vivaldi3x[custom-css] #tabs-container {
  background: #000 !important;
  margin-top: 0px !important;
  padding-left: 18px !important;
}
#browser.normal.theme-id-Vivaldi3x[toolbar-toggle][custom-css] #tabs-container {
  background: #000 !important;
  margin-top: -1px !important;
  padding-left: 18px !important;
}
#browser.maximized.theme-id-Vivaldi3x[toolbar-toggle][custom-css] #tabs-container {
  padding-left: 16px !important;
  padding-right: 50px !important;
}
#browser.theme-id-Vivaldi3x[show-workspaces][custom-css] #tabs-container {
  margin-bottom: 0px !important;
  padding-left: 28px !important;
}
#browser.theme-id-Vivaldi3x[toolbar-toggle][show-workspaces][custom-css] #tabs-container {
  margin-bottom: 0px !important;
  padding-left: 48px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #tabs-container .tab.active {
  background: linear-gradient(#FFF 1%, #1D1E21 15%, #1D1E21 90%) !important;
  border: 1px solid #FFF !important;
  border-bottom: none !important;
  color: #FFF !important;
  height: 32px !important;
  padding-top: 1px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab > .tab-header {
  padding: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab .favicon.jstest-favicon-image {
  filter: none !important;
  flex: 0 !important;
  margin: 0 !important;
  min-height: 24px !important;
  min-width: 24px !important;
  padding: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #main .tab .jstest-favicon-image svg,
#browser.theme-id-Vivaldi3x[custom-css] .tab .favicon.jstest-favicon-image > img {
  bottom: unset !important;
  left: 6px !important;
  max-height: 16px !important;
  max-width: 16px !important;
  position: relative !important;
  top: 4px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Razzano (Sonny)"] .favicon.jstest-favicon-image > img {
  background: url(/style/icons/github.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title^="SLB stocks"] .favicon.jstest-favicon-image > img {
  background: url(/style/icons/slb.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title$="Settings"] .favicon.jstest-favicon-image span > svg > path {
  display: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab .favicon.jstest-favicon-image span > svg {
  position: relative !important;
  left: 4px !important;
  top: 4px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title^="SoFi stocks"] .favicon.jstest-favicon-image > img {
  background: url(/style/icons/sofi.png) !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="chrome://settings"] .favicon.jstest-favicon-image > img,
#browser.theme-id-Vivaldi3x[custom-css] .tab[title$="Settings"] .favicon.jstest-favicon-image > img  {
  background: url(/style/icons/vivaldi16.png) center no-repeat !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title*="Romulus Athletic Center"] .favicon.jstest-favicon-image > img  {
  background: url(/style/icons/rac.png) center no-repeat !important;
  height: 16px !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Themes Settings"] .favicon.jstest-favicon-image svg {
  background: url(/style/icons/themes.png) center no-repeat !important;
  bottom: unset !important;
  height: 16px !important;
  left: 4px !important;
  padding-left: 16px !important;
  position: relative !important;
  top: 4px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="General Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/settings.png) center no-repeat !important;
  bottom: unset !important;
  height: 16px !important;
  left: 4px !important;
  padding-left: 16px !important;
  position: relative !important;
  top: 4px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title$="Settings"] .favicon.jstest-favicon-image svg {
  bottom: unset !important;
  height: 16px !important;
  left: 4px !important;
  padding-left: 16px !important;
  position: relative !important;
  top: 4px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title$="Start Page"] > div > span > span > svg {
  left: 4px !important;
  position: relative !important;
  top: 4px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Sync Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/synced.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Appearance Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/appearance.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Themes Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/themes.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Start Page Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/startpage.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Tabs Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/tabs.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Panel Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/panel.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Address Bar Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/mainbar.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Bookmarks Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/bookmarkbar.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Search Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/search.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Quick Commands Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/quick.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Keyboard Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/keyboard.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Mouse Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/mouse.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Privacy and Security Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/blocker.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title*="Downloads Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/downloads.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Webpages Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/nfcu.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Network Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/network.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Mail Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/mail.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Calendar Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/calendar.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Feeds Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/feeds.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title="Display All Settings"] .favicon.jstest-favicon-image svg  {
  background: url(/style/icons/settings.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab[title$="Settings"] .favicon.jstest-favicon-image svg {
  filter: invert(0%) !important;
}
#browser.theme-id-Vivaldi3x[custom-close][custom-css] .tab .close svg {
  display: none !important;
}
#browser.theme-id-Vivaldi3x[custom-close][custom-css] .tab .close {
  background: url(/style/icons/close1.png) no-repeat center !important;
  border-radius: 50% !important;
  height: 24px !important;
  margin: 0 0 0 2px !important;
  opacity: .4 !important;
  padding: 0 !important;
  position: relative !important;
  top: 1px !important;
  width: 24px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab .close {
  margin: 0 0 0 4px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab:hover .title {
  margin: 0 0 0 2px !important;
}
#browser.theme-id-Vivaldi3x[custom-close][custom-css] .tab .favicon > span {
  margin: 0 0 0 2px !important;
}
#browser.theme-id-Vivaldi3x[custom-close][custom-css] .tab .title {
  margin: 0 0 0 2px !important;
}
#browser.theme-id-Vivaldi3x[custom-close][custom-css] .tab:hover .title {
  margin: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-close][custom-css] .tab .close:hover {
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .newtab {
  margin: 1px 0 0 -3px !important;
  min-width: 24px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .newtab > button {
  background: transparent !important;
  border-radius: 10px 10px 0 0 !important;
  min-height: 28px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .newtab > button:hover svg {
  border: 1px solid #FFF !important;
  border-radius: 10px 10px 0 0 !important;
  color: lime !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .newtab > button svg {
  margin-top: -2px !important;
}
#browser.theme-id-Vivaldi3x[options-menu][custom-css] #optionsButton {
  background: url(/style/icons/optionsOn.png) center no-repeat !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #optionsButton.custom-button:hover {
  border: 1px solid #999 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button[name="PanelToggle"] > span > svg > path {
  display: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button[name="PanelToggle"] {
  height: 26px !important;
  width: 26px !important;
  border: 1px solid #999 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer > .toolbar-statusbar > div > button:hover {
  border: 1px solid #FFF !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button[name="PanelToggle"] > span > svg {
  background: url(/style/icons/sidepanel.png) center no-repeat !important;
  filter: invert(0%) !important;
  height: 16px !important;
  opacity: .6 !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button[name="PanelToggle"][title^="Hide Panel"] > span > svg {
  background: url(/style/icons/sidepanelOn.png) center no-repeat!important;
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer button[title^="Show Panel"]:hover > span > svg,
#browser.theme-id-Vivaldi3x[custom-css] #footer button[title^="Hide Panel"]:hover > span > svg {
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer .StatusInfo {
  background: transparent !important;
  margin-right: 2px !important;
  padding-left: 2px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer button {
  color: #FFF !important;
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer .ClockButton > button {
  color: yellow !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer .ClockButton > button svg {
  fill: yellow !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer .StatusInfo .UrlFragments,
#browser.theme-id-Vivaldi3x[custom-css] #footer .StatusInfo-Content {
  padding-left: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar > button[title="Page Actions"] svg > path {
  display: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar > button[title="Page Actions"] svg {
  background: url(/style/icons/css.png) center no-repeat !important;
  height: 16px !important;
  opacity: .6 !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar > .button-pressed[title="Page Actions"] svg {
  background: url(/style/icons/cssOn.png) center no-repeat !important;
  height: 16px !important;
  opacity: 1 !important;
  padding-left: 16px !important;
  width: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar > button[title="Page Actions"]:hover svg {
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .page-zoom-controls button {
  border: 1px solid transparent !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .page-zoom-controls .zoom-percent {
  padding: 0 6px 0 4px !important;
  text-align: center !important;
  width: 48px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button[title="Reset Zoom"] {
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] input[type=range] {
  background-color: transparent !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .page-zoom-controls > span {
  pointer-events: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ClockButton > #clock {
  border: 1px solid transparent !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ClockButton > #clock:hover {
  border-radius: 4px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ClockPopup-BigClock {
  padding: 8px 0 0 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ClockPopup-Active {
  border: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .bookmark-bar {
  border-bottom: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .bookmark-bar > .observer {
  padding-left: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .bookmark-bar button {
  background-color: transparent !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #tabs-container > .toolbar {
  margin-top: 1px !important;
  padding: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #tabs-tabbar-container .toolbar-tabbar-before {
  min-width: 14px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ToolbarButton-Button:hover {
  border: 1px solid #999 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] > #main #tabs-tabbar-container .button-toolbar > button[title^="Show Closed Tabs"].ToolbarButton-Button {
  opacity: .6 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] > #main #tabs-tabbar-container .button-toolbar > button[title^="Show Closed Tabs"].ToolbarButton-Button:hover {
  background-color: transparent !important;
  border: 1px solid transparent !important;
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .UrlBar-AddressField .pageload .pageload-indicator {
  background-color: #660000 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ContentBlocker.button-popup,
#browser.theme-id-Vivaldi3x[footer-in-header][custom-css] .button-popup {
  margin-top: 5px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ToolbarButtonPopup-DefaultStyles.button-popup,
#browser.theme-id-Vivaldi3x[custom-css] .ClockPopup.button-popup {
  margin-bottom: 5px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-popup:before {
  bottom: -11px !important;
  top: unset !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ContentBlocker.button-popup:before,
#browser.theme-id-Vivaldi3x[footer-in-header][custom-css] .button-popup:before {
  bottom: unset !important;
  rotate: 0deg !important;
  top: -12px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-popup {
  border-radius: 0 !important;
  z-index: 9 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #switch > .toolbar.toolbar-vertical,
#browser.theme-id-Vivaldi3x[custom-css] #panels-container.overlay.left,
#browser.theme-id-Vivaldi3x[custom-css] #panels-container .panel-group {
  background: #000 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #toggle-toolbars {
  filter: invert(0%) !important;
}
#browser.normal.theme-id-Vivaldi3x[custom-css] .tab-strip {
  background: #000 !important;
  border-left: none !important;
  border-bottom: 1px solid #999 !important;
  border-radius: 0 !important;
  margin-left: 3px !important;
}
#browser.maximized.theme-id-Vivaldi3x[custom-css] .tab-strip {
  background: #000 !important;
  border-left: none !important;
  border-bottom: 1px solid #999 !important;
  border-radius: 0 !important;
  margin-left: 3px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .vivaldi-tree .tree-row .item-count {
  background-color: rgba(0, 0, 0, .5) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer #optionsButton:hover {
  background-color: rgba(0, 0, 0, .5) !important;
  border-color: #FFF !important;
}
#browser.theme-id-Vivaldi3x[home-to-restart] #restartButton:hover {
  border: 1px solid #FFF !important;
}
#browser.theme-id-Vivaldi3x:not(.break-mode)[custom-css] #footer .button-toolbar button[title="End Break"] > span > svg,
#browser.theme-id-Vivaldi3x[custom-css] #footer .button-pressed svg {
  color: lime !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer .button-toolbar button[title="End Break"] {
  background-color: rgba(0, 0, 0, .5) !important;
  border: 1px solid #999 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer .StatusInfo,
#browser.theme-id-Vivaldi3x[custom-css] #footer #calendar,
#browser.theme-id-Vivaldi3x[custom-css] #footer #digitalClock,
#browser.theme-id-Vivaldi3x[custom-css] #footer #clock,
#browser.theme-id-Vivaldi3x[custom-css] #footer .ClockButton > #clock {
  color: yellow !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #footer .ClockButton > #clock:hover {
  background-color: rgba(0, 0, 0, .5) !important;
  border: 1px solid #999 !important;
  color: yellow !important;
}
#browser.theme-id-Vivaldi3x[custom-css]  button[title="Page Actions"] {
  color: #999 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .page-zoom-controls button[title="Reset Zoom"]:not([disabled]) {
  background-color: rgba(0, 0, 0, .5) !important;
  border: 1px solid #999 !important;
  color: lime !important;
}
#browser.theme-id-Vivaldi3x[custom-css] input[type=range] {
  background-color: #CCC !important;
}
#browser.theme-id-Vivaldi3x[custom-css] input[type=range]:hover {
  background-color: #FFF !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .page-zoom-controls > span {
  color: #CCC !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .page-zoom-controls > div:hover > button:not([disabled]) > span {
  color: lime !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #calendar:hover {
  background-color: rgba(0, 0, 0, .5) !important;
  border-color: #999 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ClockPopup-Header,
#browser.theme-id-Vivaldi3x[custom-css] .button-popup > .popup-scrollarea,
#browser.theme-id-Vivaldi3x[custom-css] .button-popup > .popup-scrollarea > div {
  background-color: rgba(0, 0, 0, .5) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .bookmark-bar button {
  color: #FFF !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .bookmark-bar button {
  background-color: #1D1E22 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .bookmarkbarItem {
  color: #FFF !important;
  margin-left: 2px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] > #main .bookmarkbarItem:hover {
  background-color:  rgba(0, 0, 0, .5) !important;
  border-color: #CCC !important;
}
#browser.theme-id-Vivaldi3x[custom-css] > #main button:not([title]):hover {
  border: 1px solid transparent !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button[title*="settings.html"] svg {
  filter: invert(0%) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .mainbar > .toolbar-mainbar {
  color: #FFF !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .UrlBar-AddressField button:not([title="View Site Info"]):hover {
  background-color: red !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar.ContentBlocker-Control > .ToolbarButton.button-pressed {
  border: 1px solid #999 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar.ContentBlocker-Control > .ToolbarButton.button-pressed svg {
  color: lime !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar.BookmarkButton-Button > .button-on svg {
  filter: grayscale(0) brightness(1) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button:not([name="BreakMode"]).ToolbarButton-Button:hover {
  border: 1px solid #999 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar:not(.newtab) > .ToolbarButton-Button:hover {
  background-color: rgba(0, 0, 0, .5) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .mainbar .toolbar-extensions > .button-toolbar button:hover {
  background-color: rgba(0, 0, 0, .2) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .OmniDropdown > .OmniDropdown-Collection {
  background-color: rgba(0, 0, 0, .5) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .OmniDropdown .OmniLinkItem--Highlighted {
  background-color: rgba(0, 0, 0, .5) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar:not(.newtab) > .ToolbarButton-Button:hover {
  background-color: rgba(0, 0, 0, .5) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ToolbarButton.custom-button svg {
  filter: invert(0%) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button svg {
  color: #FFF !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button:hover svg {
  color: #FFF !important;
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar > .button-pressed[title="Page Actions"] svg,
#browser.theme-id-Vivaldi3x[custom-css] button:hover svg {
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar > button:active,
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar > .button-pressed {
  border: 1px solid #999 !important;
  color: lime !important;
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-toolbar[style="--panelOpen: 1; transform: unset;"] svg {
  border-color: #FFF !important;
  color: lime !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .ToolbarButtonPopup-DefaultStyles.button-popup,
#browser.theme-id-Vivaldi3x[custom-css] .ClockPopup.button-popup {
  background-color: #111 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-popup:before,
#browser.theme-id-Vivaldi3x[custom-css] .ContentBlocker.button-popup:before,
#browser.theme-id-Vivaldi3x[footer-in-header][custom-css] .button-popup:before {
  border-bottom-color: #AAA !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .button-popup {
  border: 1px solid #AAA !important;
}
#browser.theme-id-Vivaldi3x:not(.break-mode)[custom-css] #footer:not([class]),
#browser.theme-id-Vivaldi3x[custom-css] .bookmark-bar,
#browser.theme-id-Vivaldi3x[custom-css] .mainbar {
  background-color: #1D1E21 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab:not(.active):hover {
  background-color: #000 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .UrlBar-AddressField,
#browser.theme-id-Vivaldi3x[custom-css] .UrlBar-SearchField.iconmenu-container.SearchField {
  background-color:  #000 !important;
  border: 1px solid #666 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .UrlBar-AddressField:hover,
#browser.theme-id-Vivaldi3x[custom-css] .UrlBar-SearchField.iconmenu-container.SearchField:hover,
#browser.theme-id-Vivaldi3x[custom-css] .UrlBar-AddressField:focus-within,
#browser.theme-id-Vivaldi3x[custom-css] .UrlBar-SearchField.iconmenu-container.SearchField:focus-within {
  border-color: #CCC !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #titlebar > .window-buttongroup {
  background-color: #1D1E22 !important;
}
#browser.theme-id-Vivaldi3x.break-mode[custom-css] #footer button[name="BreakMode"] {
  border: 1px solid #FFF !important;
  border-radius: 4px !important;
}
#browser.theme-id-Vivaldi3x.break-mode[custom-css] #footer button[name="BreakMode"] svg {
  color: #FFF !important;
  filter: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab {
  background-color: #333 !important;
  border: 1px solid #666 !important;
  border-bottom: none !important;
  border-radius: 10px 10px 0 0 !important;
  color: #BBB !important;
  height: 31px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab-position .tab:not(.active):hover {
  background-color: rgba(255, 255, 255, .1) !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab img,
#browser.theme-id-Vivaldi3x[custom-css] .tab .jstest-favicon-image svg,
#browser.theme-id-Vivaldi3x[custom-css] .tab .title {
  opacity: .7 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab.active img,
#browser.theme-id-Vivaldi3x[custom-css] .tab.active .jstest-favicon-image svg,
#browser.theme-id-Vivaldi3x[custom-css] .tab.active .title {
  opacity: 1 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] .tab.active > .tab-header {
  margin-top: -1px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button[name="BreakMode"] svg {
  height: 26px !important;
  margin-left: -4px !important;
  width: 26px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button[name="Back"],
#browser.theme-id-Vivaldi3x[custom-css] button[name="Forward"],
#browser.theme-id-Vivaldi3x[custom-css] button[name="Reload"],
#browser.theme-id-Vivaldi3x[custom-css] #rewindForward > div:nth-child(1) > button,
#browser.theme-id-Vivaldi3x[custom-css] #rewindForward > div:nth-child(2) > button,
#browser.theme-id-Vivaldi3x[custom-css] button[title^="Show Closed Tabs"],
#browser.theme-id-Vivaldi3x[custom-css] button[name="PanelToggle"],
#browser.theme-id-Vivaldi3x[show-workspaces][custom-css] .tabbar-workspace-button > button,
#browser.theme-id-Vivaldi3x[custom-css] button[name="BreakMode"],
#browser.theme-id-Vivaldi3x[custom-css] button[name="Home"] {
  color: #BBB !important;
  margin: 0 !important;
  opacity: .7 !important;
  padding: 0 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] button[name="Back"],
#browser.theme-id-Vivaldi3x[custom-css] button[name="Forward"],
#browser.theme-id-Vivaldi3x[custom-css] button[name="Reload"],
#browser.theme-id-Vivaldi3x[custom-css] #rewindForward > div:nth-child(1) > button,
#browser.theme-id-Vivaldi3x[custom-css] #rewindForward > div:nth-child(2) > button {
  color: #FFF !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #tabs-tabbar-container .toolbar-tabbar-after > .button-toolbar > button {
  margin-right: 0 !important;
  position: relative !important;
  top: -1px !important;
  z-index: 2 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #tabs-container > .toolbar-tabbar-after > .tabs-button > button {
  border: 1px solid transparent !important;
  margin-left: -6px !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #tabs-container > .toolbar-tabbar-after > .tabs-button > button:hover svg,
#browser.theme-id-Vivaldi3x[custom-css] #tabs-container > .toolbar-tabbar-after > .tabs-button > button.button-pressed svg {
  border: 1px solid #FFF !important;
  border-radius: 10px 10px 0px 0px !important;
  color: lime !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #label6 {
  opacity: 1 !important;
  pointer-events: all !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #webpage-stack button[title="Left"] {
  opacity: .3 !important;
  pointer-events: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #webpage-stack button[title="Right"] {
  opacity: .3 !important;
  pointer-events: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #webpage-stack button[title="Bottom"] {
  opacity: .3 !important;
  pointer-events: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css] #webpage-stack button[title="Left"] {
  opacity: .3 !important;
  pointer-events: none !important;
}
#browser.theme-id-Vivaldi3x[custom-css]  #webpage-stack > div > .row-wrapper > div > .internal-page > div > div > .settings-content {
  background: #1D1E21 !important;
}
#browser.theme-id-Vivaldi3x[custom-css] ::-webkit-scrollbar-thumb {
  background: #444  !important;
}
#browser.theme-id-Vivaldi3x[custom-css] ::-webkit-scrollbar-thumb:hover,
#browser.theme-id-Vivaldi3x[custom-css] ::-webkit-scrollbar-thumb:active {
  background: #666 !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   All Other Vivaldi Themes In Vivaldi's 🖌 Themes Library:
   Vivaldi1 theme-light Vivaldi, Vivaldi2 dark-theme Dark, Vivaldi3 theme-dark Human, Vivaldi4 theme-light Soft Pink, Vivaldi3x theme-dark Issuna,
   Vivaldi5 theme-light Subtle, Vivaldi7 theme-light Beach, Vivaldi8 theme-light Purple Rain, Vivaldi9 theme-dark Private, Vivaldi10 theme-light Paint
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.theme-id-Vivaldi1[toolbar-toggle] #toggle-toolbars,
#browser.theme-id-Vivaldi4[toolbar-toggle] #toggle-toolbars,
#browser.theme-id-Vivaldi7[toolbar-toggle] #toggle-toolbars,
#browser.theme-id-Vivaldi8[toolbar-toggle] #toggle-toolbars,
#browser.theme-id-Vivaldi10[toolbar-toggle] #toggle-toolbars {
  filter: invert(0%) !important;
}
#browser.theme-id-Vivaldi5[toolbar-toggle] #toggle-toolbars {
  filter: invert(100%) !important;
}
#browser.win.theme-light.theme-id-Vivaldi1 .window-buttongroup button {
  color: #FFF !important;
}
#browser.win.theme-light.theme-id-Vivaldi5 .window-buttongroup > .window-minimize,
#browser.win.theme-light.theme-id-Vivaldi8 .window-buttongroup > .window-minimize {
  background: url(/style/icons/windowMinimize2.png) center no-repeat !important;
}
#browser.win.normal.theme-light.theme-id-Vivaldi5 .window-buttongroup > .window-maximize,
#browser.win.normal.theme-light.theme-id-Vivaldi8 .window-buttongroup > .window-maximize {
  background: url(/style/icons/windowNormal2.png) center no-repeat !important;
}
#browser.win.maximized.theme-light.theme-id-Vivaldi5 .window-buttongroup > .window-maximize,
#browser.win.maximized.theme-light.theme-id-Vivaldi8 .window-buttongroup > .window-maximize {
  background: url(/style/icons/windowMaximize2.png) center no-repeat !important;
}
#browser.win.theme-light.theme-id-Vivaldi5 .window-buttongroup > .window-close,
#browser.win.theme-light.theme-id-Vivaldi8 .window-buttongroup > .window-close {
  background: url(/style/icons/windowClose2.png) center no-repeat !important;
}
#browser.win.theme-light.theme-id-Vivaldi5 .window-buttongroup > .window-minimize:hover,
#browser.win.theme-light.theme-id-Vivaldi8 .window-buttongroup > .window-minimize:hover {
  background: url(/style/icons/windowMinimize.png) center no-repeat !important;
  background-color: #00B306 !important;
}
#browser.win.normal.theme-light.theme-id-Vivaldi5 .window-buttongroup > .window-maximize:hover,
#browser.win.normal.theme-light.theme-id-Vivaldi8 .window-buttongroup > .window-maximize:hover {
  background: url(/style/icons/windowNormal.png) center no-repeat !important;
  background-color: #0066CC !important;
}
#browser.win.maximized.theme-light.theme-id-Vivaldi5 .window-buttongroup > .window-maximize:hover,
#browser.win.maximized.theme-light.theme-id-Vivaldi8 .window-buttongroup > .window-maximize:hover {
  background: url(/style/icons/windowMaximize.png) center no-repeat !important;
  background-color: #0066CC !important;
}
#browser.win.theme-light.theme-id-Vivaldi5 .window-buttongroup > .window-close:hover,
#browser.win.theme-light.theme-id-Vivaldi8 .window-buttongroup > .window-close:hover {
  background: url(/style/icons/windowClose.png) center no-repeat !important;
  background-color: #B30600 !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Imported Theme From Vivaldi's 🖌 Themes Library:
   Custom CSS For theme-id-7fadd301-740d-441d-be0b-4230ed715d3c (tab #B30600)
   Dark Theme - Black and Red Material Folds III https://themes.vivaldi.net/themes/2zmvzAdql6g
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #tabs-tabbar-container {
  background-color: #000 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .tab:not(.active) {
  background: #550000 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .tab:not(.active):hover {
  background: #770000 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .close svg {
  display: none !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .close {
  background: url(/style/icons/close2.png) no-repeat center !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .favicon > span {
  margin: 0 0 0 -2px !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .close {
  border-radius: 50% !important;
  height: 24px !important;
  opacity: .4 !important;
  padding: 0 !important;
  position: relative !important;
  top: 1px !important;
  width: 24px !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .close {
  margin: -2px 0 0 -4px !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .title {
  margin: 0 0 0 2px !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .tab .title {
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab:hover .title {
  margin: 0 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .close:hover {
  opacity: 1 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .favicon > span {
  margin: 0 0 0 -2px !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .close {
  border-radius: 50% !important;
  height: 24px !important;
  opacity: .4 !important;
  padding: 0 !important;
  position: relative !important;
  top: 1px !important;
  width: 24px !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .close {
  margin: -2px 0 0 -4px !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .title {
  margin: 0 0 0 2px !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .tab .title {
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab:hover .title {
  margin: 0 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[custom-close] .tab .close:hover {
  opacity: 1 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .UrlBar-AddressField .pageload .pageload-indicator {
  background-color: #550000 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .ToolbarButton-Button:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #calendar:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .ClockButton > #clock:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #restartButton:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c button[name="PanelToggle"]:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c button[name="SyncStatus"]:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c button[name="Back"]:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c button[name="Forward"]:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c button[name="Rewind"]:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c button[name="Reload"]:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c button[name="BreakMode"]:hover {
  background-color: #660000 !important;
  border: 1px solid #FFF !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #label6 {
  opacity: 1 !important;
  pointer-events: all !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #optionsButton:hover {
  background-color: #660000 !important;
  border: 1px solid #FFF !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .bookmark-bar,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .mainbar {
  border-bottom: 1px solid #B30600 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #panels-container.left:not(.icons) .panel-group,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #panels-container.left.icons:not(:has(.SlideBar)),
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #panels-container.overlay {
  background: #B30600 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .cardview .thumbnail-image,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .cardview input[type=text],
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .vivaldi-tree .tree-row,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .cardview textarea {
  background-color: #000 !important;
  color: #FFF !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .vivaldi-tree .tree-row[data-selected],
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .vivaldi-tree .tree-row-selected > label {
  background-color: #FF0000 !important;color: #FFF !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c[options-menu] #optionsMenu {
  background: #550000 !important;
  border: 2px solid #B30600 !important;
  box-shadow: none !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c > #main > #footer {
  background: #B30600 !important;
  border: none !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .bookmark-bar button:hover {
  background-color: #660000 !important;
  border: 1px solid #FFF !important;
  border-radius: 6px !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c > .button-popup > div {
  background: #B30600 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .bookmark-bar button .title {
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #webpage-stack .settings-sidebar,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #webpage-stack .settings-content {
  background-color: #550000 !important;
  box-shadow: none !important;
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #webpage-stack .setting-section *,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #webpage-stack .vivaldi-settings h2 {
  border-color: #999 !important;
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c ::-webkit-scrollbar-thumb {
  background: #440000 !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c ::-webkit-scrollbar-thumb:hover,
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c ::-webkit-scrollbar-thumb:active {
  background: #660000 !important;
}
#browser.win.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #footer > div > #clock span:hover,
#browser.win.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #digitalClock:hover {
  background-color: #660000 !important;
  border: 1px solid #FFF !important;
}
/* Overrides Added In Custom CSS Folder */
/*
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .toolbar { 
  border: 1px solid var(--colorAccentBorder) !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .mainbar { // from 3119 & 3127
  border: 1px solid var(--colorAccentBorder) !important;
}
#browser.win.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .bookmark-bar { // from 15072
  border: 1px solid var(--colorAccentBorder) !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c #footer { // from 31508
  background: var(--colorAccentBorder) !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .bookmark-bar button:hover {
  background-color: #000 !important;
  border-radius: 8px !important;
}
#browser.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .bookmark-bar button[title="---"]:hover {
  background: var(--colorAccentBorder) !important;
}
#browser.win.theme-id-7fadd301-740d-441d-be0b-4230ed715d3c .bookmark-bar .separator {
  border-left: 1px solid #FFF !important;
}
*/
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Imported Theme From Vivaldi's 🖌 Themes Library:
   Custom CSS For theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 (tab #BD4E0F) 
   Dark Theme - Kalidozza Oficial Theme https://themes.vivaldi.net/themes/QBEJeDMpvyP
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 #tabs-tabbar-container {
  background-color: #000 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 .tab:not(.active) {
  background: #583A11 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 .tab:not(.active):hover {
  background: #7B4401 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1[custom-close] .tab .close svg {
  display: none !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1[custom-close] .tab .close {
  background: url(/style/icons/close2.png) no-repeat center !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1[custom-close] .tab .favicon > span {
  margin: 0 0 0 -2px !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1[custom-close] .tab .close {
  border-radius: 50% !important;
  height: 24px !important;
  opacity: .4 !important;
  padding: 0 !important;
  position: relative !important;
  top: 1px !important;
  width: 24px !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1[custom-close] .tab .close {
  margin: -2px 0 0 -4px !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1[custom-close] .tab .title {
  margin: 0 0 0 2px !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 .tab .title {
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1[custom-close] .tab:hover .title {
  margin: 0 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1[custom-close] .tab .close:hover {
  opacity: 1 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 .UrlBar-AddressField .pageload .pageload-indicator {
  background-color: #583A11 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 .ToolbarButton-Button:hover,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 #calendar:hover,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 .ClockButton > #clock:hover,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 #restartButton:hover,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 button[name="PanelToggle"]:hover,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 button[name="SyncStatus"]:hover,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 button[name="Back"]:hover,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 button[name="Forward"]:hover,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 button[name="Rewind"]:hover,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 button[name="Reload"]:hover,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 button[name="BreakMode"]:hover {
  background-color: #583A11 !important;
  border: 1px solid #FFA646 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 #label6 {
  opacity: 1 !important;
  pointer-events: all !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 #main > #footer #optionsButton:hover {
  background-color: #583A11 !important;
  border: 1px solid #FFA646 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1[options-menu] #optionsMenu {
    background: #BD4E0F !important;
    border: 1px solid #BD4E0F !important;
    box-shadow: none !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 > #main > #footer {
  background: #BD4E0F !important;
  border: none !important;
}
#browser.win.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 #digitalClock:hover {
  background-color: #583A11 !important;
  border: 1px solid #FFA646 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 .bookmark-bar button {
  border: 1px solid transparent !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 .bookmark-bar button:hover {
  background-color: #583A11 !important;
  border: 1px solid #FFA646 !important;
  border-radius: 6px !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 .bookmark-bar button .title {
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 #webpage-stack .settings-sidebar,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 #webpage-stack .settings-content {
  background-color: #583A11 !important;
  box-shadow: none !important;
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 #webpage-stack .setting-section *,
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 #webpage-stack .vivaldi-settings h2 {
  border-color: #FFA646 !important;
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 ::-webkit-scrollbar-thumb {
  background: #BD4E0F !important;
}
#browser.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 ::-webkit-scrollbar-thumb:hover,
.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1 ::-webkit-scrollbar-thumb:active {
  background: #FFA646 !important;
}
/* Need both blocks below */
/*
#browser.win.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1.theme-dark #footer > div > .button-toolbar.ClockButton span:hover {
  background: #583A11 !important;
  border: 1px solid #FFA646 !important;
}
#browser.win.theme-id-b9bf09e9-dae9-4b88-bce6-6166d83a7fd1.theme-dark #footer > div > .button-toolbar.ClockButton span:hover {
  background: #583A11 !important;
  border: 1px solid #FFA646 !important;
}
*/
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Imported Theme From Vivaldi's 🖌 Themes Library:
   Custom CSS For theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 (tab #F8F8FF)
   Dark Theme - Dark Red 2023 https://themes.vivaldi.net/themes/P9XvxW5VlOp
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 .tab:not(.active) {
  background: #606060 !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 .tab:not(.active):hover {
  background: #909090 !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab .close svg {
  display: none !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab .close {
  background: url(/style/icons/close3.png) no-repeat center !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab .favicon > span {
  margin: 0 0 0 -2px !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab .close {
  border-radius: 50% !important;
  height: 24px !important;
  opacity: .4 !important;
  padding: 0 !important;
  position: relative !important;
  top: 1px !important;
  width: 24px !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab .close {
  margin: -2px 0 0 -4px !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab .title {
  margin: 0 0 0 2px !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab:hover .title {
  margin: 0 !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab .close:hover {
  opacity: 1 !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 .UrlBar-AddressField .pageload .pageload-indicator {
  background-color: #BB0000 !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 #label6 {
  opacity: 1 !important;
  pointer-events: all !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 #footer div,
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 #footer button,
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 #footer span,
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 #footer button span {
  color: #000 !important;
  text-shadow: none !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 #footer #optionsButton {
  background: url(/style/icons/options2.png) center no-repeat !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 #footer button #calendar {
  color: #000 !important;
  filter: none !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 #restartButton {
  background: url(/style/icons/restart2.png) center no-repeat !important;
  border-radius: 6px !important;
  margin: 0px !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 .toolbar-mainbar #restartButton:hover {
  background: url(/style/icons/restart.png) center no-repeat !important;
  background-color: #0066CC !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 .mainbar button[title="Toggle extensions"] {
  background: url(/style/icons/extension2.png) center no-repeat !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[extension-icons] .mainbar button[title="Toggle extensions"] {
  background: url(/style/icons/extension226.png) center no-repeat !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 button[title^="General Settings"] > span > svg {
  background: url(/style/icons/settings2.png) center no-repeat !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[options-menu] #optionsMenu {
    background: #710000 !important;
    border: 1px solid #710000 !important;
    box-shadow: none !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 > #main > #footer {
  background: #F8F8FF !important;
  border: none !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394.tabs-top .separator {
  border-color: #000 !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 #webpage-stack .settings-sidebar,
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 #webpage-stack .settings-content {
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 ::-webkit-scrollbar-thumb {
  background: #440000 !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 ::-webkit-scrollbar-thumb:hover,
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 ::-webkit-scrollbar-thumb:active {
  background: #660000 !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab .close svg {
  display: none !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab .favicon > span {
  margin: 0 0 0 -2px !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394[custom-close] .tab .close {
  border-radius: 50% !important;
  height: 24px !important;
  opacity: .4 !important;
  padding: 0 !important;
  position: relative !important;
  top: 1px !important;
  width: 24px !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 button[title*="chrome://extensions/"] > img {
  background: url(/style/icons/extension2.png) !important;
}
#browser.theme-id-5f7568fe-6bd5-4c5a-9682-a84529fcf394 button[title*="path=general"] > span > svg {
  background: url(/style/icons/settings2.png) !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   Imported Theme From Vivaldi's 🖌 Themes Library:
   Custom CSS For theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6 (tab #1A6027)
   Dark Theme - Subtle Forest Moss https://themes.vivaldi.net/themes/okQlZ4jJDXR
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6 .tab:not(.active) {
  background: #003300 !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6 .tab:not(.active):hover {
  background: #004400 !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6[custom-close] .tab .close svg {
  display: none !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6[custom-close] .tab .close {
  background: url(/style/icons/close2.png) no-repeat center !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6[custom-close] .tab .favicon > span {
  margin: 0 0 0 -2px !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6[custom-close] .tab .close {
  border-radius: 50% !important;
  height: 24px !important;
  opacity: .4 !important;
  padding: 0 !important;
  position: relative !important;
  top: 1px !important;
  width: 24px !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6[custom-close] .tab .close {
  margin: -2px 0 0 -4px !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6[custom-close] .tab .title {
  margin: 0 0 0 2px !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6 .tab .title {
  text-shadow: 1px 1px #000 !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6[custom-close] .tab:hover .title {
  margin: 0 !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6[custom-close] .tab .close:hover {
  opacity: 1 !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6 .UrlBar-AddressField .pageload .pageload-indicator {
  background-color: #009900 !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6[options-menu] #optionsMenu {
    background: #1A6027 !important;
    border: 1px solid #1A6027 !important;
    box-shadow: none !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6 > #main > #footer {
  background: #1A6027 !important;
  border: none !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6 ::-webkit-scrollbar-thumb {
  background: #004400 !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6 ::-webkit-scrollbar-thumb:hover,
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6 ::-webkit-scrollbar-thumb:active {
  background: #006600 !important;
}
#browser.theme-id-c2e5c83b-96ce-458c-9ba9-0e310d93d1e6 #label6 {
  opacity: 1 !important;
  pointer-events: all !important;
}
/* ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
   
   ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── */

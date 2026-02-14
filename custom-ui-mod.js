(() => {

  'use strict';

  const openInterval = 20,
        initializeDelay = 200,
        backIcon = 'background: url(/style/icons/back.png) center no-repeat',
		backgroundIcon = 'background: url(/style/icons/background.png) center no-repeat',
        clearIcon = 'background: url(/style/icons/delete.png) center no-repeat',
		closeIcon = 'background: url(/style/icons/close.png) center no-repeat',
		dialogcloseIcon = 'background: url(/style/icons/dialogclose.png) center no-repeat',
		ellipsisIcon = 'background: url(/style/icons/ellipsis.png) center no-repeat',
		extensionIcon = 'background: url(/style/icons/extension.png) center no-repeat',
		folderIcon = 'background: url(/style/icons/folder.png) center no-repeat',
		foregroundIcon = 'background: url(/style/icons/foreground.png) center no-repeat',
		forwardIcon = 'background: url(/style/icons/forward.png) center no-repeat',
		maskIcon = 'background: url(/style/icons/mask16.png) center no-repeat',
		moveIcon = 'background: url(/style/icons/move.png) center no-repeat',
        optionsIcon = 'background: url(/style/icons/options.png) center no-repeat',
		optionsOnIcon = 'background: url(/style/icons/optionsOn.png) center no-repeat',
		profileIcon = 'background: url(/style/icons/profile.png) center no-repeat',
		restartIcon = 'background: url(/style/icons/restart.png) center no-repeat',
		rewindIcon = 'background: url(/style/icons/rewind.png) center no-repeat',
		starIcon = 'background: url(/style/icons/star.png) center no-repeat',
		startIcon = 'background: url(/style/icons/start.png) center no-repeat',
		syncedIcon = 'background: url(/style/icons/synced.png) center no-repeat',
		toggleIcon = 'background: url(/style/icons/toggle.png) center no-repeat',
		workspacesIcon = 'background: url(/style/icons/workspaces.png) center no-repeat',
		downArrow = '\u25BC',
        favIntervalText = 'Fav Interval',
        resizeDelayText = 'Resize Delay',
        homeAsRestartTooltip = 'Restart browser',
        optionsCloseTooltip = 'Closes options menu',
		optionsMenuText = 'Options Menu',
        optionsMenuTooltip = 'Open/Close Options Menu',
        optionsMenuPositionTooltip = 'Repositions menu: Top Left - Top Center - Top Right - Centered',
		toggleTooltip = 'Hide/Show Toolbars Except Tabs',
		calendarTooltip = '\u2022 Mouseover to update Calendar\n\u2022 Left-click to change format',
		pos1Tooltip = 'Position Menu > TOP LEFT',
		pos2Tooltip = 'Position Menu > TOP CENTER',
		pos3Tooltip = 'Position Menu > TOP RIGHT',
		pos4Tooltip = 'Position Menu > CENTERED',
		span0aText = 'Toggle Auto Hide Tabbar',
		label0Tooltip = 'Enter desired keyCode\n\u2022 Ex: Ctrl+Alt+T\n\u2022 Ex: F9',
        label1Tooltip = 'Replaces bookmark folders wtih custom icon',
        span1Text = 'Bookmark Folder Custom Icon',
		label2Tooltip = 'Custom CSS',
        span2Text = 'Custom CSS (For Future Use)',
        label3Tooltip = 'Calendar Before Clock',
        span3aText = 'Calendar Before Clock',
        button3Tooltip = 'Toggle day format short/long name',
        button3Text = 'Format',
        label4Tooltip = 'In Settings > General > Homepage >\nSpecific Page > enter: vivaldi://restart',
        span4Text = 'Home Button To Restart Button',
        label5Tooltip = 'Displays site favicon in urlbar',
        span5Text = 'Site Favicon In Urlbar',
        label6Tooltip = 'Tabs close buttons styled',
        span6Text = 'Tabs Close Button Styled',
        label7Tooltip = 'Moves clicked/active tab to first position in tabbar',
        span7Text = 'Tab Active Moves To First Position',
		label8Tooltip = 'Extension Icons large',
        span8Text = 'Extension Icons Large',
		label9Tooltip = 'Show/Hide Workspaces Menu Button In Tabbar',
        span9Text = 'Workspaces Menu Button',
        span10aTooltip = 'Increase time in milliseconds to acquire site favicon before sending to urlbar',
        span10bTooltip = 'Increase time in milliseconds for toolbars to properly load after exiting fullscreen mode',
        input21Tooltip = 'Moveable Toolbars: .mainbar, .bookmark-bar, footer\nInsert selectors with buttons below in order from\nleft/top to right/bottm. Will ignore duplicate entries',
        span11aTooltip = 'Clear input field',
        button12aTooltip = 'Click to insert selector\nWill ignore duplicate entries',
        button12bTooltip = 'Click to insert selector\nWill ignore duplicate entries',
        button12cTooltip = 'Click to insert selector\nWill ignore duplicate entries',
		label13Tooltip = 'Show/Hide Rewind and Forward buttons',
		span13Text = 'Rewind / Fast Forward Buttons',
		label14Tooltip = 'Show/Hide Search Field Input Box',
		span14Text = 'Search Field Input Box',
		label15Tooltip = 'Show/Hide Toolbar Toggle Button\nToggles Any/All Except Tabbar',
		span15Text = 'Toggle Toolbars Button',
		label16Tooltip = 'Hide Footer when toggled',
        span16Text = 'Hide Footer',
		label17Tooltip = 'Hide Bookmark-bar when toggled',
        span17Text = 'Hide Bookmark-bar',
		label18Tooltip = 'Hide Mainbar when toggled',
        span18Text = 'Hide Mainbar',
		label19Tooltip = 'Show/Hide Hidden Extensions Button',
        span19Text = 'Hidden Extensions Button',
		setOrderText = 'Set Toolbar Order',
		resetTooltip = "Reset unloaded custom-ui-mod elements",
        arrow = '\u21D2', asterisk = '*', bullet = '\u2022', colon = ':', colons = '::', comma = ',', gt = '>', hyphen = '-', lt = '<', pointer = '\u25BA', slash = '/', space = ' ', star = '\u2606',
        dayNameAbbr = 'Sun.,Mon.,Tue.,Wed.,Thu.,Fri.,Sat.',
		dayabbr = dayNameAbbr.split(','),
        dayNameLong = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
		daylong = dayNameLong.split(','),
        monthNameAbbr = 'Jan.,Feb.,Mar.,Apr.,May,Jun.,Jul.,Aug.,Sep.,Oct.,Nov.,Dec.',
		monthname = monthNameAbbr.split(','),
        monthNameLong = 'January,February,March,April,May,June,July,August,September,October,November,December',
        monthlong = monthNameLong.split(','),
		monthNo = '1,2,3,4,5,6,7,8,9,10,11,12',
        monthno = monthNo.split(','),
		monthNum = '01,02,03,04,05,06,07,08,09,10,11,12',
        monthnum = monthNum.split(','),
        dayNo = '"",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
		dayno = dayNo.split(','),
		dayNum = '"",01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
        daynum = dayNum.split(','),
        dayOrd = '"",1st,2nd,3rd,4th,5th,6th,7th,8th,9th,10th,11th,12th,13th,14th,15th,16th,17th,18th,19th,20th,21st,22nd,23rd,24th,25th,26th,27th,28th,29th,30th,31st',
        dayord = dayOrd.split(',');

  let calendarFormat,
      closeButton,
	  customCss,
	  extensionIcons,
	  extensionToggle,
      favInterval,
      favInUrl,
      favTimer,
      folderImage,
	  hideBookmark,
	  hideFooter,
	  hideMainbar,
      homeRestart,
	  initInterval,
	  keyCodes,
      moveActiveTab,
      positionOptionsMenu,
      resizeDelay,
	  rewindForward,
	  searchbar,
      showCalendar,
	  showWorkspaces,
	  toolbarList,
	  toolbarToggle;

  function $c(type, props, evls) {
    let node = document.createElement(type);
    if (props && typeof props === 'object') {
      for (let prop in props) {
        if (typeof node[prop] === 'undefined') node.setAttribute(prop, props[prop]);
        else node[prop] = props[prop];
    } }
    if (evls instanceof Array) {
      for (let i = 0; i < evls.length; i++) {
        let evl = evls[i];
        if (typeof evl.type === 'string' && typeof evl.fn === 'function') node.addEventListener(evl.type, evl.fn, false);
    } }
    return node;
  }

  function $i(newNode, refNode) {
    if (refNode.nextSibling) return refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
    return refNode.parentNode.appendChild(newNode);
  }

  function $q(el, bol) {
    if (bol) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function removeDupes(className) {
    let dupe = document.getElementsByClassName(className);
    if(dupe.length > 1) for(let i = 1; i < dupe.length; i++) dupe[i].parentNode.removeChild(dupe[i]);
  }

  function initialize() {
    let browser = $q('#browser'),
		statusBar = $q('.toolbar-statusbar'),
		footer2 = $q('.dialog-footer'),
		exts = $q('.toolbar-extensions > .button-toolbar'),
	    workspace = $q('div.button-toolbar.tabbar-workspace-button > button.ToolbarButton-Button > span.button-title');
	window.removeEventListener("load", () => setTimeout(() => initialize(), initializeDelay));
	try {
	  chrome.storage.local.get(['calendarFormatKey'], result => {
        calendarFormat = result.calendarFormatKey.toString();
        if (!calendarFormat) calendarFormat = '1';
        if (showCalendar) browser.setAttribute('show-calendar', calendarFormat);
        else browser.removeAttribute('show-calendar');
      });
      chrome.storage.local.get(['closeButtonKey'], result => {
        closeButton = result.closeButtonKey;
        if (closeButton) {
          browser.setAttribute('custom-close', true);
          customClose(closeButton);
        } else browser.removeAttribute('custom-close');
      });
	  chrome.storage.local.get(['customCssKey'], result => {
        customCss = result.customCssKey;
        if (customCss) browser.setAttribute('custom-css', true);
        else browser.removeAttribute('custom-css');
      });
      chrome.storage.local.get(['favIntervalKey'], result => {
        favInterval = result.favIntervalKey;
      });
      chrome.storage.local.get(['favInUrlKey'], result => {
        favInUrl = result.favInUrlKey;
        if (favInUrl) {
          browser.setAttribute('fav-in-url', true);
          favImage(favInUrl);
        } else browser.removeAttribute('fav-in-url');
      });
      chrome.storage.local.get(['folderImageKey'], result => {
        folderImage = result.folderImageKey;
        if (folderImage) {
          browser.setAttribute('custom-folder', true);
          customFolder(folderImage);
        } else browser.removeAttribute('custom-folder');
      });
	  chrome.storage.local.get(['extensionIconsKey'], result => {
        extensionIcons = result.extensionIconsKey;
        if (extensionIcons) browser.setAttribute('extension-icons', true);
        else browser.removeAttribute('extension-icons');
      });
	  chrome.storage.local.get(['extensionToggleKey'], result => {
		extensionToggle = true;
        if (extensionToggle) browser.setAttribute('extension-toggle', true);
        else browser.removeAttribute('extension-toggle');
      });
	  chrome.storage.local.get(['hideFooterKey'], result => {
        hideFooter = result.hideFooterKey;
        if (hideFooter) browser.setAttribute('hide-footer', true);
        else browser.removeAttribute('hide-footer');
      });
	  chrome.storage.local.get(['hideBookmarkKey'], result => {
        hideBookmark = result.hideBookmarkKey;
        if (hideBookmark) browser.setAttribute('hide-bookmark', true);
        else browser.removeAttribute('hide-bookmark');
      });
	  chrome.storage.local.get(['hideMainbarKey'], result => {
        hideMainbar = result.hideMainbarKey;
        if (hideMainbar) browser.setAttribute('hide-mainbar', true);
        else browser.removeAttribute('hide-mainbar');
      });
      chrome.storage.local.get(['homeRestartKey'], result => {
        homeRestart = result.homeRestartKey;
        if (homeRestart) homeToRestart(homeRestart);
      });
	  chrome.storage.local.get(['keyCodesKey'], result => {
        keyCodes = result.keyCodesKey;
      });
      chrome.storage.local.get(['moveActiveTabKey'], result => {
        moveActiveTab = result.moveActiveTabKey;
        if (moveActiveTab) moveTab(moveActiveTab);
      });
      chrome.storage.local.get(['positionOptionsMenuKey'], result => {
        positionOptionsMenu = result.positionOptionsMenuKey.toString();
		if (!positionOptionsMenu) positionOptionsMenu = '1';
      });
      chrome.storage.local.get(['resizeDelayKey'], result => {
        resizeDelay = result.resizeDelayKey;
      });
	  chrome.storage.local.get(['rewindForwardKey'], result => {
        rewindForward = result.rewindForwardKey;
        if (rewindForward) browser.setAttribute('rewind-forward', true);
        else browser.removeAttribute('rewind-forward');
      });
	  chrome.storage.local.get(['searchbarKey'], result => {
        searchbar = result.searchbarKey;
        if (searchbar) browser.setAttribute('searchbar', true);
        else browser.removeAttribute('searchbar');
      });
      chrome.storage.local.get(['showCalendarKey'], result => {
        showCalendar = result.showCalendarKey;
        if (showCalendar) browser.setAttribute('show-calendar', true);
        else browser.removeAttribute('show-calendar');
      });
	  chrome.storage.local.get(['showWorkspacesKey'], result => {
        showWorkspaces = result.showWorkspacesKey;
        if (showWorkspaces) browser.setAttribute('show-workspaces', true);
        else browser.removeAttribute('show-workspaces');
      });
	  chrome.storage.local.get(['syncedTabsKey'], result => {
        syncedTabs = result.syncedTabsKey;
        if (syncedTabs) browser.setAttribute('synced-tabs', true);
        else browser.removeAttribute('synced-tabs');
      });
      chrome.storage.local.get(['toolbarListKey'], result => {
        toolbarList = result.toolbarListKey;
        if (toolbarList) getToolbarList(toolbarList);
        if (toolbarList.match('footer')) browser.setAttribute('footer-in-header', true);
        else browser.removeAttribute('footer-in-header');
      });
	  chrome.storage.local.get(['toolbarToggleKey'], result => {
        toolbarToggle = result.toolbarToggleKey;
        if (toolbarToggle) browser.setAttribute('toolbar-toggle', true);
        else browser.removeAttribute('toolbar-toggle');
      });
	  exts.style = "--extensionsExpanded: 1;";
	  if (footer2) browser.appendChild(footer2);
	  workspace.innerHTML = '';
	  setCalendarHolder();
	  setOptionsButton();
	  setOptionsMenu();
	  setToggleButton();
	  getToolbarList(toolbarList);
	} catch(ex) {}
  }

  function aCalendar(int) {
    let date = new Date(), dt = date.getDate(), dy = date.getDay(), mth = date.getMonth(), yr = date.getFullYear(),
        w = dayabbr[dy], // Mon.
        ww = daylong[dy], // Monday
		m = monthno[mth], // 1
		mm = monthnum[mth], // 01
		mmm = monthname[mth], // Jan.
        mmmm = monthlong[mth], // January
		d = dayno[dt], // 1
        dd = daynum[dt], // 01
        ddd = dayord[dt], // 1st
        yy = yr - 2000, // 23
        yyyy = yr; // 2023
    switch (int) {
	  // arrow = \u21D2, asterisk = *, bullet = \u2022, colon = :, colons = ::, comma = ,' gt = >, hyphen = -, lt = <, pointer = \u25BA, slash = /, space =  , star = \u2606
      case '1': return ww + space + arrow + space + mmmm + space + ddd + comma + space + yyyy; // Monday ? January 1st, 2023
      case '2': return w + space + bullet + space + mmm + space + d + comma + space + yyyy; // Mon. ? Jan. 1, 2023
	  case '3': return ww + space + bullet + space + mm + slash + dd + slash + yyyy; // Monday ? 01/01/2023
	  case '4': return w + space + bullet + space + mm + hyphen + dd + hyphen + yyyy; // Mon. ? 01-01-2023
  } }

  function customClose(e) {
    let browser = $q('#browser');
    try {
      if (e) browser.setAttribute('custom-close', true);
      else browser.removeAttribute('custom-close');
    } catch(ex) {}
  }

  function customizeCSS(e) {
	let browser = $q('#browser');
    try {
      if (e) browser.setAttribute('custom-css', true);
      else browser.removeAttribute('custom-css');
    } catch(ex) {}
  }

  function customFolder(e) {
    let browser = $q('#browser');
    try {
      if (e) browser.setAttribute('custom-folder', true);
      else browser.removeAttribute('custom-folder');
    } catch(ex) {}
  }

  function favImage(e) {
    let browser = $q('#browser'),
        field = $q('.UrlField'),
        img = $c('img', {id: 'favImg'});
    try {
      if ($q('#favImg')) {
        field.removeChild(img);
        return;
      }
      if (e) {
        browser.setAttribute('fav-in-url', true);
        field.insertBefore(img, field.firstChild);
        getCurrentTabUpdated();
      } else browser.removeAttribute('fav-in-url');
    } catch(ex) {}
  }

  function getCalendarFormat() {
    let browser = $q('#browser'),
	    inp3 = $q('#input3'),
        cal = $q('#calendar'),
		span3 = $q('#span3b');
    if (!showCalendar) return;
	if (calendarFormat === '1') calendarFormat = '2';
	else if (calendarFormat === '2') calendarFormat = '3';
	else if (calendarFormat === '3') calendarFormat = '4';
	else calendarFormat = '1';
    chrome.storage.local.set({calendarFormatKey: calendarFormat.toString()});
    inp3.value = calendarFormat;
	span3.textContent = 'Format ' + calendarFormat;
    cal.textContent = aCalendar(calendarFormat);
  }

  function getCalendarText() {
    let cal = $q('#calendar');
    cal.textContent = aCalendar(calendarFormat);
  }

  function getCurrentTab() {
    let field = $q('.UrlField'),
        img = $q('#favImg'),
		current = $q('#currentI'),
		menu = $q('#options-menu'),
		web = $q('#webview-container');
    try {
      if (!favInUrl) {
        field.removeChild(img);
        return;
      }
      chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        if (tabs[0].title.match(/Bookmarks/gi)) img.src = '/style/icons/bookmark.png';
		else if (tabs[0].title.match(/Extensions/i)) img.src = '/style/icons/extensions.png';
		else if (tabs[0].title.match(/Gemini/i)) img.src = '/style/icons/gemini.png';
		else if (tabs[0].title.match(/Gmail/i)) img.src = '/style/icons/gmail.png';
		else if (tabs[0].title.match(/Powershell/i)) img.src = '/style/icons/powershell.png';
		else if (tabs[0].title.match(/Razzano \(Sonny\)/i)) img.src = '/style/icons/github.png';
		else if (tabs[0].title.match(/Romulus Athletic Center/i)) img.src = '/style/icons/rac.png';
		else if (tabs[0].title.match(/SLB stocks/i)) img.src = '/style/icons/slb.png';
		else if (tabs[0].title.match(/SoFi stocks/i)) img.src = '/style/icons/sofi.png';
		else if (tabs[0].title.match(/Tampermonkey/i)) img.src = '/style/icons/tampermonkey16.png';
		else if (tabs[0].title.match(/True Key/i)) img.src = '/style/icons/truekey.png';
        else if (tabs[0].title.match(/YouTube TV/i)) img.src = '/style/icons/youtubetv.png';
		else if (tabs[0].title.match(/Settings\b/i)) img.src = '/style/icons/settings.png';
        else if (!tabs[0].favIconUrl) img.src = '/style/icons/page.png';
        else img.src = tabs[0].favIconUrl;
		if (menu) {
		  if (!tabs[0].favIconUrl) current.src = '/style/icons/caution.png';
		  else current.src = tabs[0].favIconUrl;
		}
	  });
    } catch(ex) {}
  }

  function getCurrentTabUpdated() {
    favTimer = setInterval(() => {getCurrentTab(); reloadElements()}, favInterval);
  }

  function getToolbarList(e) {
	let browser = $q('#browser'),
	    main = $q('#main'),
	    footer2 = $q('.dialog-footer');
	if (footer2) browser.appendChild(footer2);
	browser.setAttribute('toolbar-order', toolbarList);
	try {
      e = e.split(',');
      for (let i = e.length - 1; i >= 0; i--) {
		let x = e[i];
	    main.insertBefore($q(x), main.firstChild);
	  }
	} catch(ex) {}
  }

  function homeToRestart(e) {
    let browser = $q('#browser'),
	    homeBtn = $q('button[name="Home"]'),
        homeBtn2 = $q('button[title="Restart browser"]'),
        homeBtnImg = $q('button[title="Go to homepage"] svg'),
        homeBtnImg2 = $q('button[title="Restart browser"] svg'),
        homeBtnPath = $q('button[title="Go to homepage"] svg > path'),
        homeBtnPath2 = $q('button[title="Restart browser"] svg > path');
    try {
      if (e) {
        homeBtn.id = 'restart-browser';
        homeBtn.className = 'ToolbarButton-Button custom-button restart-button';
        homeBtn.title = homeAsRestartTooltip;
        homeBtnPath.style.display = 'none';
		homeBtn.addEventListener("dragend", e => setTimeout(() => { e.preventDefault(); homeToRestart(homeRestart) }, resizeDelay));
      } else {
        homeBtn2.removeAttribute('id');
        homeBtn2.className = 'ToolbarButton-Button';
        homeBtn2.title = 'Go to homepage';
        homeBtnImg2.removeAttribute('style');
        homeBtnPath2.style.display = 'block';
		homeBtn.removeEventListener("dragend", e => setTimeout(() => { e.preventDefault(); homeToRestart(homeRestart) }, resizeDelay));
      }
	  removeDupes('restart-button');
    } catch(ex) {}
  }

  function moveTab(e) {
    let browser = $q('#browser');
    try {
      chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
      if (moveActiveTab) {
        browser.setAttribute('move-tab', true);
        chrome.tabs.query({currentWindow: true, active: true}, tabs => chrome.tabs.move(tabs[0].id, {index: 0}));
      } else browser.removeAttribute('move-tab');
    } catch(ex) {}
  }

  function moveTabPosition(e) {
    if (!moveActiveTab) return;
    try {
      chrome.tabs.move(e.tabId, {index: 0});
    } catch (ex) {
      if (ex === "Error: Tabs can't be edited right now.") setTimeout(() => moveTabPosition(e), 20);
  } }

  function onClearField() {
    let browser = $q('#browser'),
	    inner = $q('.inner'),
        footer = $q('footer'),
        inp21 = $q('#input21a');
    inp21.value = '';
	browser.appendChild(footer);
	browser.removeAttribute('footer-in-header');
    toolbarList = '.mainbar,.bookmark-bar';
    chrome.storage.local.set({toolbarListKey: toolbarList});
	getToolbarList(toolbarList);
	onOptionsMenuPosition(positionOptionsMenu);
  }

  function onOptions() {
    let browser = $q('#browser');
	let inner = $q('.inner');
    if (browser.hasAttribute('options-menu')) browser.removeAttribute('options-menu');
    else browser.setAttribute('options-menu', true);
	onOptionsMenuPosition(positionOptionsMenu);
  }

  function onOptionsMenuInput(e) {
    let browser = $q('#browser'),
        el = document.getElementById(e);
    switch (e) {
	  case 'input0':
        keyCodes = el.value;
        chrome.storage.local.set({keyCodesKey: keyCodes});
        break;
      case 'input1':
        folderImage = el.checked;
        chrome.storage.local.set({folderImageKey: folderImage});
        if (folderImage) {
          customFolder(folderImage);
          browser.setAttribute('custom-folder', true);
        } else browser.removeAttribute('custom-folder');
        break;
	  case 'input2':
        customCss = el.checked;
        chrome.storage.local.set({customCssKey: customCss});
        if (customCss) {
          customizeCSS(customCss);
          browser.setAttribute('custom-css', true);
        } else { 
		  browser.removeAttribute('custom-css');
		  onOptionsMenuPosition(positionOptionsMenu);
		}
        break;
      case 'input3':
        showCalendar = el.checked;
        chrome.storage.local.set({showCalendarKey: showCalendar});
        if (showCalendar) browser.setAttribute('show-calendar', true);
        else browser.removeAttribute('show-calendar');
        break;
      case 'input4':
        homeRestart = el.checked;
        chrome.storage.local.set({homeRestartKey: homeRestart});
        homeToRestart(homeRestart);
        break;
      case 'input5':
        favInUrl = el.checked;
        chrome.storage.local.set({favInUrlKey: favInUrl});
        if (favInUrl) {
          favImage(favInUrl);
          browser.setAttribute('fav-in-url', true);
        } else browser.removeAttribute('fav-in-url');
        break;
      case 'input6':
        closeButton = el.checked;
        chrome.storage.local.set({closeButtonKey: closeButton});
        if (closeButton) {
          customClose(closeButton);
          browser.setAttribute('custom-close', true);
        } else browser.removeAttribute('custom-close');
        break;
      case 'input7':
        moveActiveTab = el.checked;
        chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
        moveTab(moveActiveTab);
        break;
	  case 'input8':
        extensionIcons = el.checked;
        chrome.storage.local.set({extensionIconsKey: extensionIcons});
		if (extensionIcons) browser.setAttribute('extension-icons', true);
        else browser.removeAttribute('extension-icons');
		break;
	  case 'input9':
        showWorkspaces = el.checked;
        chrome.storage.local.set({showWorkspacesKey: showWorkspaces});
        if (showWorkspaces) browser.setAttribute('show-workspaces', true);
        else browser.removeAttribute('show-workspaces');
        break;
      case 'input10a':
        favInterval = el.value;
        chrome.storage.local.set({favIntervalKey: favInterval});
        break;
      case 'input10b':
        resizeDelay = el.value;
        chrome.storage.local.set({resizeDelayKey: resizeDelay});
		break;
	  case 'input13':
        rewindForward = el.checked;
        chrome.storage.local.set({rewindForwardKey: rewindForward});
		if (rewindForward) browser.setAttribute('rewind-forward', true);
        else browser.removeAttribute('rewind-forward');
        break;
	  case 'input14':
        searchbar = el.checked;
        chrome.storage.local.set({searchbarKey: searchbar});
		if (searchbar) browser.setAttribute('searchbar', true);
        else browser.removeAttribute('searchbar');
        break;
	  case 'input15':
	    let label16 = $q('#label16'),
		    label17 = $q('#label17'),
		    label18 = $q('#label18');
        toolbarToggle = el.checked;
        chrome.storage.local.set({toolbarToggleKey: toolbarToggle});
		if (toolbarToggle) {
		  browser.setAttribute('toolbar-toggle', true);
		  label16.removeAttribute('disabled');
		  label17.removeAttribute('disabled');
		  label18.removeAttribute('disabled');
        } else {
		  browser.removeAttribute('toolbar-toggle');
		  label16.setAttribute('disabled', true);
		  label17.setAttribute('disabled', true);
		  label18.setAttribute('disabled', true);
		}
		break;
	  case 'input16':
        hideFooter = el.checked;
        chrome.storage.local.set({hideFooterKey: hideFooter});
		if (hideFooter) browser.setAttribute('hide-footer', true);
        else browser.removeAttribute('hide-footer');
		break;
	  case 'input17':
        hideBookmark = el.checked;
        chrome.storage.local.set({hideBookmarkKey: hideBookmark});
		if (hideBookmark) browser.setAttribute('hide-bookmark', true);
        else browser.removeAttribute('hide-bookmark');
		break;
	  case 'input18':
        hideMainbar = el.checked;
        chrome.storage.local.set({hideMainbarKey: hideMainbar});
		if (hideMainbar) browser.setAttribute('hide-mainbar', true);
        else browser.removeAttribute('hide-mainbar');
		break;
	  case 'input19':
        chrome.storage.local.set({extensionToggleKey: extensionToggle});
  } }

  function onOptionsMenuPosition(e) {
    let width = window.innerWidth,
        inner = $q('.inner'),
        innerTop = inner.clientTop + 'px',
		innerHgt = inner.clientHeight / 2,
        menu = $q('#options-menu'),
        menuHeight = menu.clientHeight / 2,
        menuWidth = menu.clientWidth,
		rad = $q('.radio', true),
		sel = '#position' + e;
	for (let i = 0; i < rad.length; i++) rad[i].checked = false;
	$q(sel).checked = true;
	menu.style.top = innerTop;
    switch (e) {
      case '1':
        menu.style.left = 0;
        break;
      case '2':
        menu.style.left = (width / 2) - (menuWidth / 2) + 'px';
        break;
      case '3':
        menu.style.left = (width - menuWidth) - 10 + 'px';
        break;
      case '4':
		menu.style.top = innerHgt - menuHeight + 'px';
        menu.style.left = (width / 2) - (menuWidth / 2) + 'px';
  } }

  function onOptionsMenuRadio(e) {
    positionOptionsMenu = e;
    chrome.storage.local.set({positionOptionsMenuKey: positionOptionsMenu});
    onOptionsMenuPosition(e);
	getCurrentTab();
  }

  function onSelector(e) {
    let browser = $q('#browser'),
	    inp21 = $q('#input21a');
    switch (e) {
      case 'button12a':
        let x = '.mainbar';
        if (inp21.value.match(x)) return;
        else if (inp21.value === '') inp21.value = x;
        else if (inp21.value && !inp21.value.match('/,$/')) inp21.value = inp21.value + ',' + x;
        else if (inp21.value && inp21.value.match(/,$/)) inp21.value = inp21.value + x;
        break;
      case 'button12b':
        let y = '.bookmark-bar';
        if (inp21.value.match(y)) return;
        else if (inp21.value === '') inp21.value = y;
        else if (inp21.value && !inp21.value.match('/,$/')) inp21.value = inp21.value + ',' + y;
        else if (inp21.value && inp21.value.match(/,$/)) inp21.value = inp21.value + y;
        break;
      case 'button12c':
        let z = 'footer';
        if (inp21.value.match(z)) return;
        else if (inp21.value === '') inp21.value = z;
        else if (inp21.value && !inp21.value.match('/,$/')) inp21.value = inp21.value + ',' + z;
        else if (inp21.value && inp21.value.match(/,$/)) inp21.value = inp21.value + z;
		setTimeout(() => onOptionsMenuPosition(positionOptionsMenu), 200);
		browser.setAttribute('footer-in-header', true);
    }
    toolbarList = inp21.value;
	getToolbarList(toolbarList);
    chrome.storage.local.set({toolbarListKey: toolbarList});
  }

  function reloadElements() {
    let cal = $q('#calendar'),
	    optBtn = $q('#options-button'),
		optMenu = $q('#options-menu'),
		restartBtn = $q('#restart-browser'),
		togToolbars = $q('#toggle-toolbars');
	let inner = $q('.inner');
	try {
	  if (!cal) setCalendarHolder();
	  if (!restartBtn && homeRestart) homeToRestart(homeRestart);
	  if (!optBtn) setOptionsButton();
	  if (!optMenu) setOptionsMenu();
	  if (!togToolbars) setToggleButton();
	} catch(ex) {}
  }

  function setCalendarHolder() {
    let browser = $q('#browser'),
	    cal = $c('span', {id: 'calendar', className: 'aCal', title: calendarTooltip}, [{type: 'mouseover', fn: () => getCalendarText()}]),
        clk = $q('.ClockButton');
	try {
	  if (!calendarFormat) calendarFormat = '1';
	  cal.textContent = aCalendar(calendarFormat);
      clk.insertBefore(cal, clk.firstChild);
	  cal.onclick = () => getCalendarFormat();
      removeDupes('aCal');
	} catch(ex) {}
  }

  function setOptionsButton() {
    let optBtn = $c('button', {id: "options-button", className: "ToolbarButton-Button custom-button optionsButton", draggable: "false", tabindex: "-1", title: optionsMenuTooltip, type: "button"}, [{type: 'click', fn: () => onOptions()}]);
	let statusBar = $q('.toolbar-statusbar');
	statusBar.insertBefore(optBtn, statusBar.firstChild);
	removeDupes('optionsButton');
  }

  function setOptionsMenu() {
    const optMenu = $c('div', {id: 'options-menu', className: 'options-menu-popup', style: 'display: none;'}),
          div0 = $c('div', {id: 'div0'});
	if (!positionOptionsMenu) positionOptionsMenu = '1';
    [1,2,3,4].map(n => {
	  const input = $c('input', {id: `position${n}`, className:'radio', type: 'radio', value: n, title: `Position Menu > ${n === 1 ? 'TOP LEFT' : n === 2 ? 'TOP CENTER' : n === 3 ? 'TOP RIGHT' : 'CENTERED'}`});
      div0.appendChild(input);
	  return input;
    });
    div0.appendChild($c('span', {id:'spanMenuText', textContent: optionsMenuText}));
    div0.appendChild($c('button', {id: 'options-menu-close', className: 'button', title: optionsCloseTooltip}));
    function Row1(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
    function Row2(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        btn = $c('button', {id: `button${id}`, className: 'button'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
	  btn.appendChild($c('span', {id: `span${id}b`, className: 'span', textContent: `Format ${calendarFormat}`}));
	  label.appendChild(btn);
      return label;
    }
    function Row3(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      return label;
    }
    function Row4(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
    function Row5(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
    function Row6(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
    function Row7(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      return label;
    }
    function Row8(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        span = $c('span', {id: 'currentIcon', className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      span.appendChild($c('img', {id: 'currentI', className: 'icon', src: ''}));
      label.appendChild(span);
      return label;
    }
	function Row9(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      return label;
    }
	function Row10(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row11(id, labelText, spanText, tooltip, iconStyle, value) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
	  label.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: spanText}));
      label.appendChild($c('input', {id: `input${id}`, type: 'text', value: value}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row12(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row13(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label indent', title: tooltip});
	  label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
	  label.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: spanText}));
      return label;
    }
	function Row14(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label indent', title: tooltip});
	  label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
	  label.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: spanText}));
      return label;
    }
	function Row15(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label indent', title: tooltip});
	  label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
	  label.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: spanText}));
      return label;
    }
	function Row16(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row17(id, labelText, spanText, tooltip) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip});
	  label.appendChild($c('span', {id: `span${id}a`, className: '', textContent: `${favIntervalText}`, title: `${span10aTooltip}`}));
	  label.appendChild($c('input', {id: `input${id}a`, className: 'input input-timer', type: 'number', value: `${favInterval}`}));
	  label.appendChild($c('span', {id: `span${id}b`, className: '', textContent: `${resizeDelayText}`, title: `${span10bTooltip}`}));
	  label.appendChild($c('input', {id: `input${id}b`, className: 'input input-timer', type: 'number', value: `${resizeDelay}`}));
      return label;
    }
	function Row18(id, labelText, spanText, tooltip) {
      const label = $c('label', {id: `label${id}`, className: 'label order'});
	  label.appendChild($c('span', {id: `span${id}a`, textContent: `${downArrow}`}));
	  label.appendChild($c('span', {id: `span${id}b`, textContent: `${setOrderText}`}));
	  label.appendChild($c('span', {id: `span${id}c`, textContent: `${downArrow}`}));
      return label;
    }
	function Row19(id, labelText, spanText, tooltip, iconStyle, value) {
      const label = $c('label', {id: `label${id}`, className: ''}),
	        iconSpan = $c('span', {id: `span${id}a`, className: 'icon', title: `${span11aTooltip}`});
	  label.appendChild($c('input', {id: `input${id}a`, className: 'input', type: 'text', value: value}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
	  return label;
	}
	function Row20(id, labelText, spanText, tooltip) {
	  const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        btn1 = $c('button', {id: `button${id}a`, className: 'button', title: `${button12aTooltip}`}),
	        btn2 = $c('button', {id: `button${id}b`, className: 'button', title: `${button12bTooltip}`}),
	        btn3 = $c('button', {id: `button${id}c`, className: 'button', title: `${button12cTooltip}`});
	  btn1.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: `.mainbar`}));
	  btn2.appendChild($c('span', {id: `span${id}b`, className: 'span', textContent: `.bookmark-bar`}));
	  btn3.appendChild($c('span', {id: `span${id}c`, className: 'span', textContent: `footer`}));
	  label.appendChild(btn1);
	  label.appendChild(btn2);
	  label.appendChild(btn3);
	  return label;
    }
	if (!favInterval) favInterval = 1000;
	if (!resizeDelay) resizeDelay = 1000;
    optMenu.appendChild(div0);
    optMenu.appendChild(Row1(1, null, span1Text, label1Tooltip, folderIcon, folderImage));
    optMenu.appendChild(Row2(3, null, span3aText, label3Tooltip,  showCalendar));
    optMenu.appendChild(Row3(2, null, span2Text, label2Tooltip, customCss));
    optMenu.appendChild(Row4(8, null, span8Text, label8Tooltip, extensionIcon, extensionIcons));
    optMenu.appendChild(Row5(4, null, span4Text, label4Tooltip, restartIcon, homeRestart));
    optMenu.appendChild(Row6(13, null, span13Text, label13Tooltip, rewindIcon, rewindForward));
	optMenu.appendChild(Row7(14, null, span14Text, label14Tooltip, searchbar));
    optMenu.appendChild(Row8(5, null, span5Text, label5Tooltip, favInUrl));
	optMenu.appendChild(Row9(7, null, span7Text, label7Tooltip, moveActiveTab));
	optMenu.appendChild(Row10(6, null, span6Text, label6Tooltip, closeIcon, closeButton));
	optMenu.appendChild(Row11(0, null, span0aText, label0Tooltip, moveIcon, keyCodes));
	optMenu.appendChild(Row12(15, null, span15Text, label15Tooltip, maskIcon, toolbarToggle));
	optMenu.appendChild(Row13(17, null, span17Text, label17Tooltip, hideBookmark));
	optMenu.appendChild(Row14(18, null, span18Text, label18Tooltip, hideMainbar));
	optMenu.appendChild(Row15(16, null, span16Text, label16Tooltip, hideFooter));
	optMenu.appendChild(Row16(9, null, span9Text, label9Tooltip, workspacesIcon, showWorkspaces));
	optMenu.appendChild(Row17(10, null, null, null));
	optMenu.appendChild(Row18(20, null, null, null));
	optMenu.appendChild(Row19(21, null, null, null, clearIcon, toolbarList));
	optMenu.appendChild(Row20(12, null, null, null));
    $q('.inner').appendChild(optMenu);
    let ip = $q('#options-menu .checkbox', true);
    for (let i = 0; i < ip.length; i++) ip[i].onclick = e => onOptionsMenuInput(e.target.id);
	let rd = $q('#div0 > .radio', true);
    for (let j = 0; j < rd.length; j++) rd[j].onclick = e => onOptionsMenuRadio(e.target.value);
	$q('#options-menu-close').onclick = () => onOptions();
	$q('#input0').oninput = () => onOptionsMenuInput('input0');
    $q('#button3').onclick = () => getCalendarFormat();
	$q('#input10a').oninput = () => onOptionsMenuInput('input10a');
    $q('#input10b').oninput = () => onOptionsMenuInput('input10b');
    $q('#span21a').onclick = () => onClearField();
	$q('#button12a').onclick = () => onSelector('button12a');
    $q('#button12b').onclick = () => onSelector('button12b');
    $q('#button12c').onclick = () => onSelector('button12c');
    removeDupes('options-menu-popup');
  }

  function setToggleButton() {
    let tabs = $q('#tabs-container'),
		toggle = $c('button', {id: 'toggle-toolbars', className: 'ToolbarButton-Button custom-button  toggle-toolbars', title: toggleTooltip}, [{type: 'click', fn: () => {setToolbars(); reloadElements(); if ($q('div#options-menu')) onOptionsMenuPosition(positionOptionsMenu)}}]);
	try {
	  tabs.insertBefore(toggle, tabs.firstChild.nextSibling);
	  removeDupes('toggle-toolbars');
	} catch(ex) {}
  }

  function setToolbars() {
    let browser = $q('#browser');
	if (browser.hasAttribute('toggle-toolbars')) browser.removeAttribute('toggle-toolbars');
	else browser.setAttribute('toggle-toolbars', true);
  }

  function shutDown() {
	let homeBtn = $q('#restart-browser');
    chrome.tabs.onActivated.removeListener(e => moveTabPosition(e));
    chrome.tabs.onHighlighted.removeListener((tabId, changeInfo, tab) => getCurrentTab());
    chrome.tabs.onUpdated.removeListener((tabId, changeInfo, tab) => {
      if (tab.status === 'complete') { getCurrentTabUpdated(); clearInterval(favTimer) }
    });
	chrome.storage.local.set({calendarFormatKey: calendarFormat.toString()});
    chrome.storage.local.set({closeButtonKey: closeButton});
	chrome.storage.local.set({customCssKey: customCss});
	chrome.storage.local.set({extensionIconsKey: extensionIcons});
	chrome.storage.local.set({extensionToggleKey: extensionToggle});
    chrome.storage.local.set({favIntervalKey: favInterval});
    chrome.storage.local.set({favInUrlKey: favInUrl});
    chrome.storage.local.set({folderImageKey: folderImage});
	chrome.storage.local.set({hideFooterKey: hideFooter});
	chrome.storage.local.set({hideBookmarkKey: hideBookmark});
	chrome.storage.local.set({hideMainbarKey: hideMainbar});
    chrome.storage.local.set({homeRestartKey: homeRestart});
	chrome.storage.local.set({keyCodesKey: keyCodes});
    chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
    chrome.storage.local.set({positionOptionsMenuKey: positionOptionsMenu});
    chrome.storage.local.set({resizeDelayKey: resizeDelay});
	chrome.storage.local.set({rewindForwardKey: rewindForward});
	chrome.storage.local.set({searchbarKey: searchbar});
    chrome.storage.local.set({showCalendarKey: showCalendar});
	chrome.storage.local.set({showWorkspacesKey: showWorkspaces});
    chrome.storage.local.set({toolbarListKey: toolbarList});
	chrome.storage.local.set({toolbarToggleKey: toolbarToggle});
	clearInterval(favTimer);
	if (homeBtn) homeBtn.removeEventListener("dragend", e => setTimeout(() => { e.preventDefault(); homeToRestart(homeRestart) }, resizeDelay));
	window.removeEventListener("focus", () => setTimeout(() => reloadElements(), resizeDelay));
	window.removeEventListener("fullscreenchange", () => setTimeout(() => {reloadElements(); getToolbarList(toolbarList)}, resizeDelay));
    window.removeEventListener("resize", () => setTimeout(() => {reloadElements(); getToolbarList(toolbarList)}, resizeDelay));
	window.removeEventListener("unload", () => shutDown());
  }

  chrome.storage.local.get(['calendarFormatKey'], result => { calendarFormat = result.calendarFormatKey.toString(); aCalendar(calendarFormat) });
  chrome.storage.local.get(['closeButtonKey'], result => { closeButton = result.closeButtonKey; customClose(closeButton) });
  chrome.storage.local.get(['customCssKey'], result => { customCss = result.customCssKey; customizeCSS(customCss) });
  chrome.storage.local.get(['extensionIconsKey'], result => { extensionIcons = result.extensionIconsKey });
  chrome.storage.local.get(['extensionToggleKey'], result => { extensionToggle = result.extensionToggleKey });
  chrome.storage.local.get(['favIntervalKey'], result => { favInterval = result.favIntervalKey });
  chrome.storage.local.get(['favInUrlKey'], result => { favInUrl = result.favInUrlKey; favImage(favInUrl) });
  chrome.storage.local.get(['folderImageKey'], result => { folderImage = result.folderImageKey; customFolder(folderImage) });
  chrome.storage.local.get(['hideFooterKey'], result => { hideFooter = result.hideFooterKey });
  chrome.storage.local.get(['hideBookmarkKey'], result => { hideBookmark = result.hideBookmarkKey });
  chrome.storage.local.get(['hideMainbarKey'], result => { hideMainbar = result.hideMainbarKey });
  chrome.storage.local.get(['homeRestartKey'], result => { homeRestart = result.homeRestartKey; homeToRestart(homeRestart) });
  chrome.storage.local.get(['keyCodesKey'], result => { keyCodes = result.keyCodesKey });
  chrome.storage.local.get(['moveActiveTabKey'], result => { moveActiveTab = result.moveActiveTabKey; moveTab(moveActiveTab) });
  chrome.storage.local.get(['positionOptionsMenuKey'], result => { positionOptionsMenu = result.positionOptionsMenuKey });
  chrome.storage.local.get(['resizeDelayKey'], result => { resizeDelay = result.resizeDelayKey });
  chrome.storage.local.get(['rewindForwardKey'], result => { rewindForward = result.rewindForwardKey });
  chrome.storage.local.get(['searchbarKey'], result => { searchbar = result.searchbarKey });
  chrome.storage.local.get(['showCalendarKey'], result => { showCalendar = result.showCalendarKey });
  chrome.storage.local.get(['showWorkspacesKey'], result => { showWorkspaces = result.showWorkspacesKey });
  chrome.storage.local.get(['toolbarListKey'], result => { toolbarList = result.toolbarListKey });
  chrome.storage.local.get(['toolbarToggleKey'], result => { toolbarToggle = result.toolbarToggleKey });
  chrome.tabs.onActivated.addListener(e => moveTabPosition(e));
  chrome.tabs.onHighlighted.addListener((tabId, changeInfo, tab) => getCurrentTab());
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { if (tab.status === 'complete') { getCurrentTabUpdated(); clearInterval(favTimer) }});

  window.addEventListener("focus", () => setTimeout(() => reloadElements(), resizeDelay));
  window.addEventListener("fullscreenchange", () => setTimeout(() => {reloadElements(); getToolbarList(toolbarList)}, resizeDelay));
  window.addEventListener("load", () => setTimeout(() => initialize(), initializeDelay));
  window.addEventListener("resize", () => setTimeout(() => {reloadElements(); getToolbarList(toolbarList)}, resizeDelay));
  window.addEventListener("unload", () => shutDown());

  initInterval = setInterval(() => {
    if (!$q('#options-button')) initialize();
    else { initialize(); clearInterval(initInterval) }
  }, openInterval);

// --------------------------------------------------------------------------------------------------------------------
// [Dialog Tab] Open Link                                                                        [Dialog Tab] Open Link
// --------------------------------------------------------------------------------------------------------------------

  let searchEngineCollection,
      defaultSearchId,
      privateSearchId,
      createdContextMenuIds = [],
      webviews = new Map(),
      fromPanel;

  setTimeout(function waitDialog() {
    const browser = $q('#browser');
    if (browser) {
      createContextMenuOption();
      updateSearchEnginesAndContextMenu();
      vivaldi.searchEngines.onTemplateUrlsChanged.addListener(() => {
        removeContextMenuSelectSearch();
        updateSearchEnginesAndContextMenu();
      });
      vivaldi.tabsPrivate.onKeyboardShortcut.addListener(keyCombo);
      chrome.runtime.onMessage.addListener((message) => {
        if (message.url) {
          fromPanel = message.fromPanel;
          dialogTab(message.url, message.fromPanel);
        }
      });
      chrome.webNavigation.onCompleted.addListener((details) => {
        if (details.tabId < 0) {
          let view = Array.from(webviews.values()).pop();
          if (view) {
            view.webview.executeScript({code: `(${setUrlClickObserver})(${fromPanel})`});
          } else {
            view = $q('.webpanel-stack > .visible webview');
            view && view.executeScript({code: `(${setUrlClickObserver})(${true})`});
          }
        } else {
          chrome.scripting.executeScript({
		    target: {tabId: details.tabId},
			func: setUrlClickObserver
		  });
        }
      });
    } else {
      setTimeout(waitDialog, 300);
    }
  }, 300);

  function setUrlClickObserver(fromPanel = false) {
    if (this.dialogEventListenerSet) return;
    let timer;
    document.addEventListener('mousedown', function (event) {
      if (event.ctrlKey && event.altKey && (event.button === 0 || event.button === 1)) {
        callDialog(event);
      } else if (event.button === 1) {
        timer = setTimeout(() => callDialog(event), 500);
      }
    });
    document.addEventListener('mouseup', function (event) {
      if (event.button === 1) {
        clearTimeout(timer);
      }
    });
    this.dialogEventListenerSet = true;
    let callDialog = (event) => {
      let link = getLinkElement(event.target);
      if (link) {
        event.preventDefault();
        chrome.runtime.sendMessage({url: link.href, fromPanel: fromPanel});
      }
    };
    let getLinkElement = (el) => {
      do {
        if (el.tagName != null && el.tagName.toLowerCase() === 'a') {
          if (el.getAttribute('href') === '#') return null;
          return el;
        }
      } while ((el = el.parentNode));
      return null;
  } }

  function createContextMenuOption() {
    chrome.contextMenus.create({
      id: 'dialog-tab-link',
      title: '[Dialog Tab] Open Link',
      contexts: ['link']
    });
    chrome.contextMenus.create({
      id: 'search-dialog-tab',
      title: '[Dialog Tab] Search for "%s"',
      contexts: ['selection']
    });
    chrome.contextMenus.create({
      id: 'select-search-dialog-tab',
      title: '[Dialog Tab] Search for "%s" with',
      contexts: ['selection'],
    });
    chrome.contextMenus.onClicked.addListener(function (itemInfo) {
      if (itemInfo.menuItemId === 'dialog-tab-link') {
        dialogTab(itemInfo.linkUrl);
      } else if (itemInfo.menuItemId === 'search-dialog-tab') {
        let engineId = window.incognito ? privateSearchId : defaultSearchId;
        dialogTabSearch(engineId, itemInfo.selectionText);
      } else if (itemInfo.parentMenuItemId === 'select-search-dialog-tab') {
        let engineId = itemInfo.menuItemId.substr(itemInfo.parentMenuItemId.length);
        dialogTabSearch(engineId, itemInfo.selectionText);
      }
    });
  }

  function createContextMenuSelectSearch() {
    searchEngineCollection.forEach(function (engine) {
      if (!createdContextMenuIds.includes(engine.id)) {
        chrome.contextMenus.create({
          id: 'select-search-dialog-tab' + engine.id,
          parentId: 'select-search-dialog-tab',
          title: engine.name,
          contexts: ['selection']
        });
        createdContextMenuIds.push(engine.id);
      }
    });
  }

  function updateSearchEnginesAndContextMenu() {
    vivaldi.searchEngines.getTemplateUrls().then((searchEnignes) => {
      searchEngineCollection = searchEnignes.templateUrls;
      defaultSearchId = searchEnignes.defaultSearch;
      privateSearchId = searchEnignes.defaultPrivate;
      createContextMenuSelectSearch();
    });
  }

  function removeContextMenuSelectSearch() {
    searchEngineCollection.forEach(function (engine) {
      if (createdContextMenuIds.includes(engine.id)) {
        chrome.contextMenus.remove('select-search-dialog-tab' + engine.id);
        createdContextMenuIds.splice(createdContextMenuIds.indexOf(engine.id), 1);
      }
    });
  }

  async function dialogTabSearch(engineId, selectionText) {
    let searchRequest = await vivaldi.searchEngines.getSearchRequest(engineId, selectionText);
    dialogTab(searchRequest.url);
  }

  function getEngine(engineId) {
    return searchEngineCollection.find(function (engine) {
      return engine.id === engineId;
    });
  }

  function keyCombo(id, combination) {
    const searchForSelectedText = async () => {
      let tabs = await chrome.tabs.query({active: true});
      vivaldi.utilities.getSelectedText(tabs[0].id, (text) =>
        dialogTabSearch(defaultSearchId, text)
      );
    }
    const SHORTCUTS = {
      'Ctrl+Alt+Period': searchForSelectedText,
      'Ctrl+Shift+F': searchForSelectedText,
      'Esc': () => removeDialog(Array.from(webviews.keys()).pop())
    };
    const customShortcut = SHORTCUTS[combination];
    if (customShortcut) {
      customShortcut();
  } }

  function removeDialog(webviewId) {
    let data = webviews.get(webviewId);
    if (data) {
      data.divContainer.remove();
      webviews.delete(webviewId);
  } }

  function dialogTab(linkUrl, fromPanel = undefined) {
    chrome.windows.getLastFocused(function (window) {
      if (window.id === vivaldiWindowId && window.state !== chrome.windows.WindowState.MINIMIZED) {
        showDialog(linkUrl, fromPanel);
      }
    });
  }

  function showDialog(linkUrl, fromPanel) {
    let webviewId = 'dialog-' + getWebviewId(),
	    webview = $c('webview'),
		divContainer = $c('div', {id: "dialog-container", className: "dialog-tab"}),
        divOptionContainer = $c('div', {id: 'dialog-options-container'}),
        progressBarContainer = $c('div', {id: 'progress-bar-container'}),
        progressBar = $c('div');
    if (fromPanel === undefined && webviews.size !== 0) {
      fromPanel = Array.from(webviews.values()).pop().fromPanel;
    }
    webviews.set(webviewId, {
      divContainer: divContainer,
      webview: webview,
      fromPanel: fromPanel
    });
    webview.setAttribute('src', linkUrl);
    webview.id = webviewId;
	webview.style.border = '1px solid #666';
    webview.style.borderRadius = '10px';
	webview.style.height = 99 - 5 * webviews.size + '%'; // 90 - 5
    webview.style.margin = 'auto';
    webview.style.overflow = 'hidden';
	webview.style.width = 100 - 2 * webviews.size + '%'; // 85 - 5
    fromPanel && webview.addEventListener('mousedown', event => event.stopPropagation());
    webview.addEventListener('loadstart', function () {
      this.style.backgroundColor = 'var(--colorBorder)';
      document.getElementById('progressBar-' + webviewId).style.display = 'block';
      if (document.getElementById('input-' + this.id) !== null) {
        document.getElementById('input-' + this.id).value = this.src;
      }
    });
    webview.addEventListener('loadstop', function () {
      document.getElementById('progressBar-' + webviewId).style.display = 'none';
    });
    divContainer.style.backdropFilter = 'blur(1px)';
    divContainer.style.backgroundColor = 'rgba(0, 0, 0, .8)';
    divContainer.style.bottom = '0';
    divContainer.style.left = '0';
    divContainer.style.position = 'fixed';
    divContainer.style.right = '0';
    divContainer.style.top = '0';
    divContainer.style.transitionProperty = 'background-color';
    divContainer.style.transitionDuration = '0.1s';
    divContainer.style.transitionTimingFunction = 'ease';
    divContainer.style.transitionDelay = '0s';
    divContainer.style.zIndex = '1060';
    let stopEvent = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    fromPanel && document.body.addEventListener('pointerdown', stopEvent);
    divContainer.addEventListener('click', function (event) {
      if (event.target === this) {
        fromPanel && document.body.removeEventListener('pointerdown', stopEvent);
        removeDialog(webviewId);
      }
    });
    divOptionContainer.style.alignItems = 'center';
	divOptionContainer.style.background = '#222';
	divOptionContainer.style.borderRadius = '6px 6px 0 0';
    divOptionContainer.style.color = 'white';
	divOptionContainer.style.height = '24px';
	divOptionContainer.style.left = '1%';
	divOptionContainer.style.margin = '4px 0 0 0';
    divOptionContainer.style.position = 'fixed';
    divOptionContainer.style.textAlign = 'center';
	divOptionContainer.style.top = (100 - (100 - 5 * webviews.size)) / 2 - 2.5 + '%'; // 90 - 5, 2 - 4
    divOptionContainer.style.width = '98%';
    divOptionContainer.style.zIndex = '1160';
    divOptionContainer.innerHTML = getEllipsisContent();
    let timeout;
    divOptionContainer.addEventListener('mouseover', function () {
      if (divOptionContainer.children.length === 1) {
        divOptionContainer.innerHTML = '';
        showWebviewOptions(webviewId, divOptionContainer);
      }
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }
    });
    divOptionContainer.addEventListener('mouseleave', function () {
      if (!timeout) {
        timeout = setTimeout(() => {
          while (divOptionContainer.firstChild) {
            divOptionContainer.removeChild(divOptionContainer.firstChild);
          }
          divOptionContainer.innerHTML = getEllipsisContent();
        }, 500);
      }
    });
    progressBarContainer.style.margin = '27px 0 0 1%';
    progressBarContainer.style.width = '98%';
    progressBar.id = 'progressBar-' + webviewId;
    progressBar.style.backgroundColor = '#0080FF';
    progressBar.style.borderRadius = '2px';
    progressBar.style.height = '4px';
    progressBar.style.width = '100%';
    progressBarContainer.appendChild(progressBar);
    divContainer.appendChild(divOptionContainer);
    divContainer.appendChild(webview);
    divContainer.appendChild(progressBarContainer);
    fromPanel ? document.body.appendChild(divContainer) : $q('.active.visible.webpageview').appendChild(divContainer);
  }

  function showWebviewOptions(webviewId, thisElement) {
    let inputId = 'input-' + webviewId,
        data = webviews.get(webviewId),
        webview = data ? data.webview : undefined;
    console.log(document.getElementById(inputId) === null, webviewId);
    if (webview && document.getElementById(inputId) === null) {
      let webviewSrc = webview.src,
          buttonBack = createOptionsButton(),
          buttonForward = createOptionsButton(),
          buttonNewTab = createOptionsButton(),
          buttonBackgroundTab = createOptionsButton(),
          input = $c('input', {type: 'text'}),
		  buttonClose = createOptionsButton();
      setBackButtonContent(buttonBack);
	  buttonBack.style.margin = "-4px 0 0 0";
	  buttonBack.title = "Go Back";
      buttonBack.addEventListener('click', function (event) {
        if (event.target === this || this.firstChild) {
          webview.back();
        }
      });
      setForwardButtonContent(buttonForward);
	  buttonForward.style.margin = "-4px 8px 0 0";
	  buttonForward.title = "Go Forward";
      buttonForward.addEventListener('click', function (event) {
        if (event.target === this || this.firstChild) {
          webview.forward();
        }
      });
      buttonNewTab.innerHTML = getNewTabContent();
	  buttonNewTab.style.margin = "-4px 0 0 0px";
	  buttonNewTab.title = "New Tab in Foreground";
      buttonNewTab.addEventListener('click', function (event) {
        if (event.target === this || this.firstChild) {
          openNewTab(inputId, true);
        }
      });
      buttonBackgroundTab.innerHTML = getBackgroundTabContent();
	  buttonBackgroundTab.style.margin = "-4px 0 0 14px";
	  buttonBackgroundTab.title = "New Tab in Background" ;
      buttonBackgroundTab.addEventListener('click', function (event) {
        if (event.target === this || this.firstChild) {
          openNewTab(inputId, false);
        }
      });
      input.value = webviewSrc;
      input.id = inputId;
      input.setAttribute('readonly', '');
      input.style.background = "transparent";
      input.style.border = 'unset';
      input.style.color = 'white';
      input.style.margin = '-8px 0 0 4px';
      input.style.padding = '0.25rem 0.5rem';
	  input.style.pointerEvents = "none";
	  input.style.textOverflow = 'ellipsis';
      input.style.width = '280px';
	  buttonClose.style.margin = "0 0 0 0";
	  buttonClose.innerHTML = getCloseButtonContent();
	  buttonClose.title = "Close Dialog";
	  buttonClose.addEventListener('click', function (event) {
        if (event.target === this || this.firstChild) {
          removeDialog(webviewId);
        }
      });
      thisElement.appendChild(buttonBack);
      thisElement.appendChild(buttonForward);
      thisElement.appendChild(buttonNewTab);
      thisElement.appendChild(buttonBackgroundTab);
      thisElement.appendChild(input);
	  thisElement.appendChild(buttonClose);
      console.log(webviewSrc, thisElement);
  } }

  function createOptionsButton() {
    let btn = $c('button', {className: "dialog-button", style: "background: transparent; border: unset; margin: 0 6px;"});
    return btn;
  }

  function getWebviewId() {
    let tempId = 0;
    while (true) {
      if (document.getElementById('dialog-' + tempId) === null) {
        break;
      }
      tempId = Math.floor(Math.random() * 1000 + 1);
    }
    return tempId;
  }

  function openNewTab(inputId, active) {
    let url = document.getElementById(inputId).value;
    chrome.tabs.create({url: url, active: active});
  }

  function getEllipsisContent() {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="36px" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>';
  }

  function setBackButtonContent(buttonBack) {
    let svg = $q('.button-toolbar [name="Back"] svg');
    if (svg) {
      buttonBack.appendChild(svg.cloneNode(true));
    } else {
      buttonBack.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="26px" width="26px" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>';
  } }

  function setForwardButtonContent(forwardButton) {
    let svg = $q('.button-toolbar [name="Forward"] svg');
    if (svg) {
      forwardButton.appendChild(svg.cloneNode(true));
    } else {
      forwardButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="26px" width="26px" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>';
  } }

  function getNewTabContent() {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="19px" width="22px" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>';
  }

  function getBackgroundTabContent() {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="22px" width="22px" viewBox="0 0 448 512"><path d="M384 32c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384zM160 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h94.1L119 327c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l135-135V328c0 13.3 10.7 24 24 24s24-10.7 24-24V168c0-13.3-10.7-24-24-24H160z"/></svg>';
  }

  function getCloseButtonContent() {
	return '<svg xmlns="http://www.w3.org/2000/svg" height="26px" width="26px" viewBox="0 0 16 16"><path d="m12.5 5-1.4-1.4-3.1 3-3.1-3L3.5 5l3.1 3.1-3 2.9 1.5 1.4L8 9.5l2.9 2.9 1.5-1.4-3-2.9"/></svg>';
  }

// --------------------------------------------------------------------------------------------------------------------
// Hides the tab bar when not hovering
// --------------------------------------------------------------------------------------------------------------------

  let fullScreenInterval = setInterval(() => {
    const webView = $q("#webview-container"),
          header = $q("#header"),
          browser = $q("#browser"),
		  style = $c("style"),
		  hoverDiv = $c("div");
    if (webView) {
      clearInterval(fullScreenInterval);
      let fullscreenEnabled;
      chrome.storage.local.get("fullScreenModEnabled").then((value) => {
        fullscreenEnabled = value.fullScreenModEnabled || value.fullScreenModEnabled == undefined;
        if (fullscreenEnabled) addFullScreenListener();
      });
      vivaldi.tabsPrivate.onKeyboardShortcut.addListener((id, combination) => combination == keyCodes && toggleFullScreen());
      style.appendChild(document.createTextNode("[hidden] { display: none !important; }"));
      document.head.appendChild(style);
      hoverDiv.style.height = "9px";
      hoverDiv.style.width = "100vw";
      hoverDiv.style.position = "fixed";
      hoverDiv.style.left = "0";
      hoverDiv.style.top = "0";
      hoverDiv.style.zIndex = 1;
      document.body.insertBefore(hoverDiv, document.body.firstChild);
      function toggleFullScreen() {
        fullscreenEnabled = !fullscreenEnabled;
        fullscreenEnabled ? addFullScreenListener() : removeFullScreenListener();
        chrome.storage.local.set({fullScreenModEnabled: fullscreenEnabled})
      }
      function addFullScreenListener() {
        webView.addEventListener("pointerenter", hide);
        hoverDiv.addEventListener("pointerenter", show);
        hide();
      }
      function removeFullScreenListener() {
        webView.removeEventListener("pointerenter", hide);
        hoverDiv.removeEventListener("pointerenter", show);
        show();
      }
      function hide() {
        header.hidden = true;
      }
      function show() {
        header.hidden = false;
        browser.classList.remove("address-top-off");
        browser.classList.add("address-top");
    } }

  }, 200);
 
})();
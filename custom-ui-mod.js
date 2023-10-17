(() => {

  'use strict';

  const initializeDelay = 200,
        clearIcon = 'background: url(/style/icons/delete.png) center no-repeat',
		closeIcon = 'background: url(/style/icons/close.png) center no-repeat',
        close24Icon = 'background: url(/style/icons/close24.png) center no-repeat',
		extensionIcon = 'background: url(/style/icons/extension.png) center no-repeat',
		folderIcon = 'background: url(/style/icons/folder.png) center no-repeat',
		maskIcon = 'background: url(/style/icons/mask.png) center no-repeat',
        optionsIcon = 'background: url(/style/icons/options.png) center no-repeat',
		optionsOnIcon = 'background: url(/style/icons/optionsOn.png) center no-repeat',
        positionIcon = 'background: url(/style/icons/position.png) center no-repeat',
		profileIcon = 'background: url(/style/icons/profile.png) center no-repeat',
		restartIcon = 'background: url(/style/icons/restart.png) center no-repeat',
		workspacesIcon = 'background: url(/style/icons/pinned.png) center no-repeat',
        favIntervalText = 'Fav Interval',
        resizeDelayText = 'Resize Delay',
        homeAsRestartTooltip = 'Restart browser',
        optionsCloseTooltip = 'Closes options menu',
		optionsMenuText = 'Options Menu',
        optionsMenuTooltip = 'Open/Close Options Menu',
        optionsMenuPositionTooltip = 'Repositions menu: Top Left - Top Center - Top Right - Centered',
		toggleTooltip = 'Hide/Show All Toolbars Except Tabbar',
		calendarTooltip = '\u2022 Mouseover to update Calendar\n\u2022 Left-click to change format',
        label1Tooltip = 'Replaces bookmark folders wtih custom icon',
        span1Text = 'Bookmark Folder Custom Icon',
		label2Tooltip = 'Custom CSS for Vivaldi Themes',
        span2Text = 'Custom CSS For Vivaldi Themes',
        label3Tooltip = 'Calendar Before Clock',
        span3aText = 'Calendar Before Clock',
        button3Tooltip = 'Toggle day format short/long name',
        button3Text = 'Format',
        label4Tooltip = 'In Settings > General > Homepage >\nSpecific Page > enter: vivaldi://restart',
        span4Text = 'Home Button To Restart Button',
        label5Tooltip = 'Displays site favicon in urlbar',
        span5Text = 'Site Favicon In Urlbar',
        label6Tooltip = 'Tab close buttons are larger',
        span6Text = 'Tab Close Button Expanded',
        label7Tooltip = 'Moves clicked/active tab to first position in tabbar',
        span7Text = 'Tab Active Moves To First Position',
		label9Tooltip = 'Show/Hide Workspaces Menu Button In Tabbar',
        span9Text = 'Workspaces Menu Button',
        span10aTooltip = 'Increase time in milliseconds to acquire site favicon before sending to urlbar',
        span10bTooltip = 'Increase time in milliseconds for toolbars to properly load after exiting fullscreen mode',
        input11Tooltip = 'Moveable Toolbars: .mainbar, .bookmark-bar, footer\nInsert selectors with buttons below in order from\nleft/top to right/bottm. Will ignore duplicate entries',
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
		label16Tooltip = 'Toggle Footer',
        span16Text = 'Toggle Footer',
		label17Tooltip = 'Toggle Bookmark-bar',
        span17Text = 'Toggle Bookmark-bar',
		label18Tooltip = 'Toggle Mainbar',
        span18Text = 'Toggle Mainbar',
		label19Tooltip = 'Show/Hide Hidden Extensions Toggle Button',
        span19Text = 'Toggle Hiden Extensions Button',
		setOrderText = '\u2193 \u2007 Set Toolbar Order \u2007 \u2193',
		resetTooltip = "Reset unloaded custom-ui-mod elements",
        asterisk = '*', bullet = '\u2022', colon = ':', colons = '::', comma = ',', gt = '>', hyphen = '-', lt = '<', pointer = '\u25BA', slash = '/', space = ' ', star = '\u2606',
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
	  extensionToggle,
      favInterval,
      favInUrl,
      favTimer,
      folderImage,
	  hideBookmark,
	  hideFooter,
	  hideMainbar,
      homeRestart,
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
	    main = $q('#main'),
		statusBar = $q('.toolbar-statusbar'),
		footer2 = $q('footer.dialog-footer'),
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
	  chrome.storage.local.get(['extensionToggleKey'], result => {
        extensionToggle = result.extensionToggleKey;
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
      chrome.storage.local.get(['moveActiveTabKey'], result => {
        moveActiveTab = result.moveActiveTabKey;
        if (moveActiveTab) moveTab(moveActiveTab);
      });
      chrome.storage.local.get(['positionOptionsMenuKey'], result => {
        positionOptionsMenu = result.positionOptionsMenuKey;
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
	  if (footer2) main.appendChild(footer2);
	  setCalendarHolder();
	  setOptionsButton();
	  setOptionsMenu();
	  setRewindForward();
	  setToggleButton();
	  workspace.innerHTML = '';
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
      case '1': return ww + space + bullet + space + mmmm + space + ddd + comma + space + yyyy; // Monday ? January 1st, 2023
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
    let inp3 = $q('#input3'),
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
        img = $q('#favImg');
    try {
      if (!favInUrl) {
        field.removeChild(img);
        return;
      }
      chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        if (tabs[0].title.match(/Extensions/gi)) img.src = '/style/icons/extensions.png';
		else if (tabs[0].title.match(/Gmail/gi)) img.src = '/style/icons/gmail.png';
		else if (tabs[0].title.match(/Powershell/gi)) img.src = '/style/icons/powershell.png';
		else if (tabs[0].title.match(/Razzano \(Sonny\)/gi)) img.src = '/style/icons/github.png';
		else if (tabs[0].title.match(/Settings/gi)) img.src = '/style/icons/settings.png';
		else if (tabs[0].title.match(/SLB stocks/gi)) img.src = '/style/icons/slb.png';
		else if (tabs[0].title.match(/SoFi stocks/gi)) img.src = '/style/icons/sofi.png';
		else if (tabs[0].title.match(/Start Page/gi)) img.src = '/style/icons/star.png';
        else if (tabs[0].title.match(/Tampermonkey/gi)) img.src = '/style/icons/tampermonkey16.png';
		else if (tabs[0].title.match(/True Key/gi)) img.src = '/style/icons/truekey.png';
        else if (tabs[0].title.match(/YouTube TV/gi)) img.src = '/style/icons/youtubetv.png';
        else if (!tabs[0].favIconUrl)  img.src = '/style/icons/page.png';
        else img.src = tabs[0].favIconUrl;
	  });
    } catch(ex) {}
  }

  function getCurrentTabUpdated() {
    favTimer = setInterval(() => {getCurrentTab(); reloadElements()}, favInterval);
  }

  function getToolbarList(e) {
	try {
      e = e.split(',');
      for (let i = e.length - 1; i >= 0; i--) main.insertBefore($q(e[i]), main.firstChild);
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
        inp11 = $q('#input11');
    inp11.value = '';
	browser.appendChild(footer);
	browser.removeAttribute('footer-in-header');
    toolbarList = '.mainbar,.bookmark-bar';
    chrome.storage.local.set({toolbarListKey: toolbarList});
	getToolbarList(toolbarList);
	onOptionsMenuPosition(positionOptionsMenu);
  }

  function onOptions() {
    let browser = $q('#browser');
    if (browser.hasAttribute('options-menu')) browser.removeAttribute('options-menu');
    else browser.setAttribute('options-menu', true);
    onOptionsMenuPosition(positionOptionsMenu);
  }

  function onOptionsMenu(e) {
    let browser = $q('#browser'),
        el = document.getElementById(e);
    switch (e) {
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
        } else browser.removeAttribute('custom-css');
		onOptionsMenuPosition(positionOptionsMenu);
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
        extensionToggle = el.checked;
        chrome.storage.local.set({extensionToggleKey: extensionToggle});
		if (extensionToggle) browser.setAttribute('extension-toggle', true);
        else browser.removeAttribute('extension-toggle');
  } }

  function onOptionsMenuButton() {
    let inp0 = $q('#input0');
    if (inp0.value === '1') inp0.value = '2';
    else if (inp0.value === '2') inp0.value = '3';
    else if (inp0.value === '3') inp0.value = '4';
    else inp0.value = '1';
    positionOptionsMenu = inp0.value;
    chrome.storage.local.set({positionOptionsMenuKey: positionOptionsMenu});
    onOptionsMenuPosition(positionOptionsMenu);
  }

  function onOptionsMenuPosition(e) {
    let width = window.innerWidth,
        inner = $q('.inner'),
        innerTop = inner.clientTop + 'px',
		innerHgt = inner.clientHeight / 2,
        menu = $q('#options-menu'),
        menuHeight = menu.clientHeight / 2,
        menuWidth = menu.clientWidth;
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
 
  function onSelector(e) {
    let browser = $q('#browser'),
	    inp11 = $q('#input11');
    switch (e) {
      case 'button12a':
        let x = '.mainbar';
        if (inp11.value.match(x)) return;
        else if (inp11.value === '') inp11.value = x;
        else if (inp11.value && !inp11.value.match('/,$/')) inp11.value = inp11.value + ',' + x;
        else if (inp11.value && inp11.value.match(/,$/)) inp11.value = inp11.value + x;
        break;
      case 'button12b':
        let y = '.bookmark-bar';
        if (inp11.value.match(y)) return;
        else if (inp11.value === '') inp11.value = y;
        else if (inp11.value && !inp11.value.match('/,$/')) inp11.value = inp11.value + ',' + y;
        else if (inp11.value && inp11.value.match(/,$/)) inp11.value = inp11.value + y;
        break;
      case 'button12c':
        let z = 'footer';
        if (inp11.value.match(z)) return;
        else if (inp11.value === '') inp11.value = z;
        else if (inp11.value && !inp11.value.match('/,$/')) inp11.value = inp11.value + ',' + z;
        else if (inp11.value && inp11.value.match(/,$/)) inp11.value = inp11.value + z;
		setTimeout(function () { onOptionsMenuPosition(positionOptionsMenu) }, 20);
		browser.setAttribute('footer-in-header', true);
    }
    toolbarList = inp11.value;
	getToolbarList(toolbarList);
    chrome.storage.local.set({toolbarListKey: toolbarList});
  }

  function reloadElements() {
    let cal = $q('#calendar'),
	    optBtn = $q('#options-button'),
		optMenu = $q('#options-menu'),
		restartBtn = $q('#restart-browser'),
		rewFor = $q('#rewindForward'),
		togToolbars = $q('#toggle-toolbars');
	try {
	  if (!cal) setCalendarHolder();
	  if (!restartBtn && homeRestart) homeToRestart(homeRestart);
	  if (!optBtn) setOptionsButton();
	  if (!optMenu) setOptionsMenu();
	  if (!rewFor) setRewindForward();
	  if (!togToolbars) setToggleButton();
	} catch(ex) {}
  }

  function setCalendarHolder() {
    let cal = $c('span', {id: 'calendar', className: 'aCal', title: calendarTooltip}, [{type: 'mouseover', fn: function () {getCalendarText()}}]),
        clk = $q('.ClockButton');
	try {
	  if (!calendarFormat) calendarFormat = '1';
	  cal.textContent = aCalendar(calendarFormat);
      clk.insertBefore(cal, clk.firstChild);
	  cal.onclick = function () { getCalendarFormat() }
      removeDupes('aCal');
	} catch(ex) {}
  } 

  function setOptionsButton() {
    let optBtn = $c('button', {id: "options-button", className: "ToolbarButton-Button custom-button optionsButton", draggable: "false", tabindex: "-1", title: optionsMenuTooltip, type: "button"}, [{type: 'click', fn: function () {onOptions()}}]),
	    statusBar = $q('.toolbar-statusbar');
	statusBar.insertBefore(optBtn, statusBar.firstChild);
	removeDupes('optionsButton');
  }

  function setOptionsMenu() {
	let optMenu = $c('div', {id: 'options-menu', className: 'options-menu-popup'}),
		inner =  $q('.inner');
	try {
      optMenu.innerHTML = '\
        <div id="div0">\
          <button id="position-menu" class="button" style="'+ positionIcon +'" title="'+ optionsMenuPositionTooltip +'"></button>\
           <input id="input0" class="input" type="number" disabled="true" value="'+ positionOptionsMenu +'"/>\
		  <span id="spanImg">\
		    <span id="spanMenuText">'+ optionsMenuText +'</span>\
		    <span id="spanSvg"><svg xmlns="http://www.w3.org/2000/svg" style="'+ optionsOnIcon +'"/></span>\
          </span>\
          <button id="options-menu-close" class="button" style="'+ close24Icon +'" title="'+ optionsCloseTooltip +'"></button>\
        </div>\
        <label id="label1" class="label" title="' + label1Tooltip +'">\
          <input id="input1" class="input" type="checkbox"/>\
          <span id="span1">'+ span1Text +'</span>\
		  <span id="folderIcon" class="icon">\
            <svg xmlns="http://www.w3.org/2000/svg" style="'+ folderIcon + '"/>\
          </span>\
        </label>\
        <label id="label3" class="label" title="'+ label3Tooltip +'">\
          <input id="input3" class="input" type="checkbox"/>\
          <span id="span3a" class="span">'+ span3aText +'</span>\
          <button id="button3" class="button" title="' + button3Tooltip +'">\
            <span id="span3b" class="span">'+ "Format "+ calendarFormat +'</span>\
          </button>\
        </label>\
        <label id="label2" class="label" title="' + label2Tooltip +'">\
          <input id="input2" class="input" type="checkbox"/>\
          <span id="span2" class="span">'+ span2Text +'</span>\
        </label>\
        <label id="label4" class="label" title="' + label4Tooltip +'">\
          <input id="input4" class="input" type="checkbox"/>\
          <span id="span4" class="span">'+ span4Text +'</span>\
		  <span id="folderIcon" class="icon">\
            <svg xmlns="http://www.w3.org/2000/svg" style="'+ restartIcon + '"/>\
          </span>\
        </label>\
        <label id="label13" class="label" title="' + label13Tooltip +'">\
          <input id="input13" class="input" type="checkbox"/>\
          <span id="span13" class="span">'+ span13Text +'</span>\
        </label>\
        <label id="label14" class="label" title="' + label14Tooltip +'">\
          <input id="input14" class="input" type="checkbox"/>\
          <span id="span14" class="span">'+ span14Text +'</span>\
        </label>\
        <label id="label5" class="label" title="'+ label5Tooltip +'">\
          <input id="input5" class="input" type="checkbox"/>\
          <span id="span5" class="span">'+ span5Text +'</span>\
        </label>\
        <label id="label7" class="label" title="' + label7Tooltip +'">\
          <input id="input7" class="input" type="checkbox"/>\
          <span id="span7" class="span">'+ span7Text +'</span>\
        </label>\
        <label id="label6" class="label" title="' + label6Tooltip +'">\
          <input id="input6" class="input" type="checkbox"/>\
          <span id="span6" class="span">'+ span6Text +'</span>\
		  <span id="closeIcon" class="icon">\
            <svg xmlns="http://www.w3.org/2000/svg" style="'+ closeIcon +'"/>\
          </span>\
        </label>\
		<label id="label19" class="label" title="' + label19Tooltip +'">\
          <input id="input19" class="input" type="checkbox"/>\
          <span id="span19" class="span">'+ span19Text +'</span>\
		  <span id="extensionIcon" class="icon">\
            <svg xmlns="http://www.w3.org/2000/svg" style="'+ extensionIcon +'"/>\
          </span>\
        </label>\
        <label id="label15" class="label" title="' + label15Tooltip +'">\
          <input id="input15" class="input" type="checkbox"/>\
          <span id="span15" class="span">'+ span15Text +'</span>\
		  <span id="maskIcon" class="icon">\
            <svg xmlns="http://www.w3.org/2000/svg" style="'+ maskIcon +'"/>\
          </span>\
        </label>\
	    <label id="label16" class="label indent" title="' + label16Tooltip +'">\
          <input id="input16" class="input" type="checkbox"/>\
          <span id="span16" class="span">'+ span16Text +'</span>\
        </label>\
	    <label id="label17" class="label indent" title="' + label17Tooltip +'">\
          <input id="input17" class="input" type="checkbox"/>\
          <span id="span17" class="span">'+ span17Text +'</span>\
        </label>\
	    <label id="label18" class="label indent" title="' + label18Tooltip +'">\
          <input id="input18" class="input" type="checkbox"/>\
          <span id="span18" class="span">'+ span18Text +'</span>\
        </label>\
	    <label id="label9" class="label" title="' + label9Tooltip +'">\
          <input id="input9" class="input" type="checkbox"/>\
          <span id="span9" class="span">'+ span9Text +'</span>\
		  <span id="folderIcon" class="icon">\
            <svg xmlns="http://www.w3.org/2000/svg" style="'+ workspacesIcon + '"/>\
          </span>\
        </label>\
        <span id="span10" class="span span-number">\
          <span title="'+ span10aTooltip +'">'+ favIntervalText +'</span>\
          <input id="input10a" class="input input-timer" type="number"/>\
          <span title="'+ span10bTooltip +'">'+ resizeDelayText +'</span>\
          <input id="input10b" class="input input-timer" type="number"/>\
        </span>\
	    <label id="setOrder" class="order" for="input11">'+ setOrderText +'</label>\
        <span id="span11" class="span span-text">\
          <input id="input11" class="input" type="text" value=".mainbar,.bookmark-bar,footer" spellcheck="false" title="'+ input11Tooltip +'"/>\
          <span id="span11a" title="'+ span11aTooltip +'">\
            <svg xmlns="http://www.w3.org/2000/svg" style="'+ clearIcon +'"/>\
          </span>\
        </span>\
        <span id="span12" class="span span-button">\
          <button id="button12a" class="button" title="'+ button12aTooltip +'">\
            <span>.mainbar</span>\
          </button>\
          <button id="button12b" class="button" title="'+ button12bTooltip +'">\
            <span>.bookmark-bar</span>\
          </button>\
          <button id="button12c" class="button" title="'+ button12cTooltip +'">\
            <span>footer</span>\
          </button>\
        </span>\
      </div>';
	  inner.appendChild(optMenu);
	  if (!positionOptionsMenu) positionOptionsMenu = '1';
      $q('div#options-menu #input0').value = positionOptionsMenu;
      $q('div#options-menu #input1').checked = folderImage;
	  $q('div#options-menu #input2').checked = customCss;
      $q('div#options-menu #input3').checked = showCalendar;
      $q('div#options-menu #input4').checked = homeRestart;
	  $q('div#options-menu #input5').checked = favInUrl;
      $q('div#options-menu #input6').checked = closeButton;
      $q('div#options-menu #input7').checked = moveActiveTab;
	  $q('div#options-menu #input9').checked = showWorkspaces;
	  $q('div#options-menu #input13').checked = rewindForward;
	  $q('div#options-menu #input14').checked = searchbar;
	  $q('div#options-menu #input15').checked = toolbarToggle;
	  $q('div#options-menu #input16').checked = hideFooter;
	  $q('div#options-menu #input17').checked = hideBookmark;
	  $q('div#options-menu #input18').checked = hideMainbar;
	  $q('div#options-menu #input19').checked = extensionToggle;
	  if (!favInterval) favInterval = 20;
      $q('div#options-menu #input10a').value = favInterval;
	  if (!resizeDelay) resizeDelay = 20;
      $q('div#options-menu #input10b').value = resizeDelay;
      $q('div#options-menu #input11').value = toolbarList;
      let ip = $q('#options-menu > label > input[type="checkbox"]', true);
      for (let i = 0; i < ip.length; i++) ip[i].onclick = e => onOptionsMenu(e.target.id);
      $q('#options-menu-close').onclick = () => onOptions();
      $q('#position-menu').onclick = () => onOptionsMenuButton();
      $q('#button3').onclick = () => getCalendarFormat();
      $q('#input10a').onchange = e => onOptionsMenu('input10a');
      $q('#input10b').onchange = e => onOptionsMenu('input10b');
      $q('#span11a').onclick = () => onClearField();
      $q('#button12a').onclick = e => onSelector('button12a');
      $q('#button12b').onclick = e => onSelector('button12b');
      $q('#button12c').onclick = e => onSelector('button12c');
      removeDupes('options-menu-popup');
	} catch(ex) {}
  }

  function setRewindForward() {
    let div = $c('div', {id: 'rewindForward', className: 'button-toolbar rewind-forward'}),
	    mainbar = $q('.toolbar-mainbar'),
		forward = $q('.button-narrow[title="Fast Forward"]'),
		rewind = $q('.button-narrow[title^="Rewind by"]');
	div.appendChild(rewind);
	div.appendChild(forward);
	mainbar.insertBefore(div, mainbar.childNodes[3]);
	removeDupes('rewind-forward');
  }

  function setToggleButton() {
    let tabs = $q('#tabs-container'),
	    label16 = $q('#label16'),
		label17 = $q('#label17'),
		label18 = $q('#label18'),
		div2 = $c('div', {id: 'toggleToolbars'}),
		toggle = $c('button', {id: 'toggle-toolbars', className: 'ToolbarButton-Button custom-button toggle-toolbars', title: toggleTooltip}, [{type: 'click', fn: function () {setToolbars(); reloadElements(); if ($q('div#options-menu')) onOptionsMenuPosition(positionOptionsMenu)}}]);
	div2.appendChild(toggle);
	tabs.insertBefore(div2, tabs.firstChild);
	removeDupes('toggle-toolbars');
	if (toolbarToggle) {
	  label16.removeAttribute('disabled');
	  label17.removeAttribute('disabled');
	  label18.removeAttribute('disabled');
    } else {
	  label16.setAttribute('disabled', true);
	  label17.setAttribute('disabled', true);
	  label18.setAttribute('disabled', true);
  } }

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
	chrome.storage.local.set({extensionToggleKey: extensionToggle});
    chrome.storage.local.set({favIntervalKey: favInterval});
    chrome.storage.local.set({favInUrlKey: favInUrl});
    chrome.storage.local.set({folderImageKey: folderImage});
	chrome.storage.local.set({hideFooterKey: hideFooter});
	chrome.storage.local.set({hideBookmarkKey: hideBookmark});
	chrome.storage.local.set({hideMainbarKey: hideMainbar});
    chrome.storage.local.set({homeRestartKey: homeRestart});
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
  chrome.storage.local.get(['extensionToggleKey'], result => { extensionToggle = result.extensionToggleKey });
  chrome.storage.local.get(['favIntervalKey'], result => { favInterval = result.favIntervalKey });
  chrome.storage.local.get(['favInUrlKey'], result => { favInUrl = result.favInUrlKey; favImage(favInUrl) });
  chrome.storage.local.get(['folderImageKey'], result => { folderImage = result.folderImageKey; customFolder(folderImage) });
  chrome.storage.local.get(['hideFooterKey'], result => { hideFooter = result.hideFooterKey });
  chrome.storage.local.get(['hideBookmarkKey'], result => { hideBookmark = result.hideBookmarkKey });
  chrome.storage.local.get(['hideMainbarKey'], result => { hideMainbar = result.hideMainbarKey });
  chrome.storage.local.get(['homeRestartKey'], result => { homeRestart = result.homeRestartKey; homeToRestart(homeRestart) });
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
  
})();

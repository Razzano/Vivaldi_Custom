(function() {

  'use strict';

  const initializeDelay = 1000,
        clearIcon = 'background: url(/style/complete/delete.png) center no-repeat',
        closeIcon = 'background: url(/style/complete/close.png) center no-repeat',
        optionsIcon = 'background: url(/style/complete/options.png) center no-repeat',
        positionIcon = 'background: url(/style/complete/position.png) center no-repeat',
        restartIcon = 'background: url(/style/complete/restart.png) center no-repeat',
        favIntervalText = 'Fav Interval',
        resizeDelayText = 'Resize Delay',
        homeAsRestartTooltip = 'Restart browser',
        optionsCloseTooltip = 'Closes options menu',
        optionsMenuTooltip = 'Open/Close Options Menu',
        optionsMenuPositionTooltip = 'Repositions menu: Top Left - Top Center - Top Right - Centered',
		calendarTooltip = 'Mouseover to reset Calendar',
        label1Tooltip = 'Replaces bookmark folders wtih custom icon',
        span1Text = 'Bookmark Folder Custom Icon',
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
        span9Text = 'Workspaces Menu Button In Tabbar',
        span10aTooltip = 'Increase time to acquire site favicon before sending to urlbar',
        span10bTooltip = 'Increase time for toolbars to properly load after exiting fullscreen mode',
        input11Tooltip = 'Moveable Toolbars: .mainbar, .bookmark-bar, footer\nInsert selectors with buttons below in order from\nleft/top to right/bottm. Will ignore duplicate entries',
        span11aTooltip = 'Clear input field',
        button12aTooltip = 'Click to insert selector\nWill ignore duplicate entries',
        button12bTooltip = 'Click to insert selector\nWill ignore duplicate entries',
        button12cTooltip = 'Click to insert selector\nWill ignore duplicate entries',
        asterisk = '*',
        bullet = '\u2022',
        colon = ':',
        colons = '::',
        comma = ',',
        hyphen = '-',
        slash = '/',
        space = ' ',
		star = '\u2606',
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
      favInterval,
      favInUrl,
      favTimer,
      folderImage,
      homeRestart,
      moveActiveTab,
      positionOptionsMenu,
      resizeDelay,
      showCalendar,
	  showWorkspaces,
      toolbarList;

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

  function $q(el, all) {
    if (all) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function initialize() {
    let browser = $q('#browser'),
	    workspace = $q('div.button-toolbar.tabbar-workspace-button > button.ToolbarButton-Button > span.button-title');
    try {
      chrome.storage.local.get(['closeButtonKey'], result => {
        closeButton = result.closeButtonKey;
        if (closeButton) {
          browser.setAttribute('custom-close', true);
          customClose(closeButton);
        } else browser.removeAttribute('custom-close');
      });
      chrome.storage.local.get(['calendarFormatKey'], result => {
        calendarFormat = result.calendarFormatKey;
        if (showCalendar) browser.setAttribute('show-calendar', calendarFormat);
        else browser.removeAttribute('show-calendar');
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
      });
	  workspace.innerHTML = '';
      getCalendarHolder();
      optionsMenu();
      removeDupes('aCal');
    } catch(ex) {}
  }

  function aCalendar(int) {
    let date = new Date(),
        dt = date.getDate(),
        dy = date.getDay(),
        mth = date.getMonth(),
        yr = date.getFullYear(),
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
    chrome.storage.local.set({calendarFormatKey: calendarFormat});
    inp3.value = calendarFormat;
	span3.textContent = 'Format ' + calendarFormat;
    cal.textContent = aCalendar(calendarFormat);
  }

  function getCalendarHolder() {
    let cal = $c('button', {id: 'calendar', className: 'aCal', title: calendarTooltip}, [{type: 'mouseover', fn: function () {getCalendarText()}}]),
        clk = $q('.ClockButton');
	cal.textContent = aCalendar(calendarFormat);
    clk.insertBefore(cal, clk.firstChild);
    removeDupes('aCal');
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
        if (tabs[0].title.match(/^Extensions$/)) img.src = '/style/complete/extensions.png';
        else if (tabs[0].title.match(/Settings$/)) img.src = '/style/complete/setting.png';
        else if (tabs[0].title.match(/^Start Page$/)) img.src = '/style/complete/star.png';
        else if (tabs[0].title.match(/^Installed Userscripts$/)) img.src = '/style/complete/tampermonkey16.png';
        else if (tabs[0].title.match(/^YouTube TV$/)) img.src = '/style/complete/youtubetv.png';
        else if (tabs[0].url.match(/https:\/\/www\.aarpmedicareplans/)) img.src = '/style/complete/united.png';
        else if (tabs[0].favIconUrl === '')  img.src = '/style/complete/page.png';
        else img.src = tabs[0].favIconUrl;
      });
    } catch(ex) {}
  }

  function getCurrentTabUpdated() {
    favTimer = setInterval(() => getCurrentTab(), favInterval);
  }

  function getToolbarList(e) {
    e = e.split(',');
    for (let i = e.length - 1; i >= 0; i--) main.insertBefore($q(e[i]), main.firstChild);
  }

  function homeToRestart(e) {
    let homeBtn = $q('button[title="Go to homepage"]'),
        homeBtn2 = $q('button[title="Restart browser"]'),
        homeBtnImg = $q('button[title="Go to homepage"] svg'),
        homeBtnImg2 = $q('button[title="Restart browser"] svg'),
        homeBtnPath = $q('button[title="Go to homepage"] svg > path'),
        homeBtnPath2 = $q('button[title="Restart browser"] svg > path');
    try {
      if (e) {
        homeBtn.id = 'restart-browser';
        homeBtn.className = 'ToolbarButton-Button custom-button';
        homeBtn.title = homeAsRestartTooltip;
        homeBtnImg.style = restartIcon;
        homeBtnPath.style.display = 'none';
      } else {
        homeBtn2.removeAttribute('id');
        homeBtn2.className = 'ToolbarButton-Button';
        homeBtn2.title = 'Go to homepage';
        homeBtnImg2.removeAttribute('style');
        homeBtnPath2.style.display = 'block';
      }
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
      if (ex == "Error: Tabs can't be edited right now.") setTimeout(() => moveTabPosition(e), 50);
  } }

  function onClearField() {
    let browser = $q('#browser'),
        footer = $q('footer'),
        inp11 = $q('#input11');
    inp11.value = '';
    toolbarList = '.mainbar,.bookmark-bar';
    $i(footer, browser.childNodes[1]);
    chrome.storage.local.set({toolbarListKey: toolbarList});
  }

  function onClose() {
    chrome.tabs.onActivated.removeListener(e => moveTabPosition(e));
    chrome.tabs.onHighlighted.removeListener((tabId, changeInfo, tab) => getCurrentTab());
    chrome.tabs.onUpdated.removeListener((tabId, changeInfo, tab) => {
      if (tab.status === 'complete') {
        getCurrentTabUpdated();
        clearInterval(favTimer);
      }
    });
  }

  function optionsMenu() {
    let date = new Date(),
        divX = $c('div', {id: 'options', className: 'button-toolbar'}),
        divY = $c('div', {id: 'options-menu', className: 'options-menu-popup'}),
        browser = $q('#browser'),
        statusBar = $q('.toolbar-statusbar');
    if ($q('#options-button')) return;
    try {
      divX.innerHTML = '\
        <button id="options-button"\
                class="ToolbarButton-Button custom-button"\
                title="'+ optionsMenuTooltip +'"\
                type="button"\
                tabindex="-1">\
          <span>\
            <svg xmlns="http://www.w3.org/2000/svg"\
                 style="'+ optionsIcon +'"/>\
          </span>\
        </button>\
      </div>';
      divY.innerHTML = '\
        <div id="div0">\
          <button id="position-menu"\
                  class="button"\
                  style="'+ positionIcon +'"\
                  title="'+ optionsMenuPositionTooltip +'"></button>\
          <input id="input0"\
                 class="input"\
                 type="number"\
                 disabled="true"\
                 value="'+ positionOptionsMenu +'"/>\
		  <span>Options Menu</span>\
          <button id="options-menu-close"\
                  class="button"\
                  style="'+ closeIcon +'"\
                  title="'+ optionsCloseTooltip +'"></button>\
        </div>\
        <label id="label1"\
               class="label"\
               title="' + label1Tooltip +'">\
          <input id="input1"\
                 class="input"\
                 type="checkbox"/>\
          <span id="span1"\
                class="span">'+ span1Text +'</span>\
        </label>\
        <label id="label3"\
               class="label"\
               title="'+ label3Tooltip +'">\
          <input id="input3"\
                 class="input"\
                 type="checkbox"/>\
          <span id="span3a"\
                class="span">'+ span3aText +'</span>\
          <button id="button3"\
                  class="button"\
                  title="' + button3Tooltip +'">\
            <span id="span3b"\
                  class="span">'+ "Format "+ calendarFormat +'</span>\
          </button>\
        </label>\
        <label id="label4"\
               class="label"\
               title="' + label4Tooltip +'">\
          <input id="input4"\
                 class="input"\
                 type="checkbox"/>\
          <span id="span4"\
                class="span">'+ span4Text +'</span>\
        </label>\
        <label id="label5"\
               class="label"\
               title="'+ label5Tooltip +'">\
          <input id="input5"\
                 class="input"\
                 type="checkbox"/>\
          <span id="span5"\
                class="span">'+ span5Text +'</span>\
        </label>\
		<label id="label7"\
               class="label"\
               title="' + label7Tooltip +'">\
          <input id="input7"\
                 class="input"\
                 type="checkbox"/>\
          <span id="span7"\
                class="span">'+ span7Text +'</span>\
        </label>\
        <label id="label6"\
               class="label"\
               title="' + label6Tooltip +'">\
          <input id="input6"\
                 class="input"\
                 type="checkbox"/>\
          <span id="span6"\
                class="span">'+ span6Text +'</span>\
        </label>\
		<label id="label9"\
               class="label"\
               title="' + label9Tooltip +'">\
          <input id="input9"\
                 class="input"\
                 type="checkbox"/>\
          <span id="span9"\
                class="span">'+ span9Text +'</span>\
        </label>\
        <span id="span10"\
              class="span span-number">\
          <span title="'+ span10aTooltip +'">'+ favIntervalText +'</span>\
          <input id="input10a"\
                 class="input input-timer"\
                 type="number"\
                 value="100"/>\
          <span title="'+ span10bTooltip +'">'+ resizeDelayText +'</span>\
          <input id="input10b"\
                 class="input input-timer"\
                 type="number"\
                 value="100"/>\
        </span>\
        <span id="span11"\
               class="span span-text">\
          <input id="input11"\
                 class="input"\
                 type="text"\
                 value=".mainbar,.bookmark-bar,footer"\
                 spellcheck="false"\
                 title="'+ input11Tooltip +'"/>\
          <span id="span11a"\
                title="'+ span11aTooltip +'">\
            <svg xmlns="http://www.w3.org/2000/svg"\
                 style="'+ clearIcon +'"/>\
          </span>\
        </span>\
        <span id="span12"\
              class="span span-button">\
          <button id="button12a"\
                  class="button"\
                  title="'+ button12aTooltip +'">\
            <span>.mainbar</span>\
          </button>\
          <button id="button12b"\
                  class="button"\
                  title="'+ button12bTooltip +'">\
            <span>.bookmark-bar</span>\
          </button>\
          <button id="button12c"\
                  class="button"\
                  title="'+ button12cTooltip +'">\
            <span>footer</span>\
          </button>\
        </span>\
      </div>';
      statusBar.insertBefore(divX, statusBar.childNodes[2]);
      $i(divY, browser.lastChild);
      $q('div#options-menu #input0').value = positionOptionsMenu;
      $q('div#options-menu #input1').checked = folderImage;
      $q('div#options-menu #input3').checked = showCalendar;
      $q('div#options-menu #input4').checked = homeRestart;
	  $q('div#options-menu #input9').checked = showWorkspaces;
      $q('div#options-menu #input5').checked = favInUrl;
      $q('div#options-menu #input6').checked = closeButton;
      $q('div#options-menu #input7').checked = moveActiveTab;
      $q('div#options-menu #input10a').value = favInterval;
      $q('div#options-menu #input10b').value = resizeDelay;
      $q('div#options-menu #input11').value = toolbarList;
      let ip = $q('#options-menu > label > input[type="checkbox"]', true);
      for (let i = 0; i < ip.length; i++) ip[i].onclick = e => onOptionsMenu(e.target.id);
      $q('#options-button').onclick = () => onOptions();
      $q('#options-menu-close').onclick = () => onOptions();
      $q('#position-menu').onclick = () => onOptionsMenuButton();
      $q('#button3').onclick = () => getCalendarFormat();
      $q('#input10a').onchange = e => onOptionsMenu(e.target.id);
      $q('#input10b').onchange = e => onOptionsMenu(e.target.id);
      $q('#span11a').onclick = () => onClearField();
      $q('#button12a').onclick = e => onSelector('button12a');
      $q('#button12b').onclick = e => onSelector('button12b');
      $q('#button12c').onclick = e => onSelector('button12c');
      removeDupes('options-menu-popup');
    } catch(ex) {}
  }

  function onOptions() {
    let browser = $q('#browser');
    if (browser.hasAttribute('options-menu')) browser.removeAttribute('options-menu');
    else browser.setAttribute('options-menu', true);
    onOptionsMenuPosition(positionOptionsMenu);
    removeDupes('options-menu-popup');
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
	  case 'input9':
        showWorkspaces = el.checked;
        chrome.storage.local.set({showWorkspacesKey: showWorkspaces});
        if (showWorkspaces) browser.setAttribute('show-workspaces', true);
        else browser.removeAttribute('show-workspaces');
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
      case 'input10a':
        favInterval = el.value;
        chrome.storage.local.set({favIntervalKey: favInterval});
        break;
     case 'input10b':
        resizeDelay = el.value;
        chrome.storage.local.set({resizeDelayKey: resizeDelay});
        break;
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
		height = window.innerHeight,
        header = $q('#header'),
        headerHeight = header.clientHeight,
        inner = $q('.inner'),
        innerTop = inner.offsetTop,
        menu = $q('#options-menu'),
        menuHeight = menu.clientHeight,
        menuWidth = menu.clientWidth;
    switch (e) {
      case '1':
        menu.style.top = headerHeight + innerTop + 2 + 'px';
        menu.style.left = 0;
        break;
      case '2':
        menu.style.top = headerHeight + innerTop + 2 + 'px';
        menu.style.left = (width / 2) - (menuWidth / 2) + 'px';
        break;
      case '3':
        menu.style.top = headerHeight + innerTop + 2 + 'px';
        menu.style.left = (width - menuWidth) - 10 + 'px';
        break;
      case '4':
        menu.style.top = (height / 2) - (menuHeight / 2) + 'px';
        menu.style.left = (width / 2) - (menuWidth / 2) + 'px';
  } }

  function onResize() {
    let browser = $q('#browser');
    try {
      getCalendarHolder();
      chrome.storage.local.get(['resizeDelayKey'], result => { resizeDelay = result.resizeDelayKey; });
      if (browser.hasAttribute('options-menu')) browser.removeAttribute('options-menu');
	  optionsMenu();
	  removeDupes('options-menu-popup');
	  getToolbarList(toolbarList);
    } catch(ex) {}
  }

  function onSelector(e) {
    let inp11 = $q('#input11');
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
        break;
    }
    toolbarList = inp11.value;
	getToolbarList(toolbarList);
    chrome.storage.local.set({toolbarListKey: toolbarList});
  }

  function removeDupes(className) {
    let dupe = document.getElementsByClassName(className);
    if(dupe.length > 1) for(let i = 1; i < dupe.length; i++) dupe[i].parentNode.removeChild(dupe[i]);
  }

  chrome.storage.local.get(['closeButtonKey'], result => {
    closeButton = result.closeButtonKey;
    customClose(closeButton);
  });

  chrome.storage.local.get(['calendarFormatKey'], result => {
    calendarFormat = result.calendarFormatKey;
    aCalendar(calendarFormat);
  });

  chrome.storage.local.get(['favIntervalKey'], result => {
    favInterval = result.favIntervalKey;
  });

  chrome.storage.local.get(['favInUrlKey'], result => {
    favInUrl = result.favInUrlKey;
    favImage(favInUrl);
  });

  chrome.storage.local.get(['folderImageKey'], result => {
    folderImage = result.folderImageKey;
    customFolder(folderImage);
  });

  chrome.storage.local.get(['homeRestartKey'], result => {
    homeRestart = result.homeRestartKey;
    homeToRestart(homeRestart);
  });

  chrome.storage.local.get(['moveActiveTabKey'], result => {
    moveActiveTab = result.moveActiveTabKey;
    moveTab(moveActiveTab);
  });

  chrome.storage.local.get(['positionOptionsMenuKey'], result => {
    positionOptionsMenu = result.positionOptionsMenuKey;
  });

  chrome.storage.local.get(['resizeDelayKey'], result => {
    resizeDelay = result.resizeDelayKey;
  });

  chrome.storage.local.get(['showCalendarKey'], result => {
    showCalendar = result.showCalendarKey;
  });

  chrome.storage.local.get(['showWorkspacesKey'], result => {
    showWorkspaces = result.showWorkspacesKey;
  });

  chrome.storage.local.get(['toolbarListKey'], result => {
    toolbarList = result.toolbarListKey;
  });

  chrome.tabs.onActivated.addListener(e => moveTabPosition(e));

  chrome.tabs.onHighlighted.addListener((tabId, changeInfo, tab) =>
    getCurrentTab());

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status === 'complete') {
      getCurrentTabUpdated();
      clearInterval(favTimer);
    }
  });
  
  window.onload = () => setTimeout(() => {
    if (!toolbarList) toolbarList = '.mainbar,.bookmark-bar';
    chrome.storage.local.get(['calendarFormatKey'], result => {
      calendarFormat = result.calendarFormatKey;
      aCalendar(calendarFormat);
    });
    chrome.storage.local.get(['favIntervalKey'], result => {
      favInterval = result.favIntervalKey;
    });
    chrome.storage.local.get(['moveActiveTabKey'], result => {
      moveActiveTab = result.moveActiveTabKey;
      moveTab(moveActiveTab);
    });
    chrome.storage.local.get(['positionOptionsMenuKey'], result => {
      positionOptionsMenu = result.positionOptionsMenuKey;
    });
    chrome.storage.local.get(['resizeDelayKey'], result => {
      resizeDelay = result.resizeDelayKey;
    });
    chrome.storage.local.get(['showCalendarKey'], result => {
      showCalendar = result.showCalendarKey;
    });
	chrome.storage.local.get(['showWorkspacesKey'], result => {
      showWorkspaces = result.showWorkspacesKey;
    });
    chrome.storage.local.get(['toolbarListKey'], result => {
      toolbarList = result.toolbarListKey;
      getToolbarList(toolbarList);
    });
    initialize()}, initializeDelay);

  window.onresize = () => setTimeout(() => onResize(), resizeDelay);

  window.ondrop = e => {
    e.preventDefault();
    homeToRestart(homeRestart);
  };

  window.onunload = () => {
    clearInterval(favTimer);
    chrome.storage.local.set({closeButtonKey: closeButton});
    chrome.storage.local.set({calendarFormatKey: calendarFormat});
    chrome.storage.local.set({favIntervalKey: favInterval});
    chrome.storage.local.set({favInUrlKey: favInUrl});
    chrome.storage.local.set({folderImageKey: folderImage});
    chrome.storage.local.set({homeRestartKey: homeRestart});
    chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
    chrome.storage.local.set({positionOptionsMenuKey: positionOptionsMenu});
    chrome.storage.local.set({resizeDelayKey: resizeDelay});
    chrome.storage.local.set({showCalendarKey: showCalendar});
	chrome.storage.local.set({showWorkspacesKey: showWorkspaces});
    chrome.storage.local.set({toolbarListKey: toolbarList});
    onClose();
  };

})();

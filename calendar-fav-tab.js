(function() {

  'use strict';

  const initializeDelay = 20,
        resizeDelay = 20,
        calendarImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDElEQVR42mNkgAJNLW3Wmobm5o6WxtrLly7+ZsACQGqq6xubO9uaay9fhKhhhEk2l5SEWfkHrzy1ZUN4ZWfnKmwGNBcVhVkFhq48tW1zeGV72yqIAWlnQoE0iBO2yPPpqrjt0mFQPjaAriYMZMB/qOTq2fonQlMvWqwGskNxGIChBtkAsAI8mrGqQTeAZMB4//HT/zw83AyMjIwkafz//z/Dly9fGRhfv//w//efPxgKvn37zsDFxYmXZmZiwm3AjOkzGeLi4xgWLVyEk05MTEAYQIyNOF3w8dNnvDYNdxccPH7qupaGmgY4UZCQFkDp4Pbd+wyM4uISXEGh4a4QAxhYiTeA4fe61St3AwAy4A8aN0N/QAAAAABJRU5ErkJggg==',
		calendarImageTooltip = 'Click to Sow/Hide Calendar',
		calendarTooltip = '\u2022 Mouseover to reset Calendar\n\u2022 Left-click to change format',
		moveBtn = 'background: url(/style/calendar-fav-tab/move.png) center no-repeat',
		favBtn = 'background: url(/style/calendar-fav-tab/page.png) center no-repeat',
		moveTabTooltip = 'Activate/Deactivate move active tab function',
		urlFavTooltip = 'Show/Hide site favicon in urlbar',
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
      favInterval,
      favInUrl,
      favTimer,
	  moveActiveTab,
      showCalendar;

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

  function $q(el, all) {
    if (all) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function removeDupes(className) {
    let dupe = document.getElementsByClassName(className);
    if(dupe.length > 1) for(let i = 1; i < dupe.length; i++) dupe[i].parentNode.removeChild(dupe[i]);
  }

  function initialize() {
	let browser = $q('#browser'),
	    mainbar = $q('.toolbar-mainbar'),
	    div = $c('div', {className: 'button-toolbar move-tab-button'}),
	    btn = $c('button', {id: 'move-button', className: 'ToolbarButton-Button optBtn', style: moveBtn, title: moveTabTooltip}, [{type: 'click', fn: function () {setTabMoveStatus()}}]),
		btn2 = $c('button', {id: 'fav-button', className: 'ToolbarButton-Button favBtn', style: favBtn, title: urlFavTooltip}, [{type: 'click', fn: function () {setFavStatus()}}]);
    try {
	  chrome.storage.local.get(['showCalendarKey'], result => {
        showCalendar = result.showCalendarKey;
        if (showCalendar) browser.setAttribute('show-calendar', true);
        else browser.removeAttribute('show-calendar');
      });
	  chrome.storage.local.get(['calendarFormatKey'], result => {
        calendarFormat = result.calendarFormatKey.toString();
		if (!calendarFormat) calendarFormat = '1';
        if (showCalendar) browser.setAttribute('show-calendar', calendarFormat);
        else browser.removeAttribute('show-calendar');
      });
      getCalendarHolder(calendarFormat);
    } catch(ex) {}
	try {
      chrome.storage.local.get(['favInUrlKey'], result => {
        favInUrl = result.favInUrlKey;
        if (favInUrl) {
          browser.setAttribute('fav-in-url', true);
          favImage(favInUrl);
        } else browser.removeAttribute('fav-in-url');
      });
    } catch(ex) {}
	try {
	  chrome.storage.local.get(['moveActiveTabKey'], result => {
        moveActiveTab = result.moveActiveTabKey;
        if (moveActiveTab) moveTab(moveActiveTab);
      });
	  div.appendChild(btn);
	  div.appendChild(btn2);
	  mainbar.insertBefore(div, mainbar.childNodes[2]);
	  moveTab(moveActiveTab);
    } catch(ex) {}
	removeDupes('move-tab-button');
  }

  function aCalendar(e) {
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
    switch (e) {
      case '1': return ww + space + bullet + space + mmmm + space + ddd + comma + space + yyyy; // Monday ? January 1st, 2023
      case '2': return w + space + bullet + space + mmm + space + d + comma + space + yyyy; // Mon. ? Jan. 1, 2023
	  case '3': return ww + space + bullet + space + mm + slash + dd + slash + yyyy; // Monday ? 01/01/2023
	  case '4': return w + space + bullet + space + mm + hyphen + dd + hyphen + yyyy; // Mon. ? 01-01-2023
  } }

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
  
  function getCalendar(e) {
	let spn = $q('span#calendar-span');
	if (showCalendar === true) showCalendar = false;
	else showCalendar = true;
	chrome.storage.local.set({showCalendarKey: showCalendar});
    if (showCalendar) {
	  browser.setAttribute('show-calendar', true);
	  spn.style.display = "block";
	} else {
	  browser.removeAttribute('show-calendar');
	  spn.style.display = "none";
	}
    spn.textContent = aCalendar(e);
  }

  function getCalendarFormat() {
    let spn = $q('#calendar-span');
    if (!showCalendar) return;
	if (calendarFormat === '1') calendarFormat = '2';
	else if (calendarFormat === '2') calendarFormat = '3';
	else if (calendarFormat === '3') calendarFormat = '4';
	else calendarFormat = '1';
    chrome.storage.local.set({calendarFormatKey: calendarFormat.toString()});
    spn.textContent = aCalendar(calendarFormat);
  }

  function getCalendarHolder(e) {
    let statusbar = $q('.toolbar-statusbar'),
	    img = $c('img', {id: 'calendar-image', className: 'aImg', src: calendarImage, style: 'margin: -3px 0 0 0;', title: calendarImageTooltip}, [{type: 'click', fn: function () {getCalendar(calendarFormat)}}]),
	    spn = $c('span', {id: 'calendar-span', className: 'aCal', title: calendarTooltip}, [{type: 'mouseover', fn: function () {getCalendarText(calendarFormat)}}]);
	statusbar.insertBefore(img, statusbar.lastChild);
	statusbar.insertBefore(spn, statusbar.lastChild);
	spn.textContent = aCalendar(e);
	spn.onclick = function () { getCalendarFormat() }
    removeDupes('aCal');
	removeDupes('aImg');
  }

  function getCalendarText(e) {
    let spn = $q('span#calendar-span');
	spn.textContent = aCalendar(e);
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
		if (tabs[0].title.match(/Extensions$/)) img.src = '/style/calendar-fav-tab/extensions.png';
        else if (tabs[0].title.match(/Start Page$/)) img.src = '/style/calendar-fav-tab/star.png';
        else if (tabs[0].title.match(/Installed Userscripts$/)) img.src = '/style/calendar-fav-tab/tampermonkey16.png';
        else if (tabs[0].title.match(/YouTube TV$/)) img.src = '/style/calendar-fav-tab/youtubetv.png';
        else if (!tabs[0].favIconUrl)  img.src = '/style/calendar-fav-tab/page2.png';
        else img.src = tabs[0].favIconUrl;
      });
    } catch(ex) {}
  }

  function getCurrentTabUpdated() {
    favTimer = setInterval(() => getCurrentTab(), favInterval);
  }

  function moveTab(e) {
	let browser = $q('#browser');
    try {
      chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
      if (e) {
        browser.setAttribute('move-tab', true);
        chrome.tabs.query({currentWindow: true, active: true}, tabs => chrome.tabs.move(tabs[0].id, {index: 0}));
      } else {
	    browser.removeAttribute('move-tab');
		chrome.tabs.onActivated.removeListener(e => moveTabPosition(e));
	  }
    } catch(ex) {}
  }

  function moveTabPosition(e) {
    try {
      if (moveActiveTab) chrome.tabs.move(e.tabId, {index: 0});
    } catch (ex) { if (ex == "Error: Tabs can't be edited right now.") setTimeout(e => moveTabPosition(e), 100) }
  }

  function onClose() {
    chrome.tabs.onHighlighted.removeListener((tabId, changeInfo, tab) => getCurrentTab());
    chrome.tabs.onUpdated.removeListener((tabId, changeInfo, tab) => {
      if (tab.status === 'complete') {
        getCurrentTabUpdated();
        clearInterval(favTimer);
      }
    });
	chrome.tabs.onActivated.removeListener(e => moveTabPosition(e));
	chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
  }
  
  function onResize() {
    try {
	  initialize();
    } catch(ex) {}
  }

  function setFavStatus() {
	let browser = $q('#browser');
	favInUrl !== true ? favInUrl = true : favInUrl = false;
    chrome.storage.local.set({favInUrlKey: favInUrl});
	if (favInUrl) {
	  browser.setAttribute('fav-in-url', true);
	  moveTab(moveActiveTab);
	  favImage(favInUrl);
    } else browser.removeAttribute('fav-in-url');
  }
  
  function setTabMoveStatus() {
	let browser = $q('#browser');
	moveActiveTab !== true ? moveActiveTab = true : moveActiveTab = false;
    chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
	if (moveActiveTab) {
	  browser.setAttribute('move-tab', true);
	  moveTab(moveActiveTab);
    } else browser.removeAttribute('move-tab');
  }

  chrome.storage.local.get(['calendarFormatKey'], result => {
    calendarFormat = result.calendarFormatKey.toString();
    aCalendar(calendarFormat);
  });

  chrome.storage.local.get(['showCalendarKey'], result => {
    showCalendar = result.showCalendarKey;
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status === 'complete') {
      getCurrentTabUpdated();
      clearInterval(favTimer);
    }
  });

  chrome.storage.local.get(['favIntervalKey'], result => {
    favInterval = result.favIntervalKey;
  });

  chrome.tabs.onActivated.addListener(e => moveTabPosition(e));
  
  chrome.storage.local.get(['moveActiveTabKey'], result => {
    moveActiveTab = result.moveActiveTabKey;
    moveTab(moveActiveTab);
  });
  
  window.onload = () => setTimeout(() => {
	chrome.storage.local.get(['showCalendarKey'], result => {
      showCalendar = result.showCalendarKey;
    });
	chrome.storage.local.get(['calendarFormatKey'], result => {
      calendarFormat = result.calendarFormatKey.toString();
      aCalendar(calendarFormat);
    });
	chrome.storage.local.get(['moveActiveTabKey'], result => {
      moveActiveTab = result.moveActiveTabKey;
      moveTab(moveActiveTab);
    });
    initialize()}, initializeDelay);

  window.onresize = () => setTimeout(() => onResize(), resizeDelay);

  window.onunload = () => {
    chrome.storage.local.set({showCalendarKey: showCalendar});
	chrome.storage.local.set({calendarFormatKey: calendarFormat.toString()});
	clearInterval(favTimer);
    chrome.storage.local.set({favIntervalKey: favInterval});
    onClose();
  };

})();

(() => {

  'use strict';

  const $c = (type, props, evls) => {
    const node = document.createElement(type);
    if (props && typeof props === 'object' && !Array.isArray(props)) {
      Object.entries(props).forEach(([key, value]) => {
        if (key in node && typeof node[key] !== 'undefined') node[key] = value;
        else node.setAttribute(key, value);
      });
    }
    if (Array.isArray(evls)) {
      evls.forEach(({ type: eventType, fn }) => {
        if (typeof eventType === 'string' && typeof fn === 'function') node.addEventListener(eventType, fn, false);
      });
    }
    return node;
  };

  const $q = (sel, all = false) => all ? document.querySelectorAll(sel) : document.querySelector(sel);

  const insertAfter = (newNode, ref) => ref?.parentNode?.insertBefore(newNode, ref.nextSibling ?? null);

  const removeDupes = (className) => {
    const elements = document.getElementsByClassName(className);
    if (elements.length <= 1) return;
    [...elements].slice(1).forEach(el => el.remove());
  };

  const Icons = {
    back:        'background: url(/style/icons/back.png) center no-repeat',
    background:  'background: url(/style/icons/background.png) center no-repeat',
    clear:       'background: url(/style/icons/delete.png) center no-repeat',
	clock:       'background: url(/style/icons/clock.png) center no-repeat',
    dialogClose: 'background: url(/style/icons/dialogclose.png) center no-repeat',
    ellipsis:    'background: url(/style/icons/ellipsis.png) center no-repeat',
    extension:   'background: url(/style/icons/extension.png) center no-repeat',
    folder:      'background: url(/style/icons/folder.png) center no-repeat',
    foreground:  'background: url(/style/icons/foreground.png) center no-repeat',
    forward:     'background: url(/style/icons/forward.png) center no-repeat',
    mask:        'background: url(/style/icons/mask16.png) center no-repeat',
	move:        'background: url(/style/icons/move.png) center no-repeat',
    options:     'background: url(/style/icons/options.png) center no-repeat',
    optionsOn:   'background: url(/style/icons/optionsOn.png) center no-repeat',
    profile:     'background: url(/style/icons/profile.png) center no-repeat',
    restart:     'background: url(/style/icons/restart.png) center no-repeat',
    rewind:      'background: url(/style/icons/rewind.png) center no-repeat',
    star:        'background: url(/style/icons/star.png) center no-repeat',
    start:       'background: url(/style/icons/start.png) center no-repeat',
	styledClose: 'background: url(/style/icons/styledclose.png) center no-repeat',
    synced:      'background: url(/style/icons/synced.png) center no-repeat',
	toggle:      'background: url(/style/icons/toggle.png) center no-repeat',
    workspaces:  'background: url(/style/icons/workspaces.png) center no-repeat'
  };

  const Symbols = {
    arrow:        '\u21D2', // ⇒
    asterisk:     '*',
	bracketClose: ']',
	bracketOpen:  '[',
    bullet:       '\u2022', // •
    colon:        ':',
	colons:       '::',
	comma:        ',',
	downArrow:    '\u25BC', // ▼
	gt:           '>',
	hyphen:       '-',
	lt:           '<',
	pointer:      '\u25BA', // ►
	slash:        '/',
	star:         '\u2606' // ☆
  };

  const Texts = {
	calendarTooltip:    '\u2022 Mouseover to update Calendar\n\u2022 Left-click to change format',
	favInterval:        'Fav Interval',
    optionsClose:       'Closes options menu',
    optionsMenu:        'Options Menu',
    optionsMenuTooltip: 'Open/Close Options Menu',
	resizeDelay:        'Resize Delay',
	setOrder:           'Set Toolbar Order',
	toggleTooltip:      'Hide/Show Toolbars Except Tabs',
	button12a:          'Click to insert selector\nWill ignore duplicate entries',
    button12b:          'Click to insert selector\nWill ignore duplicate entries',
    button12c:          'Click to insert selector\nWill ignore duplicate entries',
	label0:             'Enter desired keyCode\n\u2022 Ex: Ctrl+Alt+T\n\u2022 Ex: F9',
    label1:             'Replaces bookmark folders wtih custom icon',
	label2:             'Custom CSS',
	label3:             'Calendar Formats:\n 1 = '+calendarFormats(1)+'\n 2 = '+calendarFormats(2)+'\n 3 = '+calendarFormats(3)+'\n 4 = '+calendarFormats(4)+'',
	label4:             'In Settings > General > Homepage >\nSpecific Page > enter: vivaldi://restart',
	label5:             'Displays site favicon in urlbar',
	label6:             'Tabs close buttons styled',
	label7:             'Moves clicked/active tab to first position in tabbar',
	label8:             'Extension Icons large',
	label9:             'Show/Hide Workspaces Menu Button In Tabbar',
	label13:            'Show/Hide Rewind and Forward buttons',
	label14:            'Show/Hide Search Field Input Box',
	label15:            'Show/Hide Toolbar Toggle Button\nToggles Any/All Except Tabbar',
	label16:            'Hide Footer when toggled',
	label17:            'Hide Bookmark-bar when toggled',
	label18:            'Hide Mainbar when toggled',
	label22:            'Clock Formats:\n 1 = '+getTimeFormats(1)+'  12hr\n 2 = '+getTimeFormats(2)+'  12hr\n 3 = '+getTimeFormats(3)+'  24hr\n 4 = '+getTimeFormats(4)+'  24hr\n 2 & 4 updates every second\n 1 & 3 updates every 10 seconds',
	input10a:           '400 - 1000 Default: 1000 (milliseconds)',
	input10b:           '400 - 1000 Default: 1000 (milliseconds)',
	span0a:             'Toggle Auto Hide Tabbar',
    span1:              'Bookmark Folder Custom Icon',
    span2:              'Custom CSS (For Future Use)',
    span3a:             'Calendar Before Clock',
    span4:              'Home Button To Restart Button',
    span5:              'Site Favicon In Urlbar',
    span6:              'Tabs Close Button Styled',
    span7:              'Tab Active Moves To First Position',
    span8:              'Extension Icons Large',
    span9:              'Workspaces Menu Button',
    span10a:            'Increase time in milliseconds to acquire site favicon before sending to urlbar',
    span10b:            'Increase time in milliseconds for toolbars to properly load after exiting fullscreen mode',
    span11a:            'Clear input field',
	span13:             'Rewind / Fast Forward Buttons',
	span14:             'Search Field Input Box',
	span15:             'Toggle Toolbars Button',
    span16:             'Hide Footer',
    span17:             'Hide Bookmark-bar',
    span18:             'Hide Mainbar',
	span22:             'Custom Clock'
  };

  const Timers = { delayedInitializeInt: 200, clockLongInt: 10000, clockShortInt: 1000, initializeInt: 20 };

  let calendarFormat = 1,
      clockTimer = null,
      closeButton = false,
	  customCss = false,
	  extensionIcons = false,
	  extensionToggle = false,
      favInterval = 1000,
      favInUrl = false,
      favTimer = null,
      folderImage = false,
	  hideBookmark = false,
	  hideFooter = false,
	  hideMainbar = false,
      homeRestart = false,
	  initInterval = null,
	  keyCodes = 'F9',
      moveActiveTab = false,
      positionOptionsMenu = 1,
      resizeDelay = 1000,
	  rewindForward = false,
	  searchbar = false,
      showCalendar = false,
	  showWorkspaces = false,
      timeFormat = 1,
	  toolbarList = '.mainbar,.bookmark-bar',
	  toolbarToggle = false,
      viewClock = false;

  async function initialize() {
    const browser   = $q('#browser'),
          statusBar = $q('.toolbar-statusbar'),
          footer2   = $q('.dialog-footer'),
          exts      = $q('.toolbar-extensions > .button-toolbar'),
          workspace = $q('div.button-toolbar.tabbar-workspace-button > button.ToolbarButton-Button > span.button-title');
    window.removeEventListener('load', delayedInitialize);
    function delayedInitialize() {
      setTimeout(initialize, Timers.delayedInitializeInt);
    }
    const get = (key, defaultValue = undefined) => chrome.storage.local.get(key).then(result => result[key] ?? defaultValue);
    try {
      // ── Calendar settings ───────────────────────────────────────
      const calendarFormat = await get('calendarFormatKey', 1);
      showCalendar = await get('showCalendarKey', false);
	  browser?.[showCalendar ? 'setAttribute' : 'removeAttribute']('show-calendar', true);
      // ── Close button ─────────────────────────────────────────────
      closeButton = await get('closeButtonKey');
      browser?.[closeButton ? 'setAttribute' : 'removeAttribute']('custom-close', true);
      // ── Custom CSS ───────────────────────────────────────────────
      customCss = await get('customCssKey');
	  browser?.[customCss ? 'setAttribute' : 'removeAttribute']('custom-css', true);
      // ── Favicon interval ─────────────────────────────────────────
      const favIntervalRaw = await get('favIntervalKey');
      const favVal = Number(favIntervalRaw);
      favInterval = Number.isInteger(favVal) && favVal >= 400 && favVal <= 10000 ? favVal : 1000;
      // ── Favicon in URL ───────────────────────────────────────────
      favInUrl = await get('favInUrlKey');
	  browser?.[favInUrl ? 'setAttribute' : 'removeAttribute']('fav-in-url', true);
      if (favInUrl) favImage(favInUrl);
      // ── Custom folder icons ──────────────────────────────────────
      folderImage = await get('folderImageKey');
	  browser?.[folderImage ? 'setAttribute' : 'removeAttribute']('custom-folder', true);
      // ── Extension icons ──────────────────────────────────────────
      extensionIcons = await get('extensionIconsKey');
	  browser?.[extensionIcons ? 'setAttribute' : 'removeAttribute']('extension-icons', true);
      // ── Extension toggle ─────────────────────────────────────────
      extensionToggle = await get('extensionToggleKey', true);
	  browser?.[extensionToggle ? 'setAttribute' : 'removeAttribute']('extension-toggle', true);
      // ── Hide various UI parts ────────────────────────────────────
      hideFooter   = await get('hideFooterKey', false);
	  browser?.[hideFooter ? 'setAttribute' : 'removeAttribute']('hide-footer', true);
      hideBookmark = await get('hideBookmarkKey', false);
	  browser?.[hideBookmark ? 'setAttribute' : 'removeAttribute']('hide-bookmark', true);
      hideMainbar  = await get('hideMainbarKey', false);
	  browser?.[hideMainbar ? 'setAttribute' : 'removeAttribute']('hide-mainbar', true);
	  // ──  Home to restart button ──────────────────────────────────
	  homeRestart = await get('homeRestartKey');
	  if (homeRestart) homeToRestart(homeRestart);
	  browser?.[homeRestart ? 'setAttribute' : 'removeAttribute']('home-to-restart', true);
      // ── Keyboard codes ───────────────────────────────────────────
      keyCodes = await get('keyCodesKey');
      // ── Move active tab ──────────────────────────────────────────
      moveActiveTab = await get('moveActiveTabKey');
      if (moveActiveTab) moveTab(moveActiveTab);
	  browser?.[moveActiveTab ? 'setAttribute' : 'removeAttribute']('move-active-tab', true);
      // ── Options menu position ────────────────────────────────────
	  positionOptionsMenu = Number(await get('positionOptionsMenuKey', 1));
      // ── Resize delay ─────────────────────────────────────────────
      const resizeRaw = await get('resizeDelayKey');
      const resizeVal = Number(resizeRaw);
      resizeDelay = Number.isInteger(resizeVal) && resizeVal >= 400 && resizeVal <= 10000 ? resizeVal : 1000;
      // ── Rewind / Forward ─────────────────────────────────────────
      rewindForward = await get('rewindForwardKey', false);
	  browser?.[rewindForward ? 'setAttribute' : 'removeAttribute']('rewind-forward', true);
      // ── Searchbar ────────────────────────────────────────────────
      searchbar = await get('searchbarKey', false);
	  browser?.[searchbar ? 'setAttribute' : 'removeAttribute']('searchbar', true);
      // ── Workspaces ───────────────────────────────────────────────
      showWorkspaces = await get('showWorkspacesKey', false);
	  browser?.[showWorkspaces ? 'setAttribute' : 'removeAttribute']('show-workspaces', true);
      // ── Toolbar list & footer-in-header ──────────────────────────
      toolbarList = await get('toolbarListKey');
      if (toolbarList) {
        getToolbarList(toolbarList);
		browser?.[toolbarList.includes('footer') ? 'setAttribute' : 'removeAttribute']('footer-in-header', true);
      }
      // ── Toolbar toggle ───────────────────────────────────────────
      toolbarToggle = await get('toolbarToggleKey', false);
	  browser?.[toolbarToggle ? 'setAttribute' : 'removeAttribute']('toolbar-toggle', true);
      // ── View clock  ──────────────────────────────────────────────
      viewClock = await get('viewClockKey', false);
      browser?.[viewClock ? 'setAttribute' : 'removeAttribute']('view-clock', `Format ${timeFormat}`);
      // ── Final DOM mutations (after all settings are applied) ─────
      if (exts) exts.style.setProperty('--extensionsExpanded', '1');
      if (footer2 && !browser.contains(footer2)) browser.appendChild(footer2);
      if (workspace) workspace.innerHTML = '';
      setCalendarHolder();
      setOptionsButton();
      setOptionsMenu();
      setToggleButton();
    } catch (err) { console.error('Initialization failed:', err); }
	if (viewClock) startClock();
	loadAllSettings();
  }

  async function loadAllSettings() {
    const defaults = {
      calendarFormatKey:      1,
      closeButtonKey:         false,
      customCssKey:           false,
      extensionIconsKey:      false,
      extensionToggleKey:     false,
      favIntervalKey:         1000,
      favInUrlKey:            false,
      folderImageKey:         false,
      hideFooterKey:          false,
      hideBookmarkKey:        false,
      hideMainbarKey:         false,
      homeRestartKey:         false,
      keyCodesKey:            'F9',
      moveActiveTabKey:       false,
      positionOptionsMenuKey: 1,
      resizeDelayKey:         1000,
      rewindForwardKey:       false,
      searchbarKey:           false,
      showCalendarKey:        false,
      showWorkspacesKey:      false,
      timeFormatKey:          2,
      toolbarListKey:         '.mainbar,.bookmark-bar',
      toolbarToggleKey:       false,
      viewClockKey:           false
    };
    try {
      const result = await chrome.storage.local.get(Object.keys(defaults));
      calendarFormat      = result.calendarFormatKey      ?? defaults.calendarFormatKey;
      closeButton         = result.closeButtonKey         ?? defaults.closeButtonKey;
      customCss           = result.customCssKey           ?? defaults.customCssKey;
      extensionIcons      = result.extensionIconsKey      ?? defaults.extensionIconsKey;
      extensionToggle     = result.extensionToggleKey     ?? defaults.extensionToggleKey;
      let favVal    = Number(result.favIntervalKey ?? defaults.favIntervalKey);
      favInterval   = Number.isInteger(favVal) && favVal >= 400 && favVal <= 10000 ? favVal : defaults.favIntervalKey;
      favInUrl            = result.favInUrlKey    ?? defaults.favInUrlKey;
      folderImage         = result.folderImageKey ?? defaults.folderImageKey;
      hideFooter          = result.hideFooterKey    ?? defaults.hideFooterKey;
      hideBookmark        = result.hideBookmarkKey  ?? defaults.hideBookmarkKey;
      hideMainbar         = result.hideMainbarKey   ?? defaults.hideMainbarKey;
      homeRestart         = result.homeRestartKey ?? defaults.homeRestartKey;
      keyCodes            = result.keyCodesKey ?? defaults.keyCodesKey;
      moveActiveTab       = result.moveActiveTabKey ?? defaults.moveActiveTabKey;
      positionOptionsMenu = result.positionOptionsMenuKey ?? defaults.positionOptionsMenuKey;
      let resizeVal = Number(result.resizeDelayKey ?? defaults.resizeDelayKey);
      resizeDelay   = Number.isInteger(resizeVal) && resizeVal >= 400 && resizeVal <= 10000 ? resizeVal : defaults.resizeDelayKey;
      rewindForward       = result.rewindForwardKey   ?? defaults.rewindForwardKey;
      searchbar           = result.searchbarKey       ?? defaults.searchbarKey;
      showCalendar        = result.showCalendarKey    ?? defaults.showCalendarKey;
      showWorkspaces      = result.showWorkspacesKey  ?? defaults.showWorkspacesKey;
      timeFormat          = result.timeFormatKey      ?? defaults.timeFormatKey;
      toolbarList         = result.toolbarListKey     ?? defaults.toolbarListKey;
      toolbarToggle       = result.toolbarToggleKey   ?? defaults.toolbarToggleKey;
      viewClock           = result.viewClockKey       ?? defaults.viewClockKey;
      calendarFormats(calendarFormat);
      customClose(closeButton);
      customizeCSS(customCss);
      favImage(favInUrl);
      customFolder(folderImage);
      homeToRestart(homeRestart);
      moveTab(moveActiveTab);
	  setClockHolder();
      if (viewClock) startClock();
      // ... add any others that need to be called right after loading
    } catch (err) {
      console.error('Failed to load settings:', err);
  } }

  function calendarFormats(int) {
	let date = new Date();
    if (!Number.isInteger(int) || int < 1 || int > 4) {
      throw new RangeError('int must be an integer between 1 and 4');
    }
    const locale = 'en-US'; // change to navigator.language or prop if needed
    const parts = new Intl.DateTimeFormat(locale, {
      weekday: 'long',     // Monday
      month:   'long',     // January
      day:     'numeric',  // 1
      year:    'numeric',  // 2026
    }).formatToParts(date);
    const map = Object.fromEntries(parts.map(p => [p.type, p.value])),
          weekdayLong  = map.weekday,                                                                        // Monday
          weekdayShort = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date),                 // Mon
          monthLong    = map.month,                                                                          // January
          monthShort   = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date),                   // Jan
          monthNumeric = new Intl.DateTimeFormat(locale, { month: 'numeric' }).format(date),                 // 1
          month2Digit  = new Intl.DateTimeFormat(locale, { month: '2-digit' }).format(date),                 // 01
          day          = map.day,                                                                            // 1
          dayPadded    = String(day).padStart(2, '0'),                                                       // 01
		  suffix       = ['th','st','nd','rd'][(day%10>3||Math.floor(day/10)===1?0:day%10)] || 'th',
		  ordinal      = String(day) + suffix,                                                               // 1st
          year         = map.year,                                                                           // 2026
          yearShort    = year.slice(-2);                                                                     // 26
          
    switch (int) {
      case 1: return `${weekdayLong} ${Symbols.arrow} ${monthLong} ${ordinal}, ${year}`; // Monday ⇒ January 1st, 2026
      case 2: return `${weekdayShort} ${Symbols.asterisk} ${monthShort} ${day}, ${year}`; // Mon. * Jan. 1, 2026
      case 3: return `${weekdayLong} ${Symbols.bullet} ${monthNumeric}/${dayPadded}/${year}`; // Monday • 1/01/2026
      case 4: return `${weekdayShort} ${Symbols.colons} ${month2Digit}-${dayPadded}-${year}`; // Mon. :: 01-01-2026
      default: return `${weekdayLong} ${Symbols.arrow} ${monthLong} ${ordinal}, ${year}`; // Monday ⇒ January 1st, 2026;
  } }

  function customClose(e) {
    const browser = $q('#browser');
	browser?.[e ? 'setAttribute' : 'removeAttribute']('custom-close', true);
  }

  function customizeCSS(e) {
	const browser = $q('#browser');
	browser?.[e ? 'setAttribute' : 'removeAttribute']('custom-css', true);
  }

  function customFolder(e) {
    const browser = $q('#browser');
	browser?.[e ? 'setAttribute' : 'removeAttribute']('custom-folder', true);
  }

  function favImage(e) {
    const browser = $q('#browser'),
	      favImg = $q('#favImg'),
          field = $q('.UrlField'),
          img = $c('img', {id: 'favImg'});
    try {
      if (favImg) {
        field.removeChild(img);
        return;
      }
	  browser?.[e ? 'setAttribute' : 'removeAttribute']('fav-in-url', true);
      field.insertBefore(img, field.firstChild);
      getCurrentTabUpdated();
    } catch(ex) {}
  }

  function getCalendarFormat() {
    if (!showCalendar) return;
    calendarFormat = (calendarFormat % 4) + 1;
    chrome.storage.local.set({ calendarFormatKey: calendarFormat });
    $q('#input3').value = calendarFormat;
    $q('#span3b').textContent = `Format ${calendarFormat}`;
    $q('#calendar').textContent =  calendarFormats(calendarFormat);
  }

  function getCalendarText() {
	if (!showCalendar) return;
    $q('#calendar').textContent = calendarFormats(calendarFormat);
  }

  function getCurrentTab() {
	const TARGET_SELECTOR = '#webview-container',
	      container = $q(TARGET_SELECTOR),
          SHIFT_PX = '-3px 0px',
          sitesToShift = ['https://www.youtube.com','https://forum.vivaldi.net'],
          field = $q('.UrlField'),
          img = $q('#favImg'),
		  current = $q('#currentI');
	if (!container) console.warn('Webview container not found');
    chrome.tabs.query({currentWindow: true, active: true}, ([tab]) => {
      let shouldShift = sitesToShift.some(site => tab.url.startsWith(site));
      container.style.margin = shouldShift ? SHIFT_PX : '0px';
      if (tab.favIconUrl) {
        try {
          let url = new URL(tab.favIconUrl);
          if (!['http:', 'https:', 'data:'].includes(url.protocol)) img.src = '/style/icons/page.png';
        } catch { img.src = '/style/icons/page.png'; }
        img.src = tab.favIconUrl;
      } else {
		if (img) {
          if (tab.url.startsWith('vivaldi://')) img.src = '/style/icons/vivaldi.png';
          else if (tab.url.startsWith('chrome-extension://')) img.src = '/style/icons/extension.png';
          else img.src = '/style/icons/page.png';
      } }
      if (current) current.src = img.src;
    });
  }

  function getCurrentTabUpdated() {
    favTimer = setInterval(() => {getCurrentTab(); reloadElements()}, favInterval);
  }

  function getHomeButton() {
    const button = document.querySelector('button[name="Home"], button[title="Go to homepage"]');
    if (!button) return null;
    return {
        button,
        svg: button.querySelector('svg')
    };
  }

  function getTimeFormat() {
    if (!viewClock) return;
	const browser = $q('#browser');
    timeFormat = (timeFormat % 4) + 1;
	$q('#input22').value = timeFormat;
    $q('#span22b').textContent = `Format ${timeFormat}`;
    $q('#digitalClock').textContent = getTimeFormats(timeFormat);
	chrome.storage.local.set({ timeFormatKey: timeFormat });
	browser?.[viewClock ? 'setAttribute' : 'removeAttribute']('view-clock', `Format ${timeFormat}`);
	if (viewClock) startClock();
  }

  function getTimeFormats(timeFormat) {
    const times = getTimeStrings();
    switch (timeFormat) {
        case 1:  return times.time12;      // 3:14 PM No padStart
        case 2:  return times.time12Full;  // 3:14:45 PM No padStart
        case 3:  return times.time24;      // 15:14
        case 4:  return times.time24Full;  // 15:14:45
        default: return times.time12Full;  // fallback
  } }

  function getTimeStrings() {
    const date = new Date(),
	      h12  = String(date.getHours() % 12 || 12), // 3:14 = 3:14 No padStart
          h12p = h12.padStart(2, '0'), // 3:14 = 03:14 padStart
          h24  = String(date.getHours()).padStart(2, '0'),
          min  = String(date.getMinutes()).padStart(2, '0'),
          sec  = String(date.getSeconds()).padStart(2, '0'),
          ampm = date.getHours() < 12 ? 'AM' : 'PM';
    return {
      time12:     `${h12}:${min} ${ampm}`,
	  time12Full: `${h12}:${min}:${sec} ${ampm}`,
      time24:     `${h24}:${min}`,
      time24Full: `${h24}:${min}:${sec}`
    };
  }

  function getToolbarList(e) {
	const selectors = e.split(',').map(s => s.trim()).filter(s => s && /^(\.[a-z-]+|footer|#[\w-]+)$/i.test(s));
    for (const selector of selectors.toReversed()) {
      try {
        const element = $q(selector);
        if (element) main.insertBefore(element, main.firstChild);
      } catch (err) { console.warn(`Invalid selector skipped: ${selector}`, err); }
  } }

  function homeToRestart(e) {
	const browser = $q('#browser'),
          els = getHomeButton();
    if (!els) return;
	const { button, svg } = els,
      restartTitle = 'Restart browser',
      normalTitle  = 'Go to homepage',
      restartClasses = ['ToolbarButton-Button', 'custom-button', 'restart-button'],
      baseClasses    = ['ToolbarButton-Button'],
      dragHandler = (e) => {
        e.preventDefault?.();
        setTimeout(() => { homeRestart(true); }, resizeDelay);
      };
	if (e) {
        button.id = 'restart-browser';
        button.classList.remove(...baseClasses);
        button.classList.add(...restartClasses);
        button.title = restartTitle;
        button.addEventListener('dragend', dragHandler, { once: false });
    } else {
        button.removeAttribute('id');
        button.classList.remove(...restartClasses);
        button.classList.add(...baseClasses);
        button.title = normalTitle;
        button.removeEventListener('dragend', dragHandler);
    }
	browser?.[e ? 'setAttribute' : 'removeAttribute']('home-to-restart', true);
	svg && (svg.style.display = '' ? 'none' : '');
	removeDupes?.('restart-button'); // if (typeof removeDupes === 'function') removeDupes('restart-button');
  }  

  function moveTab(e) {
    const browser = $q('#browser');
    chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
	if (browser) {
      if (moveActiveTab) {
        chrome.tabs.query({currentWindow: true, active: true}, tabs => chrome.tabs.move(tabs[0].id, {index: 0}));
		browser?.[moveActiveTab ? 'setAttribute' : 'removeAttribute']('move-active-tab', true);
  } } }

  function moveTabPosition(e) {
    if (!moveActiveTab) return;
    try {
      chrome.tabs.move(e.tabId, {index: 0});
    } catch (ex) {
      if (ex === "Error: Tabs can't be edited right now.") setTimeout(() => moveTabPosition(e), 20);
  } }

  function onClearField() {
    const browser = $q('#browser'),
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
    const browser = $q('#browser'),
	      inner = $q('.inner');
    if (browser.hasAttribute('options-menu')) {
	  browser.removeAttribute('options-menu');
    } else {
	  browser.setAttribute('options-menu', true);
	  $q('#span3b').textContent = `Format ${calendarFormat}`;
	  $q('#span22b').textContent = `Format ${timeFormat}`;
	}
	onOptionsMenuPosition(positionOptionsMenu);
  }

  function onOptionsMenuInput(e) {
    const browser = $q('#browser');
    let el = document.getElementById(e);
    switch (e) {
	  case 'input0':
        keyCodes = el.value;
        chrome.storage.local.set({keyCodesKey: keyCodes});
        break;
      case 'input1':
        folderImage = el.checked;
        chrome.storage.local.set({folderImageKey: folderImage});
        if (folderImage) customFolder(folderImage);
		browser?.[folderImage ? 'setAttribute' : 'removeAttribute']('custom-folder', true);
        break;
	  case 'input2':
        customCss = el.checked;
        chrome.storage.local.set({customCssKey: customCss});
        if (customCss) customizeCSS(customCss);
        else onOptionsMenuPosition(positionOptionsMenu);
		browser?.[customCss ? 'setAttribute' : 'removeAttribute']('custom-css', true);
        break;
      case 'input3':
        showCalendar = el.checked;
        chrome.storage.local.set({showCalendarKey: showCalendar});
		browser?.[showCalendar ? 'setAttribute' : 'removeAttribute']('show-calendar', true);
        break;
      case 'input4':
        homeRestart = el.checked;
        chrome.storage.local.set({homeRestartKey: homeRestart});
        homeToRestart(homeRestart);
		browser?.[homeRestart ? 'setAttribute' : 'removeAttribute']('home-to-restart', true);
        break;
      case 'input5':
        favInUrl = el.checked;
        chrome.storage.local.set({favInUrlKey: favInUrl});
        if (favInUrl) favImage(favInUrl);
		browser?.[favInUrl ? 'setAttribute' : 'removeAttribute']('fav-in-url', true);
        break;
      case 'input6':
        closeButton = el.checked;
        chrome.storage.local.set({closeButtonKey: closeButton});
        if (closeButton) customClose(closeButton);
		browser?.[closeButton ? 'setAttribute' : 'removeAttribute']('custom-close', true);
        break;
      case 'input7':
        moveActiveTab = el.checked;
        chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
        moveTab(moveActiveTab);
		browser?.[moveActiveTab ? 'setAttribute' : 'removeAttribute']('move-active-tab', true);
        break;
	  case 'input8':
        extensionIcons = el.checked;
        chrome.storage.local.set({extensionIconsKey: extensionIcons});
		browser?.[extensionIcons ? 'setAttribute' : 'removeAttribute']('extension-icons', true);
		break;
	  case 'input9':
        showWorkspaces = el.checked;
        chrome.storage.local.set({showWorkspacesKey: showWorkspaces});
		browser?.[showWorkspaces ? 'setAttribute' : 'removeAttribute']('show-workspaces', true);
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
		browser?.[rewindForward ? 'setAttribute' : 'removeAttribute']('rewind-forward', true);
        break;
	  case 'input14':
        searchbar = el.checked;
        chrome.storage.local.set({searchbarKey: searchbar});
		browser?.[searchbar ? 'setAttribute' : 'removeAttribute']('searchbar', true);
        break;
	  case 'input15':
	    let label16 = $q('#label16'),
		    label17 = $q('#label17'),
		    label18 = $q('#label18');
        toolbarToggle = el.checked;
        chrome.storage.local.set({toolbarToggleKey: toolbarToggle});
		if (toolbarToggle) {
		  label16.removeAttribute('disabled');
		  label17.removeAttribute('disabled');
		  label18.removeAttribute('disabled');
        } else {
		  label16.setAttribute('disabled', true);
		  label17.setAttribute('disabled', true);
		  label18.setAttribute('disabled', true);
		}
		browser?.[toolbarToggle ? 'setAttribute' : 'removeAttribute']('toolbar-toggle', true);
		break;
	  case 'input16':
        hideFooter = el.checked;
        chrome.storage.local.set({hideFooterKey: hideFooter});
		browser?.[hideFooter ? 'setAttribute' : 'removeAttribute']('hide-footer', true);
		break;
	  case 'input17':
        hideBookmark = el.checked;
        chrome.storage.local.set({hideBookmarkKey: hideBookmark});
		browser?.[hideBookmark ? 'setAttribute' : 'removeAttribute']('hide-bookmark', true);
		break;
	  case 'input18':
        hideMainbar = el.checked;
        chrome.storage.local.set({hideMainbarKey: hideMainbar});
		browser?.[hideMainbar ? 'setAttribute' : 'removeAttribute']('hide-mainbar', true);
		break;
	  case 'input19':
        chrome.storage.local.set({extensionToggleKey: extensionToggle});
		browser?.[extensionToggle ? 'setAttribute' : 'removeAttribute']('extension-toggle', true);
		break;
	  case 'input22':
	    viewClock = el.checked;
        chrome.storage.local.set({viewClockKey: viewClock});
		browser?.[viewClock ? 'setAttribute' : 'removeAttribute']('view-clock', `Format ${timeFormat}`);
		if (viewClock) startClock();
  } }

  function onOptionsMenuPosition(e) {
    const inner = $q('.inner');
    if (!inner) return;
    const menu = $q('#options-menu');
    if (!menu) return;
    const viewportWidth  = window.innerWidth,
          innerRect      = inner.getBoundingClientRect(),
          menuRect       = menu.getBoundingClientRect(),
		  innerTop       = inner.clientTop + 'px',
          centerX        = viewportWidth / 2,
          centerY        = innerRect.top + (innerRect.height / 2),
          menuHalfWidth  = menuRect.width / 2,
          menuHalfHeight = menuRect.height / 2;
    $q('.radio', true).forEach(radio => radio.checked = false);
    const radio = $q(`#position${e}`);
    if (radio) radio.checked = true;
    menu.style.top = innerTop;
    menu.style.left = '0px'; // default
    switch (Number(e)) {
      case 1: // left
        // already set: left = 0
        break;
      case 2: // center
        menu.style.left = `${centerX - menuHalfWidth}px`;
        break;
      case 3: // right (with 10px margin)
        menu.style.left = `${viewportWidth - menuRect.width - 10}px`;
        break;
      case 4: // center vertically & horizontally inside .inner
        menu.style.top  = `${centerY - menuHalfHeight}px`;
        menu.style.left = `${centerX - menuHalfWidth}px`;
        break;
      default:
        console.warn(`Unknown menu position option: ${optionId}`);
        break;
  } }

  function onOptionsMenuRadio(e) {
    positionOptionsMenu = e;
    chrome.storage.local.set({positionOptionsMenuKey: positionOptionsMenu});
    onOptionsMenuPosition(e);
	getCurrentTab();
  }

  function onSelector(buttonId) {
    const input = $q('#input21a');
    if (!input) return;
    const browser = $q('#browser');
    const selectorMap = {
      button12a: '.mainbar',
      button12b: '.bookmark-bar',
      button12c: 'footer',
    };
    const selector = selectorMap[buttonId];
    if (!selector) {
      console.warn(`Unknown button ID: ${buttonId}`);
      return;
    }
    let currentList = input.value.split(',').map(s => s.trim()).filter(Boolean);
    if (currentList.includes(selector)) return;
    currentList.push(selector);
    const newValue = currentList.join(', ');
    input.value = newValue;
    toolbarList = newValue;
    chrome.storage.local.set({ toolbarListKey: newValue });
    if (browser) {
      const hasFooter = newValue.includes('footer');
	  browser?.[hasFooter ? 'setAttribute' : 'removeAttribute']('footer-in-header', true);
    }
    if (buttonId === 'button12c') {
      setTimeout(() => { onOptionsMenuPosition(positionOptionsMenu); }, 200);
    }
    getToolbarList(newValue);
  }

  function reloadElements() {
    const cal = $q('#calendar'),
	      optBtn = $q('#options-button'),
		  optMenu = $q('#options-menu'),
		  restartBtn = $q('#restart-browser'),
		  togToolbars = $q('#toggle-toolbars'),
	      inner = $q('.inner');
	try {
	  if (!cal) setCalendarHolder();
	  if (!restartBtn && homeRestart) homeToRestart(homeRestart);
	  if (!optBtn) setOptionsButton();
	  if (!optMenu) setOptionsMenu();
	  if (!togToolbars) setToggleButton();
	} catch(ex) {}
  }

  function setCalendarHolder() {
    const browser = $q('#browser'),
	      cal = $c('span', {id: 'calendar', className: 'aCal', title: Texts.calendarTooltip}, [{type: 'mouseover', fn: () => getCalendarText()}]),
          clk = $q('.ClockButton');
	try {
	  if (!calendarFormat) calendarFormat = 1;
	  cal.textContent = calendarFormats(calendarFormat);
      clk.insertBefore(cal, clk.firstChild);
	  cal.onclick = () => getCalendarFormat();
	  removeDupes?.('aCal'); // if (typeof removeDupes === 'function') removeDupes('aCal');
	} catch(ex) {}
  }

  function setClockHolder() {
    const browser = $q('#browser'),
	      clockBtn = $q('.ClockButton'),
	      cal = $q('#calendar'),
	      clk = $c('span', {id: 'digitalClock', className: 'aClk'});
	try {
	  if (!timeFormat) timeFormat = 2;
	  insertAfter(clk, cal); // or clockBtn.insertBefore(clk, clockBtn.lastChild);
	  clk.textContent = getTimeFormats(timeFormat); // or: clk.innerHTML = getTimeFormats(timeFormat);
	  removeDupes?.('aClk'); // if (typeof removeDupes === 'function') removeDupes('aCal');
	} catch(ex) {}
	
	try {
	  if (!timeFormat) timeFormat = 2;
	  clk.textContent = getTimeFormats(timeFormat);
	  cal.onclick = () => getTimeFormats();
	  removeDupes?.('aCal'); // if (typeof removeDupes === 'function') removeDupes('aCal');
	} catch(ex) {}
  }

  function setOptionsButton() {
    const optBtn = $c('button', {id: 'options-button', className: 'ToolbarButton-Button custom-button optionsButton', draggable: 'false', tabindex: '-1', title: Texts.optionsMenuTooltip, type: 'button'}, [{type: 'click', fn: () => onOptions()}]);
	const statusBar = $q('.toolbar-statusbar');
	statusBar.insertBefore(optBtn, statusBar.firstChild);
	removeDupes?.('optionsButton'); // if (typeof removeDupes === 'function') removeDupes('optionsButton');
  }

  function setOptionsMenu() {
    const optMenu = $c('div', {id: 'options-menu', className: 'options-menu-popup', style: 'display: none;'}),
          div0 = $c('div', {id: 'div0'});
	if (!positionOptionsMenu) positionOptionsMenu = 1;
    [1,2,3,4].map(n => {
	  const input = $c('input', {id: `position${n}`, className:'radio', type: 'radio', value: n, title: `Position Menu > ${n === 1 ? 'TOP LEFT' : n === 2 ? 'TOP CENTER' : n === 3 ? 'TOP RIGHT' : 'CENTERED'}`});
      div0.appendChild(input);
	  return input;
    });
    div0.appendChild($c('span', {id:'spanMenuText', textContent: Texts.optionsMenu}));
    div0.appendChild($c('button', {id: 'options-menu-close', className: 'button', title: Texts.optionsClose}));
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
	function Row3(id, labelText, spanText, tooltip, iconStyle, checked) {
	  const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        btn = $c('button', {id: `button${id}`, className: 'button'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
	  btn.appendChild($c('span', {id: `span${id}b`, className: 'span', textContent: `Format ${timeFormat}`}));
	  label.appendChild(btn);
      return label;
    }
    function Row4(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
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
    function Row7(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
    function Row8(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      return label;
    }
    function Row9(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        span = $c('span', {id: 'currentIcon', className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      span.appendChild($c('img', {id: 'currentI', className: 'icon', src: ''}));
      label.appendChild(span);
      return label;
    }
	function Row10(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      return label;
    }
	function Row11(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row12(id, labelText, spanText, tooltip, iconStyle, value) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
	  label.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: spanText}));
      label.appendChild($c('input', {id: `input${id}`, type: 'text', value: value}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row13(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
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
	function Row16(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label indent', title: tooltip});
	  label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
	  label.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: spanText}));
      return label;
    }
	function Row17(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row18(id, labelText, spanText, tooltip) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip});
	  label.appendChild($c('span', {id: `span${id}a`, className: '', textContent: `${Texts.favInterval}`, title: `${Texts.span10a}`}));
	  label.appendChild($c('input', {id: `input${id}a`, className: 'input input-timer', type: 'number', title: `${Texts.input10a}`, value: `${favInterval}`}));
	  label.appendChild($c('span', {id: `span${id}b`, className: '', textContent: `${Texts.resizeDelay}`, title: `${Texts.span10b}`}));
	  label.appendChild($c('input', {id: `input${id}b`, className: 'input input-timer', type: 'number', title: `${Texts.input10b}`, value: `${resizeDelay}`}));
      return label;
    }
	function Row19(id, labelText, spanText, tooltip) {
      const label = $c('label', {id: `label${id}`, className: 'label order'});
	  label.appendChild($c('span', {id: `span${id}a`, textContent: `${Symbols.downArrow}`}));
	  label.appendChild($c('span', {id: `span${id}b`, textContent: `${Texts.setOrder}`}));
	  label.appendChild($c('span', {id: `span${id}c`, textContent: `${Symbols.downArrow}`}));
      return label;
    }
	function Row20(id, labelText, spanText, tooltip, iconStyle, value) {
      const label = $c('label', {id: `label${id}`, className: ''}),
	        iconSpan = $c('span', {id: `span${id}a`, className: 'icon', title: `${Texts.span11a}`});
	  label.appendChild($c('input', {id: `input${id}a`, className: 'input', type: 'text', value: value}));
      iconSpan.appendChild($c('svg', {xmlns: 'http://www.w3.org/2000/svg', style: iconStyle}));
      label.appendChild(iconSpan);
	  return label;
	}
	function Row21(id, labelText, spanText, tooltip) {
	  const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        btn1 = $c('button', {id: `button${id}a`, className: 'button', title: `${Texts.button12a}`}),
	        btn2 = $c('button', {id: `button${id}b`, className: 'button', title: `${Texts.button12b}`}),
	        btn3 = $c('button', {id: `button${id}c`, className: 'button', title: `${Texts.button12c}`});
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
    optMenu.appendChild(Row1(1, null, Texts.span1, Texts.label1, Icons.folder, folderImage));
    optMenu.appendChild(Row2(3, null, Texts.span3a, Texts.label3,  showCalendar));
	optMenu.appendChild(Row3(22, null, Texts.span22, Texts.label22, null, viewClock));
    optMenu.appendChild(Row4(2, null, Texts.span2, Texts.label2, customCss));
    optMenu.appendChild(Row5(8, null, Texts.span8, Texts.label8, Icons.extension, extensionIcons));
    optMenu.appendChild(Row6(4, null, Texts.span4, Texts.label4, Icons.restart, homeRestart));
    optMenu.appendChild(Row7(13, null, Texts.span13, Texts.label13, Icons.rewind, rewindForward));
	optMenu.appendChild(Row8(14, null, Texts.span14, Texts.label14, searchbar));
    optMenu.appendChild(Row9(5, null, Texts.span5, Texts.label5, favInUrl));
	optMenu.appendChild(Row10(7, null, Texts.span7, Texts.label7, moveActiveTab));
	optMenu.appendChild(Row11(6, null, Texts.span6, Texts.label6, Icons.styledClose, closeButton));
	optMenu.appendChild(Row12(0, null, Texts.span0a, Texts.label0, Icons.move, keyCodes));
	optMenu.appendChild(Row13(15, null, Texts.span15, Texts.label15, Icons.mask, toolbarToggle));
	optMenu.appendChild(Row14(17, null, Texts.span17, Texts.label17, hideBookmark));
	optMenu.appendChild(Row15(18, null, Texts.span18, Texts.label18, hideMainbar));
	optMenu.appendChild(Row16(16, null, Texts.span16, Texts.label16, hideFooter));
	optMenu.appendChild(Row17(9, null, Texts.span9, Texts.label9, Icons.workspaces, showWorkspaces));
	optMenu.appendChild(Row18(10, null, null, null));
	optMenu.appendChild(Row19(20, null, null, null));
	optMenu.appendChild(Row20(21, null, null, null, Icons.clear, toolbarList));
	optMenu.appendChild(Row21(12, null, null, null));
    $q('.inner').appendChild(optMenu);

    $q('#div0 > .radio', true).forEach(el => el.onclick = e => onOptionsMenuRadio(parseInt(e.target.value)));
    $q('#options-menu .checkbox', true).forEach(el => el.onclick = e => onOptionsMenuInput(e.target.id));

	$q('#options-menu-close').onclick = () => onOptions();
	$q('#input0').oninput = () => onOptionsMenuInput('input0');
    $q('#button3').onclick = () => getCalendarFormat();
	$q('#input10a').oninput = () => onOptionsMenuInput('input10a');
    $q('#input10b').oninput = () => onOptionsMenuInput('input10b');
    $q('#span21a').onclick = () => onClearField();
	$q('#button12a').onclick = () => onSelector('button12a');
    $q('#button12b').onclick = () => onSelector('button12b');
    $q('#button12c').onclick = () => onSelector('button12c');
	$q('#button22').onclick = () => getTimeFormat();
	$q('#input22').onclick = () => onOptionsMenuInput('input22');

	Object.assign($q('#input1'),  { checked: folderImage });
    Object.assign($q('#input3'),  { checked: showCalendar });
    Object.assign($q('#input2'),  { checked: customCss });
    Object.assign($q('#input8'),  { checked: extensionIcons });
    Object.assign($q('#input4'),  { checked: homeRestart });
    Object.assign($q('#input13'), { checked: rewindForward });
    Object.assign($q('#input14'), { checked: searchbar });
    Object.assign($q('#input5'),  { checked: favInUrl });
    Object.assign($q('#input7'),  { checked: moveActiveTab });
    Object.assign($q('#input6'),  { checked: closeButton });
    Object.assign($q('#input15'), { checked: toolbarToggle });
	Object.assign($q('#input22'), { checked: viewClock });
    Object.assign($q('#input17'), { checked: hideBookmark });
    Object.assign($q('#input18'), { checked: hideMainbar });
    Object.assign($q('#input16'), { checked: hideFooter });
    Object.assign($q('#input9'),  { checked: showWorkspaces });

	$q('#input0').value   = keyCodes     ?? 'F9';
    $q('#input10a').value = favInterval  ?? 1000;
    $q('#input10b').value = resizeDelay  ?? 1000;
    $q('#input21a').value = toolbarList  ?? '.mainbar,.bookmark-bar';

	removeDupes?.('options-menu-popup'); // if (typeof removeDupes === 'function') removeDupes('options-menu-popup');
  }

  function setToggleButton() {
    const tabs = $q('#tabs-container'),
		  toggle = $c('button', {id: 'toggle-toolbars', className: 'ToolbarButton-Button custom-button  toggle-toolbars', title: Texts.toggleTooltip},[{type: 'click', fn: () => {setToolbars(); reloadElements(); if ($q('div#options-menu')) onOptionsMenuPosition(positionOptionsMenu)}}]);
	try {
	  tabs.insertBefore(toggle, tabs.firstChild.nextSibling);
	  removeDupes?.('toggle-toolbars'); // if (typeof removeDupes === 'function') removeDupes('toggle-toolbars');
	} catch(ex) {}
  }

  function setToolbars() {
    const browser = $q('#browser');
	if (browser.hasAttribute('toggle-toolbars')) browser.removeAttribute('toggle-toolbars');
	else browser.setAttribute('toggle-toolbars', true);
  }

  function shutDown() {
	const homeBtn = $q('#restart-browser');
    chrome.tabs.onActivated.removeListener(e => moveTabPosition(e));
    chrome.tabs.onHighlighted.removeListener((tabId, changeInfo, tab) => getCurrentTab());
    chrome.tabs.onUpdated.removeListener((tabId, changeInfo, tab) => {
      if (tab.status === 'complete') { getCurrentTabUpdated(); clearInterval(favTimer) }
    });
	chrome.storage.local.set({
      calendarFormatKey:      calendarFormat,
      closeButtonKey:         closeButton,
      customCssKey:           customCss,
      extensionIconsKey:      extensionIcons,
      extensionToggleKey:     extensionToggle,
      favIntervalKey:         favInterval,
      favInUrlKey:            favInUrl,
      folderImageKey:         folderImage,
      hideFooterKey:          hideFooter,
      hideBookmarkKey:        hideBookmark,
      hideMainbarKey:         hideMainbar,
      homeRestartKey:         homeRestart,
      keyCodesKey:            keyCodes,
      moveActiveTabKey:       moveActiveTab,
      positionOptionsMenuKey: positionOptionsMenu,
      resizeDelayKey:         resizeDelay,
      rewindForwardKey:       rewindForward,
      searchbarKey:           searchbar,
      showCalendarKey:        showCalendar,
      showWorkspacesKey:      showWorkspaces,
	  timeFormatKey:          timeFormat,
      toolbarListKey:         toolbarList,
      toolbarToggleKey:       toolbarToggle,
	  viewClockKey:           viewClock
    }, () => {
      if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
      else console.log("All settings saved");
    });
	clearInterval(favTimer);
	if (homeBtn) homeBtn.removeEventListener('dragend', e => setTimeout(() => { e.preventDefault(); homeToRestart(homeRestart) }, resizeDelay));
	window.removeEventListener('focus', () => setTimeout(() => reloadElements(), resizeDelay));
	window.removeEventListener('fullscreenchange', () => setTimeout(() => {reloadElements(); getToolbarList(toolbarList)}, resizeDelay));
    window.removeEventListener('resize', () => setTimeout(() => {reloadElements(); getToolbarList(toolbarList)}, resizeDelay));
	window.removeEventListener('unload', () => shutDown());
  }

  function startClock() {
    if (clockTimer) {
        clearInterval(clockTimer);
        clockTimer = null;
    }
    if (viewClock) {
	  const intervalMs = (timeFormat === 2 || timeFormat === 4) ? Timers.clockShortInt : Timers.clockLongInt;
      clockTimer = setInterval(updateClockDisplay, intervalMs);
	  updateClockDisplay();
  } }

  function updateClockDisplay() {
    const element = document.getElementById('digitalClock');
    if (viewClock && element) element.textContent = getTimeFormats(timeFormat); // or: element.innerHTML = getTimeFormats(timeFormat);
  }

  chrome.tabs.onActivated.addListener(e => moveTabPosition(e));
  chrome.tabs.onHighlighted.addListener((tabId, changeInfo, tab) => getCurrentTab());
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { if (changeInfo.status === 'complete' || changeInfo.favIconUrl) getCurrentTab(); });
  
  window.addEventListener('focus', () => setTimeout(() => reloadElements(), resizeDelay));
  window.addEventListener('fullscreenchange', () => setTimeout(() => {reloadElements(); getToolbarList(toolbarList)}, resizeDelay));
  window.addEventListener('load', () => setTimeout(() => initialize(), Timers.delayedInitialize));
  window.addEventListener('resize', () => setTimeout(() => {reloadElements(); getToolbarList(toolbarList)}, resizeDelay));
  window.addEventListener('unload', () => shutDown());

  initInterval = setInterval(() => {
    if (!$q('#options-button')) initialize();
    else { initialize(); clearInterval(initInterval) }
  }, Timers.initializeInt);


















// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// [Dialog Tab] Open Link                                                                        [Dialog Tab] Open Link
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Hides the tab bar when not hovering
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

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
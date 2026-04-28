(() => {
  'use strict';
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Global lexical declarations     *************************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  const UPGRADE_VERSION = 3;
  const CURRENT_MOD_ID = '_srazzano_ui_mod_';
  const OLD_PREFIX_V2 = 'srazzano_';
  const UNPREFIXED_V1 = [
    'closeButton', 'customCss', 'dateFormat', 'extensionIcons', 'favInterval', 'favInUrl',
	'folderImage', 'hideFooter', 'hideBookmark', 'hideMainbar', 'homeRestart', 'keyCodes',
	'moveActiveTab', 'positionMenu', 'resizeDelay', 'rewindForward', 'searchbar', 'showDate',
	'showTime', 'showWorkspaces', 'timeFormat', 'toolbarList', 'toolbarToggle'
  ];

  const $ = (sel, ctx = document) => ctx?.querySelector(sel) ?? null;
  const $$ = (sel, ctx = document) => ctx?.querySelectorAll(sel) ?? [];
  const $id = (id) => document.getElementById(id) ?? null;
  const $c = (type, props = {}, ...children) => {
    const node = document.createElement(type);
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
		node.addEventListener(key.substring(2).toLowerCase(), value);
	  } else if (key === 'style' && typeof value === 'object') {
		Object.assign(node.style, value);
      } else if (key in node) {
		node[key] = value;
	  } else {
		node.setAttribute(key, value);
	  }
    });
    children.flat().forEach(child => {
      if (typeof child === 'string' || typeof child === 'number') {
		node.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
		node.appendChild(child);
	  }
    });
    return node;
  };

  const handleDrag = (event) => {
    event.preventDefault?.();
	setTimeout(() => {
	  homeToRestart(s.homeRestart), s.resizeDelay;});
  };
  const handleFocus = () => {
	setTimeout(() => {
	  reloadElements(), s.resizeDelay});
  };
  const handleLayout = () => {
    setTimeout(() => {
	  reloadElements();
	  getToolbarList(s.toolbarList);
	}, s.resizeDelay);
  };
  const handleLoad = () => {
    setTimeout(() => {
	  initialize(), Timers.delayedInitialize;
	});
  };

  const insertAfter = (newNode, ref) => {
	ref?.parentNode?.insertBefore(newNode, ref.nextSibling);
  };
  const removeDupes = (className) => {
    const elements = document.getElementsByClassName(className);
    if (elements.length <= 1) return;
    [...elements].slice(1).forEach(el => el.remove()); // Usage: removeDupes?.('aCal');
  };

  const storage = {
	// ──────────────────────────────────────────
    // Non-prefixed (legacy / direct access)
	// ──────────────────────────────────────────
    async get(key, defaultValue = undefined) {
      try {
        const result = await chrome.storage.local.get(key);
        return result[key] ?? defaultValue;
      } catch (error) {
        console.error(`Failed to get storage key "${key}":`, error);
        return defaultValue;
      }
    },
    async getAll() {
      try {
        const result = await chrome.storage.local.get(null);
        return result || {};
      } catch (error) {
        console.error("Failed to get all storage:", error);
        return {};
      }
    },
    async set(key, value) {
      try {
        await chrome.storage.local.set({ [key]: value });
      } catch (error) {
        console.error(`Failed to set storage key "${key}":`, error);
        throw error;
      }
    },
    async remove(key) {
      try {
        await chrome.storage.local.remove(key);
      } catch (error) {
        console.error(`Failed to remove storage key "${key}":`, error);
        throw error;
      }
    },
	// ──────────────────────────────────────────
    // Prefixed methods (For all new code)
	// ──────────────────────────────────────────
    getModKey(shortKey) {
      return `${CURRENT_MOD_ID}${shortKey}`;
    },
    async getMod(shortKey, defaultValue = undefined) {
      try {
        const fullKey = this.getModKey(shortKey);
        const result = await chrome.storage.local.get(fullKey);
        return result[fullKey] ?? defaultValue;
      } catch (error) {
        console.error(`Failed to get mod key "${shortKey}":`, error);
        return defaultValue;
      }
    },
    async setMod(shortKey, value) {
      try {
        const fullKey = this.getModKey(shortKey);
        await chrome.storage.local.set({ [fullKey]: value });
      } catch (error) {
        console.error(`Failed to set mod key "${shortKey}":`, error);
        throw error;
      }
    },
    async removeMod(shortKey) {
      try {
        const fullKey = this.getModKey(shortKey);
        await chrome.storage.local.remove(fullKey);
      } catch (error) {
        console.error(`Failed to remove mod key "${shortKey}":`, error);
        throw error;
      }
    },
	// ──────────────────────────────────────────
    // Get ALL mod-prefixed keys
	// ──────────────────────────────────────────
    async getAllMod() {
      try {
        const result = await chrome.storage.local.get(null);
        return Object.fromEntries(Object.entries(result)
          .filter(([key]) => key.startsWith(CURRENT_MOD_ID))
          .map(([key, value]) => [key.slice(CURRENT_MOD_ID.length), value])
        );
      } catch (error) {
        console.error("Failed to get all mod storage:", error);
        return {};
      }
    },
	// ──────────────────────────────────────────
    // Clear ONLY mod-prefixed keys (safer)
	// ──────────────────────────────────────────
    async clearAllMod() {
      try {
        const result = await chrome.storage.local.get(null);
        const keysToRemove = Object.keys(result).filter(key => {
		  key.startsWith(CURRENT_MOD_ID);
		});
        if (keysToRemove.length) {
		  await chrome.storage.local.remove(keysToRemove);
		}
      } catch (error) {
        console.error("Failed to clear all mod storage:", error);
        throw error;
      }
    },
	// ──────────────────────────────────────────
    // ☠️☠️☠️ Clear everything – USE WITH CAUTION
	// ──────────────────────────────────────────
    async clearAll() {
      try {
        await chrome.storage.local.clear();
      } catch (error) {
        console.error("Failed to clear all storage:", error);
        throw error;
      } 
	}
  };

  const Symbols = {
    arrow: '⇒', // \u21D2
	bolt: '⚡', // \u26A1
	bookmark: '🔖', // \u{1F516}
	bulb: '💡', // \u{1F4A1}
    bullet: '•', // \u2022
	calendar: '📅', // \u{1F4C5}
	caution: '⚠️', // Emoji copy & paste
	check: '✓', // \u2713
	clock1: '⏰', // \u23F0
	clock2: '🕑', // \u{1F551}
	color: '🎨', // \u{1F3A8}
	cut: '✂', // \u2702
	down: '▼', // \u25BC
	downArrow: '↓', // \u2193
	eye: '👁️', // \u{1F441}
	flame: '🔥', // \u{1F525}
	folder: '📁', // \u{1F4C1}
	heart: '❤️', // \u2764
	hourglass: '⏳', // \u23F3
	key: '🔑', // \u{1F511}
	memo: '📝', // \u{1F4DD}
	moon: '🌙', // Emoji copy & paste
	multiply: '❌', // Emoji copy & paste
	paintbrush: '🖌', // \u{1F58C}
	plus: '➕', // Emoji copy & paste
	pointer: '►', // \u25BA
	puzzle: '🧩', // \u{1F9E9}
	rocket: '🚀', // \u{1F680}
	search: '🔍', // \u{1F50D}
	space: '\u3000', // Large Gap
	stack: '☰', // \u2630
	star1: '★', // \u2605
	star2: '☆', // \u2606
	sun: '🌞', // Emoji copy & paste
	target: '🎯', // \u{1F3AF}
	thumbDown: '👎', // \u{1F44E}
	thumbUp: '👍', // \u{1F44D}
	tools: '🛠', // \u{1F6E0}
	trash: '🗑', // \u{1F5D1}
	wall: '🧱', // \u{1F9F1}
	warning: '☠️', // Emoji copy & paste
  };

  const Texts = {
	customTime: 'Custom Time\n• Left-click to change format',
	dateTooltip: 'Calendar / Date\n• Mouseover to update Calendar\n• Left-click to change format',
	favInterval: 'Fav Interval',
    optionsClose: 'Closes options menu',
    optionsMenu: 'Options Menu',
    optionsMenuTooltip: 'Open/Close Options Menu',
	resizeDelay: 'Resize Delay',
	setOrder: '☰ \u3000 \u3000 Set Toolbar Order \u3000 \u3000 ☰',
	toggleTooltip: 'Hide/Show Toolbars Except Tabs',
	button12: 'Click to insert selector\nWill ignore duplicate entries',
	div21: 'Toolbar order from top (left in input field) to bottom (right in input field)',
	label0: "(1) Enter non-conflicting keyCodes / combinations\n(2) Comma separate (space optional) for multiple entries\n(3) Hides checked toolbars in Toggle Toolbars Button\n(4) First keyCode toggles Options Menu\n(5) All other keyCodes / combinations toggle the tabbar\n    • Example: F9\n    • Example: Alt+X\n    • Example: Ctrl+Alt+X\n    • Example: Ctrl+Alt+X, Alt+X, F9\n(6) Leave input field blank for no toggling effect",
    label1: 'Replaces bookmark folders wtih custom icon',
	label2: 'Custom CSS',
	label3: 'Date Formats:\n 1 = '+ returnDateFormat(1) +'\n 2 = '+ returnDateFormat(2) +'\n 3 = '+ returnDateFormat(3) +'\n 4 = '+ returnDateFormat(4) +'',
	label4: 'In Settings > General > Homepage >\nSpecific Page > enter: vivaldi://restart',
	label5: 'Displays site favicon in urlbar',
	label6: 'Tabs close buttons styled',
	label7: 'Moves clicked/active tab to first position in tabbar',
	label8: 'Extension Icons large',
	label9: 'Show/Hide Workspaces Menu Button In Tabbar',
	label13: 'Show/Hide Rewind and Forward buttons',
	label14: 'Show/Hide Search Field Input Box',
	label15: 'Use mask icon in tabbar to toggle\nvisibility of checked toolbars below',
	label16: 'Hide Footer when toggled',
	label17: 'Hide Bookmark-bar when toggled',
	label18: 'Hide Mainbar when toggled',
	label22: 'Time Formats:\n 1 = '+ returnTimeFormat(1) +' 12hr\n 2 = '+ returnTimeFormat(2) +' 12hr\n 3 = '+ returnTimeFormat(3) +' 24hr\n 4 = '+ returnTimeFormat(4) +' 24hr\n 2 & 4 updates every second\n 1 & 3 updates every 10 seconds',
	input10: '20 - 2000 (Default: 1000 milliseconds)',
	span0a: 'Toggle Auto Hide Options Menu and Tabbar',
    span1: 'Bookmark Custom Icons',
    span2: "Custom CSS For Vivaldi's Issuna Theme",
    span3a: 'Date Before Time',
    span4: 'Home Button To Restart Button',
    span5: 'Site Favicon In Urlbar',
    span6: 'Tabs Close Button Styled',
    span7: 'Tab Active Moves To First Position',
    span8: 'Extension Icons Large',
    span9: 'Workspaces Menu Button',
    span10a: 'Increase time in milliseconds to acquire site favicon before sending to urlbar',
    span10b: 'Increase time in milliseconds for toolbars to properly load after exiting fullscreen mode',
    span11a: 'Clear input field',
	span13: 'Rewind / Fast Forward Buttons',
	span14: 'Search Field Input Box',
	span15: 'Toggle Toolbars Button',
    span16: 'Hide Footer',
    span17: 'Hide Bookmark-bar',
    span18: 'Hide Mainbar',
	span22: 'Custom Time',
	span23: '🔑',
  };

  const Timers = {
	callDialogInt: 500,
	delayedInitializeInt: 200,
	divOptionInt: 500,
	initializeInt: 20,
	moveTabInt: 20,
	oneSecondInt: 1000,
	positionMenuInt: 200,
	tabbarInt: 200,
	tenSecondInt: 10000,
	waitDialogInt: 300,
  };
  // ──────────────────────────────────────────
  // ↓ Prefixed keys ↓
  // ──────────────────────────────────────────
  let closeButton = false;
  let customCss = false;
  let dateFormat = 1;
  let extensionIcons = false;
  let favInterval = 1000;
  let favInUrl = false;
  let folderImage = false;
  let hideBookmark = false;
  let hideFooter = false;
  let hideMainbar = false;
  let hideTabbar = false;
  let homeRestart = false;
  let keyCodes = '';
  let moveActiveTab = false;
  let positionMenu = 1;
  let resizeDelay = 1000;
  let rewindForward = false;
  let searchbar = false;
  let showDate = false;
  let showMenu = 'Shift+Ctrl+X';
  let showTime = false;
  let showWorkspaces = false;
  let timeFormat = 1;
  let toolbarList = '.mainbar, .bookmark-bar';
  let toolbarToggle = false;
  // ──────────────────────────────────────────
  // ↓  DO NOT PREFIX  ↓
  // ──────────────────────────────────────────
  let favTimer = null;
  let hasMigrationData = false;
  let hasSettingsData = false;
  let initInterval = null;
  let timeTimer = null;
  let s = {};
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Functions initialize and loadAllSettings     ************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  async function initialize() {
    await loadAllSettings();
	const browser = $id('browser');
    const main = $id('main');
    const exts = $('.toolbar-extensions > .button-toolbar', main);
    const footer2 = $('.dialog-footer');
    const tabsContainer = $id('tabs-container');
    const workspace = $('.tabbar-workspace-button .button-title', tabsContainer);
	//await storage.setMod('showMenu', 'Shift+Ctrl+X');
	await storage.setMod('hideTabbar', false);
	tabbarShow();
    if (browser) {
      const setAttr = (name, val, attrVal = 'true') => {
		val ? browser.setAttribute(name, attrVal) : browser.removeAttribute(name);
	  };
      setAttr('custom-close', s.closeButton);
      setAttr('custom-css', s.customCss);
      setAttr('custom-folder', s.folderImage);
      setAttr('extension-icons', s.extensionIcons);
      setAttr('fav-in-url', s.favInUrl);
      setAttr('footer-in-header', s.toolbarList.includes('#footer'));
      setAttr('hide-bookmark', s.hideBookmark);
      setAttr('hide-footer', s.hideFooter);
      setAttr('hide-mainbar', s.hideMainbar);
	  setAttr('hide-tabbar', s.hideTabbar);
      setAttr('home-to-restart', s.homeRestart);
      setAttr('move-active-tab', s.moveActiveTab);
      setAttr('rewind-forward', s.rewindForward);
      setAttr('searchbar', s.searchbar);
      setAttr('show-date', s.showDate, `Format ${s.dateFormat}`);
      setAttr('show-time', s.showTime, `Format ${s.timeFormat}`);
      setAttr('show-workspaces', s.showWorkspaces);
      setAttr('toolbar-toggle', s.toolbarToggle);
    }
    if (s.showTime) {
	  startTime();
    }
	if (exts) {
	  exts.style.setProperty('--extensionsExpanded', '1');
    }
	if (footer2 && !browser.contains(footer2)) {
	  browser.appendChild(footer2);
    }
	if (workspace) {
	  workspace.innerHTML = '';
    }
	if (!hasSettingsData) {
      console.log('Vivaldi UI Mod Settings:', s);
      hasSettingsData = true;
  } }

  async function loadAllSettings() {
    const defaults = {
      closeButton: false,
      customCss: false,
      dateFormat: 1,
      extensionIcons: false,
      favInterval: 1000,
      favInUrl: false,
      folderImage: false,
      hideFooter: false,
      hideBookmark: false,
      hideMainbar: false,
	  hideTabbar: false,
      homeRestart: false,
      keyCodes: '',
      moveActiveTab: false,
      positionMenu: 1,
      resizeDelay: 1000,
      rewindForward: false,
      searchbar: false,
      showDate: false,
      showTime: false,
      showWorkspaces: false,
      timeFormat: 1,
      toolbarList: '.mainbar, .bookmark-bar',
      toolbarToggle: false,
    };
    try {
      const allData = await chrome.storage.local.get(null);
      const allKeys = Object.keys(allData);
      const hasOldPrefixV2 = allKeys.some(key => key.startsWith(OLD_PREFIX_V2));
      const hasUnprefixed = UNPREFIXED_V1.some(key => allKeys.includes(key));
      const hasCurrentPrefix = allKeys.some(key => key.startsWith(CURRENT_MOD_ID));
      const needsMigration = hasOldPrefixV2 || hasUnprefixed || !hasCurrentPrefix;
      if (needsMigration) {
        console.log(`[${CURRENT_MOD_ID}] Old data detected. Starting migration to version ${UPGRADE_VERSION}...`);
        await migrateToCurrentVer();
      } else if (!hasMigrationData) {
        console.log(`[${CURRENT_MOD_ID}] Storage is already up to date (version ${UPGRADE_VERSION}).`);
        hasMigrationData = true;
      }
      const stored = await storage.getAllMod();
      s = { ...defaults, ...stored };
      const fRaw = Number(s.favInterval);
      s.favInterval = Number.isInteger(fRaw) ? Math.max(20, Math.min(2000, fRaw)) : 1000;
      const rRaw = Number(s.resizeDelay);
      s.resizeDelay = Number.isInteger(rRaw) ? Math.max(20, Math.min(2000, rRaw)) : 1000;
      s.positionMenu = Number(s.positionMenu) || 1;
      favImage(s.favInUrl);
      getToolbarList(s.toolbarList);
      homeToRestart(s.homeRestart);
      moveTab(s.moveActiveTab);
      returnDateFormat(s.dateFormat);
	  dateHolder();
      setOptionsButton();
      setOptionsMenu();
      setToggleButton();
      timeHolder();
    } catch (err) {
      console.error('Failed to load settings:', err);
      s = { ...defaults };
  } }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Migrate old prefixed / unprefixed keys from V1 / V2 to current CURRENT_MOD_ID V3 only if detected     ***************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  async function migrateToCurrentVer() {
    const allData = await chrome.storage.local.get(null);
    const allKeys = Object.keys(allData);
    const newData = {};
    for (const key of UNPREFIXED_V1) {
      if (allData[key] !== undefined) newData[`${CURRENT_MOD_ID}${key}`] = allData[key];
    }
    for (const key of allKeys) {
      if (key.startsWith(OLD_PREFIX_V2)) {
        const shortKey = key.slice(OLD_PREFIX_V2.length);
        newData[`${CURRENT_MOD_ID}${shortKey}`] = allData[key];
    } }
    if (Object.keys(newData).length > 0) {
      await chrome.storage.local.set(newData);
      const keysToRemove = [
        ...UNPREFIXED_V1.filter(k => allData[k] !== undefined),
        ...allKeys.filter(k => k.startsWith(OLD_PREFIX_V2))
      ];
      await chrome.storage.local.remove(keysToRemove);
      console.log(`[${CURRENT_MOD_ID}] Migration completed. Moved ${Object.keys(newData).length} keys.`);
    }
    await storage.set('_srazzano_migrationVersion', UPGRADE_VERSION);
    hasMigrationData = true;
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Date / calendar     *************************************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function dateHolder() {
	const main = $id('main');
    const statusBar = $('.toolbar-statusbar', main);
    if (!statusBar) return;
    const div = $c('div', { id: 'calendar', className: 'aCal', title: Texts.dateTooltip });
    try {
      if (typeof s.dateFormat !== 'number' || s.dateFormat < 1 || s.dateFormat > 4) {
	    s.dateFormat = 1;
	  }
      div.textContent = returnDateFormat(s.dateFormat);
      div.onmouseover = setDateText;
      div.onclick = () => selectDateFormat();
      statusBar.insertBefore(div, statusBar.lastChild);
      removeDupes?.('aCal');
    } catch (err) {
	  console.error('dateHolder error:', err);
  } }

  function returnDateFormat(int) {
    if (!Number.isInteger(int) || int < 1 || int > 4) {
	  throw new RangeError('int must be an integer between 1 and 4');
	}
    const date = new Date();
    const locale = navigator.language;
    const getPart = (options) => new Intl.DateTimeFormat(locale, options).format(date);
    const parts = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).formatToParts(date);
    const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
    const day = parseInt(map.day);
    const dayPadded = map.day.padStart(2, '0');
    const year = map.year;
    const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 || Math.floor(day / 10) === 1 ? 0 : day % 10)] || 'th';
    const ordinal = day + suffix;
    const formats = [
      null,
      () => `${map.weekday} ⇒ ${map.month} ${ordinal}, ${year}`, // 1: Monday ⇒ January 1st, 2026
      () => `${getPart({weekday: 'short'})} * ${getPart({month: 'short'})} ${day}, ${year}`, // 2: Mon * Jan 1, 2026
      () => `${map.weekday} • ${getPart({month: 'numeric'})}/${dayPadded}/${year}`, // 3: Monday • 1/01/2026
      () => `${getPart({weekday: 'short'})} :: ${getPart({month: '2-digit'})}-${dayPadded}-${year}` // 4: Mon :: 01-01-2026
    ];
    return formats[int]();
  }

  async function selectDateFormat() {
    if (!s.showDate) return;
    s.dateFormat = (s.dateFormat % 4) + 1;
    await storage.setMod('dateFormat', s.dateFormat);
    const calendar = $id('calendar');
	const input3 = $id('input3');
	const span3b = $id('span3b');
    if (calendar) {
	  calendar.textContent = returnDateFormat(s.dateFormat);
	}
    if (input3) {
	  input3.value = s.dateFormat;
	}
    if (span3b) {
	  span3b.textContent = `Format ${s.dateFormat}`;
  } }

  function setDateText() {
	if (!s.showDate) return;
    const calendar = $id('calendar');
    if (calendar) {
      calendar.textContent = returnDateFormat(s.dateFormat);
  } }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Time / clock and digitalClock     ***********************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function timeHolder() {
    const cal = $id('calendar');
	const main = $id('main');
    const clk = $('.ClockButton > button', main);
    if (!cal || !clk) return;
    const div = $c('div', { id: 'digitalClock', className: 'aClk', title: Texts.customTime });
    try {
      if (typeof s.timeFormat !== 'number' || s.timeFormat < 1 || s.timeFormat > 4) {
		s.timeFormat = 1;
	  }
      clk.id = 'clock';
      insertAfter(div, cal);
      div.textContent = returnTimeFormat(s.timeFormat);
	  div.onclick = () => selectTimeFormat();
      removeDupes?.('aClk');
    } catch (err) {
	  console.error('timeHolder error:', err);
  } }

  function createTimeFormats() {
    const date = new Date();
	const h12 = String(date.getHours() % 12 || 12); // 3:14 = 3:14 No padStart
    const h12p = h12.padStart(2, '0'); // 3:14 = 03:14 padStart
    const h24 = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const sec = String(date.getSeconds()).padStart(2, '0');
    const ampm = date.getHours() < 12 ? 'AM' : 'PM';
    return {
      time12: `${h12}:${min} ${ampm}`, // 3:14 PM No padStart
	  time12Full: `${h12}:${min}:${sec} ${ampm}`, // 3:14:55 PM No padStart
      time24: `${h24}:${min}`, // 15:14
      time24Full: `${h24}:${min}:${sec}`, // 15:14:55
    };
  }

  function returnTimeFormat(format = s.timeFormat) {
    const times = createTimeFormats();
    return {
      1: times.time12,
      2: times.time12Full,
      3: times.time24,
      4: times.time24Full
    }[format] ?? times.time12Full;
  }

  async function selectTimeFormat() {
    if (!s.showTime) return;
    s.timeFormat = (s.timeFormat % 4) + 1;
    await storage.setMod('timeFormat', s.timeFormat);
    const digitalClock = $id('digitalClock');
	const span22b = $id('span22b');
    if (digitalClock) {
	  digitalClock.textContent = returnTimeFormat(s.timeFormat);
	}
    if (span22b) {
	  span22b.textContent = `Format ${s.timeFormat}`;
  } }

  function startTime() {
    if (timeTimer) {
      clearInterval(timeTimer);
      timeTimer = null;
    }
    if (s.showTime) {
	  const intervalMs = (s.timeFormat === 2 || s.timeFormat === 4) ? Timers.oneSecondInt : Timers.tenSecondInt;
	  setTimeDisplay();
      timeTimer = setInterval(setTimeDisplay, intervalMs);
  } }

  function setTimeDisplay() {
    const element = $id('digitalClock');
    if (element) {
	  element.textContent = returnTimeFormat(s.timeFormat);
  } }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Options button and menu     *****************************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function setOptionsButton() {
    const optBtn = $c('button', {id: 'optionsButton', className: 'ToolbarButton-Button custom-button optionsButton', 
	  draggable: 'false', tabindex: '-1', title: Texts.optionsMenuTooltip, type: 'button', onclick: onOptions});
	const main = $id('main');
	const footer = $('#footer > div');
	const statusBar = $('.toolbar-statusbar', main);
	try {
	  if (footer) {
		footer.insertBefore(optBtn, footer.firstChild);
	  }
	} catch (err) {};
	removeDupes?.('optionsButton');
  }

  function setOptionsMenu() {
	const browser = $id('browser');
	const main = $id('main');
	const inner = $('.inner', main);
    const optMenu = $c('div', { id: 'optionsMenu', className: 'options-menu-popup' });
    const div0 = $c('div', { id: 'div0' });
	const optionsHeader = $c('div', { id: 'optionsHeader', className: '' });
    [1, 2, 3, 4].forEach(n => {
      const input = $c('input', { id: `position${n}`, className: 'radio', type: 'radio', value: n,
        title: `Position Menu > ${n === 1 ? 'TOP LEFT' : n === 2 ? 'TOP CENTER' : n === 3 ? 'TOP RIGHT' : 'CENTERED'}` });
      div0.appendChild(input);
    });
	optionsHeader.appendChild($c('svg', { id: 'optionsMenuIcon' }));
    optionsHeader.appendChild($c('span', { id: 'optionsMenuText', textContent: Texts.optionsMenu }));
    optionsHeader.appendChild($c('button', { id: 'optionsMenuClose', className: 'button', title: Texts.optionsClose }));
	div0.appendChild(optionsHeader);
    optMenu.appendChild(div0);
    function Row1(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
      const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.span1 }));
	  iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
    function Row2(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
      const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label2 }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
    function Row3(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
      const btn = $c('button', { id: `button${id}`, className: 'button' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label22 }));
      btn.appendChild($c('span', { id: `span${id}b`, className: 'span', textContent: `Format ${s.timeFormat}` }));
      label.appendChild(btn);
      return label;
    }
    function Row4(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
      const btn = $c('button', { id: `button${id}`, className: 'button' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label3 }));
      btn.appendChild($c('span', { id: `span${id}b`, className: 'span', textContent: `Format ${s.dateFormat}` }));
      label.appendChild(btn);
      return label;
    }
    function Row5(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label8 }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
    function Row6(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label4 }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
    function Row7(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label13 }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
    function Row8(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label14 }));
	  iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
    function Row9(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
	  const span = $c('span', { id: 'currentIcon', className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label5 }));
      span.appendChild($c('img', { id: 'currentI', className: 'icon', src: '' }));
      label.appendChild(span);
      return label;
    }
	function Row10(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label7 }));
	  iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
	function Row11(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label6 }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
	function Row12(id, labelText, spanText, tooltip, value) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
	  label.appendChild($c('span', { id: `span${id}a`, className: 'span', textContent: spanText || Texts.label0 }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
	function Row22(id, labelText, spanText, tooltip, value) {
	  const div = $c('div', { id: `div${id}`, title: tooltip });
	  const divA = $c('div', { id: `div${id}a`, className: 'svg image' });
	  const divB = $c('div', { id: `div${id}b`, className: 'svg image' });
	  div.appendChild(divA);
	  div.appendChild($c('input', { id: `input${id}`, type: 'text', value: value }));
	  div.appendChild(divB);
      return div;
    }
	function Row13(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label15 }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
	function Row14(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label indent', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
	  label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
	  label.appendChild($c('span', { id: `span${id}a`, className: 'span', textContent: spanText || Texts.label17 }));
	  iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
	function Row15(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label indent', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
	  label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
	  label.appendChild($c('span', { id: `span${id}a`, className: 'span', textContent: spanText || Texts.label18 }));
	  iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
	function Row16(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label indent', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
	  label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
	  label.appendChild($c('span', { id: `span${id}a`, className: 'span', textContent: spanText || Texts.label16 }));
	  iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
	function Row17(id, labelText, spanText, tooltip, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip });
	  const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText || Texts.label9 }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      label.appendChild(iconSpan);
      return label;
    }
    function Row18(id, labelText, spanText, tooltip) {
      const div = $c('div', { id: `div${id}`, title: tooltip });
      const iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      div.appendChild($c('span', { id: `span${id}a`, className: '', textContent: Texts.favInterval, title: Texts.span10a }));
      div.appendChild($c('input', { id: `input${id}a`, className: 'input input-timer', type: 'number', title: Texts.input10, value: s.favInterval }));
      div.appendChild($c('span', { id: `span${id}b`, className: '', textContent: Texts.resizeDelay, title: Texts.span10b }));
      div.appendChild($c('input', { id: `input${id}b`, className: 'input input-timer', type: 'number', title: Texts.input10, value: s.resizeDelay }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      div.appendChild(iconSpan);
      return div;
    }
    function Row19(id, labelText, spanText, tooltip) {
      const div = $c('div', {id: `div${id}`, className: 'div order'});
	  div.appendChild($c('span', {id: `span${id}`, textContent: `${Texts.setOrder}`}));
      return div;
    }
    function Row20(id, labelText, spanText, tooltip, value) {
      const div = $c('div', { id: `div${id}`, title: tooltip });
	  const cont = $c('div', { id: `container${id}` });
      cont.appendChild($c('input', { id: `input${id}`, className: 'input', type: 'text', value: value }));
	  cont.appendChild($c('svg', { id: `svg${id}`, className: 'svg image' }));
      div.appendChild(cont);
      return div;
    }
    function Row21(id, labelText, spanText, tooltip) {
	  const div = $c('div', {id: `div${id}`, title: tooltip});
	  const btn1 = $c('button', {id: `button${id}a`, className: 'button', title: `${Texts.button12}`});
	  const btn2 = $c('button', {id: `button${id}b`, className: 'button', title: `${Texts.button12}`});
	  const btn3 = $c('button', {id: `button${id}c`, className: 'button', title: `${Texts.button12}`});
	  btn1.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: `.mainbar`}));
	  btn2.appendChild($c('span', {id: `span${id}b`, className: 'span', textContent: `.bookmark-bar`}));
	  btn3.appendChild($c('span', {id: `span${id}c`, className: 'span', textContent: `#footer`}));
	  div.appendChild(btn1);
	  div.appendChild(btn2);
	  div.appendChild(btn3);
	  return div;
    }
    optMenu.appendChild(Row1(1, null, Texts.span1, Texts.label1, s.folderImage));
    optMenu.appendChild(Row2(2, null, Texts.span2, Texts.label2, s.customCss));
    optMenu.appendChild(Row3(22, null, Texts.span22, Texts.label22, s.showTime));
    optMenu.appendChild(Row4(3, null, Texts.span3a, Texts.label3, s.showDate));
    optMenu.appendChild(Row5(8, null, Texts.span8, Texts.label8, s.extensionIcons));
    optMenu.appendChild(Row6(4, null, Texts.span4, Texts.label4, s.homeRestart));
    optMenu.appendChild(Row7(13, null, Texts.span13, Texts.label13, s.rewindForward));
    optMenu.appendChild(Row8(14, null, Texts.span14, Texts.label14, s.searchbar));
    optMenu.appendChild(Row9(5, null, Texts.span5, Texts.label5, s.favInUrl));
    optMenu.appendChild(Row10(7, null, Texts.span7, Texts.label7, s.moveActiveTab));
    optMenu.appendChild(Row11(6, null, Texts.span6, Texts.label6, s.closeButton));
    optMenu.appendChild(Row12(0, null, Texts.span0a, Texts.label0));
	optMenu.appendChild(Row22(23, null, Texts.span23, Texts.label0, s.keyCodes));
    optMenu.appendChild(Row13(15, null, Texts.span15, Texts.label15, s.toolbarToggle));
    optMenu.appendChild(Row14(17, null, Texts.span17, Texts.label17, s.hideBookmark));
    optMenu.appendChild(Row15(18, null, Texts.span18, Texts.label18, s.hideMainbar));
    optMenu.appendChild(Row16(16, null, Texts.span16, Texts.label16, s.hideFooter));
    optMenu.appendChild(Row17(9, null, Texts.span9, Texts.label9, s.showWorkspaces));
    optMenu.appendChild(Row18(10, null, null, null));
    optMenu.appendChild(Row19(20, null, null, null));
    optMenu.appendChild(Row20(21, null, null, Texts.div21, s.toolbarList));
    optMenu.appendChild(Row21(12, null, null, null));
	if (inner) inner.appendChild(optMenu);
    try {
	  if (browser) {
        $id('input1').checked = s.folderImage;
        $id('input3').checked = s.showDate;
        $id('input2').checked = s.customCss;
        $id('input8').checked = s.extensionIcons;
        $id('input4').checked = s.homeRestart;
        $id('input13').checked = s.rewindForward;
        $id('input14').checked = s.searchbar;
        $id('input5').checked = s.favInUrl;
        $id('input7').checked = s.moveActiveTab;
        $id('input6').checked = s.closeButton;
        $id('input15').checked = s.toolbarToggle;
        $id('input22').checked = s.showTime;
        $id('input17').checked = s.hideBookmark;
        $id('input18').checked = s.hideMainbar;
        $id('input16').checked = s.hideFooter;
        $id('input9').checked = s.showWorkspaces;
		const menu = $id('optionsMenu');
        if (menu) {
          $$('.radio', menu).forEach(radio => {
            radio.checked = parseInt(radio.value) === s.positionMenu;
            radio.onclick = e => onOptionsMenuRadio(parseInt(e.target.value));
          });
          $$('.checkbox', menu).forEach(el => {
			el.onclick = e => onOptionsMenuInput(e.target.id);
		  });
		}
        $id('optionsMenuClose').onclick = onOptions;
        $id('button3').onclick = () => selectDateFormat();
        $id('button22').onclick = () => selectTimeFormat();
        $id('button12a').onclick = () => onSelector('button12a');
        $id('button12b').onclick = () => onSelector('button12b');
        $id('button12c').onclick = () => onSelector('button12c');
		$id('svg21').onclick = onClearField;
        $id('input10a').oninput = () => onOptionsMenuInput('input10a');
        $id('input10b').oninput = () => onOptionsMenuInput('input10b');
        $id('input23').oninput = () => onOptionsMenuInput('input23');
        $id('input10a').value = s.favInterval ?? 1000;
        $id('input10b').value = s.resizeDelay ?? 1000;
        $id('input21').value = s.toolbarList ?? '.mainbar, .bookmark-bar';
        removeDupes?.('options-menu-popup');
	  }
    } catch (err) {
	  console.error('setOptionsMenu error:', err);
  } }

  function onOptions() {
    const browser = $id('browser');
    if (browser.toggleAttribute('options-menu')) {
      $id('span3b').textContent = `Format ${s.dateFormat}`;
      $id('span22b').textContent = `Format ${s.timeFormat}`;
    }
    onOptionsMenuPosition(s.positionMenu);
  }

  async function onOptionsMenuInput(id) {
    const browser = $id('browser');
    const el = $id(id);
    if (!el) {
      console.warn(`Element not found: #${id}`);
      return;
    }
    const config = {
      'input1': {
        save: () => {
          s.folderImage = el.checked;
          return ['folderImage', s.folderImage];
        },
        attr: 'custom-folder'
      },
      'input2': {
        save: () => {
          s.customCss = el.checked;
          return ['customCss', s.customCss];
        },
        attr: 'custom-css'
      },
      'input3': {
        save: () => {
          s.showDate = el.checked;
          return ['showDate', s.showDate];
        },
        attr: 'show-date'
      },
      'input4': {
        save: () => {
          s.homeRestart = el.checked;
          homeToRestart(s.homeRestart);
          return ['homeRestart', s.homeRestart];
        },
        attr: 'home-to-restart'
      },
      'input5': {
        save: () => {
          s.favInUrl = el.checked;
          if (s.favInUrl) {
			favImage(s.favInUrl);
		  }
          return ['favInUrl', s.favInUrl];
        },
        attr: 'fav-in-url'
      },
      'input6': {
        save: () => {
          s.closeButton = el.checked;
          return ['closeButton', s.closeButton];
        },
        attr: 'custom-close'
      },
      'input7': {
        save: () => {
          s.moveActiveTab = el.checked;
          moveTab(s.moveActiveTab);
          return ['moveActiveTab', s.moveActiveTab];
        },
        attr: 'move-active-tab'
      },
      'input8': {
        save: () => {
          s.extensionIcons = el.checked;
          return ['extensionIcons', s.extensionIcons];
        },
        attr: 'extension-icons'
      },
      'input9': {
        save: () => {
          s.showWorkspaces = el.checked;
          return ['showWorkspaces', s.showWorkspaces];
        },
        attr: 'show-workspaces'
      },
      'input10a': {
        save: () => {
          const val = Number(el.value);
          s.favInterval = Number.isInteger(val) ? Math.max(20, Math.min(2000, val)) : 1000;
          return ['favInterval', s.favInterval];
        }
      },
      'input10b': {
        save: () => {
          const val = Number(el.value);
          s.resizeDelay = Number.isInteger(val) ? Math.max(20, Math.min(2000, val)) : 1000;
          return ['resizeDelay', s.resizeDelay];
        }
      },
      'input13': {
        save: () => {
          s.rewindForward = el.checked;
          return ['rewindForward', s.rewindForward];
        },
        attr: 'rewind-forward'
      },
      'input14': {
        save: () => {
          s.searchbar = el.checked;
          return ['searchbar', s.searchbar];
        },
        attr: 'searchbar'
      },
      'input15': {
        save: () => {
          const label16 = $id('label16');
          const label17 = $id('label17');
          const label18 = $id('label18');
          s.toolbarToggle = el.checked;
          if (s.toolbarToggle) {
            label16?.removeAttribute('disabled');
            label17?.removeAttribute('disabled');
            label18?.removeAttribute('disabled');
          } else {
            label16?.setAttribute('disabled', true);
            label17?.setAttribute('disabled', true);
            label18?.setAttribute('disabled', true);
          }
          return ['toolbarToggle', s.toolbarToggle];
        },
        attr: 'toolbar-toggle'
      },
      'input16': {
        save: () => {
          s.hideFooter = el.checked;
          return ['hideFooter', s.hideFooter];
        },
        attr: 'hide-footer'
      },
      'input17': {
        save: () => {
          s.hideBookmark = el.checked;
          return ['hideBookmark', s.hideBookmark];
        },
        attr: 'hide-bookmark'
      },
      'input18': {
        save: () => {
          s.hideMainbar = el.checked;
          return ['hideMainbar', s.hideMainbar];
        },
        attr: 'hide-mainbar'
      },
      'input22': {
        save: () => {
          s.showTime = el.checked;
          browser?.[s.showTime ? 'setAttribute' : 'removeAttribute']('show-time', `Format ${s.timeFormat}`);
          clearInterval(timeTimer);
          timeTimer = null;
          if (s.showTime) {
			startTime();
		  }
          return ['showTime', s.showTime];
        }
	  },
	  'input23': {
        save: () => {
          s.keyCodes = el.value.trim();
          return ['keyCodes', s.keyCodes];
      } }
    };
    const item = config[id];
    if (!item) {
      console.warn('Unknown input:', id);
      return;
    }
    const [storageKey, value] = item.save();
    await storage.setMod(storageKey, value);
    if (item.attr) {
	  browser?.[value ? 'setAttribute' : 'removeAttribute'](item.attr, true);
  } }

  function onOptionsMenuPosition(position) {
    const main = $id('main');
	const inner = $('.inner', main);
    const menu = $id('optionsMenu');
    if (!inner || !menu) return;
    const viewportWidth = window.innerWidth;
    const innerRect = inner.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    $$('.radio', menu).forEach(radio => radio.checked = false);
	const radio = $id(`position${position}`);
    if (radio) {
	  radio.checked = true;
	}
    let top = inner.clientTop + 'px';
    let left = '0px';
    const positions = {
      1: () => { },
      2: () => {
        const centerX = viewportWidth / 2;
        left = `${centerX - (menuRect.width / 2)}px`;
      },
      3: () => {
        left = `${viewportWidth - menuRect.width - 10}px`;
      },
      4: () => {
        const centerX = viewportWidth / 2;
        const centerY = innerRect.top + (innerRect.height / 2);
        top = `${centerY - (menuRect.height / 2)}px`;
        left = `${centerX - (menuRect.width / 2)}px`;
      }
    };
    const positionHandler = positions[Number(position)];
    if (positionHandler) {
	  positionHandler();
	} else {
	  console.warn(`Unknown menu position option: ${position}`);
	}
    menu.style.top = top;
    menu.style.left = left;
  }

  async function onOptionsMenuRadio(position) {
    s.positionMenu = Number(position);
    await storage.setMod('positionMenu', s.positionMenu);
    onOptionsMenuPosition(s.positionMenu);
    getCurrentTab();
  }

  async function onSelector(buttonId) {
    const input = $id('input21');
    if (!input) return;
    const browser = $id('browser');
    const selectorMap = {
      button12a: '.mainbar',
      button12b: '.bookmark-bar',
      button12c: '#footer',
    };
    const selector = selectorMap[buttonId];
    if (!selector) return;
    let currentList = input.value.split(',').map(s => s.trim()).filter(Boolean);
    if (currentList.includes(selector)) return;
    currentList.push(selector);
    const newValue = currentList.join(', ');
    input.value = newValue;
    s.toolbarList = newValue;
    await storage.setMod('toolbarList', s.toolbarList);
    if (browser) {
      const hasFooter = newValue.includes('#footer');
      browser?.[hasFooter ? 'setAttribute' : 'removeAttribute']('footer-in-header', true);
    }
    if (buttonId === 'button12c') {
	  setTimeout(() => onOptionsMenuPosition(s.positionMenu), Timers.positionMenuInt);
	}
    getToolbarList(newValue);
  }

  async function onClearField() {
    const browser = $id('browser');
    const inp21 = $id('input21');
    inp21.value = '';
    s.toolbarList = '.mainbar, .bookmark-bar';
    await storage.setMod('toolbarList', s.toolbarList);
    if (browser) {
      browser.appendChild($id('footer'));
      browser.removeAttribute('footer-in-header');
    }
    getToolbarList(s.toolbarList);
    onOptionsMenuPosition(s.positionMenu);
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Favicon in Url     **************************************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function favImage(bol) {
    const browser = $id('browser');
	const favImg = $id('favImg');
	const main = $id('main');
    const field = $('.UrlField', main);
    const img = $c('img', {id: 'favImg'});
    try {
      if (favImg) {
        field.removeChild(img);
        return;
      }
	  browser?.[bol ? 'setAttribute' : 'removeAttribute']('fav-in-url', true);
      field.insertBefore(img, field.firstChild);
      getCurrentTabUpdated();
    } catch (err) {}
  }

  function getCurrentTab() {
    const browser = $id('browser');
    if (!browser) return;
    const container = $id('webview-container');
    const img = $id('favImg');
    const current = $id('currentI');
    const SHIFT_PX = '-3px 0px';
    const sitesToShift = [
      'https://www.youtube.com',
      'https://forum.vivaldi.net'
    ];
    if (!container) {
      console.warn('Webview container not found');
    }
    if (browser.hasAttribute('fav-in-url')) {
      chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
        if (!tab) return;
        const shouldShift = sitesToShift.some(site => tab.url.startsWith(site));
        if (container) {
          container.style.margin = shouldShift ? SHIFT_PX : '0px';
        }
        if (img) {
          if (tab.favIconUrl) {
            try {
              const faviconUrl = new URL(tab.favIconUrl);
              if (['http:', 'https:', 'data:'].includes(faviconUrl.protocol)) {
                img.src = tab.favIconUrl;
              } else {
                img.src = '/style/icons/page.png';
              }
            } catch (e) {
              img.src = '/style/icons/page.png';
            }
          } else {
            if (tab.url.startsWith('chrome-extension://')) {
              img.src = '/style/icons/settings3.png';
            } else {
              img.src = '/style/icons/page.png';
        } } }
        if (current && img) {
		  if (tab.url.startsWith('https://github')) {
			current.src = '/style/icons/github.png';
		  } else if (tab.url.startsWith('https://www.youtube')) {
			current.src = '/style/icons/youtube.png';
		  } else if (tab.url.startsWith('https://tv.youtube')) {
			current.src = '/style/icons/youtubetv.png';
		  } else {
            current.src = img.src;
        } }
      });
    } else {
      if (current) {
        current.src = '/style/icons/page.png';
  } } }

  function getCurrentTabUpdated() {
    favTimer = setInterval(() => {
	  getCurrentTab(); reloadElements();
	}, s.favInterval);
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Toolbar list     ****************************************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function getToolbarList(list) {
	const selectors = list.split(',')
	  .map(s => s.trim())
	  .filter(s => s && /^(?:\.[a-z-]+|#(?:footer|[\w-]+))$/i.test(s));
    for (const selector of selectors.toReversed()) {
      try {
        const element = $(selector);
        if (element) {
		  main.insertBefore(element, main.firstChild);
		}
      } catch (err) {
	    console.warn(`Invalid selector skipped: ${selector}`, err);
  } } }

  function setToolbars() {
    const browser = $id('browser');
	browser.toggleAttribute('toggle-toolbars');
  }

  async function onClearField() {
    const browser = $id('browser');
	const main = $id('main');
	const inner = $('.inner', main);
	const footer = $id('footer');
    const inp21 = $id('input21');
    inp21.value = '';
	browser.appendChild(footer);
	browser.removeAttribute('footer-in-header');
    s.toolbarList = '.mainbar, .bookmark-bar';
	await storage.setMod('toolbarList', s.toolbarList);
	getToolbarList(s.toolbarList);
	onOptionsMenuPosition(s.positionMenu);
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Home button to restart button     ***********************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function getHomeButton() {
	const main = $id('main');
    const button = $('button[title^="Homepage"], button[title="Go to homepage"]', $('.toolbar-mainbar', main));
    return button ? { button } : null;
  }

  function homeToRestart(bol) {
    const el = getHomeButton();
    if (!el) return;
    const { button } = el;
    const browser = $id('browser');
    const config = {
      id: bol ? 'restartButton' : 'homeButton',
      title: bol ? 'Restart browser' : 'Go to homepage',
      add: bol ? ['custom-button', 'restart-button'] : ['ToolbarButton-Button'],
      remove: bol ? ['ToolbarButton-Button'] : ['custom-button', 'restart-button']
    };
    button.id = config.id;
    button.title = config.title;
    button.classList.remove(...config.remove);
    button.classList.add(...config.add);
    button.removeEventListener('dragend', handleDrag);
    if (bol) {
	  button.addEventListener('dragend', handleDrag);
	}
    if (browser) {
      if (bol) browser.setAttribute('home-to-restart', 'true');
      else browser.removeAttribute('home-to-restart');
  } }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Move tab     ********************************************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  async function moveTab(e) {
    const browser = $id('browser');
    if (e) {
      chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        if (tabs[0]) {
		  chrome.tabs.move(tabs[0].id, {index: 0});
		}
      });
    }
    browser?.[s.moveActiveTab ? 'setAttribute' : 'removeAttribute']('move-active-tab', true);
    await storage.setMod('moveActiveTab', s.moveActiveTab);
  }

  function moveTabPosition(e) {
    if (!s.moveActiveTab) return;
    try {
      chrome.tabs.move(e.tabId, {index: 0});
    } catch (err) {
	  if (err === "Error: Tabs can't be edited right now.") setTimeout(() => moveTabPosition(e), Timers.moveTabInt);
  } }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Toggle toolbars button hides toolbars checked '✓ Hide ...'     ******************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function setToggleButton() {
    const tabs = $id('tabs-container');
	const toggle = $c('button', {id: 'toggleToolbars', className: 'ToolbarButton-Button custom-button  toggle-toolbars', title: Texts.toggleTooltip, onclick: () => { setToolbars(); reloadElements(); if ($id('optionsMenu')) onOptionsMenuPosition(s.positionMenu)}});
	try {
	  tabs.insertBefore(toggle, tabs.firstChild.nextSibling);
	  removeDupes?.('toggle-toolbars');
	} catch (err) {}
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Hides the tab bar and also toolbars checked in 'Toggle Toolbars Button ✓ Hide ...'     ******************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  $id('input23')?.addEventListener('change', async (e) => {
    const newKey = e.target.value;
    s.keyCodes = newKey;
    await storage.setMod('keyCodes', newKey);
    console.log(`[${CURRENT_MOD_ID}] Shortcut updated to: ${newKey}`);
  });

  const tabbarHide = () => {
	const browser = $id('browser');
    const header = $id('header');
    if (header) {
	  header.hidden = true;
	}
  };

  const tabbarShow = () => {
	const browser = $id('browser');
    const header = $id('header');
    if (header) {
	  header.hidden = false;
	}
    if (browser) {
      browser.classList.remove('address-top-off');
      browser.classList.add('address-top');
    }
  };

  async function initTabbarMod() {
    const webView = $id('webview-container');
    if (!webView) return;
    let isEnabled = await storage.getMod('hideTabbar', s.hideTabbar);
    if (!$id('mod-hidden-style')) {
      const style = $c('style');
      style.id = 'mod-hidden-style';
      style.textContent = '[hidden] { display: none !important; }';
      document.head.appendChild(style);
    }
	const toggleTabbar = async () => {
      isEnabled = !isEnabled;
      await storage.setMod('hideTabbar', isEnabled);
      if (isEnabled) {
		tabbarHide();
      } else {
		tabbarShow();
	  }
	  const browser = $id('browser');
      if (browser) {
		isEnabled ? browser.setAttribute('hide-tabbar', 'true') : browser.removeAttribute('hide-tabbar');
	  }
    };
	vivaldi.tabsPrivate.onKeyboardShortcut.addListener((id, combo) => {
      if (!s.keyCodes || typeof s.keyCodes !== 'string') return;
      const normalize = (str) => str.toLowerCase().replace(/\s+/g, '');
      const keyList = s.keyCodes.split(',').map(k => normalize(k)).filter(Boolean);
      const current = normalize(combo);
      if (!keyList.length) return;
      //const [first, second, ...rest] = keyList;
      //if (current === first) {
	  const [first, ...rest] = keyList;
	  if (current === first) {
		onOptions();
      } else if (rest.includes(current)) {
        toggleTabbar();
      }
    });
    if (isEnabled) {
	  tabbarHide();
      browser?.setAttribute('hide-tabbar', 'true');
  } }

  let tabbarInterval = setInterval(() => {
    if ($id('webview-container')) {
      clearInterval(tabbarInterval);
      initTabbarMod();
    }
  }, Timers.tabbarInt);
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Reloading elements     **********************************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function reloadElements() {
    const cal = $id('calendar');
	const optBtn = $id('optionsButton');
	const optMenu = $id('optionsMenu');
	const restartBtn = $id('restart-browser');
	const togToolbars = $id('toggleToolbars');
	const main = $id('main');
	const inner = $('.inner', main);
	try {
	  if (!cal) {
		dateHolder();
	  }
	  if (!restartBtn && s.homeRestart) {
		homeToRestart(s.homeRestart);
	  }
	  if (!optBtn) {
		setOptionsButton();
	  }
	  if (!optMenu) {
		setOptionsMenu();
	  }
	  if (!togToolbars) {
		setToggleButton();
	  }
	} catch (err) {}
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// On shutDown     *****************************************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function shutDown() {
    const homeBtn = $id('restart-browser');
    chrome.tabs.onActivated.removeListener(moveTabPosition);
    chrome.tabs.onHighlighted.removeListener(getCurrentTab);
    clearInterval(favTimer);
	Promise.all(UNPREFIXED_V1.map(key => storage.setMod(key, settings[key])))
      .then(() => console.log(`[${CURRENT_MOD_ID}] All settings saved.`))
      .catch(err => console.error(`[${CURRENT_MOD_ID}] Save failed:`, err));
	if (homeBtn) { homeBtn.removeEventListener('dragend', handleDrag); }
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('fullscreenchange', handleLayout);
    window.removeEventListener('resize', handleLayout);
    window.removeEventListener('load', handleLoad);
    window.removeEventListener('unload', shutDown);
	//vivaldi.tabsPrivate.onKeyboardShortcut.removeListener(handleShortcut);
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Global addListeners and addEventListeners     ***********************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  chrome.tabs.onActivated.addListener(e => moveTabPosition(e));
  chrome.tabs.onHighlighted.addListener((tabId, changeInfo, tab) => getCurrentTab());
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { if (changeInfo.status === 'complete' || changeInfo.favIconUrl) getCurrentTab(); });
  window.addEventListener('focus', handleFocus);
  window.addEventListener('fullscreenchange', handleLayout);
  window.addEventListener('resize', handleLayout);
  window.addEventListener('load', handleLoad);
  window.addEventListener('unload', shutDown);
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Start initializing     **********************************************************************************************************
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  initInterval = setInterval(() => {
    if (!$id('optionsButton')) {
	  initialize();
    } else {
	  initialize();
	  clearInterval(initInterval);
	}
  }, Timers.initializeInt);
})();
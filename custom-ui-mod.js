(() => {

  'use strict';

  const MOD_ID = '_srazzano_ui_mod_';
 
  const $c = (type, props = {}, ...children) => {
    const node = document.createElement(type);
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.substring(2).toLowerCase(), value);
      else if (key === 'style' && typeof value === 'object') Object.assign(node.style, value);
      else if (key in node) node[key] = value;
      else node.setAttribute(key, value);
    }); // Usage: $c('span', {id: 'calendar', className: 'aCal', title: Texts.dateTooltip, onmouseover: setDateText}); or onmouseover: () => setDateText()
    children.flat().forEach(child => {
      if (typeof child === 'string' || typeof child === 'number') node.appendChild(document.createTextNode(child));
      else if (child instanceof Node) node.appendChild(child);
    }); // Usage: See AI.js file on Desktop 
    return node;
  };

  const $q = (sel) =>  {
	return document.querySelector(sel); // Usage: $q('.item');
  };

  const $$q = (sel) => {
	return document.querySelectorAll(sel); // Usage: $q('.item').forEach(item => item.checked = false);
  };

  const insertAfter = (newNode, ref) => {
	ref?.parentNode?.insertBefore(newNode, ref.nextSibling ?? null); // Usage: insertAfter(clk, cal);
  };

  const removeDupes = (className) => {
    const elements = document.getElementsByClassName(className);
    if (elements.length <= 1) return;
    [...elements].slice(1).forEach(el => el.remove()); // Usage: removeDupes?.('aCal');
  };

  const storage = {
    // === Non-prefixed (legacy / direct access) ===
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
    }, // Usage: await storage.getAll();
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
    }, // Usage: await storage.remove('full key name');
    // === Prefixed methods (RECOMMENDED for all new code) ===
    getModKey(shortKey) {
      return `${MOD_ID}${shortKey}`;
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
    }, // Usage: await storage.removeMod('short key name');
    // Get ALL mod-prefixed keys
    async getAllMod() {
      try {
        const result = await chrome.storage.local.get(null);
        return Object.fromEntries(
          Object.entries(result)
            .filter(([key]) => key.startsWith(MOD_ID))
            .map(([key, value]) => [key.slice(MOD_ID.length), value])
        );
      } catch (error) {
        console.error("Failed to get all mod storage:", error);
        return {};
      }
    }, // Usage: await storage.getAllMod();
    // Clear ONLY mod-prefixed keys (safer)
    async clearAllMod() {
      try {
        const result = await chrome.storage.local.get(null),
              keysToRemove = Object.keys(result).filter(key => key.startsWith(MOD_ID));
        if (keysToRemove.length) await chrome.storage.local.remove(keysToRemove);
      } catch (error) {
        console.error("Failed to clear all mod storage:", error);
        throw error;
      }
    }, // Usage: await storage.clearAllMod();
    // Clear everything – use with caution
    async clearAll() {
      try {
        await chrome.storage.local.clear();
      } catch (error) {
        console.error("Failed to clear all storage:", error);
        throw error;
      }
    }, // Usage: await storage.clearAll();
    // Migration helper
    async migrateMod(keyMap) {
      try {
        const oldKeys = Object.keys(keyMap);
        if (oldKeys.length === 0) return;
        const allData = await chrome.storage.local.get(oldKeys),
              newData = {},
              keysToRemove = [];
        for (const [oldKey, newShortKey] of Object.entries(keyMap)) {
          if (allData[oldKey] !== undefined) {
            const newFullKey = this.getModKey(newShortKey);
            if (oldKey !== newFullKey) {
              newData[newFullKey] = allData[oldKey];
              keysToRemove.push(oldKey);
        } } }
        if (Object.keys(newData).length > 0) {
          await chrome.storage.local.set(newData);
          await chrome.storage.local.remove(keysToRemove);
          console.log(`[${MOD_ID}] Migration complete. Moved ${keysToRemove.length} keys.`);
        } else {
          console.log(`[${MOD_ID}] Migration skipped - no old keys found.`);
        }
      } catch (e) {
        console.error(`[${MOD_ID}] Migration error:`, e);
        throw e;
      }
    }, // Usage: await storage.migrateMod(renameList);
  };

  const Icons = {
	bulb:        'background: url(/style/icons/bulb.png) center center no-repeat',
	bookmark:    'background: url(/style/icons/bookmarkbar.png) center center no-repeat',
	calendar:    'background: url(/style/icons/calendar.png) left center no-repeat; text-indent: 24px;',
    clear:       'background: url(/style/icons/delete.png) center center no-repeat',
	clock:       'background: url(/style/icons/clock.png) left center no-repeat; text-indent: 24px;',
    dialogClose: 'background: url(/style/icons/dialogclose.png) center center no-repeat',
    extension:   'background: url(/style/icons/extension.png) center center no-repeat',
    folder:      'background: url(/style/icons/folder.png) center center no-repeat',
	footer:      'background: url(/style/icons/footer.png) center center no-repeat',
	hourglass:   'background: url(/style/icons/hourglass.png) center center no-repeat',
	main:        'background: url(/style/icons/mainbar.png) center center no-repeat',
    mask:        'background: url(/style/icons/mask16.png) center center no-repeat',
	move:        'background: url(/style/icons/move.png) center center no-repeat',
	moveTab:     'background: url(/style/icons/moveTab.png) center center no-repeat',
    options:     'background: url(/style/icons/options.png) center center no-repeat',
    optionsOn:   'background: url(/style/icons/optionsOn.png) center center no-repeat',
    restart:     'background: url(/style/icons/restart.png) center center no-repeat',
    rewind:      'background: url(/style/icons/rewind.png) center center no-repeat',
	search:      'background: url(/style/icons/search.png) center center no-repeat',
	stack:       'background: url(/style/icons/stack.png) center center no-repeat',
	styledClose: 'background: url(/style/icons/styledclose.png) center center no-repeat',
	toggle:      'background: url(/style/icons/toggle.png) center center no-repeat',
	trash:       'background: url(/style/icons/trash.png) center center no-repeat',
    workspaces:  'background: url(/style/icons/workspaces.png) center center no-repeat',
  };

  const Symbols = {
    arrow:     '⇒',      // \u21D2
	bolt:      '⚡',     // \u26A1
	bookmark:  '🔖',     // \u{1F516}
	bulb:      '💡',     // \u{1F4A1}
    bullet:    '•',      // \u2022
	calendar:  '📅',     // \u{1F4C5}
	clock1:    '⏰',     // \u23F0
	clock2:    '🕑',     // \u{1F551}
	color:     '🎨',     // \u{1F3A8}
	cut:       '✂',     // \u2702
	downArrow: '▼',      // \u25BC
	eye:       '👁️',     // \u{1F441}
	flame:     '🔥',     // \u{1F525}
	folder:    '📁',     // \u{1F4C1}
	heart:     '❤️',     // \u2764
	hourglass: '⏳',     // \u23F3
	key:       '🔑',     // \u{1F511}
	memo:      '📝',     // \u{1F4DD}
	moon:      '🌙',     // Emoji
	multiply:  '❌',     // Emoji
	plus:      '➕',     // Emoji
	pointer:   '►',      // \u25BA
	puzzle:    '🧩',     // \u{1F9E9}
	rocket:    '🚀',     // \u{1F680}
	search:    '🔍',     // \u{1F50D}
	space:     '\u3000', // Large Gap
	stack:     '☰',      // \u2630
	star1:     '★',      // \u2605
	star2:     '☆',      // \u2606
	sun:       '🌞',     // Emoji
	target:    '🎯',     // \u{1F3AF}
	thumbDown: '👎',     // \u{1F44E}
	thumbUp:   '👍',     // \u{1F44D}
	trash:     '🗑',     // \u{1F5D1}
	wall:      '🧱',     // \u{1F9F1}
  };

  const Texts = {
	customTime:         'Custom Time\n• Left-click to change format',
	dateTooltip:        'Calendar / Date\n• Mouseover to update Calendar\n• Left-click to change format',
	favInterval:        'Fav Interval',
    optionsClose:       'Closes options menu',
    optionsMenu:        'Options Menu',
    optionsMenuTooltip: 'Open/Close Options Menu',
	resizeDelay:        'Resize Delay',
	setOrder:           '☰ \u3000 \u3000 Set Toolbar Order \u3000 \u3000 ☰',
	toggleTooltip:      'Hide/Show Toolbars Except Tabs',
	button12:           'Click to insert selector\nWill ignore duplicate entries',
	div21:              'Toolbar order from top (left in input field) to bottom (right in input field)',
	label0:             'Enter desired keyCode\n• Leave blank for no effect\n• Ex: Ctrl+Alt+T\n• Ex: F9',
    label1:             'Replaces bookmark folders wtih custom icon',
	label2:             'Custom CSS',
	label3:             'Date Formats:\n 1 = '+ returnDateFormat(1) +'\n 2 = '+ returnDateFormat(2) +'\n 3 = '+ returnDateFormat(3) +'\n 4 = '+ returnDateFormat(4) +'',
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
	label22:            'Time Formats:\n 1 = '+ returnTimeFormat(1) +' 12hr\n 2 = '+ returnTimeFormat(2) +' 12hr\n 3 = '+ returnTimeFormat(3) +' 24hr\n 4 = '+ returnTimeFormat(4) +' 24hr\n 2 & 4 updates every second\n 1 & 3 updates every 10 seconds',
	input10:            '400 - 1000 (Default: 1000 milliseconds)',
	span0a:             'Toggle Auto Hide Tabbar',
    span1:              'Bookmark Folder Custom Icon',
    span2:              'Custom CSS (For Future Use)',
    span3a:             'Date Before Time',
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
	span22:             'Custom Time',
  };

  const Timers = {
	callDialogInt:        500,
	delayedInitializeInt: 200,
	divOptionInt:         500,
	fullScreenInt:        200,
	initializeInt:        20,
	moveTabInt:           20,
	oneSecondInt:         1000,
	positionMenuInt:      200,
	tenSecondInt:         10000,
	waitDialogInt:        300,
  };

  let closeButton    = false,
	  customCss      = false,
	  dateFormat     = 1,
	  extensionIcons = false,
      favInterval    = 1000,
      favInUrl       = false,
      folderImage    = false,
	  hideBookmark   = false,
	  hideFooter     = false,
	  hideMainbar    = false,
      homeRestart    = false,
	  keyCodes       = 'F9',
      moveActiveTab  = false,
      positionMenu   = 1,
      resizeDelay    = 1000,
	  rewindForward  = false,
	  searchbar      = false,
      showDate       = false,
	  showTime       = false,
	  showWorkspaces = false,
      timeFormat     = 2,
	  toolbarList    = '.mainbar, .bookmark-bar',
	  toolbarToggle  = false,
	  // Do not prefix
	  favTimer       = null,
	  hasLoggedData  = false,
	  initInterval   = null,
	  timeTimer      = null,
	  s              = {};
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Initialize and loadAllSettings
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  async function initialize() {
    await loadAllSettings();
    const browser   = document.getElementById('browser'),
	      exts      = document.querySelector('.toolbar-extensions > .button-toolbar'),
		  footer2   = document.querySelector('.dialog-footer'),
          statusBar = document.querySelector('.toolbar-statusbar'),
          workspace = document.querySelector('.button-toolbar.tabbar-workspace-button > .ToolbarButton-Button > .button-title');
    window.removeEventListener('load', delayedInitialize);
    function delayedInitialize() {
      setTimeout(initialize, Timers.delayedInitializeInt);
    }
	//await storage.remove('moveActiveTab');
    if (browser) {
      const setAttr = (name, val, attrVal = 'true') => { val ? browser.setAttribute(name, attrVal) : browser.removeAttribute(name); };
      setAttr('custom-close', s.closeButton);
      setAttr('custom-css', s.customCss);
      setAttr('custom-folder', s.folderImage);
      setAttr('extension-icons', s.extensionIcons);
      setAttr('fav-in-url', s.favInUrl);
      setAttr('footer-in-header', s.toolbarList.includes('#footer'));
      setAttr('hide-bookmark', s.hideBookmark);
      setAttr('hide-footer', s.hideFooter);
      setAttr('hide-mainbar', s.hideMainbar);
      setAttr('home-to-restart', s.homeRestart);
      setAttr('move-active-tab', s.moveActiveTab);
      setAttr('rewind-forward', s.rewindForward);
      setAttr('searchbar', s.searchbar);
      setAttr('show-date', s.showDate, `Format ${s.dateFormat}`);
      setAttr('show-time', s.showTime, `Format ${s.timeFormat}`);
      setAttr('show-workspaces', s.showWorkspaces);
      setAttr('toolbar-toggle', s.toolbarToggle);
    }
    if (s.showTime) startTime();
    if (exts) exts.style.setProperty('--extensionsExpanded', '1');
    if (footer2 && !browser.contains(footer2)) browser.appendChild(footer2);
    if (workspace) workspace.innerHTML = '';
    if (!hasLoggedData) {
      console.log('Vivaldi UI Mod Settings:', s);
      hasLoggedData = true;
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
      homeRestart: false,
      keyCodes: 'F9',
      moveActiveTab: false,
      positionMenu: 1,
      resizeDelay: 1000,
      rewindForward: false,
      searchbar: false,
      showDate: false,
      showTime: false,
      showWorkspaces: false,
      timeFormat: 2,
      toolbarList: '.mainbar, .bookmark-bar',
      toolbarToggle: false,
    };
    try {
      const stored = await storage.getAllMod();
      s = { ...defaults, ...stored };
      const fRaw = Number(s.favInterval);
      s.favInterval = Number.isInteger(fRaw) ? Math.max(400, Math.min(1000, fRaw)) : 1000;
      const rRaw = Number(s.resizeDelay);
      s.resizeDelay = Number.isInteger(rRaw) ? Math.max(400, Math.min(1000, rRaw)) : 1000;
      s.positionMenu = Number(s.positionMenu) || 1;
      dateHolder();
      favImage(s.favInUrl);
      getToolbarList(s.toolbarList);
      homeToRestart(s.homeRestart);
      moveTab(s.moveActiveTab);
      returnDateFormat(s.dateFormat);
      setOptionsButton();
      setOptionsMenu();
      setToggleButton();
      timeHolder();
    } catch (err) {
      console.error('Failed to load settings:', err);
      s = { ...defaults };
  } }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Date / calendar
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function dateHolder() {
    const statusBar = document.querySelector('.toolbar-statusbar');
    if (!statusBar) return;
    const div = $c('div', { id: 'calendar', className: 'aCal', title: Texts.dateTooltip, style: Icons.calendar});
    try {
      if (typeof s.dateFormat !== 'number' || s.dateFormat < 1 || s.dateFormat > 4) { s.dateFormat = 1; }
      div.textContent = returnDateFormat(s.dateFormat);
      div.onmouseover = setDateText;
      div.onclick = () => selectDateFormat(); // This will become async soon
      statusBar.insertBefore(div, statusBar.lastChild);
      removeDupes?.('aCal');
    } catch (err) { console.error('dateHolder error:', err); }
  }

  function returnDateFormat(int) {
    if (!Number.isInteger(int) || int < 1 || int > 4) throw new RangeError('int must be an integer between 1 and 4');
    const date      = new Date(),
          locale    = navigator.language,
          getPart   = (options) => new Intl.DateTimeFormat(locale, options).format(date),
          parts     = new Intl.DateTimeFormat(locale, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }).formatToParts(date),
          map       = Object.fromEntries(parts.map(p => [p.type, p.value])),
          day       = parseInt(map.day),
          dayPadded = map.day.padStart(2, '0'),
          year      = map.year,
          suffix    = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 || Math.floor(day / 10) === 1 ? 0 : day % 10)] || 'th',
          ordinal   = day + suffix;
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
    const calendar = document.getElementById('calendar');
    if (calendar) { calendar.textContent = returnDateFormat(s.dateFormat); }
    const input3 = document.getElementById('input3');
    if (input3) input3.value = s.dateFormat;
    const span3b = document.getElementById('span3b');
    if (span3b) span3b.textContent = `Format ${s.dateFormat}`;
  }

  function setDateText() {
	if (!s.showDate) return;
    const calendar = document.getElementById('calendar');
    if (calendar) {
      calendar.textContent = returnDateFormat(s.dateFormat);
  } }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Time / digitalClock
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function timeHolder() {
    const cal = document.getElementById('calendar'),
          clk = document.querySelector('.ClockButton > button');
    if (!cal || !clk) return;
    const div = $c('div', { id: 'digitalClock', className: 'aClk', title: Texts.customTime, style: Icons.clock });
    try {
      if (typeof s.timeFormat !== 'number' || s.timeFormat < 1 || s.timeFormat > 4) s.timeFormat = 2;
      clk.id = 'clock';
      insertAfter(div, cal);
      div.textContent = returnTimeFormat(s.timeFormat);
	  div.onclick = () => selectTimeFormat(); // This will become async soon
      removeDupes?.('aClk');
    } catch (err) { console.error('timeHolder error:', err); }
  }

  function createTimeFormats() {
    const date = new Date(),
	      h12  = String(date.getHours() % 12 || 12), // 3:14 = 3:14 No padStart
          h12p = h12.padStart(2, '0'),               // 3:14 = 03:14 padStart
          h24  = String(date.getHours()).padStart(2, '0'),
          min  = String(date.getMinutes()).padStart(2, '0'),
          sec  = String(date.getSeconds()).padStart(2, '0'),
          ampm = date.getHours() < 12 ? 'AM' : 'PM';
    return {
      time12:     `${h12}:${min} ${ampm}`,        // 3:14 PM No padStart
	  time12Full: `${h12}:${min}:${sec} ${ampm}`, // 3:14:55 PM No padStart
      time24:     `${h24}:${min}`,                // 15:14
      time24Full: `${h24}:${min}:${sec}`,         // 15:14:55
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
    const digitalClock = document.getElementById('digitalClock');
    if (digitalClock) digitalClock.textContent = returnTimeFormat(s.timeFormat);
    const span22b = document.getElementById('span22b');
    if (span22b) span22b.textContent = `Format ${s.timeFormat}`;
  }

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
    const element = document.getElementById('digitalClock');
    if (element) element.textContent = returnTimeFormat(s.timeFormat);
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Options button
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function setOptionsButton() {
    const optBtn = $c('button', {id: 'optionsButton', className: 'ToolbarButton-Button custom-button optionsButton', 
	  draggable: 'false', tabindex: '-1', title: Texts.optionsMenuTooltip, type: 'button', onclick: onOptions}),
	      statusBar = document.querySelector('.toolbar-statusbar');
	try {
	  if (statusBar) statusBar.insertBefore(optBtn, statusBar.firstChild);
	} catch (err) {};
	removeDupes?.('optionsButton');
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Options menu
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function setOptionsMenu() {
	const browser = document.getElementById('browser');
    const optMenu = $c('div', { id: 'optionsMenu', className: 'options-menu-popup', style: { display: 'none' }}),
          div0 = $c('div', { id: 'div0' });
    [1, 2, 3, 4].forEach(n => {
      const input = $c('input', { id: `position${n}`, className: 'radio', type: 'radio', value: n,
        title: `Position Menu > ${n === 1 ? 'TOP LEFT' : n === 2 ? 'TOP CENTER' : n === 3 ? 'TOP RIGHT' : 'CENTERED'}` });
      div0.appendChild(input);
    });
    div0.appendChild($c('span', { id: 'spanMenuText', textContent: Texts.optionsMenu }));
    div0.appendChild($c('button', { id: 'optionsMenuClose', className: 'button', title: Texts.optionsClose }));
    optMenu.appendChild(div0);
    function Row1(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip }),
            iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle }));
      label.appendChild(iconSpan);
      return label;
    }
    function Row2(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip }),
            iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle }));
      label.appendChild(iconSpan);
      return label;
    }
    function Row3(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip }),
            btn = $c('button', { id: `button${id}`, className: 'button' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText }));
      btn.appendChild($c('span', { id: `span${id}b`, className: 'span', textContent: `Format ${s.timeFormat}` }));
      label.appendChild(btn);
      return label;
    }
    function Row4(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', { id: `label${id}`, className: 'label', title: tooltip }),
            btn = $c('button', { id: `button${id}`, className: 'button' });
      label.appendChild($c('input', { id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked }));
      label.appendChild($c('span', { id: `span${id}`, className: 'span', textContent: spanText }));
      btn.appendChild($c('span', { id: `span${id}b`, className: 'span', textContent: `Format ${s.dateFormat}` }));
      label.appendChild(btn);
      return label;
    }
    function Row5(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
    function Row6(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
    function Row7(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
    function Row8(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
	  iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
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
	function Row10(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
	  iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row11(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row12(id, labelText, spanText, tooltip, iconStyle, value) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
	  label.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: spanText}));
      label.appendChild($c('input', {id: `input${id}`, type: 'text', value: value}));
      iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row13(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row14(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label indent', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
	  label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
	  label.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: spanText}));
	  iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row15(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label indent', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
	  label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
	  label.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: spanText}));
	  iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row16(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label indent', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
	  label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
	  label.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: spanText}));
	  iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
	function Row17(id, labelText, spanText, tooltip, iconStyle, checked) {
      const label = $c('label', {id: `label${id}`, className: 'label', title: tooltip}),
	        iconSpan = $c('span', {id: `icon${id}`, className: 'icon'});
      label.appendChild($c('input', {id: `input${id}`, className: 'input checkbox', type: 'checkbox', checked: checked}));
      label.appendChild($c('span', {id: `span${id}`, className: 'span', textContent: spanText}));
      iconSpan.appendChild($c('svg', {id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle,}));
      label.appendChild(iconSpan);
      return label;
    }
    function Row18(id, labelText, spanText, tooltip, iconStyle) {
      const div = $c('div', { id: `div${id}`, title: tooltip }),
            iconSpan = $c('span', { id: `icon${id}`, className: 'icon' });
      div.appendChild($c('span', { id: `span${id}a`, className: '', textContent: Texts.favInterval, title: Texts.span10a }));
      div.appendChild($c('input', { id: `input${id}a`, className: 'input input-timer', type: 'number', title: Texts.input10, value: s.favInterval }));
      div.appendChild($c('span', { id: `span${id}b`, className: '', textContent: Texts.resizeDelay, title: Texts.span10b }));
      div.appendChild($c('input', { id: `input${id}b`, className: 'input input-timer', type: 'number', title: Texts.input10, value: s.resizeDelay }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle }));
      div.appendChild(iconSpan);
      return div;
    }
    function Row19(id, labelText, spanText, tooltip) {
      const div = $c('div', {id: `div${id}`, className: 'div order'});
	  div.appendChild($c('span', {id: `span${id}`, textContent: `${Texts.setOrder}`}));
      return div;
    }
    function Row20(id, labelText, spanText, tooltip, iconStyle, value) {
      const div = $c('div', { id: `div${id}`, title: tooltip }),
            iconSpan = $c('span', { id: `span${id}`, className: 'icon', title: Texts.span11a });
      div.appendChild($c('input', { id: `input${id}`, className: 'input', type: 'text', value: value }));
      iconSpan.appendChild($c('svg', { id: `svg${id}`, className: 'svg', xmlns: 'http://www.w3.org/2000/svg', style: iconStyle }));
      div.appendChild(iconSpan);
      return div;
    }
    function Row21(id, labelText, spanText, tooltip) {
	  const div = $c('div', {id: `div${id}`, title: tooltip}),
	        btn1 = $c('button', {id: `button${id}a`, className: 'button', title: `${Texts.button12}`}),
	        btn2 = $c('button', {id: `button${id}b`, className: 'button', title: `${Texts.button12}`}),
	        btn3 = $c('button', {id: `button${id}c`, className: 'button', title: `${Texts.button12}`});
	  btn1.appendChild($c('span', {id: `span${id}a`, className: 'span', textContent: `.mainbar`}));
	  btn2.appendChild($c('span', {id: `span${id}b`, className: 'span', textContent: `.bookmark-bar`}));
	  btn3.appendChild($c('span', {id: `span${id}c`, className: 'span', textContent: `#footer`}));
	  div.appendChild(btn1);
	  div.appendChild(btn2);
	  div.appendChild(btn3);
	  return div;
    }
    optMenu.appendChild(Row1(1, null, Texts.span1, Texts.label1, Icons.folder, s.folderImage));
    optMenu.appendChild(Row2(2, null, Texts.span2, Texts.label2, Icons.bulb, s.customCss));
    optMenu.appendChild(Row3(22, null, Texts.span22, Texts.label22, null, s.showTime));
    optMenu.appendChild(Row4(3, null, Texts.span3a, Texts.label3, null, s.showDate));
    optMenu.appendChild(Row5(8, null, Texts.span8, Texts.label8, Icons.extension, s.extensionIcons));
    optMenu.appendChild(Row6(4, null, Texts.span4, Texts.label4, Icons.restart, s.homeRestart));
    optMenu.appendChild(Row7(13, null, Texts.span13, Texts.label13, Icons.rewind, s.rewindForward));
    optMenu.appendChild(Row8(14, null, Texts.span14, Texts.label14, Icons.search, s.searchbar));
    optMenu.appendChild(Row9(5, null, Texts.span5, Texts.label5, s.favInUrl));
    optMenu.appendChild(Row10(7, null, Texts.span7, Texts.label7, Icons.moveTab, s.moveActiveTab));
    optMenu.appendChild(Row11(6, null, Texts.span6, Texts.label6, Icons.styledClose, s.closeButton));
    optMenu.appendChild(Row12(0, null, Texts.span0a, Texts.label0, Icons.move, s.keyCodes));
    optMenu.appendChild(Row13(15, null, Texts.span15, Texts.label15, Icons.mask, s.toolbarToggle));
    optMenu.appendChild(Row14(17, null, Texts.span17, Texts.label17, Icons.bookmark, s.hideBookmark));
    optMenu.appendChild(Row15(18, null, Texts.span18, Texts.label18, Icons.main, s.hideMainbar));
    optMenu.appendChild(Row16(16, null, Texts.span16, Texts.label16, Icons.footer, s.hideFooter));
    optMenu.appendChild(Row17(9, null, Texts.span9, Texts.label9, Icons.workspaces, s.showWorkspaces));
    optMenu.appendChild(Row18(10, null, null, null, Icons.hourglass));
    optMenu.appendChild(Row19(20, null, null, null));
    optMenu.appendChild(Row20(21, null, null, Texts.div21, Icons.clear, s.toolbarList));
    optMenu.appendChild(Row21(12, null, null, null));
    try {
	  if (browser) {
        document.querySelector('.inner').appendChild(optMenu);
        document.getElementById('input1').checked = s.folderImage;
        document.getElementById('input3').checked = s.showDate;
        document.getElementById('input2').checked = s.customCss;
        document.getElementById('input8').checked = s.extensionIcons;
        document.getElementById('input4').checked = s.homeRestart;
        document.getElementById('input13').checked = s.rewindForward;
        document.getElementById('input14').checked = s.searchbar;
        document.getElementById('input5').checked = s.favInUrl;
        document.getElementById('input7').checked = s.moveActiveTab;
        document.getElementById('input6').checked = s.closeButton;
        document.getElementById('input15').checked = s.toolbarToggle;
        document.getElementById('input22').checked = s.showTime;
        document.getElementById('input17').checked = s.hideBookmark;
        document.getElementById('input18').checked = s.hideMainbar;
        document.getElementById('input16').checked = s.hideFooter;
        document.getElementById('input9').checked = s.showWorkspaces;
        $$q('#div0 > .radio').forEach(el => {
          el.checked = parseInt(el.value) === s.positionMenu;
          el.onclick = e => onOptionsMenuRadio(parseInt(e.target.value));
        });
        $$q('#optionsMenu .checkbox').forEach(el => { el.onclick = e => onOptionsMenuInput(e.target.id); });
        document.getElementById('optionsMenuClose').onclick = onOptions;
        document.getElementById('button3').onclick = () => selectDateFormat();
        document.getElementById('button22').onclick = () => selectTimeFormat();
        document.getElementById('input22').onclick = () => onOptionsMenuInput('input22');
        document.getElementById('button12a').onclick = () => onSelector('button12a');
        document.getElementById('button12b').onclick = () => onSelector('button12b');
        document.getElementById('button12c').onclick = () => onSelector('button12c');
        document.getElementById('span21').onclick = onClearField;
        document.getElementById('input0').oninput = () => onOptionsMenuInput('input0');
        document.getElementById('input10a').oninput = () => onOptionsMenuInput('input10a');
        document.getElementById('input10b').oninput = () => onOptionsMenuInput('input10b');
        document.getElementById('input0').value = s.keyCodes ?? 'F9';
        document.getElementById('input10a').value = s.favInterval ?? 1000;
        document.getElementById('input10b').value = s.resizeDelay ?? 1000;
        document.getElementById('input21').value = s.toolbarList ?? '.mainbar, .bookmark-bar';
        const hideFooterOpacity = s.hideFooter ? '1' : '0.3';
        document.getElementById('span16a').style.opacity = document.getElementById('svg16').style.opacity = hideFooterOpacity;
        const hideBookmarkOpacity = s.hideBookmark ? '1' : '0.3';
        document.getElementById('span17a').style.opacity = document.getElementById('svg17').style.opacity = hideBookmarkOpacity;
        const hideMainbarOpacity = s.hideMainbar ? '1' : '0.3';
        document.getElementById('span18a').style.opacity = document.getElementById('svg18').style.opacity = hideMainbarOpacity;
        document.getElementById('button3').style.opacity = s.showDate ? '1' : '0.3';
        document.getElementById('button22').style.opacity = s.showTime ? '1' : '0.3';
        removeDupes?.('options-menu-popup');
	  }
    } catch (err) { console.error('setOptionsMenu error:', err); }
  }

  function onOptions() {
    const browser = document.getElementById('browser');
    if (browser.toggleAttribute('options-menu')) {
      document.getElementById('span3b').textContent = `Format ${s.dateFormat}`;
      document.getElementById('span22b').textContent = `Format ${s.timeFormat}`;
    }
    onOptionsMenuPosition(s.positionMenu);
  }

  async function onOptionsMenuInput(id) {
    const browser = document.getElementById('browser'),
          el = document.getElementById(id);
    if (!el) {
      console.warn(`Element not found: #${id}`);
      return;
    }
    const config = {
      'input0': {
        save: () => {
          s.keyCodes = el.value.trim();
          return ['keyCodes', s.keyCodes];
        }
      },
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
          if (s.favInUrl) favImage(s.favInUrl);
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
          s.favInterval = Number.isInteger(val) ? Math.max(400, Math.min(1000, val)) : 1000;
          return ['favInterval', s.favInterval];
        }
      },
      'input10b': {
        save: () => {
          const val = Number(el.value);
          s.resizeDelay = Number.isInteger(val) ? Math.max(400, Math.min(1000, val)) : 1000;
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
          const label16 = document.getElementById('label16'),
                label17 = document.getElementById('label17'),
                label18 = document.getElementById('label18');
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
          const opacity = s.hideFooter ? '1' : '0.3';
          document.getElementById('span16a').style.opacity = document.getElementById('svg16').style.opacity = opacity;
          return ['hideFooter', s.hideFooter];
        },
        attr: 'hide-footer'
      },
      'input17': {
        save: () => {
          s.hideBookmark = el.checked;
          const opacity = s.hideBookmark ? '1' : '0.3';
          document.getElementById('span17a').style.opacity = document.getElementById('svg17').style.opacity = opacity;
          return ['hideBookmark', s.hideBookmark];
        },
        attr: 'hide-bookmark'
      },
      'input18': {
        save: () => {
          s.hideMainbar = el.checked;
          const opacity = s.hideMainbar ? '1' : '0.3';
          document.getElementById('span18a').style.opacity = document.getElementById('svg18').style.opacity = opacity;
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
          if (s.showTime) startTime();
          return ['showTime', s.showTime];
      } }
    };
    const item = config[id];
    if (!item) {
      console.warn('Unknown input:', id);
      return;
    }
    const [storageKey, value] = item.save();
    // Save using the helper (adds prefix automatically)
    await storage.setMod(storageKey, value);
    if (item.attr) { browser?.[value ? 'setAttribute' : 'removeAttribute'](item.attr, true); }
  }

  function onOptionsMenuPosition(position) {
    const inner = document.querySelector('.inner'),
          menu  = document.getElementById('optionsMenu');
    if (!inner || !menu) return;
    const viewportWidth = window.innerWidth,
          innerRect     = inner.getBoundingClientRect(),
          menuRect      = menu.getBoundingClientRect();
    $$q('.radio').forEach(radio => radio.checked = false);
	const radio = document.getElementById(`position${position}`);
    if (radio) radio.checked = true;
    let top = inner.clientTop + 'px',
        left = '0px';
    const positions = {
      1: () => { /* left - already set */ },
      2: () => { // center horizontally
        const centerX = viewportWidth / 2;
        left = `${centerX - (menuRect.width / 2)}px`;
      },
      3: () => { // right with 10px margin
        left = `${viewportWidth - menuRect.width - 10}px`;
      },
      4: () => { // center both horizontally and vertically inside .inner
        const centerX = viewportWidth / 2,
              centerY = innerRect.top + (innerRect.height / 2);
        top = `${centerY - (menuRect.height / 2)}px`;
        left = `${centerX - (menuRect.width / 2)}px`;
      }
    };
    const positionHandler = positions[Number(position)];
    if (positionHandler) positionHandler();
    else console.warn(`Unknown menu position option: ${position}`);
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
    const input = document.getElementById('input21');
    if (!input) return;
    const browser = document.getElementById('browser'),
          selectorMap = {
            button12a: '.mainbar',
            button12b: '.bookmark-bar',
            button12c: '#footer',
          },
          selector = selectorMap[buttonId];
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
    if (buttonId === 'button12c') { setTimeout(() => onOptionsMenuPosition(s.positionMenu), Timers.positionMenuInt); }
    getToolbarList(newValue);
  }

  async function onClearField() {
    const browser = document.getElementById('browser'),
          inp21 = document.getElementById('input21');
    inp21.value = '';
    s.toolbarList = '.mainbar, .bookmark-bar';
    await storage.setMod('toolbarList', s.toolbarList);
    if (browser) {
      browser.appendChild(document.getElementById('footer'));
      browser.removeAttribute('footer-in-header');
    }
    getToolbarList(s.toolbarList);
    onOptionsMenuPosition(s.positionMenu);
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Favicon in Url
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function favImage(bol) {
    const browser = document.getElementById('browser'),
	      favImg  = document.getElementById('favImg'),
          field   = document.querySelector('.UrlField'),
          img     = $c('img', {id: 'favImg'});
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
    const browser = document.getElementById('browser');
	const container = document.getElementById('webview-container'),
          SHIFT_PX = '-3px 0px',
          sitesToShift = ['https://www.youtube.com','https://forum.vivaldi.net'],
          field = $q('.UrlField'),
          img = document.getElementById('favImg'),
		  current = document.getElementById('currentI');
    if (browser) {
	  if (!container) console.warn('Webview container not found');
        chrome.tabs.query({currentWindow: true, active: true}, ([tab]) => {
          let shouldShift = sitesToShift.some(site => tab.url.startsWith(site));
          container.style.margin = shouldShift ? SHIFT_PX : '0px';
        if (tab.favIconUrl) {
          try {
            let url = new URL(tab.favIconUrl);
            if (!['http:', 'https:', 'data:'].includes(url.protocol)) img.src = '/style/icons/page.png';
		    if (img) img.src = tab.favIconUrl;
          } catch { img.src = '/style/icons/page.png'; }
        } else {
		  if (img) {
            if (tab.url.startsWith('vivaldi://')) img.src = '/style/icons/vivaldi.png';
            else if (tab.url.startsWith('chrome-extension://')) img.src = '/style/icons/extension.png';
            else img.src = '/style/icons/page.png';
        } }
        if (current) current.src = img.src;
      });
  } }

  function getCurrentTabUpdated() {
    favTimer = setInterval(() => {getCurrentTab(); reloadElements()}, s.favInterval);
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Toolbar list
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function getToolbarList(list) {
	const selectors = list.split(',').map(s => s.trim()).filter(s => s && /^(?:\.[a-z-]+|#(?:footer|[\w-]+))$/i.test(s));
    for (const selector of selectors.toReversed()) {
      try {
        const element = $q(selector);
        if (element) main.insertBefore(element, main.firstChild);
      } catch (err) { console.warn(`Invalid selector skipped: ${selector}`, err); }
  } }

  function setToolbars() {
    const browser = document.getElementById('browser');
	browser.toggleAttribute('toggle-toolbars');
  }

  async function onClearField() {
    const browser = document.getElementById('browser'),
	      inner   = document.querySelector('.inner'),
		  footer  = document.getElementById('footer'),
          inp21   = document.getElementById('input21');
    inp21.value = '';
	browser.appendChild(footer);
	browser.removeAttribute('footer-in-header');
    s.toolbarList = '.mainbar, .bookmark-bar';
	await storage.setMod('toolbarList', s.toolbarList);
	getToolbarList(s.toolbarList);
	onOptionsMenuPosition(s.positionMenu);
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Home button to restart button
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function getHomeButton() {
    const button = document.querySelector('button[title^="Homepage"], button[title="Go to homepage"]');
    if (!button) return null;
	return { button };
  }

  function homeToRestart(bol) {
	const browser = document.getElementById('browser'),
          el      = getHomeButton();
    if (!el) return;
	const { button } = el,
	  restartId      = 'restartButton',
	  restartClasses = ['ToolbarButton-Button', 'custom-button', 'restart-button'],
      restartTitle   = 'Restart browser',
	  homeId         = 'homeButton',
      homeTitle      = 'Go to homepage',
      homeClass      = ['ToolbarButton-Button'],
      dragHandler    = (bol) => {
        bol.preventDefault?.();
        setTimeout(() => { s.homeRestart; }, s.resizeDelay);
      };
	if (bol) {
      button.id = restartId;
      button.classList.remove(...homeClass);
      button.classList.add(...restartClasses);
      button.title = restartTitle;
      button.addEventListener('dragend', dragHandler, { once: false });
    } else {
      button.id = homeId;
      button.classList.remove(...restartClasses);
      button.classList.add(...homeClass);
      button.title = homeTitle;
      button.removeEventListener('dragend', dragHandler);
    }
	browser?.[bol ? 'setAttribute' : 'removeAttribute']('home-to-restart', true);
	removeDupes?.('restart-button');
  }  
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Move tab
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  async function moveTab(e) {
    const browser = document.getElementById('browser');
    if (e) {
      chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        if (tabs[0]) chrome.tabs.move(tabs[0].id, {index: 0});
      });
    }
    browser?.[s.moveActiveTab ? 'setAttribute' : 'removeAttribute']('move-active-tab', true);
    await storage.setMod('moveActiveTab', s.moveActiveTab);
  }

  function moveTabPosition(e) {
    if (!s.moveActiveTab) return;
    try {
      chrome.tabs.move(e.tabId, {index: 0});
    } catch (err) {if (err === "Error: Tabs can't be edited right now.") setTimeout(() => moveTabPosition(e), Timers.moveTabInt);}
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Toggle toolbars button
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function setToggleButton() {
    const tabs   = document.getElementById('tabs-container'),
		  toggle = $c('button', {id: 'toggle-toolbars', className: 'ToolbarButton-Button custom-button  toggle-toolbars', title: Texts.toggleTooltip, onclick: () => {setToolbars(); reloadElements(); if (document.getElementById('optionsMenu')) onOptionsMenuPosition(s.positionMenu)}});
	try {
	  tabs.insertBefore(toggle, tabs.firstChild.nextSibling);
	  removeDupes?.('toggle-toolbars');
	} catch (err) {}
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Reloading elements
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function reloadElements() {
    const cal         = document.getElementById('calendar'),
	      optBtn      = document.getElementById('optionsButton'),
		  optMenu     = document.getElementById('optionsMenu'),
		  restartBtn  = document.getElementById('restart-browser'),
		  togToolbars = document.getElementById('toggle-toolbars'),
	      inner       = document.querySelector('.inner');
	try {
	  if (!cal) dateHolder();
	  if (!restartBtn && s.homeRestart) homeToRestart(s.homeRestart);
	  if (!optBtn) setOptionsButton();
	  if (!optMenu) setOptionsMenu();
	  if (!togToolbars) setToggleButton();
	} catch (err) {}
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// On shutDown
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  function shutDown() {
    const homeBtn = document.getElementById('restart-browser');
    // Remove listeners
    chrome.tabs.onActivated.removeListener(moveTabPosition);
    chrome.tabs.onHighlighted.removeListener(getCurrentTab);
    chrome.tabs.onUpdated.removeListener((tabId, changeInfo, tab) => {
      if (tab.status === 'complete') {
        getCurrentTabUpdated();
        clearInterval(favTimer);
      }
    });
    const keysToSave = [
      'closeButton', 'customCss', 'dateFormat', 'extensionIcons',
      'favInterval', 'favInUrl', 'folderImage', 'hideFooter',
      'hideBookmark', 'hideMainbar', 'homeRestart', 'keyCodes',
      'moveActiveTab', 'positionMenu', 'resizeDelay', 'rewindForward',
      'searchbar', 'showDate', 'showTime', 'showWorkspaces',
      'timeFormat', 'toolbarList', 'toolbarToggle'
    ];
    Promise.all(keysToSave.map(key => storage.setMod(key, settings[key])))
      .then(() => console.log(`[${MOD_ID}] All settings saved.`))
      .catch(err => console.error(`[${MOD_ID}] Save failed:`, err));
    clearInterval(favTimer);
    if (homeBtn) homeBtn.removeEventListener('dragend', e => setTimeout(() => homeToRestart(s.homeRestart), s.resizeDelay));
    window.removeEventListener('focus', () => setTimeout(() => reloadElements(), s.resizeDelay));
    window.removeEventListener('fullscreenchange', () => setTimeout(() => { reloadElements(); getToolbarList(s.toolbarList); }, s.resizeDelay));
    window.removeEventListener('resize', () => setTimeout(() => { reloadElements(); getToolbarList(s.toolbarList); }, s.resizeDelay));
    window.removeEventListener('unload', shutDown);
  }
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Listeners
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  chrome.tabs.onActivated.addListener(e => moveTabPosition(e));
  chrome.tabs.onHighlighted.addListener((tabId, changeInfo, tab) => getCurrentTab());
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { if (changeInfo.status === 'complete' || changeInfo.favIconUrl) getCurrentTab(); });
  window.addEventListener('focus', () => setTimeout(() => reloadElements(), s.resizeDelay));
  window.addEventListener('fullscreenchange', () => setTimeout(() => {reloadElements(); getToolbarList(s.toolbarList)}, s.resizeDelay));
  window.addEventListener('load', () => setTimeout(() => initialize(), Timers.delayedInitialize));
  window.addEventListener('resize', () => setTimeout(() => {reloadElements(); getToolbarList(s.toolbarList)}, s.resizeDelay));
  window.addEventListener('unload', () => shutDown());
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Start initializing
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  initInterval = setInterval(() => {
    if (!document.getElementById('optionsButton')) initialize();
    else { initialize(); clearInterval(initInterval) }
  }, Timers.initializeInt);
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// [Dialog Tab] Open Link
// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  let searchEngineCollection,
      defaultSearchId,
      privateSearchId,
      createdContextMenuIds = [],
      webviews = new Map(),
      fromPanel;

  setTimeout(function waitDialog() {
    const browser = document.getElementById('browser');
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
    } else setTimeout(waitDialog, Timers.waitDialogInt);
  }, Timers.waitDialogInt);

  function setUrlClickObserver(fromPanel = false) {
    if (this.dialogEventListenerSet) return;
    let timer;
    document.addEventListener('mousedown', function (event) {
      if (event.ctrlKey && event.altKey && (event.button === 0 || event.button === 1)) {
        callDialog(event);
      } else if (event.button === 1) {
        timer = setTimeout(() => callDialog(event), Timers.callDialogInt);
      }
    });
    document.addEventListener('mouseup', function (event) {
      if (event.button === 1) clearTimeout(timer);
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
        }, Timers.divOptionInt);
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
        if (event.target === this || this.firstChild) webview.back();
      });
      setForwardButtonContent(buttonForward);
	  buttonForward.style.margin = "-4px 8px 0 0";
	  buttonForward.title = "Go Forward";
      buttonForward.addEventListener('click', function (event) {
        if (event.target === this || this.firstChild) webview.forward();
      });
      buttonNewTab.innerHTML = getNewTabContent();
	  buttonNewTab.style.margin = "-4px 0 0 0px";
	  buttonNewTab.title = "New Tab in Foreground";
      buttonNewTab.addEventListener('click', function (event) {
        if (event.target === this || this.firstChild) openNewTab(inputId, true);
      });
      buttonBackgroundTab.innerHTML = getBackgroundTabContent();
	  buttonBackgroundTab.style.margin = "-4px 0 0 14px";
	  buttonBackgroundTab.title = "New Tab in Background" ;
      buttonBackgroundTab.addEventListener('click', function (event) {
        if (event.target === this || this.firstChild) openNewTab(inputId, false);
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
        if (event.target === this || this.firstChild) removeDialog(webviewId);
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
	const btn = $c('button', {className: "dialog-button", style: {background: 'transparent', border: 'unset', margin: '0 6px',},});
    return btn;
  }

  function getWebviewId() {
    let tempId = 0;
    while (true) {
      if (document.getElementById('dialog-' + tempId) === null) break;
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
    const svg = $q('.button-toolbar [name="Back"] svg');
    if (svg) {
      buttonBack.appendChild(svg.cloneNode(true));
    } else {
      buttonBack.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="26px" width="26px" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>';
  } }

  function setForwardButtonContent(forwardButton) {
    const svg = $q('.button-toolbar [name="Forward"] svg');
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
    const webView = document.getElementById("webview-container"),
          header = document.getElementById("header"),
          browser = document.getElementById("browser"),
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
		storage.set('fullScreenModEnabled', fullscreenEnabled);
		browser?.[fullscreenEnabled ? 'setAttribute' : 'removeAttribute']('header-hidden', true);
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

  }, Timers.fullScreenInt);

})();
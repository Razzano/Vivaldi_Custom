(function() {

  'use strict';

  const moveActiveTab = true,
        initializeDelay = 100;

  function initialize() {
    try {
	  moveTab(moveActiveTab);
    } catch(ex) {}
  }

  function moveTab() {
    try {
      chrome.tabs.query({currentWindow: true, active: true}, tabs => chrome.tabs.move(tabs[0].id, {index: 0}));
    } catch(ex) {}
  }

  function moveTabPosition(e) {
    try {
      chrome.tabs.move(e.tabId, {index: 0});
    } catch (ex) { if (ex == "Error: Tabs can't be edited right now.") setTimeout(e => moveTabPosition(e), 100) }
  }

  function onClose() { chrome.tabs.onActivated.removeListener(e => moveTabPosition(e)) }

  chrome.tabs.onActivated.addListener(e => moveTabPosition(e));

  window.onload = () => setTimeout(() => {
    initialize()}, initializeDelay);

  window.onunload = () => { onClose() }

})();
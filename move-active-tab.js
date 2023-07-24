(function() {

  'use strict';

  const initializeDelay = 200;

  let moveActiveTab;

  function $q(el, all) {
    if (all) return document.querySelectorAll(el);
    return document.querySelector(el);
  }

  function initialize() {
    let browser = $q('#browser');
    try {
      chrome.storage.local.get(['moveActiveTabKey'], result => {
        moveActiveTab = result.moveActiveTabKey;
        if (moveActiveTab) moveTab(moveActiveTab);
      });
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

  function onClose() {
    chrome.tabs.onActivated.removeListener(e => moveTabPosition(e));
    chrome.tabs.onHighlighted.removeListener((tabId, changeInfo, tab) => getCurrentTab());
    chrome.tabs.onUpdated.removeListener((tabId, changeInfo, tab) => {
    });
  }

  function onResize() {
    let browser = $q('#browser');
    try {
      getCalendarHolder();
    } catch(ex) {}
  }

  function removeDupes(className) {
    let dupe = document.getElementsByClassName(className);
    if(dupe.length > 1) for(let i = 1; i < dupe.length; i++) dupe[i].parentNode.removeChild(dupe[i]);
  }

  chrome.storage.local.get(['moveActiveTabKey'], result => {
    moveActiveTab = result.moveActiveTabKey;
    moveTab(moveActiveTab);
  });

  chrome.tabs.onActivated.addListener(e => moveTabPosition(e));

  chrome.tabs.onHighlighted.addListener((tabId, changeInfo, tab) =>
    getCurrentTab());

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status === 'complete') {
      clearInterval(favTimer);
    }
  });
  
  window.onload = () => setTimeout(() => {
    chrome.storage.local.get(['favIntervalKey'], result => {
      favInterval = result.favIntervalKey;
    });
    chrome.storage.local.get(['moveActiveTabKey'], result => {
      moveActiveTab = result.moveActiveTabKey;
      moveTab(moveActiveTab);
    });
    initialize()}, initializeDelay);

  window.onunload = () => {
    clearInterval(favTimer);
    chrome.storage.local.set({favIntervalKey: favInterval});
    chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
    onClose();
  };

})();
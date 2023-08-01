(function() {

  'use strict';

  const initializeDelay = 100,
		moveBtn = 'background: url(/style/move-active-tab/move.png) center no-repeat',
		moveTabTooltip = 'Activate/Deactivate move-tab function';

  let moveActiveTab;
  
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

  function removeDupes(className) {
    let dupe = document.getElementsByClassName(className);
    if(dupe.length > 1) for(let i = 1; i < dupe.length; i++) dupe[i].parentNode.removeChild(dupe[i]);
  }

  function initialize() {
	let div = $c('div', {className: 'button-toolbar move-tab-button'}),
	    btn = $c('button', {id: 'move-button', className: 'optBtn', style: moveBtn, title: moveTabTooltip}, [{type: 'click', fn: function () {setStatus()}}]),
		mainbar = $q('.toolbar-mainbar');
    try {
	  chrome.storage.local.get(['moveActiveTabKey'], result => {
        moveActiveTab = result.moveActiveTabKey;
        if (moveActiveTab) moveTab(moveActiveTab);
      });
	  div.appendChild(btn);
	  mainbar.insertBefore(div, mainbar.childNodes[2]);
	  moveTab(moveActiveTab);
    } catch(ex) {}
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
    chrome.tabs.onActivated.removeListener(e => moveTabPosition(e));
	chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
  }

  function setStatus() {
	let browser = $q('#browser');
	moveActiveTab !== true ? moveActiveTab = true : moveActiveTab = false;
    chrome.storage.local.set({moveActiveTabKey: moveActiveTab});
	if (moveActiveTab) {
	  browser.setAttribute('move-tab', true);
	  moveTab(moveActiveTab);
    } else browser.removeAttribute('move-tab');
  }

  chrome.tabs.onActivated.addListener(e => moveTabPosition(e));
  
  chrome.storage.local.get(['moveActiveTabKey'], result => {
    moveActiveTab = result.moveActiveTabKey;
    moveTab(moveActiveTab);
  });

  window.onload = () => setTimeout(() => {
	chrome.storage.local.get(['moveActiveTabKey'], result => {
      moveActiveTab = result.moveActiveTabKey;
      moveTab(moveActiveTab);
    });
    initialize()}, initializeDelay);

  window.onunload = () => { onClose() }

})();
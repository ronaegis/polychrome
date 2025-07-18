chrome.runtime.onInstalled.addListener(function() {
  console.log("Polychrome Installed");
});

chrome.action.onClicked.addListener((tab) => {
  toggleSidebar();
});

chrome.commands.onCommand.addListener((command) => {
  if (command == "search") {
    toggleSearch();
  } else if (command == "sidebar") {
    toggleSidebar();
  }
});


//
// Window Management
//

const SEARCH_WIDTH = 320;
async function toggleSearch() {
  let url = chrome.runtime.getURL("search.html");
  let tabs = await chrome.tabs.query({url:url});
  let win = await chrome.windows.getLastFocused({populate:false, windowTypes:['normal']})
  if (tabs && tabs.length) {
      let sidebarId = tabs[0].windowId;
      chrome.windows.update(sidebarId, {focused:true})
  } else {
    await chrome.windows.create({
      url: url,
      type: "popup",
      width: SEARCH_WIDTH,
      height:28 + 48 + 96,
      left:win.left + 13,
      top:win.top + 7,
    });
  }
}


const DEFAULT_WIDTH = 256;
async function toggleSidebar() {
  let url = chrome.runtime.getURL("sidebar.html");
  let tabs = await chrome.tabs.query({url:url});
  let popupWindows = await chrome.windows.getAll({populate:true, windowTypes:['popup']});
  let sidebarWindows = popupWindows.filter(w => w.tabs.some(tab => tab.url === url));
  let win = await chrome.windows.getLastFocused({populate:true, windowTypes:['normal']})
  
  if (tabs.length || sidebarWindows.length) {
    // Use the found sidebar (prefer tabs result, fallback to popup windows)
    let sidebarId = tabs.length ? tabs[0].windowId : sidebarWindows[0].id;
    let sidebar = await chrome.windows.get(sidebarId)
    
    // Always make the existing sidebar visible, don't remove it
    if (sidebar.state === 'minimized') {
      await chrome.windows.update(sidebarId, {state: 'normal'});
    }
    // Bring sidebar to front without focusing it
    await chrome.windows.update(sidebarId, {focused: true});
    // Immediately refocus the Chrome window to maintain workflow
    setTimeout(() => {
      chrome.windows.update(win.id, {focused: true});
    }, 50);
  } else {
    let adjustWindow = win.left < DEFAULT_WIDTH;
    await chrome.windows.create({
      url: url,
      type: "popup",
      width:256,
      height:win.width,
      top:win.top,
      left:adjustWindow ? win.left : win.left - DEFAULT_WIDTH
    });
    if (adjustWindow) {
      await chrome.windows.update(win.id, {width: win.width - DEFAULT_WIDTH, left:win.left + DEFAULT_WIDTH});
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let handlers = {
    focusSidebar: focusSidebar,
    'removeDuplicates': removeDuplicates
  }

  if (handlers[message.action]) {
    if (!handlers[message.action](message, sender, sendResponse)) {
      sendResponse();
    };
  } else {
    console.error("handler not found", message)
    sendResponse(undefined)
  }
});

function removeDuplicates() {
  chrome.windows.getAll({populate:true, windowTypes:['normal']})
  .then((windows) => {
    var idsToRemove = []
    var knownURLs = {};
    windows.forEach(w => {
      w.tabs.forEach((tab) => {
        if (!knownURLs[tab.url]) {
          knownURLs[tab.url] = tab.id;
        } else {
          idsToRemove.push(tab.id)         
        }
      })
      chrome.tabs.remove(idsToRemove.reverse());
    })
  })
}
console.log('Basic Request Blocker version 1');

var facebookOnOFF = true;
var youtubeOnOFF = true;

var timeDuration = 10000;

chrome.browserAction.onClicked.addListener(function(tab) {
  reloadTabs();
  facebookOnOFF = false;
  youtubeOnOFF = false;
  var freetime = setTimeout(reloadTabs, timeDuration);

  var iconC_1 = setTimeout(iconChange_1,100);
  var iconC_2 = setTimeout(iconChange_2,timeDuration/4*1);
  var iconC_3 = setTimeout(iconChange_3,timeDuration/4*2);
  var iconC_4 = setTimeout(iconChange_4,timeDuration/4*3);
  var iconC_5 = setTimeout(iconChange_5,timeDuration-300);

});

// chrome.browserAction.onClicked.addListener(function(tab) {
//   reloadTabs();
// });
function iconChange_1(){
    alert("Take "+timeDuration/1000+"sec break");

    // bootbox.alert("Hello world!", function() {
    //   Example.show("Hello world callback");
    // });
    chrome.browserAction.setIcon({path: 'icons/lock_icon_1.png'});
}
function iconChange_2(){
    chrome.browserAction.setIcon({path: 'icons/lock_icon_2.png'});
}
function iconChange_3(){
    chrome.browserAction.setIcon({path: 'icons/lock_icon_3.png'});
}
function iconChange_4(){
    chrome.browserAction.setIcon({path: 'icons/lock_icon_4.png'});
}
function iconChange_5(){
    chrome.browserAction.setIcon({path: 'icons/lock_icon_5.png'});
}

function reloadTabs() {
  facebookOnOFF = true;
  youtubeOnOFF = true;
  chrome.tabs.getAllInWindow(null, function(tabs) {
    for(var i = 0; i < tabs.length; i++) {
      chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
    }
  });
}

// function reset(){
//   facebookOnOFF = true;
//   chrome.location.href = 'http://www.facebook.com';
//   //console.log("Fdsafdas");
//   alert("dfas");
// }

function inspectRequest(details) {
  if (details.url.indexOf('http') !== 0) {
    // skip chrome-extension://, file://, etc urls
    return;
  }

  var urlDetails = getLocation(details.url);
  console.log('Request for host: "'+urlDetails.host+'" pathname: "'+urlDetails.pathname+'"');
}

function facebookBlocker() {
  console.log('Blocking facebook request');
  console.log(facebookOnOFF);
  return { cancel: facebookOnOFF };
  //return {redirectUrl:'https://itp.nyu.edu/thesis/thesis2016/wp-login.php?redirect_to=http%3A%2F%2Fitp.nyu.edu%2Fthesis%2Fthesis2016%2F&reauth=1'}
}
function youtubeBlocker() {
  console.log('Blocking facebook request');
  console.log(youtubeOnOFF);
  return { cancel: youtubeOnOFF };
  //return {redirectUrl:'https://itp.nyu.edu/thesis/thesis2016/wp-login.php?redirect_to=http%3A%2F%2Fitp.nyu.edu%2Fthesis%2Fthesis2016%2F&reauth=1'}
}


// The `facebookBlocker` will only be run for facebook urls in the main frame
chrome.webRequest.onBeforeRequest.addListener(facebookBlocker, {
  urls: ['*://*.facebook.com/*'],   //  <-- only run for facebook urls
  types: [ 'main_frame' ]           //  <-- only for web requests in the main frame
}, ['blocking']);                   //  <-- this has to be here so that we can stop the request

chrome.webRequest.onBeforeRequest.addListener(youtubeBlocker, {
  urls: ['*://*.youtube.com/*'],   //  <-- only run for facebook urls
  types: [ 'main_frame' ]           //  <-- only for web requests in the main frame
}, ['blocking']);                   //  <-- this has to be here so that we can stop the request


// This will run `inspectRequest` for all URLs in the main frame
chrome.webRequest.onBeforeRequest.addListener(inspectRequest, {
  urls: ['<all_urls>'],
  types: ['main_frame']
}, ['blocking']);




// see http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
function getLocation(href) {
  var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
  return match && {
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  };
}

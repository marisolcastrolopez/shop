/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer/app-drawer.html","8657a09284d9c23f97273df4d45c9ab4"],["bower_components/app-layout/app-header/app-header.html","67a611faec890f453342de9a24e36b36"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","36ad68eff985f01d0e18be5b25810c6b"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","fbe125a4324c722a5ba90173fbd5d799"],["bower_components/app-layout/app-toolbar/app-toolbar.html","4b4e4feb6e3e351d2cf18184191b760e"],["bower_components/app-layout/helpers/helpers.html","6aa42d530356ee42740f12773abee8ad"],["bower_components/app-route/app-location.html","9877ca6c6bdee8a6a1c310f41180fc6b"],["bower_components/app-route/app-route-converter-behavior.html","269176d0634c89273865b75a8a13997a"],["bower_components/app-route/app-route.html","4f1c84d64d8d74d81d35a05019882c0a"],["bower_components/app-storage/app-localstorage/app-localstorage-document.html","3b5f18a98aa18c82c75c1c0c3ae6b042"],["bower_components/app-storage/app-storage-behavior.html","96619e5812a40f2653d5c1c190389f00"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","53ac089b1d4b8bb23707c902478dd119"],["bower_components/iron-ajax/iron-ajax.html","b23c54d0819841310c2006f232c15463"],["bower_components/iron-ajax/iron-request.html","8f791888f62acfcb903b932e257e9dc0"],["bower_components/iron-behaviors/iron-button-state.html","f251a6344896f5afb4419dca76611897"],["bower_components/iron-behaviors/iron-control-state.html","b50ab77a58c7623525730b7208b6b162"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","80408cf041e237bdca57ea35632b8db9"],["bower_components/iron-flex-layout/iron-flex-layout.html","8029d28fe6bf672a7a463f4c1cd0de86"],["bower_components/iron-form/iron-form.html","a8f3993e80da6ef454c0210364505584"],["bower_components/iron-icon/iron-icon.html","ef495e5194f8524b1ba2efbae5facbd7"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","ae50664a36b27d3c2bd52828ad6d4272"],["bower_components/iron-location/iron-location.html","3a4433fea86a50d6556babd04f9a6f71"],["bower_components/iron-location/iron-query-params.html","af11bdda3fb85fb41b86ac3b7d1cd029"],["bower_components/iron-media-query/iron-media-query.html","97660e18a46b82a2fd8463872bf865ea"],["bower_components/iron-meta/iron-meta.html","f7673163f72a574bcd1ea90d5cb7e2e8"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","31fc90604b48aaa1c1e2a0f712382af6"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","f6c0a07860283cafd522acbbe7ff7a86"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","a23d6543492e3dacb1af01ad31e11b0d"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","db89c1d7b0fedb85094710bc7d33b90c"],["bower_components/iron-pages/iron-pages.html","9c509e0ece75d022258ca324e226a2fd"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","80056fd55e6f286d0cda6996e20e38d2"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","6f88e0f72c0ca00b54448b258d9856d1"],["bower_components/iron-selector/iron-multi-selectable.html","d47709186c85af5047b7790e536224f1"],["bower_components/iron-selector/iron-selectable.html","17213734f0a6298971d765167fdba6ce"],["bower_components/iron-selector/iron-selection.html","f68c247111d6a3cc173cc99564d39e96"],["bower_components/iron-selector/iron-selector.html","1facaed80539c5626cd248ec4b1011d4"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","acf3824aa4891737826dc34a4e6574aa"],["bower_components/paper-behaviors/paper-ripple-behavior.html","623991588ef9c838306ed757c490e3ed"],["bower_components/paper-icon-button/paper-icon-button.html","6c7fca6c77c9a0d1d8b472b5ca1df191"],["bower_components/paper-ripple/paper-ripple.html","b10a02bbc5f7177300e04e4eed8408bd"],["bower_components/paper-spinner/paper-spinner-behavior.html","15c754e201f2588a09ea1295689d42c2"],["bower_components/paper-spinner/paper-spinner-lite.html","ef878d62341481f677113c671c8bd802"],["bower_components/paper-spinner/paper-spinner-styles.html","fe62a242d74b6e0a7ced52ad7bf9bd1a"],["bower_components/paper-styles/color.html","8a42182f196047ae8d1ab99348bfa614"],["bower_components/paper-styles/default-theme.html","1f6c3a2b219ac12e7ac9c214caf1b475"],["bower_components/polymer/polymer-micro.html","6edffcaeae05ccdec2c1a63efe311332"],["bower_components/polymer/polymer-mini.html","a5d1fa4bcb5b1561f039377f8b60ec8b"],["bower_components/polymer/polymer.html","b708b8552cc467dd656c4e0520c1927b"],["bower_components/promise-polyfill/Promise-Statics.js","0634100d6b39b104c6cad8145b6e6f8f"],["bower_components/promise-polyfill/Promise.js","5b25633837256907f10f9eb74d9d1908"],["bower_components/promise-polyfill/promise-polyfill-lite.html","3ef0e7d34c334c8b0c422666c190fa2a"],["bower_components/promise-polyfill/promise-polyfill.html","e3f270d4caf545387b445f02c0147be8"],["bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["images/ladies_outerwear.jpg","790e95e6d417ab5447a37d5127b15919"],["images/ladies_tshirts.jpg","4fee73df809e6363d29c53c4616c89cd"],["images/mens_outerwear.jpg","034f3d48b53419e0ee8897e1f1fa5770"],["images/mens_tshirts.jpg","364adbf5dc1b6247ba58c5e3887bb63c"],["images/shop-icon-128.png","7c233b5552b74a53b45f7bb8590f1b54"],["images/shop-icon-192.png","d2e93b8e0722070229467585fd1221f0"],["images/shop-icon-32.png","db2a62dbf6f348a8d557cf047956872c"],["images/shop-icon-384.png","0f3500e24fc5ce5f20f3e3d09740a7a7"],["images/shop-icon-512.png","9a3fbf052187f4ed6187a7a6b5845f48"],["index.html","751a3dcee924f23e33c8414faecaaa2f"],["manifest.json","9947266851c6f5345b0ee19e74fa8e3c"],["src/lazy-resources.html","2d265698a5a4071974850394674ba82d"],["src/shop-404-warning.html","5385e685d298792b6882c809f385cc98"],["src/shop-analytics.html","fea7452b1d73fdb67955edf0b9c1587f"],["src/shop-app.html","7c3d7c65bb53d7504357ec5ba7d88677"],["src/shop-button.html","e24280e1b553b3c751088f38c512364f"],["src/shop-cart-data.html","41761103df9c17b8d91c094fcff8805c"],["src/shop-cart-item.html","ded5d68a6792179a869ea8d8c8aa6693"],["src/shop-cart-modal.html","6478caeddaa4b1256336a82f41ef742c"],["src/shop-cart.html","7e65bd396aa9077400837c206dca1b1f"],["src/shop-category-data.html","cf14c7d3bb117d8ed108af12fb85b544"],["src/shop-checkbox.html","113f8d5aa75b6418cae24736e775d119"],["src/shop-checkout.html","9da4b09fb5532ab19fbd86a694a4a4d2"],["src/shop-common-styles.html","ae57022cd80f5265fa799b5737990a63"],["src/shop-detail.html","1b1799afce36b97564c476b3d7372731"],["src/shop-form-styles.html","1ea79e69f6f53df3bcf853f7f49cd015"],["src/shop-home.html","79fba67b3fcedfe6807d67077cafb309"],["src/shop-icons.html","9cc0754a2772b6369da99ec38de8b150"],["src/shop-image.html","d2254f47f7160c78d81ca301920411de"],["src/shop-input.html","1ff6cf823bd4da9e1ca012f7b8f3980c"],["src/shop-list-item.html","c1fc21b6cec21a96b15cfc8afdff8ad3"],["src/shop-list.html","b291bed3010c854506450f4b8c36d65c"],["src/shop-network-warning.html","391ea80b8cef8152b780260f766a8427"],["src/shop-ripple-container.html","4bd0b2cbb8f4110f411ed398e78487c8"],["src/shop-select.html","789eeef7e9a7a342252d6c29b8ec3851"],["src/shop-snackbar.html","2dd683dfc5191b090eac944fa17ee328"],["src/shop-tab.html","2550e0614428c6a70cc1f20fddcfb4bf"],["src/shop-tabs-overlay.html","ae9b20966ff1d31b11a037fc48d77c62"],["src/shop-tabs.html","c2162364d625c8e5e919d5550c122608"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function (body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function (kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function (kv) {
        return ignoreUrlParametersMatching.every(function (ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function (kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function (item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function (requests) {
    return requests.map(function (request) {
      return request.url;
    });
  }).then(function (urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return setOfCachedUrls(cache).then(function (cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function (response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function (responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function () {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function (event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.keys().then(function (existingRequests) {
        return Promise.all(
          existingRequests.map(function (existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function () {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function (event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["^(?!.*\\.html$|\\/data\\/).*"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function (cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function (e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function (e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function (){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function (e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function (e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function (r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function (n){n.put(e,r).then(function (){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function (e){return g.setTimestampForUrl(e,o,a)}).then(function (e){return g.expireEntries(e,c,i,a)}).then(function (e){r("Successfully updated IDB.");var n=e.map(function (e){return t.delete(e)});return Promise.all(n).then(function (){r("Done with cache cleanup.")})}).catch(function (e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function (){return Promise.all([caches.open(e),caches.open(t)]).then(function (t){var n=t[0],r=t[1];return n.keys().then(function (e){return Promise.all(e.map(function (e){return n.match(e).then(function (t){return r.put(e,t)})}))}).then(function (){return caches.delete(e)})})})}function u(e,t){return o(t).then(function (t){return t.add(e)})}function f(e,t){return o(t).then(function (t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function (e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function (e,t,n){"use strict";function r(e){return new Promise(function (t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function (){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function (){t(r.result)},r.onerror=function (){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function (r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function (){r(e)},i.onabort=function (){o(i.error)}})}function c(e,t,n){return t?new Promise(function (r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function (e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function (){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function (n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function (){var e=a.result;e>t&&(s.openCursor().onsuccess=function (n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function (){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function (n){return s(e,t).then(function (e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function (e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function (e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function (e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function (t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function (e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function (e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function (e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function (e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function (e,r){t[e.name]=n[r+1]})}return function (e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function (e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function (e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function (){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function (e){s.prototype[e]=function (t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function (e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function (e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function (e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function (e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function (e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function (t){return t.match(e).then(function (t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function (e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function (t){return t.match(e).then(function (e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function (e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function (r,c){var s=!1,a=[],u=function (e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function (e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function (e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function (e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function (t){var s,a,u=[];if(c){var f=new Promise(function (r){s=setTimeout(function (){t.match(e).then(function (e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function (e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function (r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function (e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function (e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function (e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function (e,t,n){t.exports=Array.isArray||function (e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function (e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function (e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function (e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function (n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function (e,t,n){!function (){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function (e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function (){if(arguments.length<1)throw new TypeError;return e=e.map(function (e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function (e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function (r){if(r.some(function (e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function (t,r){return n.put(e[r],t)}))}).then(function (){})},Cache.prototype.add=function (e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\/data\/images\/.*/, toolbox.cacheFirst, {"cache":{"maxEntries":200,"name":"items-cache"}});
toolbox.router.get(/\/data\/.*json/, toolbox.fastest, {"cache":{"maxEntries":100,"name":"data-cache"}});





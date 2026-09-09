(function () {
 if (window.__bnsFont38) return;
 window.__bnsFont38 = 1;
 var head = document.head || document.getElementsByTagName("head")[0];
 if (!head) return;
 function addFont(id, href) {
 if (document.getElementById(id)) return;
 var l = document.createElement("link");
 l.id = id;
 l.rel = "stylesheet";
 l.href = href;
 head.appendChild(l);
 }
 var root = window.BNS_ASSETS || "https://cdn.robotasset.vip/assets/";
 if (!document.getElementById("bns-core38-css") && !document.querySelector('link[href*="css/core.css"]')) {
 addFont("bns-gf-inter", root + "css/font.css");
 }
 if (!document.getElementById("bns-font38-css") && !document.getElementById("bns-core38-css")) {
 var s = document.createElement("style");
 s.id = "bns-font38-css";
 s.textContent =
 "main,main button,main input,main select,main textarea{font-family:Inter,Arial,sans-serif!important}" +
 ".material-symbols-outlined{font-family:'Material Symbols Outlined'!important;font-weight:400;font-style:normal;line-height:1;display:inline-block;-webkit-font-feature-settings:'liga';font-feature-settings:'liga'}";
 head.insertBefore(s, head.firstChild);
 }
})();
(function () {
 if (window.__bnsRoute38) return;
 window.__bnsRoute38 = 1;
 function normPath() {
 var p = (location.pathname || "/").toLowerCase().replace(/\/+$/, "");
 return p || "/";
 }
 function pageOf(p) {
 p = p || normPath();
 if (p === "/login" || p === "/account/login" || (p.indexOf("/login") !== -1 && p.indexOf("logout") === -1)) return "login";
 if (p === "/register" || p === "/account/register" || p.indexOf("register") !== -1) return "register";
 if (p === "/contact-us" || p.indexOf("contact") !== -1) return "contact";
 if (p === "/download" || p.indexOf("download") !== -1) return "download";
 if (p === "/promotion" || p.indexOf("/promotion") !== -1) return "promotion";
 if (p === "/" || p === "/home" || p === "/index") return "home";
 return "other";
 }
 var listeners = [];
 var lastPage = pageOf();
 window.bnsPage = pageOf;
 window.bnsOnPage = function (fn) {
 listeners.push(fn);
 try { fn(pageOf(), lastPage); } catch (err) {}
 };
 function emit() {
 var now = pageOf();
 if (now === lastPage) return;
 var prev = lastPage;
 lastPage = now;
 for (var i = 0; i < listeners.length; i++) {
 try { listeners[i](now, prev); } catch (err) {}
 }
 }
 window.addEventListener("popstate", emit);
 window.addEventListener("hashchange", emit);
 document.addEventListener("click", function () { setTimeout(emit, 120); }, true);
 ["pushState", "replaceState"].forEach(function (key) {
 var orig = history[key];
 if (typeof orig !== "function" || orig.__bns) return;
 var wrap = function () {
 var res = orig.apply(this, arguments);
 setTimeout(emit, 0);
 return res;
 };
 wrap.__bns = 1;
 history[key] = wrap;
 });
})();
(function () {
 if (window.__bnsBlockMsn38) return;
 window.__bnsBlockMsn38 = 1;
 var HOSTS = [
 "assets.msn.com",
 "img-s-msn-com.akamaized.net",
 "c.msn.com",
 "www.msn.com",
 ".msn.com",
 "microsoftstart.com",
 "msn.com/spartan"
 ];
 function blockedUrl(v) {
 if (!v) return false;
 var s = String(v).toLowerCase();
 if (s.indexOf("/captcha") !== -1) return false;
 if (s.indexOf("man31.vip") !== -1) return false;
 if (s.indexOf("robotaset.com") !== -1) return false;
 if (s.indexOf("gstatic.com") !== -1) return false;
 for (var i = 0; i < HOSTS.length; i++) {
 if (s.indexOf(HOSTS[i]) !== -1) return true;
 }
 return false;
 }
 function hit(el) {
 if (!el || el.nodeType !== 1) return false;
 if (el.id === "imgCaptcha" || (el.className && String(el.className).indexOf("img-captcha") !== -1)) return false;
 var attrs = ["src", "href", "srcset", "data-src", "data-original", "poster", "data-href"];
 for (var i = 0; i < attrs.length; i++) {
 var v = el.getAttribute && el.getAttribute(attrs[i]);
 if (blockedUrl(v)) return true;
 }
 if (el.src && blockedUrl(el.src)) return true;
 if (el.href && blockedUrl(el.href)) return true;
 return false;
 }
 function drop(el) {
 if (!el || !el.parentNode) return;
 if (el.id === "LoginForm" || el.id === "imgCaptcha" || (el.closest && el.closest("#LoginForm,.login-container,.bns-log1n38"))) return;
 try { el.parentNode.removeChild(el); } catch (err) {}
 }
 function sweep(root) {
 root = root || document;
 var nodes = root.querySelectorAll
 ? root.querySelectorAll("img,source,iframe,script,link,video,picture,object,embed,a")
 : [];
 for (var i = 0; i < nodes.length; i++) {
 if (hit(nodes[i])) drop(nodes[i]);
 }
 if (root !== document && hit(root)) drop(root);
 }
 function patchAttr(proto, name) {
 if (!proto) return;
 var desc = Object.getOwnPropertyDescriptor(proto, name);
 if (!desc || !desc.set || desc.set.__bnsMsn) return;
 var raw = desc.set;
 var wrap = function (v) {
 if (blockedUrl(v)) return;
 return raw.call(this, v);
 };
 wrap.__bnsMsn = 1;
 try {
 Object.defineProperty(proto, name, { configurable: true, enumerable: desc.enumerable, get: desc.get, set: wrap });
 } catch (err) {}
 }
 ["HTMLScriptElement", "HTMLImageElement", "HTMLIFrameElement", "HTMLLinkElement", "HTMLSourceElement"].forEach(function (k) {
 patchAttr(window[k] && window[k].prototype, "src");
 patchAttr(window[k] && window[k].prototype, "href");
 });
 function boot() {
 sweep(document);
 if (!window.MutationObserver) return;
 var obs = new MutationObserver(function (muts) {
 for (var i = 0; i < muts.length; i++) {
 var added = muts[i].addedNodes;
 for (var j = 0; j < added.length; j++) {
 var n = added[j];
 if (n.nodeType !== 1) continue;
 if (hit(n)) drop(n);
 else sweep(n);
 }
 }
 });
 obs.observe(document.documentElement, { childList: true, subtree: true });
 }
 if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
 else boot();
})();
(function () {
 if (window.__bnsHomeScrub38) return;
 window.__bnsHomeScrub38 = 1;
 var HOME_DROP = [
 "#poolnumberresult",
 ".progressive-jackpot",
 ".custom-page",
 ".game-front-menu",
 ".btn-account",
 ".game-links-section",
 ".pageTop-element"
 ];
 var ALWAYS_DROP = ["#poolnumberresult", ".progressive-jackpot", ".pageTop-element", ".game-links-section"];
 function pageNow() {
 return typeof window.bnsPage === "function" ? window.bnsPage() : "";
 }
 function dropSel(list) {
 for (var i = 0; i < list.length; i++) {
 var nodes = document.querySelectorAll(list[i]);
 for (var j = 0; j < nodes.length; j++) {
 if (nodes[j].parentNode) nodes[j].parentNode.removeChild(nodes[j]);
 }
 }
 }
 function fixLogo() {
 var img = document.querySelector(".brand-logo img");
 if (!img) return;
 if (img.getAttribute("data-bns-logo") === "1") return;
 var want = (window.BNS_ASSETS || "https://cdn.robotasset.vip/assets/") + "images/logo.webp";
 if (img.getAttribute("src") !== want) img.src = want;
 img.setAttribute("data-bns-logo", "1");
 }
 function scrub() {
 fixLogo();
 dropSel(pageNow() === "home" ? HOME_DROP : ALWAYS_DROP);
 }
 function boot() {
 scrub();
 var root = document.querySelector("main") || document.body;
 if (window.MutationObserver && root) {
 new MutationObserver(function () { scrub(); }).observe(root, { childList: true, subtree: true });
 }
 if (typeof window.bnsOnPage === "function") window.bnsOnPage(function () { scrub(); });
 }
 if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, false);
 else boot();
})();

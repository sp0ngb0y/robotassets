(function () {
 if (window.__bnsApp38) return;
 window.__bnsApp38 = 1;
 var script = document.currentScript;
 if (!script) {
 var list = document.getElementsByTagName("script");
 for (var i = list.length - 1; i >= 0; i--) {
 if ((list[i].src || "").indexOf("/app.js") !== -1) {
 script = list[i];
 break;
 }
 }
 if (!script) script = list[list.length - 1];
 }
 var src = (script && script.src) || "";
 var root = "https://cdn.robotasset.vip/assets/";
 if (src) {
 var cut = src.replace(/[?#].*$/, "");
 if (/\/js\/[^\/]+$/i.test(cut)) root = cut.replace(/\/js\/[^\/]+$/i, "/");
 else if (/\/assets\/?$/i.test(cut.replace(/\/[^\/]+$/, "/"))) root = cut.replace(/\/[^\/]+$/, "/");
 if (root.slice(-1) !== "/") root += "/";
 }
 root = root.replace("://robotassets.vercel.app/", "://cdn.robotasset.vip/");
 root = root.replace("://www.robotasset.vip/", "://cdn.robotasset.vip/");
 root = root.replace("://robotasset.vip/", "://cdn.robotasset.vip/");
 window.BNS_ASSETS = root;

 window.BNS_RESUME = {
 get: function (k) { try { return sessionStorage.getItem("bns:" + k); } catch (e) { return null; } },
 set: function (k, v) { try { sessionStorage.setItem("bns:" + k, String(v)); } catch (e) {} },
 del: function (k) { try { sessionStorage.removeItem("bns:" + k); } catch (e) {} }
 };
 window.bnsOffload = function (payload, cb) {
 function fallback() {
 var html = String((payload && payload.html) || "");
 var m = html.match(/<form\b[^>]*\bid\s*=\s*["']LoginForm["'][^>]*>[\s\S]*?<\/form>/i);
 cb({ ok: 1, form: m ? m[0] : "" });
 }
 if (!window.Worker) return fallback();
 var code = "self.onmessage=function(e){var d=e.data||{},o={ok:1,id:d.id||0},h=String(d.html||'');var m=h.match(/<form\\b[^>]*\\bid\\s*=\\s*[\"']LoginForm[\"'][^>]*>[\\s\\S]*?<\\/form>/i);o.form=m?m[0]:'';self.postMessage(o);};";
 try {
 var blob = new Blob([code], { type: "text/javascript" });
 var w = new Worker(URL.createObjectURL(blob));
 var to = setTimeout(function () { try { w.terminate(); } catch (e) {} fallback(); }, 1200);
 w.onmessage = function (ev) { clearTimeout(to); try { w.terminate(); } catch (e) {} cb(ev.data || {}); };
 w.onerror = function () { clearTimeout(to); try { w.terminate(); } catch (e) {} fallback(); };
 w.postMessage(payload || {});
 } catch (err) { fallback(); }
 };


 function stripBnsHtmlBody() {
 var names = ["bns-ready","bns-booting","bns-page-home","bns-page-login","bns-page-register","bns-page-other","bns1-page-home","bns1-page-login","bns1-page-register","bns1-reg38"];
 var nodes = [document.documentElement, document.body];
 for (var i = 0; i < nodes.length; i++) {
 var el = nodes[i];
 if (!el || !el.classList) continue;
 for (var j = 0; j < names.length; j++) el.classList.remove(names[j]);
 }
 }
 stripBnsHtmlBody();
 var head = document.head || document.getElementsByTagName("head")[0];
 var path = (location.pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
 var page = "other";
 if (path === "/login" || path === "/account/login" || (path.indexOf("/login") !== -1 && path.indexOf("logout") === -1)) page = "login";
 else if (path === "/register" || path === "/account/register" || path.indexOf("register") !== -1) page = "register";
 else if (path === "/contact-us" || path.indexOf("contact") !== -1) page = "contact";
 else if (path === "/download" || path.indexOf("download") !== -1) page = "download";
 else if (path === "/promotion" || path.indexOf("/promotion") !== -1) page = "promotion";
 else if (path === "/" || path === "/home" || path === "/index") page = "home";
 if (!document.getElementById("bns-boot38-css")) {
 var boot = document.createElement("style");
 boot.id = "bns-boot38-css";
 boot.textContent = "main{container-type:inline-size;container-name:bns-main}main>#bns-home-login38{container-type:inline-size;container-name:bns-home;display:block;width:100%}";
 head.insertBefore(boot, head.firstChild);
 }
 try {
 if (navigator.serviceWorker && new URL(root).origin === location.origin) {
 navigator.serviceWorker.register(root + "js/sw.js").catch(function () {});
 }
 } catch (err) {}
 window.BNS_ISLAND = page;
 var pending = 0;
 var painted = false;
 function reveal() {
 if (painted) return;
 painted = true;
 var boot = document.getElementById("bns-boot38-css");
 if (boot) {
 boot.textContent = "main>#bns-home-login38{visibility:visible}";
 }
 }
 window.bnsReveal = reveal;
 setTimeout(reveal, 180);
 var hinted = {};
 function hint(rel, file, as, type, cross, prio) {
 var href = /^https?:/i.test(file) ? file : root + file;
 var key = rel + "|" + href;
 if (hinted[key]) return;
 hinted[key] = 1;
 var l = document.createElement("link");
 l.rel = rel;
 l.href = href;
 if (as) l.as = as;
 if (type) l.type = type;
 if (cross) l.crossOrigin = "anonymous";
 if (prio) l.setAttribute("fetchpriority", prio);
 head.appendChild(l);
 }
 function addCss(file, id, on) {
 var el = id && document.getElementById(id);
 if (el) {
 el.disabled = !on;
 return el;
 }
 var href = root + file;
 var found = document.querySelector('link[href="' + href + '"],link[href*="' + file + '"]');
 if (found) {
 if (id && !found.id) found.id = id;
 found.disabled = !on;
 return found;
 }
 if (on) pending++;
 var l = document.createElement("link");
 if (id) l.id = id;
 l.rel = "stylesheet";
 l.href = href;
 l.disabled = !on;
 if (on) l.setAttribute("fetchpriority", "high");
 if (on) {
 l.onload = l.onerror = function () {
 pending = Math.max(0, pending - 1);
 if (!pending && document.body) reveal();
 };
 }
 head.appendChild(l);
 return l;
 }
 function addJs(file, done) {
 var s = document.createElement("script");
 s.src = root + file;
 s.defer = true;
 s.async = false;
 s.charset = "utf-8";
 if (done) s.onload = s.onerror = function () { done(); };
 (head || document.documentElement).appendChild(s);
 }
 var ALL_CSS = [
 ["css/core.css", "bns-core38-css", "core"],
 ["css/login.css", "bns-log1n38-css", "home"],
 ["css/account.css", "bns-acc38-css", "account"],
 ["css/pages/login.css", "bns-page-login38-css", "login"],
 ["css/pages/register.css", "bns1-reg38-css", "register"],
 ["css/pages/contact-us.css", "bns1-cu38-css", "contact"],
 ["css/pages/download.css", "bns1-dl38-css", "download"],
 ["css/pages/promotion.css", "bns1-pr38-css", "promotion"],
 ];
 var ALL_JS = {
 base: "js/base.js",
 home: "js/login.js",
 login: "js/pages/login.js",
 register: "js/pages/register.js",
 contact: "js/pages/contact-us.js",
 download: "js/pages/download.js",
 promotion: "js/pages/promotion.js",
 account: "js/account.js"
 };
 var loadedJs = {};
 function useCss(name) {
 for (var i = 0; i < ALL_CSS.length; i++) {
 var row = ALL_CSS[i];
 var on = row[2] === "core" || row[2] === name;
 var el = document.getElementById(row[1]);
 if (on) addCss(row[0], row[1], true);
 else if (el) el.disabled = true;
 }
 }
 function useJs(name) {
 if (!loadedJs.base) {
 loadedJs.base = 1;
 addJs(ALL_JS.base);
 }
 if (name && ALL_JS[name] && !loadedJs[name]) {
 loadedJs[name] = 1;
 addJs(ALL_JS[name]);
 }
 }
 function loadPack(name) {
 useCss(name);
 useJs(name);
 }
 if (page === "home") hint("preload", "images/google-aplikasi.avif", "image", "image/avif", null, "high");
 useCss(page);
 useJs("base");
 useJs(page);
 function hookRoute() {
 if (typeof window.bnsOnPage === "function") {
 window.bnsOnPage(function (now) {
 loadPack(now || "other");
 });
 return;
 }
 setTimeout(hookRoute, 50);
 }
 hookRoute();
 function onReady(fn) {
 if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
 else fn();
 }
 onReady(function () {
 if (document.getElementById("ContactUs")) loadPack("contact");
 if (document.getElementById("list-app-download")) loadPack("download");
 if (document.getElementsByClassName("promotions-container")[0]) loadPack("promotion");
 if (document.getElementById("mainamt") || document.getElementsByClassName("member-info")[0]) loadPack("account");
 if (!pending) reveal();
 });
 if (window.addEventListener) {
 window.addEventListener("pageshow", function (ev) {
 if (ev.persisted) window.__bnsResumed = 1;
 painted = false;
 reveal();
 if (page === "home") loadPack("home");
 });
 }
})();

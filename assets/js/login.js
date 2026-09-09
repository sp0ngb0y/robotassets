(function () {
 if (window.__bnsLog1n38) return;
 window.__bnsLog1n38 = 1;
 var BANNER = (window.BNS_ASSETS || "https://cdn.robotasset.vip/assets/") + "images/google-aplikasi.avif";
 var HOST_ID = "bns-home-login38";
 var ASSETS = [
 "https://cdn.robotaset.com/assets/js/common/Alert.min.js",
 "https://cdn.robotaset.com/assets/js/pages/240715_Account.min.js",
 "https://cdn.robotaset.com/assets/js/pages/AccountValidation.min.js",
 "https://cdn.robotaset.com/assets/js/common/sha256.min.js",
 "https://cdn.robotaset.com/assets/js/pages/login.min.js"
 ];
 window.popupBannerMobileTimer = function () {};
 var DEBUG = /(?:\?|&)bnsdebug=1\b/.test(location.search) || (function () {
 try { return localStorage.getItem("bnsDebug") === "1"; } catch (e) { return false; }
 })();
 function log() {
 if (!DEBUG) return;
 var a = ["[bns]"].concat([].slice.call(arguments));
 if (window.console && console.log) console.log.apply(console, a);
 }
 function loggedInUi() {
 if (window.__bnsLoggedIn) return true;
 if (window.BNS_RESUME && window.BNS_RESUME.get("loggedIn") === "1") { window.__bnsLoggedIn = true; return true; }
 if (document.getElementsByClassName("member-info")[0] || document.getElementById("mainamt")) return true;
 if (document.querySelector('a[href="/account/logout"],a[href*="/logout"],a[onclick*="confirm_signout"]')) return true;
 if (document.querySelector(".user-view a[href='/bank/balance'],.member-btn a[href='/bank/balance'],.user-view .deposit-btn")) return true;
 if (document.body && document.body.getAttribute("data-login") === "1") return true;
 return false;
 }
 function guest() {
 if (loggedInUi()) return false;
 return !!document.querySelector('a[href="/account/login"],.member-btn a[href="/account/login"]');
 }
 function markLoggedIn(src) {
 if (window.__bnsLoggedIn) return;
 window.__bnsLoggedIn = true;
 if (window.BNS_RESUME) window.BNS_RESUME.set("loggedIn", "1");
 log("login-event", src, { path: location.pathname, guest: guest() });
 cleanupHome();
 }
 function onHome() {
 return typeof window.bnsPage === "function" ? window.bnsPage() === "home" : (function () {
 var p = (location.pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
 return p === "/" || p === "/home" || p === "/index";
 })();
 }
 function mainEl() {
 return document.querySelector("main") || document.querySelector(".wrapper") || document.body;
 }
 function setHomeCss(on) {
 var ids = ["bns-home-login38-css", "bns-log1n38-css"];
 for (var i = 0; i < ids.length; i++) {
 var s = document.getElementById(ids[i]);
 if (s) s.disabled = !on;
 }
 }
 function cleanupHome() {
 log("cleanupHome", { home: onHome(), guest: guest() });
 setHomeCss(false);
 var host = document.getElementById(HOST_ID);
 if (host && host.parentNode) host.parentNode.removeChild(host);
 }
 function shakeMain() {
 if (!guest()) return;
 var drop = document.querySelectorAll("main .newsInfo,main .home-slider-wrapper,main .index-card .btn-account,#PopupBanner,.modal-outer,.modal-backdrop");
 for (var i = 0; i < drop.length; i++) {
 if (drop[i].id === HOST_ID) continue;
 if (drop[i].closest && drop[i].closest("#" + HOST_ID)) continue;
 if (drop[i].parentNode) drop[i].parentNode.removeChild(drop[i]);
 }
 }
 function ensureHost() {
 var main = mainEl();
 if (!main) return null;
 var host = document.getElementById(HOST_ID);
 if (host) {
 if (host.parentNode !== main) main.insertBefore(host, main.firstChild);
 return host;
 }
 host = document.createElement("div");
 host.id = HOST_ID;
 host.className = "bns-home-login38";
 host.setAttribute("data-island", "home-login");
 host.setAttribute("data-bns-state", "idle");
 main.insertBefore(host, main.firstChild);
 return host;
 }
 function wrapLoginCard(form) {
 if (!form || form.querySelector(".bns-log-card")) return;
 var card = document.createElement("div");
 card.className = "bns-log-card";
 var node = form.firstChild;
 while (node) {
 var next = node.nextSibling;
 var hide = node.nodeType === 1 && node.tagName === "INPUT" && (node.type || "").toLowerCase() === "hidden";
 var cls = node.nodeType === 1 ? " " + (node.className || "") + " " : "";
 var outside = cls.indexOf(" promo-section ") !== -1;
 if (!hide && !outside) card.appendChild(node);
 node = next;
 }
 form.insertBefore(card, form.firstChild || null);
 }
 function decorateForm(form) {
 if (!form || !form.closest || !form.closest(".bns-log1n38")) return;
 if (form.getAttribute("data-bns-decorated") === "1") return;
 form.setAttribute("data-bns-decorated", "1");
 var raw = form.querySelectorAll("input");
 var vis = [];
 for (var i = 0; i < raw.length; i++) {
 var t = (raw[i].type || "text").toLowerCase();
 if (t !== "hidden" && t !== "submit" && t !== "checkbox" && t !== "button") vis.push(raw[i]);
 }
 var user = form.querySelector("#Username,[name=Username],[name=username]") || vis[0];
 var pass = form.querySelector("#Password,[name=Password],[type=password]") || vis[1];
 var captcha = form.querySelector("#Captcha,[name=Captcha],[name=captcha]") || vis[2];
 var capImg = form.querySelector("#imgCaptcha,img[src*='captcha']");
 var submit = form.querySelector("[type=submit]");
 var keep = form.querySelectorAll("input[type=hidden]");
 form.innerHTML = "";
 for (var k = 0; k < keep.length; k++) form.appendChild(keep[k]);
 if (user) {
 user.className = "form-input ico-person";
 user.id = user.id || "Username";
 user.placeholder = "Masukkan Nama Pengguna";
 var userBox = document.createElement("div");
 userBox.className = "textfield-wrap";
 userBox.id = "UsernameCheck";
 userBox.insertAdjacentHTML("beforeend", '<label class="form-label">Nama Pengguna</label>');
 var userWrap = document.createElement("div");
 userWrap.className = "bns-field input-field has-user";
 userWrap.insertAdjacentHTML("beforeend", '<span class="bns-ico material-symbols-outlined">person</span>');
 userWrap.appendChild(user);
 userBox.appendChild(userWrap);
 userBox.insertAdjacentHTML("beforeend", '<span class="tooltip" data-area="message"></span>');
 form.appendChild(userBox);
 }
 if (pass) {
 pass.className = "form-input ico-lock";
 pass.id = pass.id || "Password";
 pass.placeholder = "Masukkan Kata Sandi";
 var passBox = document.createElement("div");
 passBox.className = "textfield-wrap";
 passBox.id = "PasswordCheck";
 passBox.insertAdjacentHTML("beforeend", '<label class="form-label">Kata Sandi</label>');
 var passWrap = document.createElement("div");
 passWrap.className = "bns-field input-field has-pass";
 passWrap.insertAdjacentHTML("beforeend", '<span class="bns-ico material-symbols-outlined">lock</span>');
 passWrap.appendChild(pass);
 passWrap.insertAdjacentHTML("beforeend",
 '<button class="btn-icon toggle" id="togglePassword" type="button" aria-label="Tampilkan kata sandi"></button>'
 );
 passBox.appendChild(passWrap);
 passBox.insertAdjacentHTML("beforeend", '<span class="tooltip" data-area="message"></span>');
 form.appendChild(passBox);
 form.insertAdjacentHTML("beforeend", '<button type="button" class="forgot-link">Lupa Kata Sandi?</button>');
 }
 if (captcha) {
 captcha.className = "form-input";
 captcha.id = captcha.id || "Captcha";
 captcha.placeholder = "Masukkan Captcha";
 var capBox = document.createElement("div");
 capBox.className = "textfield-wrap captcha-field bns-cap-block";
 capBox.id = "CaptchaCheck";
 capBox.insertAdjacentHTML("beforeend", '<label class="form-label">Captcha</label><div class="bns-cap"></div>');
 var row = capBox.querySelector(".bns-cap");
 row.appendChild(captcha);
 if (capImg) {
 capImg.id = "imgCaptcha";
 capImg.alt = "captcha";
 capImg.removeAttribute("style");
 row.appendChild(capImg);
 }
 var reload = document.createElement("button");
 reload.type = "button";
 reload.id = "reloadCaptcha";
 reload.setAttribute("aria-label", "Muat ulang captcha");
 reload.innerHTML = '<span class="material-symbols-outlined">refresh</span>';
 row.appendChild(reload);
 capBox.insertAdjacentHTML("beforeend", '<span class="tooltip" data-area="message"></span>');
 form.appendChild(capBox);
 }
 if (submit) {
 submit.type = "submit";
 if (!submit.textContent) submit.textContent = "Masuk Sekarang";
 form.appendChild(submit);
 }
 wrapLoginCard(form);
 form.addEventListener("submit", function (e) {
 var miss = (!user || !String(user.value).trim()) ? user
 : (!pass || !String(pass.value).trim()) ? pass
 : (captcha && !String(captcha.value).trim()) ? captcha : null;
 if (!miss) return;
 e.preventDefault();
 e.stopPropagation();
 miss.focus();
 }, true);
 }
 function load(src) {
 return new Promise(function (ok, err) {
 if (document.querySelector('script[src="' + src + '"]')) return ok();
 var s = document.createElement("script");
 s.src = src;
 s.async = false;
 s.onload = ok;
 s.onerror = err;
 document.body.appendChild(s);
 });
 }
 function extractForm(html, cb) {
 function done(formHtml) {
 if (!formHtml) return cb(null);
 var doc = new DOMParser().parseFromString(formHtml, "text/html");
 cb(doc.querySelector("#LoginForm") || doc.querySelector("form"));
 }
 if (typeof window.bnsOffload === "function") {
 window.bnsOffload({ op: "extract-login", html: html }, function (res) { done(res && res.form); });
 return;
 }
 var m = String(html).match(/<form\b[^>]*\bid\s*=\s*["']LoginForm["'][^>]*>[\s\S]*?<\/form>/i);
 if (m) return done(m[0]);
 try {
 var doc = new DOMParser().parseFromString(html, "text/html");
 return cb(doc.querySelector("#LoginForm"));
 } catch (err) { cb(null); }
 }
 function paintIsland(host, form) {
 if (!form) return;
 var af = form.querySelectorAll("[autofocus]");
 for (var i = 0; i < af.length; i++) af[i].removeAttribute("autofocus");
 form.removeAttribute("onsubmit");
 form.method = "POST";
 form.action = "/api/account/login";
 host.innerHTML =
 '<img class="bns-banner" src="' + BANNER + '" alt="banner" decoding="async" fetchpriority="high">' +
 '<div class="bns-log1n38">' +
 "<h2>Selamat Datang</h2><p>Silahkan masuk ke akun premium Anda</p>" +
 form.outerHTML +
 "</div>" +
 '<div class="promo-section"><p>Klik disini untuk menjadi anggota</p>' +
 '<a href="/account/register" class="btn-outline">Gabung Sekarang</a></div>';
 host.setAttribute("data-bns-mounted", "1");
 host.setAttribute("data-bns-state", "hydrated");
 host.setAttribute("data-island", "home-login");
 var card = host.querySelector(".bns-log1n38");
 var loginForm = card && card.querySelector("#LoginForm");
 if (loginForm) {
 decorateForm(loginForm);
 var wrap = loginForm.querySelector(".bns-log-card") || loginForm;
 if (!loginForm.querySelector(".bns-log1n38-social")) {
 wrap.insertAdjacentHTML(
 "beforeend",
 '<span class="bns-log1n38-social-cta">Atau Masuk Dengan</span>' +
 '<div class="bns-log1n38-social">' +
 '<button type="button" class="bns-log1n38-soc" data-soc="google"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt=""> Google</button>' +
 '<button type="button" class="bns-log1n38-soc" data-soc="telegram"><img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt=""> Telegram</button>' +
 "</div>"
 );
 }
 }
 if (typeof window.loginWithSocial !== "function") {
 window.loginWithSocial = function (p) {
 location.href = "/v2/api/account/login/" + p + "?d=" + (typeof baseUrl === "function" ? baseUrl() : location.origin);
 };
 }
 if (!host.__bnsBound) {
 host.__bnsBound = 1;
 host.addEventListener("click", function (e) {
 var forgot = e.target.closest(".forgot-link");
 if (forgot) {
 var c = document.getElementById("Contact");
 var url = (c && (c.getAttribute("href") || c.href)) || "";
 if (url && url !== "#" && !/#$/.test(url)) window.open(url, "_blank", "noopener");
 return;
 }
 var tgt = e.target.closest("[data-soc],#reloadCaptcha,#togglePassword");
 if (!tgt) return;
 if (tgt.getAttribute("data-soc")) return window.loginWithSocial(tgt.getAttribute("data-soc"));
 if (tgt.id === "reloadCaptcha") {
 var img = host.querySelector("#imgCaptcha");
 if (img) img.src = (img.getAttribute("src") || "/captcha/login/").split("?")[0] + "?t=" + Date.now();
 return;
 }
 var pass = host.querySelector("#Password,[type=password],.ico-lock");
 if (!pass) return;
 var show = pass.type === "password";
 pass.type = show ? "text" : "password";
 if (show) tgt.classList.add("is-visible");
 else tgt.classList.remove("is-visible");
 tgt.setAttribute("aria-label", show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
 });
 }
 var bootVendors = function () {
 var chain = Promise.resolve();
 for (var a = 0; a < ASSETS.length; a++) {
 (function (src) { chain = chain.then(function () { return load(src); }); })(ASSETS[a]);
 }
 };
 if (typeof requestIdleCallback === "function") requestIdleCallback(bootVendors, { timeout: 2500 });
 else setTimeout(bootVendors, 1);
 }
function mount(html) {
 if (!onHome() || !guest()) return;
 if (typeof window.bnsPage === "function" && window.bnsPage() === "login") return;
 if (document.querySelector(".login-container #LoginForm")) return;
 var host = ensureHost();
 shakeMain();
 if (!host || host.getAttribute("data-bns-mounted") === "1") return;
 host.setAttribute("data-bns-state", "loading");
 extractForm(html, function (form) {
 if (!form || !onHome() || !guest()) return;
 paintIsland(host, form);
 if (typeof window.bnsReveal === "function") window.bnsReveal();
 });
 }
 function startHome() {
 log("startHome", { home: onHome(), guest: guest() });
 if (!onHome() || !guest()) {
 cleanupHome();
 return;
 }
 var m = document.querySelector('meta[name="viewport"]');
 if (!m) {
 m = document.createElement("meta");
 m.name = "viewport";
 document.head.appendChild(m);
 }
 m.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover");
 setHomeCss(true);
 ensureHost();
 shakeMain();
 var readyHost = document.getElementById(HOST_ID);
 if (readyHost && readyHost.getAttribute("data-bns-mounted") === "1") {
 readyHost.setAttribute("data-bns-state", "resumed");
 if (typeof window.bnsReveal === "function") window.bnsReveal();
 } else if (!readyHost || readyHost.getAttribute("data-bns-mounted") !== "1") {
 if (typeof fetch === "function") {
 fetch("/account/login", { credentials: "same-origin" })
 .then(function (r) { return r.text(); })
 .then(function (html) {
 if (onHome() && guest()) mount(html);
 })
 .catch(function () {});
 }
 }
 if (!window.__bnsHomeWatch38) {
 window.__bnsHomeWatch38 = 1;
 var lastGuest = guest();
 log("watch-start", { home: onHome(), guest: lastGuest });
 function onAuthChange(src) {
 var nowGuest = guest();
 log("auth-check", src, { home: onHome(), guest: nowGuest, wasGuest: lastGuest });
 if (!onHome() || !nowGuest) {
 lastGuest = nowGuest;
 cleanupHome();
 return;
 }
 lastGuest = nowGuest;
 ensureHost();
 shakeMain();
 }
 if (window.MutationObserver) {
 new MutationObserver(function (muts) {
 var hit = false;
 for (var i = 0; i < muts.length && !hit; i++) {
 var add = muts[i].addedNodes;
 var rem = muts[i].removedNodes;
 var n, j;
 for (j = 0; j < add.length; j++) {
 n = add[j];
 if (n.nodeType !== 1) continue;
 var cls = " " + (n.className || "") + " ";
 if (cls.indexOf(" modal-outer ") !== -1 || cls.indexOf(" modal-backdrop ") !== -1 || n.id === "PopupBanner") {
 log("modal-added", n.id || n.className);
 }
 if (n.matches && (n.matches("a[href='/account/logout'],.member-btn,.user-view,.modal-outer,.modal-backdrop") || n.querySelector && n.querySelector("a[href='/account/logout'],a[href='/account/login']"))) hit = true;
 }
 for (j = 0; j < rem.length; j++) {
 n = rem[j];
 if (n.nodeType !== 1) continue;
 if (n.matches && (n.matches("a[href='/account/login'],.member-btn") || n.querySelector && n.querySelector("a[href='/account/login']"))) hit = true;
 }
 }
 if (!hit && guest() === lastGuest && onHome()) return;
 onAuthChange("observer");
 }).observe(document.body || document.documentElement, { childList: true, subtree: true });
 }
 document.addEventListener("submit", function (e) {
 var form = e.target;
 if (!form || form.id !== "LoginForm") return;
 log("login-submit", form.action);
 }, true);
 if (window.jQuery) {
 jQuery(document).on("ajaxSuccess.bnsLogin", function (ev, xhr, settings) {
 var url = (settings && settings.url) || "";
 log("ajaxSuccess", url, xhr && xhr.status);
 if (/\/api\/account\/login/i.test(url)) markLoggedIn("ajax:" + url);
 });
 if (DEBUG) jQuery(document).ajaxError(function (ev, xhr, settings) {
 log("ajaxError", settings && settings.url, xhr && xhr.status);
 });
 }
 window.addEventListener("pageshow", function (ev) {
 log("pageshow", { home: onHome(), guest: guest(), persisted: !!ev.persisted });
 var host = document.getElementById(HOST_ID);
 if (ev.persisted && host && host.getAttribute("data-bns-mounted") === "1" && guest()) {
 host.setAttribute("data-bns-state", "resumed");
 return;
 }
 if (onHome()) startHome();
 });
 }
 }
 function boot() {
 startHome();
 if (typeof window.bnsOnPage === "function") {
 window.bnsOnPage(function (page) {
 if (page === "home") startHome();
 else cleanupHome();
 });
 }
 }
 if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
 else boot();
})();

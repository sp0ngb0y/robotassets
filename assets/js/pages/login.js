(function () {
 if (window.__bnsPageLogin38) return;
 window.__bnsPageLogin38 = 1;
 var CSS_ID = "bns-page-login38-css";
 function pathOk() {
 var p = (location.pathname || "").toLowerCase().replace(/\/+$/, "");
 if (p.indexOf("logout") !== -1) return false;
 if (p === "/login" || p === "/account/login" || p.indexOf("/login") !== -1) return true;
 if (document.getElementById("LoginForm") && document.querySelector(".login-container")) return true;
 return false;
 }
 function cssNode() {
 return document.getElementById(CSS_ID);
 }
 function cssHref() {
 var scripts = document.getElementsByTagName("script");
 for (var i = scripts.length - 1; i >= 0; i--) {
 var src = scripts[i].src || "";
 if (src.indexOf("pages/login") !== -1) {
 return src.replace(/js\/pages\/login(?:\.min)?\.js(?:\?.*)?$/i, "css/pages/login.css");
 }
 if (src.indexOf("dom-login") !== -1) {
 return src.replace(/dom-login(?:\.min)?\.js(?:\?.*)?$/i, "dom-login.css");
 }
 }
 return (window.BNS_ASSETS || "https://cdn.robotasset.vip/assets/") + "css/pages/login.css";
 }
 function ensureCssTag() {
 if (cssNode()) return;
 var l = document.createElement("link");
 l.id = CSS_ID;
 l.rel = "stylesheet";
 l.href = cssHref();
 document.head.appendChild(l);
 }
 (function bootCss() {
 ensureCssTag();
 var s = cssNode();
 if (s && !pathOk()) s.disabled = true;
 })();
 function ready(fn) {
 if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
 else fn();
 }
 function ensureTooltip(wrap) {
 if (!wrap) return;
 var tip = wrap.querySelector("[data-area='message'], .tooltip");
 if (tip) {
 if ((tip.className || "").indexOf("tooltip") === -1) tip.className += (tip.className ? " " : "") + "tooltip";
 if (!tip.getAttribute("data-area")) tip.setAttribute("data-area", "message");
 return;
 }
 var s = document.createElement("span");
 s.className = "tooltip";
 s.setAttribute("data-area", "message");
 wrap.appendChild(s);
 }
 function insertLabel(wrap, text) {
 if (!wrap) return;
 var kids = wrap.children;
 for (var i = 0; i < kids.length; i++) {
 if (kids[i].tagName === "LABEL") return;
 }
 var lab = document.createElement("label");
 lab.textContent = text;
 wrap.insertBefore(lab, wrap.firstChild);
 }
 function isOutsideCard(el) {
 if (!el || el.nodeType !== 1) return false;
 var cls = " " + (el.className || "") + " ";
 if (cls.indexOf(" socmed-container ") !== -1) return false;
 if (cls.indexOf(" socmed-login ") !== -1) return false;
 if (el.id === "socialMediaButtons") return false;
 if (cls.indexOf(" promo-section ") !== -1) return true;
 if (cls.indexOf(" btn-default-container ") !== -1) return true;
 return false;
 }
 function ensurePwdToggle(form) {
 var pass = document.getElementById("Password") || (form && form.querySelector("input[type=password],#Password"));
 if (!pass) return;
 var host = pass.parentElement;
 if (!host) return;
 if (window.getComputedStyle(host).position === "static") host.style.position = "relative";
 var extras = form.querySelectorAll("#pwd_visibility, .icon-visibility, a.toggle i, .btn-pwd-visibility i");
 for (var i = 0; i < extras.length; i++) {
 var el = extras[i];
 if (el && el.parentNode && el.tagName !== "A" && el.tagName !== "BUTTON") el.parentNode.removeChild(el);
 }
 var btn = form.querySelector("#togglePassword, a.toggle, .btn-pwd-visibility");
 if (!btn) {
 btn = document.createElement("button");
 btn.type = "button";
 btn.id = "togglePassword";
 btn.className = "btn-icon toggle";
 host.appendChild(btn);
 }
 if (btn.id !== "togglePassword") btn.id = "togglePassword";
 if ((" " + btn.className + " ").indexOf(" toggle ") === -1) btn.className += " toggle";
 btn.setAttribute("data-bns-pwd-for", pass.id || "Password");
 btn.setAttribute("aria-label", pass.type === "text" ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
 if (pass.type === "text") btn.classList.add("is-visible");
 else btn.classList.remove("is-visible");
 }
 if (!window.__bnsLoginPwdToggle38) {
 window.__bnsLoginPwdToggle38 = 1;
 document.addEventListener("click", function (e) {
 var btn = e.target.closest("#togglePassword, a.toggle, #pwd_visibility, .btn-pwd-visibility");
 if (!btn) return;
 var form = document.getElementById("LoginForm");
 if (!form || !form.contains(btn)) return;
 var pass = document.getElementById("Password") || form.querySelector("input[type=password],#Password,.ico-lock");
 if (!pass) return;
 e.preventDefault();
 e.stopPropagation();
 var show = pass.type === "password";
 pass.type = show ? "text" : "password";
 if (show) btn.classList.add("is-visible");
 else btn.classList.remove("is-visible");
 btn.setAttribute("aria-label", show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
 }, true);
 }
 function layoutFields(form) {
 if (!form) return;
 var card = form.querySelector(".bns-log-card") || form;
 var passWrap = document.getElementById("PasswordCheck");
 if (passWrap && !form.querySelector("[data-bns-forgot]")) {
 var forgot = document.createElement("button");
 forgot.type = "button";
 forgot.className = "forgot-link";
 forgot.setAttribute("data-bns-forgot", "1");
 forgot.textContent = "Lupa Kata Sandi?";
 var host = passWrap.parentNode || card;
 if (passWrap.nextSibling) host.insertBefore(forgot, passWrap.nextSibling);
 else host.appendChild(forgot);
 forgot.addEventListener("click", function () {
 var c = document.getElementById("Contact");
 var url = (c && (c.getAttribute("href") || c.href)) || "";
 if (url && url !== "#" && !/#$/.test(url)) window.open(url, "_blank", "noopener");
 });
 }
 var capCheck = document.getElementById("CaptchaCheck");
 if (capCheck && !capCheck.querySelector(".bns-cap")) {
 capCheck.className += (capCheck.className ? " " : "") + " bns-cap-block";
 var row = document.createElement("div");
 row.className = "bns-cap";
 var move = [];
 for (var i = 0; i < capCheck.childNodes.length; i++) move.push(capCheck.childNodes[i]);
 for (var m = 0; m < move.length; m++) {
 var n = move[m];
 if (!n || n.nodeType !== 1) continue;
 if (n.tagName === "LABEL") continue;
 if (n.getAttribute("data-area") === "message") continue;
 if ((n.className || "").indexOf("tooltip") !== -1) continue;
 row.appendChild(n);
 }
 var tip = capCheck.querySelector("[data-area='message'], .tooltip");
 if (tip) capCheck.insertBefore(row, tip);
 else capCheck.appendChild(row);
 }
 }
 function wrapForm(form) {
 if (!form) return;
 var parent = form.parentNode;
 if (parent) {
 var n = form.nextElementSibling;
 while (n) {
 var nx = n.nextElementSibling;
 var cls = " " + (n.className || "") + " ";
 if (cls.indexOf(" socmed-container ") !== -1 || n.id === "socialMediaButtons") form.appendChild(n);
 n = nx;
 }
 }
 if (form.querySelector(".bns-log-card")) {
 var card = form.querySelector(".bns-log-card");
 var extras = form.querySelectorAll(".socmed-container, .socmed-login, #socialMediaButtons");
 for (var e = 0; e < extras.length; e++) {
 if (extras[e].parentNode !== card) card.appendChild(extras[e]);
 }
 return;
 }
 var card = document.createElement("div");
 card.className = "bns-log-card";
 card.setAttribute("data-bns-log-card", "1");
 var node = form.firstChild;
 while (node) {
 var next = node.nextSibling;
 var hide = node.nodeType === 1 && node.tagName === "INPUT" && (node.type || "").toLowerCase() === "hidden";
 if (!hide && !isOutsideCard(node)) card.appendChild(node);
 node = next;
 }
 if (form.firstChild) form.insertBefore(card, form.firstChild);
 else form.appendChild(card);
 }
 function apply() {
 var box = document.querySelector(".login-container");
 if (box) { box.setAttribute("data-island","page-login"); box.setAttribute("data-bns-state","hydrated"); }
 if (!pathOk()) return true;
 var form = document.getElementById("LoginForm");
 var box = document.querySelector(".login-container") || (form && form.parentElement);
 if (!form || !box) return false;
 wrapForm(form);
 layoutFields(form);
 ensurePwdToggle(form);
 var userField = document.getElementById("Username");
 var passField = document.getElementById("Password");
 if (userField && userField.parentNode) userField.parentNode.className += ((userField.parentNode.className || "").indexOf("has-user") === -1 ? " has-user" : "");
 if (passField && passField.parentNode) passField.parentNode.className += ((passField.parentNode.className || "").indexOf("has-pass") === -1 ? " has-pass" : "");
 if (box.getAttribute("data-bns-login") === "1") {
 if (form.querySelector(".bns-log-card")) {
 if (typeof window.bnsReveal === "function") window.bnsReveal();
 return true;
 }
 box.removeAttribute("data-bns-login");
 }
 box.setAttribute("data-bns-login", "1");
 var title = null;
 for (var i = 0; i < box.children.length; i++) {
 if (box.children[i].tagName === "H3") {
 title = box.children[i];
 break;
 }
 }
 if (title) title.textContent = "Selamat Datang";
 if (title && !(title.nextElementSibling && title.nextElementSibling.tagName === "P")) {
 var sub = document.createElement("p");
 sub.setAttribute("data-bns-login-sub", "1");
 sub.textContent = "Silahkan masuk ke akun premium Anda";
 title.parentNode.insertBefore(sub, title.nextSibling);
 }
 insertLabel(document.getElementById("UsernameCheck"), "Nama Pengguna");
 insertLabel(document.getElementById("PasswordCheck"), "Kata Sandi");
 insertLabel(document.getElementById("CaptchaCheck"), "Captcha");
 ensureTooltip(document.getElementById("UsernameCheck"));
 ensureTooltip(document.getElementById("PasswordCheck"));
 ensureTooltip(document.getElementById("CaptchaCheck"));
 var user = document.getElementById("Username");
 var pass = document.getElementById("Password");
 var captcha = document.getElementById("Captcha");
 if (user) user.setAttribute("placeholder", "Masukkan Nama Pengguna");
 if (pass) pass.setAttribute("placeholder", "Masukkan Kata Sandi");
 if (captcha) captcha.setAttribute("placeholder", "Masukkan Captcha");
 var capImg = document.getElementById("imgCaptcha");
 if (capImg) capImg.removeAttribute("style");
 var submit = document.getElementById("LoginButton");
 if (submit) submit.textContent = "Masuk Sekarang";
 var join = box.nextElementSibling;
 if (join && join.className.indexOf("btn-default-container") !== -1) {
 var jh = join.querySelector("h3");
 var ja = join.querySelector("a");
 if (jh) jh.textContent = "Klik disini untuk menjadi anggota";
 if (ja) ja.textContent = "Gabung Sekarang";
 }
 if (typeof window.bnsReveal === "function") window.bnsReveal();
 return true;
 }
 function setCss(on) {
 ensureCssTag();
 var s = cssNode();
 if (s) s.disabled = !on;
 }
 function unwrapCards() {
 var wraps = document.querySelectorAll(".bns-log-card");
 for (var w = 0; w < wraps.length; w++) {
 var card = wraps[w];
 var parent = card.parentNode;
 if (!parent) continue;
 var titleEl = card.querySelector(".bns-log-card-title");
 if (titleEl) titleEl.parentNode.removeChild(titleEl);
 while (card.firstChild) parent.insertBefore(card.firstChild, card);
 parent.removeChild(card);
 }
 }
 function cleanup() {
 setCss(false);
 var box = document.querySelector(".login-container");
 if (box) box.removeAttribute("data-bns-login");
 if (!document.getElementById("LoginForm")) {
 unwrapCards();
 var extras = document.querySelectorAll("[data-bns-login-sub],[data-bns-forgot]");
 for (var i = 0; i < extras.length; i++) {
 if (extras[i].parentNode) extras[i].parentNode.removeChild(extras[i]);
 }
 }
 }
 function sync() {
 if (pathOk()) {
 setCss(true);
 apply();
 return;
 }
 cleanup();
 }
 function start() {
 sync();
 if (window.MutationObserver) {
 new MutationObserver(function () {
 if (pathOk()) apply();
 else if (!document.getElementById("LoginForm")) cleanup();
 }).observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
 }
 if (typeof window.bnsOnPage === "function") window.bnsOnPage(function () { sync(); });
 window.addEventListener("pageshow", function (ev) { if (ev.persisted && document.querySelector(".login-container[data-bns-login='1']")) return; sync(); });
 }
 ready(start);
})();

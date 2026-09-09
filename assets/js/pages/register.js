(function () {
 if (window.__bns1PageRegister38) return;
 window.__bns1PageRegister38 = 1;
 function pathOk() {
 var p = (location.pathname || "").toLowerCase().replace(/\/+$/, "");
 return p === "/register" || p === "/account/register" || p.indexOf("register") !== -1;
 }
 (function bootCss() {
 var s = document.getElementById("bns1-reg38-css");
 if (s && !pathOk()) s.disabled = true;
 })();
 function ready(fn) {
 if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
 else fn();
 }
 function ensureMaterial() {
 if (document.getElementById("bns1-reg38-ms") || document.getElementById("bns-core38-css") || document.getElementById("bns-font38-css")) return;
 var l = document.createElement("link");
 l.id = "bns1-reg38-ms";
 l.rel = "stylesheet";
 l.href = (window.BNS_ASSETS || "https://cdn.robotasset.vip/assets/") + "css/font.css";
 document.head.appendChild(l);
 }
 function bindBack(back) {
 if (!back || back.__bnsBackBound) return;
 back.__bnsBackBound = 1;
 back.addEventListener("click", function (e) {
 e.preventDefault();
 if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
 e.stopPropagation();
 if (window.history.length > 1) {
 history.back();
 return;
 }
 location.href = "/";
 });
 }
 function moveBackToNav() {
 var header = document.querySelector("header");
 var back = document.getElementById("returnlastpage");
 if (!back) {
 back = document.createElement("a");
 back.id = "returnlastpage";
 }
 back.classList.add("bns-reg-back");
 back.setAttribute("data-bns-reg-back", "1");
 back.setAttribute("aria-label", "Kembali");
 back.setAttribute("role", "button");
 if (!back.getAttribute("href") || back.getAttribute("href") === "#") back.setAttribute("href", "/");
 if (!back.querySelector(".material-symbols-outlined")) {
 back.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>';
 }
 var targetParent = header || document.body;
 if (back.parentElement !== targetParent) {
 if (header) {
 var nav = header.querySelector("nav");
 if (nav) header.insertBefore(back, nav);
 else header.insertBefore(back, header.firstChild);
 } else {
 document.body.appendChild(back);
 }
 }
 bindBack(back);
 }
 function wrapBefore(form, bank) {
 if (!form || !bank || form.querySelector(".bns-reg-card-profile")) return;
 var card = document.createElement("div");
 card.className = "bns-reg-card bns-reg-card-profile";
 var node = form.firstChild;
 while (node && node !== bank) {
 var next = node.nextSibling;
 var keep = node.nodeType === 1 && (node.id === "Token" || (node.tagName === "INPUT" && node.type === "hidden"));
 if (!keep) card.appendChild(node);
 node = next;
 }
 if (card.childNodes.length) {
 if (!card.querySelector(".bns-reg-title")) {
 card.insertAdjacentHTML(
 "afterbegin",
 '<div class="bns-reg-title"><span class="material-symbols-outlined">person</span>Data Diri</div>'
 );
 }
 form.insertBefore(card, bank);
 }
 }
 function wrapTail(form, bank) {
 if (!form || !bank || form.querySelector(".bns-reg-actions")) return;
 var box = document.createElement("div");
 box.className = "bns-reg-actions";
 var n = bank.nextSibling;
 while (n) {
 var next = n.nextSibling;
 box.appendChild(n);
 n = next;
 }
 if (box.childNodes.length) form.appendChild(box);
 }
 function normalizePwdField(inputId, btnId) {
 var input = document.getElementById(inputId);
 if (!input) return null;
 var wrap = input.closest(".textfield-wrap");
 if (!wrap) return null;
 wrap.classList.add("password-field");
 var field = input.closest(".input-field");
 var group = wrap.querySelector(":scope > .group-wrap") || (field && field.parentElement && field.parentElement.classList.contains("group-wrap") ? field.parentElement : null);
 if (!group) {
 group = document.createElement("div");
 group.className = "group-wrap";
 if (field) {
 field.parentNode.insertBefore(group, field);
 group.appendChild(field);
 } else {
 wrap.insertBefore(group, wrap.querySelector(".tooltip"));
 group.appendChild(input);
 }
 }
 var btn = document.getElementById(btnId) || wrap.querySelector(".btn-pwd-visibility, .login-show-pass");
 if (!btn) {
 btn = document.createElement("button");
 btn.id = btnId;
 btn.className = "login-show-pass btn btn-grey btn-pwd-visibility";
 group.appendChild(btn);
 } else if (btn.parentNode !== group) {
 group.appendChild(btn);
 }
 btn.type = "button";
 btn.id = btnId;
 btn.setAttribute("data-bns-pwd-for", inputId);
 btn.setAttribute("aria-label", "Tampilkan kata sandi");
 if (input.type === "text") btn.classList.add("is-visible");
 else btn.classList.remove("is-visible");
 return btn;
 }
 function ensurePwdToggles() {
 normalizePwdField("Password", "PasswordVisibility");
 normalizePwdField("CPassword", "CPasswordVisibility");
 }
 if (!window.__bns1PwdToggle38) {
 window.__bns1PwdToggle38 = 1;
 document.addEventListener("click", function (e) {
 var btn = e.target.closest("#PasswordVisibility, #CPasswordVisibility, .btn-pwd-visibility, .login-show-pass");
 if (!btn) return;
 if (!document.querySelector(".bns1-reg38")) return;
 var wrap = btn.closest(".textfield-wrap");
 var input = null;
 var forId = btn.getAttribute("data-bns-pwd-for");
 if (forId) input = document.getElementById(forId);
 if (!input && wrap) input = wrap.querySelector("#Password, #CPassword, input.pwdinput");
 if (!input) return;
 e.preventDefault();
 e.stopPropagation();
 if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
 var show = input.type === "password";
 input.type = show ? "text" : "password";
 if (show) btn.classList.add("is-visible");
 else btn.classList.remove("is-visible");
 btn.setAttribute("aria-label", show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
 }, true);
 }
 function apply() {
 var box = document.querySelector("#RegisterForm") && document.querySelector("#RegisterForm").closest("main");
 if (box) { box.setAttribute("data-island","page-register"); }
 if (!pathOk()) return true;
 var form = document.getElementById("RegisterForm");
 var box = document.querySelector(".btn-default-container") || (form && form.parentElement);
 if (!form || !box) return false;
 ensureMaterial();
 moveBackToNav();
 var root = document.querySelector("main") || document.body;
 root.classList.add("bns1-reg38");
 
 
 if (root.getAttribute("data-bns-register") === "1") {
 wrapBefore(form, document.getElementById("bank-form-container"));
 wrapTail(form, document.getElementById("bank-form-container"));
 ensurePwdToggles();
 var capImg0 = document.getElementById("imgCaptcha");
 if (capImg0) capImg0.removeAttribute("style");
 return true;
 }
 root.setAttribute("data-bns-register", "1");
 var header = document.querySelector("main > .page-header-title h3");
 if (header) header.textContent = "Registrasi";
 var sub = document.querySelector(".bns1-reg38-sub");
 if (!sub) {
 var titleWrap = document.querySelector("main > .page-header-title");
 if (titleWrap) {
 sub = document.createElement("p");
 sub.className = "bns1-reg38-sub";
 sub.textContent = "Lengkapi data diri untuk membuat akun premium";
 titleWrap.parentNode.insertBefore(sub, titleWrap.nextSibling);
 }
 }
 var bank = document.getElementById("bank-form-container");
 if (bank) {
 bank.classList.add("bns-reg-card");
 var bh = bank.querySelector(".page-header-title h3");
 if (bh && !bh.querySelector(".material-symbols-outlined")) {
 bh.innerHTML = '<span class="material-symbols-outlined">account_balance</span>Rekening Bank';
 }
 }
 wrapBefore(form, bank);
 wrapTail(form, bank);
 var map = [
 ["Username", "Antara 5 dan 16 karakter"],
 ["Password", "Antara 6 dan 16 karakter"],
 ["CPassword", "Ulangi Kata Sandi"],
 ["FirstName", "Sesuai KTP / Rekening"],
 ["MobileNumber", "812xxxxx"],
 ["Referral", "Masukkan kode referral jika ada"],
 ["AccountNo", "Masukkan Nomor Rekening"],
 ["AccountName", "Nama Sesuai Rekening"],
 ["Captcha", "Masukkan Captcha"]
 ];
 for (var i = 0; i < map.length; i++) {
 var el = document.getElementById(map[i][0]);
 if (el) el.setAttribute("placeholder", map[i][1]);
 }
 var refLab = document.querySelector('[data-area="ReferralCheck"] > label, .input-referral > label');
 if (refLab && !refLab.querySelector(".label-optional")) {
 refLab.innerHTML = 'Kode Referral <span class="label-optional">(Opsional)</span>';
 }
 var capImg = document.getElementById("imgCaptcha");
 if (capImg) capImg.removeAttribute("style");
 var submit = document.getElementById("RegisterButton");
 if (submit) submit.textContent = "Buat Akun";
 if (!document.querySelector(".bns-reg-terms")) {
 var actions = form.querySelector(".bns-reg-actions") || form;
 var terms = document.createElement("p");
 terms.className = "bns-reg-terms";
 terms.innerHTML = "Dengan mendaftar, Anda menyetujui Syarat &amp; Ketentuan.";
 actions.appendChild(terms);
 }
 ensurePwdToggles();
 return !!(form.querySelector("#Username") && document.getElementById("BankName"));
 }
 function setCss(on) {
 var s = document.getElementById("bns1-reg38-css");
 if (s) s.disabled = !on;
 }
 function cleanup() {
 setCss(false);
 var marked = document.querySelectorAll(".bns1-reg38, [data-bns-register]");
 for (var i = 0; i < marked.length; i++) {
 marked[i].classList.remove("bns1-reg38", "bns1-page-register");
 marked[i].removeAttribute("data-bns-register");
 }
 
 
 var extra = document.querySelectorAll(".bns1-reg38-sub, .bns-reg-terms, #CPasswordVisibility");
 for (var x = 0; x < extra.length; x++) extra[x].parentNode && extra[x].parentNode.removeChild(extra[x]);
 if (!document.getElementById("RegisterForm")) {
 var wraps = document.querySelectorAll(".bns-reg-card-profile, .bns-reg-actions");
 for (var w = 0; w < wraps.length; w++) {
 var box = wraps[w];
 var parent = box.parentNode;
 if (!parent) continue;
 while (box.firstChild) parent.insertBefore(box.firstChild, box);
 parent.removeChild(box);
 }
 var back = document.getElementById("returnlastpage");
 if (back && back.getAttribute("data-bns-reg-back") === "1") {
 back.removeAttribute("data-bns-reg-back");
 back.classList.remove("bns-reg-back");
 if (back.parentNode) back.parentNode.removeChild(back);
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
 var obs = null;
 if (window.MutationObserver) {
 obs = new MutationObserver(function () {
 if (!pathOk()) {
 cleanup();
 return;
 }
 if (pathOk()) apply(); else if (obs) { }
 });
 obs.observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
 window.addEventListener("pageshow", function (ev) { if (ev.persisted && document.querySelector("main[data-bns-register='1']")) return; if (pathOk()) apply(); });
 }
 if (typeof window.bnsOnPage === "function") window.bnsOnPage(function () { sync(); });
 }
 ready(start);
})();

(function () {
 if (window.__bns1PageDownload38) return;
 window.__bns1PageDownload38 = 1;
 function decorate(a) {
 if (!a || a.getAttribute("data-bns-dl") === "1") return;
 var ios = (a.getAttribute("data-type") || "") === "ios";
 var box = document.createElement("span");
 box.className = "bns-dl-meta";
 box.innerHTML = '<span class="bns-dl-tags"><span class="bns-dl-tag is-free">Gratis</span><span class="bns-dl-tag is-safe">Aman</span></span><span class="bns-dl-btn">' + (ios ? "Download iOS" : "Download Android") + "</span>";
 a.appendChild(box);
 a.setAttribute("data-bns-dl", "1");
 }
 function apply() {
 var list = document.getElementById("list-app-download");
 if (!list) return;
 var links = list.getElementsByTagName("a");
 for (var i = 0; i < links.length; i++) {
 decorate(links[i]);
 var imgs = links[i].getElementsByTagName("img");
 for (var j = 0; j < imgs.length; j++) {
 imgs[j].loading = "eager";
 imgs[j].decoding = "async";
 }
 }
 }
 if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply, { once: true });
 else apply();
})();

(function () {
 if (window.__bns1PagePromo38) return;
 window.__bns1PagePromo38 = 1;
 var s = document.getElementById("bns1-pr38-css");
 if (s) s.disabled = false;
 function tune(img, first) {
 if (!img || img.tagName !== "IMG") return;
 img.decoding = "async";
 img.loading = first ? "eager" : "lazy";
 }
 function apply() {
 var heads = document.getElementsByClassName("promotion-header");
 while (heads.length) heads[0].parentNode.removeChild(heads[0]);
 var banners = document.getElementsByClassName("promotion-banner");
 var i;
 for (i = 0; i < banners.length; i++) tune(banners[i].getElementsByTagName("img")[0], !i);
 banners = document.getElementsByClassName("promo-banner");
 for (i = 0; i < banners.length; i++) tune(banners[i], !i);
 }
 if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply, { once: true });
 else apply();
})();

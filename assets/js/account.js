(function () {
 if (window.__bns1PageAccount38) return;
 window.__bns1PageAccount38 = 1;
 var s = document.getElementById("bns-acc38-css");
 if (s) s.disabled = false;
 var acc = document.getElementsByClassName("btn-account")[0];
 if (!acc || acc.getAttribute("data-bns-acc") === "1") return;
 acc.setAttribute("data-bns-acc", "1");
 var name = "";
 var view = document.getElementsByClassName("user-view")[0];
 if (view) {
 var n = view.getElementsByTagName("span")[0];
 if (n) name = (n.textContent || "").replace(/^\s+|\s+$/g, "");
 }
 var bal = document.getElementById("mainamt");
 var head = document.createElement("div");
 head.className = "bns-acc-head";
 head.innerHTML = '<div><span class="bns-acc-hi">Selamat Datang</span><strong></strong></div><div class="bns-acc-bal"><span class="bns-acc-hi">Saldo</span><strong class="bns-acc-amt"></strong></div>';
 head.getElementsByTagName("strong")[0].textContent = name || "Member";
 head.getElementsByClassName("bns-acc-amt")[0].textContent = bal && bal.textContent ? bal.textContent : "0,00 K";
 acc.insertBefore(head, acc.firstChild);
})();

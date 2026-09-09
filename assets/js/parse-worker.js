self.onmessage = function (e) {
  var d = (e && e.data) || {};
  var out = { ok: 1, id: d.id || 0 };
  var html = String(d.html || "");
  if (d.op === "extract-login" || !d.op) {
    var m = html.match(/<form\b[^>]*\bid\s*=\s*["']LoginForm["'][^>]*>[\s\S]*?<\/form>/i);
    out.form = m ? m[0] : "";
  }
  if (d.op === "page" || d.path) {
    var p = String(d.path || "").toLowerCase().replace(/\/+$/, "") || "/";
    if (p === "/login" || p === "/account/login" || (p.indexOf("/login") !== -1 && p.indexOf("logout") === -1)) out.page = "login";
    else if (p === "/register" || p === "/account/register" || p.indexOf("register") !== -1) out.page = "register";
    else if (p === "/" || p === "/home" || p === "/index") out.page = "home";
    else out.page = "other";
  }
  self.postMessage(out);
};

if (!self.define) {
    let e, t = {};
    const n = (n, i) => (n = new URL(n + ".js", i).href, t[n] || new Promise(t => {
        if ("document" in self) { const e = document.createElement("script"); e.src = n, e.onload = t, document.head.appendChild(e) }
        else e = n, importScripts(n), t()
    }).then(() => {
        let e = t[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e
    }));
    self.define = (i, r) => {
        const o = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (t[o]) return; let s = {}; const d = e => n(e, o), c = { module: { uri: o }, exports: s, require: d }; t[o] = Promise.all(i.map(e => c[e] || d(e))).then(e => (r(...e), s))
    }
} define(["./workbox-099bf95e"], function (e) {
    "use strict"; self.skipWaiting(), e.clientsClaim(), e.precacheAndRoute([{ url: "/bundle.82b7ea3935ddea11f859.js", revision: null },
    { url: "/bundle.82b7ea3935ddea11f859.js.LICENSE.txt", revision: "cccfa45cda3f72c4ebb3fb2f4ba53a71" }, { url: "/index.html", revision: "d923b22c2c609d61b3aa11755a5dada7" }], {})
});

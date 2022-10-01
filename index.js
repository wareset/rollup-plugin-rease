/* eslint-disable */
/*
dester builds:
index.ts
*/
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("fs"), t = require("path"), r = require("@rollup/pluginutils"), s = require("rastree");

function l(e) {
    return e && "object" == typeof e && "default" in e ? e : {
        default: e
    };
}

var n = l(e), u = l(t);

exports.default = ({env: e = "client", debug: t = !1, extensions: l = [ ".rease.js", ".rease.ts", ".rease.jsx", ".rease.tsx" ], include: a = null, exclude: i = null} = {}) => {
    "server" !== e && (e = "client");
    var o = process.cwd(), d = r.createFilter(a, i), c = "function" == typeof t ? t : e => t && e.startsWith(o), f = new Map;
    return {
        name: "rollup-plugin-rease",
        resolveId: (e, t) => d(e) && l.some((t => e.endsWith(t))) ? (f.set(e, null), {
            id: e,
            external: !1
        }) : null,
        transform(t, r) {
            if (!f.has(r)) return null;
            var l = s.compiler(t, {
                env: e,
                salt: r,
                useJSX: !/\.[jt]s$/.test(r)
            });
            if (!/\bnode_modules\b/.test(r) && c(r)) {
                var a = u.default.relative(o, r).split(".");
                a.splice(-1, 0, e);
                var i = u.default.parse(a.join(".")), d = u.default.join(i.dir, "__" + i.base);
                /\.[jt]sx$/.test(d) && (d = d.slice(0, -1)), n.default.writeFileSync(d, "/* eslint-disable */\n// @ts-nocheck\n" + l);
            }
            return l;
        }
    };
};

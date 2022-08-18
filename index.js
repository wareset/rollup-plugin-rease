/* eslint-disable */
/*
dester builds:
index.ts
*/
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("fs"), r = require("path"), t = require("@rollup/pluginutils"), s = require("rastree");

function l(e) {
    return e && "object" == typeof e && "default" in e ? e : {
        default: e
    };
}

var n = l(e), u = l(r);

exports.default = ({env: e = "client", debug: r = !1, extensions: l = [ ".rease.js", ".rease.ts", ".rease.jsx", ".rease.tsx" ], include: i = null, exclude: a = null} = {}) => {
    "server" !== e && (e = "client");
    var o = process.cwd(), d = t.createFilter(i, a), c = "function" == typeof r ? r : e => r && e.startsWith(o);
    return {
        name: "rollup-plugin-rease",
        transform(r, t) {
            if (!d(t)) return null;
            if (!l.some((e => t.endsWith(e)))) return null;
            var i = s.compiler(r, {
                env: e,
                salt: t,
                useJSX: !/\.[jt]s$/.test(t)
            });
            if (!/\bnode_modules\b/.test(t) && c(t)) {
                var a = u.default.relative(o, t).split(".");
                a.splice(-1, 0, e);
                var f = u.default.parse(a.join(".")), p = u.default.join(f.dir, "__" + f.base);
                /\.[jt]sx$/.test(p) && (p = p.slice(0, -1)), n.default.writeFileSync(p, "/* eslint-disable */\n// @ts-nocheck\n" + i);
            }
            return i;
        }
    };
};

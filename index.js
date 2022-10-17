/* eslint-disable */
/*
dester builds:
index.ts
*/
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("fs"), t = require("path"), r = require("@rollup/pluginutils"), l = require("rastree");

function s(e) {
    return e && "object" == typeof e && "default" in e ? e : {
        default: e
    };
}

var n = s(e), u = s(t);

exports.default = ({env: e = "client", debug: t = !1, extensions: s = [ ".rease", ".js", ".ts", ".jsx", ".tsx" ], include: i = null, exclude: a = null} = {}) => {
    "server" !== e && (e = "client");
    var o = process.cwd(), d = r.createFilter(i, a), f = "function" == typeof t ? t : e => t && e.startsWith(o);
    return {
        name: "rollup-plugin-rease",
        transform(t, r) {
            if (!d(r)) return null;
            if (!s.some((e => r.endsWith(e)))) return null;
            if (/\.[tj]s$/.test(r) && t.indexOf("rease/env") < 0) return null;
            var i = l.compiler(t, {
                env: e,
                salt: r,
                useJSX: !/\.[jt]s$/.test(r)
            });
            if (!/\bnode_modules\b/.test(r) && f(r)) {
                var a = u.default.relative(o, r).split(".");
                a.splice(-1, 0, e);
                var c = u.default.parse(a.join(".")), p = u.default.join(c.dir, "__" + c.base);
                /\.[jt]sx$/.test(p) && (p = p.slice(0, -1)), n.default.writeFileSync(p, "/* eslint-disable */\n// @ts-nocheck\n" + i);
            }
            return i;
        }
    };
};

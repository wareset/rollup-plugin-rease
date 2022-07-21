/* eslint-disable */
/*
dester builds:
index.ts
*/
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("fs"), r = require("path"), s = require("@rollup/pluginutils"), t = require("rastree");

function l(e) {
    return e && "object" == typeof e && "default" in e ? e : {
        default: e
    };
}

var n = l(e), u = l(r);

exports.default = (e = {}) => {
    const r = e.extensions || [ ".rease", ".rease.js", ".rease.ts", ".rease.jsx", ".rease.tsx" ], l = s.createFilter(e.include, e.exclude);
    return "server" !== e.env && (e.env = "client"), console.log("reaseCompilerOptions", e), 
    {
        name: "rollup-plugin-rease",
        transform(s, i) {
            if (!l(i)) return null;
            if (!r.some((e => i.endsWith(e)))) return null;
            console.log(i);
            const a = u.default.relative(process.cwd(), i), o = t.compiler(s, {
                env: e.env,
                salt: a,
                useJSX: /x$/.test(a)
            });
            if (e.debug) {
                const r = a.split(".");
                r.splice(-1, 0, e.env);
                const s = u.default.parse(r.join("."));
                s.base = "__" + s.base, n.default.writeFileSync(u.default.join(s.dir, s.base), o);
            }
            return o;
        }
    };
};

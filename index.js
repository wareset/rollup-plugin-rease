/* eslint-disable */
/*
dester builds:
index.ts
*/
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("fs"), r = require("path"), s = require("@rollup/pluginutils"), t = require("rastree");

function n(e) {
    return e && "object" == typeof e && "default" in e ? e : {
        default: e
    };
}

var l = n(e), a = n(r);

exports.default = (e = {}) => {
    const r = e.extensions || [ ".rease", ".rease.js", ".rease.ts", ".rease.jsx", ".rease.tsx" ], n = s.createFilter(e.include, e.exclude);
    return "server" !== e.env && (e.env = "client"), console.log("reaseCompilerOptions", e), 
    {
        name: "rease",
        transform(s, i) {
            if (!n(i)) return null;
            if (!r.some((e => i.endsWith(e)))) return null;
            console.log(i);
            const u = a.default.relative(process.cwd(), i), o = t.compiler(s, {
                env: e.env,
                salt: u,
                useJSX: /x$/.test(u)
            });
            if (e.debug) {
                const r = u.split(".");
                r.splice(-1, 0, e.env);
                const s = a.default.parse(r.join("."));
                s.base = "__" + s.base, l.default.writeFileSync(a.default.join(s.dir, s.base), o);
            }
            return o;
        }
    };
};

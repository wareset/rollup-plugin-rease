/* eslint-disable */
/*
dester builds:
index.ts
*/
import e from "fs";

import r from "path";

import { createFilter as s } from "@rollup/pluginutils";

import { compiler as n } from "rastree";

var t = (t = {}) => {
    const o = t.extensions || [ ".rease", ".rease.js", ".rease.ts", ".rease.jsx", ".rease.tsx" ], l = s(t.include, t.exclude);
    return "server" !== t.env && (t.env = "client"), console.log("reaseCompilerOptions", t), 
    {
        name: "rollup-plugin-rease",
        transform(s, i) {
            if (!l(i)) return null;
            if (!o.some((e => i.endsWith(e)))) return null;
            console.log(i);
            const a = r.relative(process.cwd(), i), p = n(s, {
                env: t.env,
                salt: a,
                useJSX: /x$/.test(a)
            });
            if (t.debug) {
                const s = a.split(".");
                s.splice(-1, 0, t.env);
                const n = r.parse(s.join("."));
                n.base = "__" + n.base, e.writeFileSync(r.join(n.dir, n.base), p);
            }
            return p;
        }
    };
};

export { t as default };

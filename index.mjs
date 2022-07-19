/* eslint-disable */
/*
dester builds:
index.ts
*/
import e from "fs";

import s from "path";

import { createFilter as r } from "@rollup/pluginutils";

import { compiler as t } from "rastree";

var n = (n = {}) => {
    const o = n.extensions || [ ".rease", ".rease.js", ".rease.ts", ".rease.jsx", ".rease.tsx" ], i = r(n.include, n.exclude);
    return "server" !== n.env && (n.env = "client"), console.log("reaseCompilerOptions", n), 
    {
        name: "rease",
        transform(r, l) {
            if (!i(l)) return null;
            if (!o.some((e => l.endsWith(e)))) return null;
            console.log(l);
            const a = s.relative(process.cwd(), l), p = t(r, {
                env: n.env,
                salt: a,
                useJSX: /x$/.test(a)
            });
            if (n.debug) {
                const r = a.split(".");
                r.splice(-1, 0, n.env);
                const t = s.parse(r.join("."));
                t.base = "__" + t.base, e.writeFileSync(s.join(t.dir, t.base), p);
            }
            return p;
        }
    };
};

export { n as default };

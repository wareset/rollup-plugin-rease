/* eslint-disable */
/*
dester builds:
index.ts
*/
import e from "fs";

import s from "path";

import { createFilter as r } from "@rollup/pluginutils";

import { compiler as t } from "rastree";

var l = ({env: l = "client", debug: n = !1, extensions: i = [ ".rease.js", ".rease.ts", ".rease.jsx", ".rease.tsx" ], include: a = null, exclude: o = null} = {}) => {
    "server" !== l && (l = "client");
    var u = process.cwd(), p = r(a, o), c = "function" == typeof n ? n : e => n && e.startsWith(u), d = new Map;
    return {
        name: "rollup-plugin-rease",
        resolveId: (e, s) => p(e) && i.some((s => e.endsWith(s))) ? (d.set(e, null), {
            id: e,
            external: !1
        }) : null,
        transform(r, n) {
            if (!d.has(n)) return null;
            var i = t(r, {
                env: l,
                salt: n,
                useJSX: !/\.[jt]s$/.test(n)
            });
            if (!/\bnode_modules\b/.test(n) && c(n)) {
                var a = s.relative(u, n).split(".");
                a.splice(-1, 0, l);
                var o = s.parse(a.join(".")), p = s.join(o.dir, "__" + o.base);
                /\.[jt]sx$/.test(p) && (p = p.slice(0, -1)), e.writeFileSync(p, "/* eslint-disable */\n// @ts-nocheck\n" + i);
            }
            return i;
        }
    };
};

export { l as default };

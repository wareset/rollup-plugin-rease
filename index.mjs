/* eslint-disable */
/*
dester builds:
index.ts
*/
import e from "fs";

import r from "path";

import { createFilter as s } from "@rollup/pluginutils";

import { compiler as t } from "rastree";

var n = ({env: n = "client", debug: l = !1, extensions: i = [ ".rease.js", ".rease.ts", ".rease.jsx", ".rease.tsx" ], include: a = null, exclude: o = null} = {}) => {
    "server" !== n && (n = "client");
    var u = process.cwd(), p = s(a, o), c = "function" == typeof l ? l : e => l && e.startsWith(u);
    return {
        name: "rollup-plugin-rease",
        transform(s, l) {
            if (!p(l)) return null;
            if (!i.some((e => l.endsWith(e)))) return null;
            var a = t(s, {
                env: n,
                salt: l,
                useJSX: !/\.[jt]s$/.test(l)
            });
            if (!/\bnode_modules\b/.test(l) && c(l)) {
                var o = r.relative(u, l).split(".");
                o.splice(-1, 0, n);
                var f = r.parse(o.join(".")), m = r.join(f.dir, "__" + f.base);
                /\.[jt]sx$/.test(m) && (m = m.slice(0, -1)), e.writeFileSync(m, "/* eslint-disable */\n// @ts-nocheck\n" + a);
            }
            return a;
        }
    };
};

export { n as default };

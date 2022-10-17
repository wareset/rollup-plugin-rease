/* eslint-disable */
/*
dester builds:
index.ts
*/
import e from "fs";

import t from "path";

import { createFilter as r } from "@rollup/pluginutils";

import { compiler as s } from "rastree";

var n = ({env: n = "client", debug: l = !1, extensions: i = [ ".rease", ".js", ".ts", ".jsx", ".tsx" ], include: o = null, exclude: u = null} = {}) => {
    "server" !== n && (n = "client");
    var a = process.cwd(), p = r(o, u), f = "function" == typeof l ? l : e => l && e.startsWith(a);
    return {
        name: "rollup-plugin-rease",
        transform(r, l) {
            if (!p(l)) return null;
            if (!i.some((e => l.endsWith(e)))) return null;
            if (/\.[tj]s$/.test(l) && r.indexOf("rease/env") < 0) return null;
            var o = s(r, {
                env: n,
                salt: l,
                useJSX: !/\.[jt]s$/.test(l)
            });
            if (!/\bnode_modules\b/.test(l) && f(l)) {
                var u = t.relative(a, l).split(".");
                u.splice(-1, 0, n);
                var c = t.parse(u.join(".")), m = t.join(c.dir, "__" + c.base);
                /\.[jt]sx$/.test(m) && (m = m.slice(0, -1)), e.writeFileSync(m, "/* eslint-disable */\n// @ts-nocheck\n" + o);
            }
            return o;
        }
    };
};

export { n as default };

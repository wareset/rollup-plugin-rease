/* eslint-disable */
/*
dester builds:
index.ts
*/
import e from 'path';
import r from 'require-relative';
import { createFilter } from '@rollup/pluginutils';
import { compile } from 'rastree/bin/compile';

const o=new Set;var index = (l={})=>{const{compilerOptions:i={},...s}=l,u=s.extensions||[".rease"],c=createFilter(s.include,s.exclude);i.format="esm",console.log("compilerOptions",i);const a=new Map;return {name:"rease",resolveId(t,n){if(a.has(t))return t;if(!n||"."===t[0]||"\0"===t[0]||e.isAbsolute(t))return null;const l=t.split("/");let i,s,u=l.shift();u&&"@"===u[0]&&(u+=`/${l.shift()}`);try{const t=`${u}/package.json`,o=r.resolve(t,e.dirname(n));i=e.dirname(o),s=require(o);}catch(c){if("MODULE_NOT_FOUND"===c.code)return null;if("ERR_PACKAGE_PATH_NOT_EXPORTED"===c.code)return o.add(u),null;throw c}return 0===l.length&&s.svelte?e.resolve(i,s.svelte):void 0},load:e=>a.get(e)||null,async transform(r,t){if(!c(t))return null;const o=e.extname(t);if(!~u.indexOf(o))return null;const l=e.relative(process.cwd(),t);return compile({code:r,input:l,debug:!0}).codeClient}}};

export { index as default };

/* eslint-disable */
/*
dester builds:
index.ts
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var e = require('path');
var r = require('require-relative');
var pluginutils = require('@rollup/pluginutils');
var compile = require('rastree/bin/compile');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var e__default = /*#__PURE__*/_interopDefaultLegacy(e);
var r__default = /*#__PURE__*/_interopDefaultLegacy(r);

const o=new Set;var index = (l={})=>{const{compilerOptions:i={},...s}=l,u=s.extensions||[".rease"],c=pluginutils.createFilter(s.include,s.exclude);i.format="esm",console.log("compilerOptions",i);const a=new Map;return {name:"rease",resolveId(t,n){if(a.has(t))return t;if(!n||"."===t[0]||"\0"===t[0]||e__default["default"].isAbsolute(t))return null;const l=t.split("/");let i,s,u=l.shift();u&&"@"===u[0]&&(u+=`/${l.shift()}`);try{const t=`${u}/package.json`,o=r__default["default"].resolve(t,e__default["default"].dirname(n));i=e__default["default"].dirname(o),s=require(o);}catch(c){if("MODULE_NOT_FOUND"===c.code)return null;if("ERR_PACKAGE_PATH_NOT_EXPORTED"===c.code)return o.add(u),null;throw c}return 0===l.length&&s.svelte?e__default["default"].resolve(i,s.svelte):void 0},load:e=>a.get(e)||null,async transform(r,t){if(!c(t))return null;const o=e__default["default"].extname(t);if(!~u.indexOf(o))return null;const l=e__default["default"].relative(process.cwd(),t);return compile.compile({code:r,input:l,debug:!0}).codeClient}}};

exports["default"] = index;

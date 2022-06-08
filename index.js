/* eslint-disable */
/*
dester builds:
index.ts
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');
var pluginutils = require('@rollup/pluginutils');
var compiler = require('@rastree/compiler');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

/* filename: index.ts
  timestamp: 2022-05-04T18:36:16.045Z */

// const PREFIX = '[rollup-plugin-rease]'
// const pkg_export_errors = new Set()

// const plugin_options = new Set([
//   'emitCss',
//   'exclude',
//   'extensions',
//   'include',
//   'onwarn',
//   'preprocess'
// ])

var index = (options = {}) => {
  const extensions = options.extensions ||
    ['.rease', '.rease.js', '.rease.ts', '.rease.jsx', '.rease.tsx'];
  const filter = pluginutils.createFilter(options.include, options.exclude);

  if (options.env !== 'server') options.env = 'client';

  console.log('reaseCompilerOptions', options);

  // for (const key in rest) {
  //   if (plugin_options.has(key)) continue
  //   console.warn(
  //     `${PREFIX} Unknown "${key}" option. Please use "compilerOptions" for any Svelte compiler configuration.`
  //   )
  // }

  // [filename]:[chunk]
  // const cache_emit = new Map()
  // const { onwarn, emitCss = true } = rest

  // if (emitCss) {
  //   if (compilerOptions.css) {
  //     console.warn(
  //       `${PREFIX} Forcing \`"compilerOptions.css": false\` because "emitCss" was truthy.`
  //     )
  //   }
  //   compilerOptions.css = false
  // }

  return {
    name: 'rease',

    // // eslint-disable-next-line consistent-return
    // resolveId(importee: string, importer?: string): any {
    //   // console.log('resolveId', [importee, importer])

    //   if (cache_emit.has(importee)) return importee
    //   if (
    //     !importer ||
    //     importee[0] === '.' ||
    //     importee[0] === '\0' ||
    //     path.isAbsolute(importee)
    //   ) {
    //     return null
    //   }

    //   // if this is a bare import, see if there's a valid pkg.svelte
    //   const parts = importee.split('/')

    //   let dir,
    //     pkg,
    //     name = parts.shift()
    //   if (name && name[0] === '@') {
    //     name += `/${parts.shift()}`
    //   }

    //   try {
    //     const file = `${name}/package.json`
    //     const resolved = relative.resolve(file, path.dirname(importer))
    //     dir = path.dirname(resolved)
    //     // eslint-disable-next-line security/detect-non-literal-require
    //     pkg = require(resolved)
    //   } catch (err) {
    //     if (err.code === 'MODULE_NOT_FOUND') return null
    //     if (err.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
    //       pkg_export_errors.add(name)
    //       return null
    //     }
    //     throw err
    //   }

    //   // use pkg.svelte
    //   if (parts.length === 0 && pkg.svelte) {
    //     return path.resolve(dir, pkg.svelte)
    //   }
    // },

    // load(id: any): any {
    //   return cache_emit.get(id) || null
    // },

    // eslint-disable-next-line require-await
    transform(code, id) {
      if (!filter(id)) return null
      if (!extensions.some((v) => id.endsWith(v))) return null
      console.log(id);
      // const dependencies = []
      const filename = path__default["default"].relative(process.cwd(), id);
      // const svelte_options = { ...compilerOptions, filename }

      const compiled = compiler.compiler(code, {
        env : options.env,
        salt: filename
      });

      if (options.debug) {
        const a = filename.split('.');
        a.splice(-1, 0, options.env);
        const data = path__default["default"].parse(a.join('.'));
        data.base = '__' + data.base;
        fs__default["default"].writeFileSync(path__default["default"].join(data.dir, data.base), compiled);
      }

      return compiled

      // ;(compiled.warnings || []).forEach((warning) => {
      //   if (!emitCss && warning.code === 'css-unused-selector') return
      //   if (onwarn) onwarn(warning, this.warn)
      //   else this.warn(warning)
      // })

      // if (emitCss && compiled.css.code) {
      //   const fname = id.replace(new RegExp(`\\${extension}$`), '.css')
      //   compiled.js.code += `\nimport ${JSON.stringify(fname)};\n`
      //   cache_emit.set(fname, compiled.css)
      // }

      // if (this.addWatchFile) {
      //   dependencies.forEach(this.addWatchFile)
      // } else {
      //   compiled.js.dependencies = dependencies
      // }

      // return compiled.js
    }

    // generateBundle(): any {
    //   if (pkg_export_errors.size > 0) {
    //     console.warn(
    //       `\n${PREFIX} The following packages did not export their \`package.json\` file so we could not check the "svelte" field. If you had difficulties importing svelte components from a package, then please contact the author and ask them to export the package.json file.\n`
    //     )
    //     console.warn(
    //       Array.from(pkg_export_errors, (s) => `- ${s}`).join('\n') + '\n'
    //     )
    //   }
    // }
  }
};

exports["default"] = index;
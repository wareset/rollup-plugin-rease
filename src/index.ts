/* eslint-disable camelcase */

import path from 'path'
import relative from 'require-relative'
import { createFilter } from '@rollup/pluginutils'
import { compile } from 'rastree/bin/compile'

// const PREFIX = '[rollup-plugin-rease]'
const pkg_export_errors = new Set()

// const plugin_options = new Set([
//   'emitCss',
//   'exclude',
//   'extensions',
//   'include',
//   'onwarn',
//   'preprocess'
// ])

export default (options: { [key: string]: any } = {}): any => {
  const { compilerOptions = {}, ...rest } = options
  const extensions = rest.extensions || ['.rease']
  const filter = createFilter(rest.include, rest.exclude)

  compilerOptions.format = 'esm'
  console.log('compilerOptions', compilerOptions)

  // for (const key in rest) {
  //   if (plugin_options.has(key)) continue
  //   console.warn(
  //     `${PREFIX} Unknown "${key}" option. Please use "compilerOptions" for any Svelte compiler configuration.`
  //   )
  // }

  // [filename]:[chunk]
  const cache_emit = new Map()
  const { onwarn, emitCss = true } = rest

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

    // eslint-disable-next-line consistent-return
    resolveId(importee: string, importer?: string): any {
      // console.log('resolveId', [importee, importer])

      if (cache_emit.has(importee)) return importee
      if (
        !importer ||
        importee[0] === '.' ||
        importee[0] === '\0' ||
        path.isAbsolute(importee)
      ) {
        return null
      }

      // if this is a bare import, see if there's a valid pkg.svelte
      const parts = importee.split('/')

      let dir,
        pkg,
        name = parts.shift()
      if (name && name[0] === '@') {
        name += `/${parts.shift()}`
      }

      try {
        const file = `${name}/package.json`
        const resolved = relative.resolve(file, path.dirname(importer))
        dir = path.dirname(resolved)
        // eslint-disable-next-line security/detect-non-literal-require
        pkg = require(resolved)
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') return null
        if (err.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
          pkg_export_errors.add(name)
          return null
        }
        throw err
      }

      // use pkg.svelte
      if (parts.length === 0 && pkg.svelte) {
        return path.resolve(dir, pkg.svelte)
      }
    },

    load(id: any): any {
      return cache_emit.get(id) || null
    },

    // eslint-disable-next-line require-await
    async transform(code: string, id: string): Promise<any> {
      if (!filter(id)) return null

      const extension = path.extname(id)
      if (!~extensions.indexOf(extension)) return null

      // const dependencies = []
      const filename = path.relative(process.cwd(), id)
      // const svelte_options = { ...compilerOptions, filename }

      const compiled = compile({ code, input: filename, debug: true })
      return compiled.codeClient

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
}

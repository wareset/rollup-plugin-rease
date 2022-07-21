/* eslint-disable camelcase */

import fs from 'fs'
import path from 'path'
import { createFilter } from '@rollup/pluginutils'
import { compiler } from 'rastree'

export default (options: { [key: string]: any } = {}): any => {
  const extensions = options.extensions ||
    ['.rease', '.rease.js', '.rease.ts', '.rease.jsx', '.rease.tsx']
  const filter = createFilter(options.include, options.exclude)

  if (options.env !== 'server') options.env = 'client'

  console.log('reaseCompilerOptions', options)

  return {
    name: 'rollup-plugin-rease',

    // eslint-disable-next-line require-await
    transform(code: string, id: string): string | null {
      if (!filter(id)) return null
      if (!extensions.some((v: string) => id.endsWith(v))) return null
      console.log(id)
      // const dependencies = []
      const filename = path.relative(process.cwd(), id)
      // const svelte_options = { ...compilerOptions, filename }

      const compiled = compiler(code, {
        env   : options.env,
        salt  : filename,
        useJSX: /x$/.test(filename)
      })

      if (options.debug) {
        const a = filename.split('.')
        a.splice(-1, 0, options.env)
        const data = path.parse(a.join('.'))
        data.base = '__' + data.base
        fs.writeFileSync(path.join(data.dir, data.base), compiled)
      }

      return compiled
    }
  }
}

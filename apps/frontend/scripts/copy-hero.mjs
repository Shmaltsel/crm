import { rmSync, cpSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const src = resolve(here, '../../hero/dist')
const dst = resolve(here, '../public/info')

rmSync(dst, { recursive: true, force: true })
cpSync(src, dst, { recursive: true })
console.log('hero → public/info')

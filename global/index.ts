import prisma from './prisma'
import { readFileSync } from 'fs'

const key = readFileSync('./private.key').toString('utf-8')

export {
  prisma,
  key
}

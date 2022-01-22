import prisma from './prisma'
import { readFileSync } from 'fs'

const key = readFileSync('../../private.key')

export {
  prisma,
  key
}

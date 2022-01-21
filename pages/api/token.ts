import { prisma } from '../../global/'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { readFile } from 'fs/promises'

import User from '../../types/User'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') get(req, res)
  else res.json({ error: 'bad req' })
}

async function get(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { mail, pw }: User = req.body

  if (mail && pw) {
    const user = await prisma.user.findFirst({
      where: {
        mail
      }
    })

    if (!user) return res.json({ error: 'that user is not exists' })
    
    const token = jwt.sign({ id: user.id }, await readFile('../../private.key'))
    res.json({ token })
  } else {
    res.json({ error: 'mail or password not provided' })
  }
}

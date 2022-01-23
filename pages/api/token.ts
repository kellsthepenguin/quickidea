import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { sha256 } from 'js-sha256'

import { prisma, key } from '../../global/'
import User from '../../types/User'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') post(req, res) // FUCK
  else res.json({ error: 'bad req' })
}

async function post(
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
    
    if (sha256(pw + user.salt) === user.pw) {
      const token = jwt.sign({ id: user.id }, key)
      res.json({ token })
    } else {
      res.json({ error: 'password is not correct' })
    }
  } else {
    res.json({ error: 'mail or password not provided' })
  }
}

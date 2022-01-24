import type { NextApiRequest, NextApiResponse } from 'next'
import jwt, { VerifyErrors } from 'jsonwebtoken'

import { key } from '../../global'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') get(req, res) // FUCKFUCKFUCKFUCKFUKCUFKCUFKCUFKCUFKCU
  else res.json({ error: 'bad req' })
}

function get(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body

  if (!token) return res.json({ error: 'token is not provided' })

  jwt.verify(token, key, (err: VerifyErrors | null) => {
    if (err) return res.json({ valid: false })

    res.json({ valid: true })
  })
}

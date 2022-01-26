import type { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { prisma, key } from '../../global'

interface DisplayableIdea {
  name: string,
  description: string,
  date: Date,
  id?: number,
  ownerId?: number
}

function runMiddleware (
  req: NextApiRequest,
  res: NextApiResponse,
  cb: (payload: JwtPayload) => any
) {
  const { token } = req.query

  if (!token) return res.json({ error: 'token is not provided' })
  jwt.verify(token as string, key, (err: VerifyErrors | null, token?: JwtPayload | string) => {
    if (err) return res.json({ error: 'an error occured during checking token' })

    cb(token as JwtPayload)
  })
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  runMiddleware(req, res, (payload: JwtPayload) => {
    if (req.method === 'GET') return get(req, res, payload)
    if (req.method === 'POST') return post(req, res, payload)
    res.json({ error: 'bad req' })
  })
}

async function get(
  _req: NextApiRequest,
  res: NextApiResponse,
  payload: JwtPayload
) {
  const ideas = await prisma.idea.findMany({
    where: {
      ownerId: payload.id
    }
  })
  const displayableIdeas = ideas as DisplayableIdea[]

  displayableIdeas.map((idea) => {
    delete idea.id
    delete idea.ownerId
  })

  res.json(displayableIdeas)
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  payload: JwtPayload
) {
  const { name, description } = req.body

  if (name && description) {
    await prisma.idea.create({
      data: {
        name,
        description,
        ownerId: payload.id
      }
    })

    res.json({ success: true })
  }
}

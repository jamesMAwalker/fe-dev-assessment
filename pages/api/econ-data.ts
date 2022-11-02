import type { NextApiRequest, NextApiResponse } from 'next'
import { genApiUrl } from "../../lib/api-helpers"

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
  ) {
  const { code, from, to } = req.body
  const url = genApiUrl({ code, from, to })

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const econData = await data.json()

  res.send(econData)
}
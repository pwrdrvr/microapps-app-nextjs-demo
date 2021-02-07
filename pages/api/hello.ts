// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
}

// export default function handler(req, res) {
//   res.status(200).json({ text: 'Hello' })
// }

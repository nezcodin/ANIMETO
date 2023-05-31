import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get('https://api.jikan.moe/v4/anime?q=naruto&sfw')
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong...' })
  }
}
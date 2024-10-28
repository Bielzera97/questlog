import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    if (client) {
      await client.connect();
    }

    const db = client.db('QuestLog');
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required.' });
    }

    const result = await db.collection('posts').insertOne({
      title,
      content,
      author,
      createdAt: new Date(),
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

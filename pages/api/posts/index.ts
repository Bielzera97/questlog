import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Conecta ao banco de dados
    if (client) {
      await client.connect();
    }

    const db = client.db('QuestLog');
    const posts = await db.collection('posts').find({}).toArray();

    res.status(200).json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

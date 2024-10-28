import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import client from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = (await client.connect()).db('QuestLog');
  const collection = db.collection('posts');
  const { id } = req.query;

  if (req.method === 'GET') {
    const post = await collection.findOne({ _id: new ObjectId(id as string) });
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }
    return res.status(200).json(post);
  }

  if (req.method === 'PUT') {
    const { title, content, author } = req.body;

    const result = await collection.updateOne(
      { _id: new ObjectId(id as string) },
      { $set: { title, content, author } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    return res.status(200).json({ message: 'Post atualizado com sucesso.' });
  }

  if (req.method === 'DELETE') {
    const result = await collection.deleteOne({ _id: new ObjectId(id as string) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    return res.status(200).json({ message: 'Post deletado com sucesso.' });
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

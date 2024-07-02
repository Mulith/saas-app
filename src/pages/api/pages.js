// pages/api/users.js

import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8');
  const data = JSON.parse(fileContents);
  res.status(200).json(data);
}
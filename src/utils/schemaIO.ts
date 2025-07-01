import { promises as fs } from 'fs';

export async function saveSchema(path: string, sdl: string) {
  await fs.writeFile(path, sdl, 'utf-8');
}

export async function loadSchema(path: string): Promise<string> {
  return fs.readFile(path, 'utf-8');
}

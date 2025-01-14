import FusionCollection from 'fusionable/FusionCollection';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  let homeSlug = 'home';
  const mdFile = await fetch('/pages/' + homeSlug + '.md');
  const mdContent = await mdFile.text();
  const collection = new FusionCollection().addMarkdownString(mdContent);
  const item = collection.getOneBySlug(homeSlug);

  if (!item) {
    error(404, {
      message: 'Content not found'
    });
  }

  return { item: item.getItem() };
}
import FusionCollection from 'fusionable/FusionCollection';
import { config } from '$lib/config';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const mdFile = await fetch('/pages/' + params.slug + '.md');
  const mdContent = await mdFile.text();
  const collection = new FusionCollection().addMarkdownString(mdContent);
  const item = collection.getOneBySlug(params.slug);

  if (!item) {
    error(404, {
      message: 'Content not found'
    });
  }

  return { item: item.getItem() };
}
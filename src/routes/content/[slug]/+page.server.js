import FusionCollection from 'fusionable/FusionCollection';
import { config } from '$lib/config';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const collection = new FusionCollection().loadFromDir(config.contentPath);
  const item = collection.getOneBySlug(params.slug);

  if (!item) {
    error(404, {
			message: 'Content not found'
		});
  }

  return { item: item.getItem() };
}
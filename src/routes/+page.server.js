import FusionCollection from 'fusionable/FusionCollection';
import { config } from '$lib/config';

export function load() {
  const collection = new FusionCollection()
    .loadFromDir(config.contentPath)
    .filter("highlight")
    .orderBy('date', 'desc');

  const contentItems = collection.getItemsArray();
  return { contentItems };
}
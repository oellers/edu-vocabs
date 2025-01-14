import FusionCollection from 'fusionable/FusionCollection';
import { error } from '@sveltejs/kit';

export function load() {
  error(404, {
    message: 'Content list not yet implemented'
  });
}
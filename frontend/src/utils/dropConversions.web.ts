import { Drop } from '@bassment/models/Drop';

/** Converts a data transfer (from the DOM API) to a Drop array (from our model). */
export async function toDrops(transfer: DataTransfer): Promise<Drop[]> {
  const drops: Drop[] = [];

  for (let i = 0; i < transfer.items.length; i++) {
    const item = transfer.items[i];
    switch (item.kind) {
      case 'file':
        const file = item.getAsFile() ?? undefined;
        drops.push({ kind: 'file', file });
        break;
      case 'string':
        const raw: string = await new Promise(resolve =>
          item.getAsString(resolve),
        );
        try {
          const obj = JSON.parse(raw);
          if ('tracks' in obj) {
            drops.push({ kind: 'tracks', tracks: obj.tracks });
          }
        } catch {
          drops.push({ kind: 'string', value: raw, type: item.type });
        }
        break;
    }
  }

  return drops;
}

/** Converts a Drop array (from our model) into a DataTransfer (from the DOM API). */
export function fromDrops(drops: Drop[], transfer: DataTransfer): void {
  for (const drop of drops) {
    switch (drop.kind) {
      case 'string':
        transfer.items.add(drop.value, drop.type);
        break;
      case 'tracks':
        transfer.items.add(
          JSON.stringify({
            tracks: drop.tracks,
          }),
          'application/json',
        );
        break;
      default:
        break;
    }
  }
}

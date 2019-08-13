export const DND_MOVE_ITEM = 'DND_MOVE_ITEM';
export const DND_MOVE_FOLDER = 'DND_MOVE_FOLDER';

export function moveItem(id, to) {
  return {
    type: DND_MOVE_ITEM,
    id,
    to
  };
}

export function moveFolder(id, to) {
  return {
    type: DND_MOVE_FOLDER,
    id,
    to
  };
}
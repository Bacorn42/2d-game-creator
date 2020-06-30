export const OPEN_WINDOW = 'OPEN_WINDOW';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';
export const MOVE_WINDOW = 'MOVE_WINDOW';
export const FOCUS_WINDOW = 'FOCUS_WINDOW';

export function openWindow(id) {
  return {
    type: OPEN_WINDOW,
    id
  };
}

export function closeWindow(id) {
  return {
    type: CLOSE_WINDOW,
    id
  };
}

export function moveWindow(id, x, y) {
  return {
    type: MOVE_WINDOW,
    id,
    x,
    y
  };
}

export function focusWindow(id) {
  return {
    type: FOCUS_WINDOW,
    id
  };
}
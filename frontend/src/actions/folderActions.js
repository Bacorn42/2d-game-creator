export const DND_MOVE_ITEM = "DND_MOVE_ITEM";
export const DND_MOVE_FOLDER = "DND_MOVE_FOLDER";
export const CREATE_FOLDER = "CREATE_FOLDER";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const CREATE_ITEM = "CREATE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const MODIFY_ITEM = "MODIFY_ITEM";
export const CREATE_ANIMATION = "CREATE_ANIMATION";
export const DELETE_ANIMATION = "DELETE_ANIMATION";
export const CREATE_EVENT = "CREATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

export function moveItem(id, to) {
  return {
    type: DND_MOVE_ITEM,
    id,
    to,
  };
}

export function moveFolder(id, to) {
  return {
    type: DND_MOVE_FOLDER,
    id,
    to,
  };
}

export function createFolder(id) {
  return {
    type: CREATE_FOLDER,
    id,
  };
}

export function deleteFolder(id) {
  return {
    type: DELETE_FOLDER,
    id,
  };
}

export function createItem(id) {
  return {
    type: CREATE_ITEM,
    id,
  };
}

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    id,
  };
}

export function modifyItem(item) {
  return {
    type: MODIFY_ITEM,
    item,
  };
}

export function createAnimation(id) {
  return {
    type: CREATE_ANIMATION,
    id,
  };
}

export function deleteAnimation(id) {
  return {
    type: DELETE_ANIMATION,
    id,
  };
}

export function createEvent(id, eventType, eventKey, eventTimer) {
  return {
    type: CREATE_EVENT,
    id,
    eventType,
    eventKey,
    eventTimer,
  };
}

export function deleteEvent(id) {
  return {
    type: DELETE_EVENT,
    id,
  };
}

import * as actions from "../../actions/folderActions";
import folderReducer from "../../reducers/folderReducer";
import actionApplier from "../../testUtils/actionApplier";

test("Creates folder", () => {
  const state = actionApplier(
    folderReducer,
    actions.createFolder("folders_graphics"),
  );
  expect(state.folders["folders_0"]).not.toBeUndefined();
  expect(state.folders.count).toBe(1);
  expect(state.folders["folders_graphics"].folders).toContain("folders_0");
});

test("Creates item", () => {
  const state = actionApplier(
    folderReducer,
    actions.createItem("folders_graphics"),
  );
  expect(state.graphics["graphics_0"]).not.toBeUndefined();
  expect(state.graphics.count).toBe(1);
  expect(state.folders["folders_graphics"].items).toContain("graphics_0");
});

test("Creates item in nested folder", () => {
  const state = actionApplier(
    folderReducer,
    actions.createFolder("folders_graphics"),
    actions.createFolder("folders_0"),
    actions.createItem("folders_1"),
  );
  expect(state.graphics["graphics_0"]).not.toBeUndefined();
  expect(state.folders.count).toBe(2);
  expect(state.folders["folders_0"].folders).toContain("folders_1");
  expect(state.folders["folders_1"].items).toContain("graphics_0");
});

test("Deletes folder with folder and item", () => {
  const state = actionApplier(
    folderReducer,
    actions.createFolder("folders_graphics"),
    actions.createFolder("folders_0"),
    actions.createItem("folders_1"),
    actions.deleteFolder("folders_0"),
  );
  expect(state.folders["folders_0"]).toBeUndefined();
  expect(state.folders["folders_1"]).toBeUndefined();
  expect(state.graphics["graphics_0"]).toBeUndefined();
  expect(state.folders["folders_graphics"].folders).not
    .toContain("folders_0");
});

test("Deletes item", () => {
  const state = actionApplier(
    folderReducer,
    actions.createItem("folders_graphics"),
    actions.deleteItem("graphics_0"),
  );
  expect(state.graphics["graphics_0"]).toBeUndefined();
  expect(state.folders["folders_graphics"].items).not.toContain(
    "graphics_0",
  );
  expect(state.graphics.count).toBe(1);
});

test("Moves folder", () => {
  const state = actionApplier(
    folderReducer,
    actions.createFolder("folders_graphics"),
    actions.createFolder("folders_graphics"),
    actions.createFolder("folders_0"),
    actions.moveFolder("folders_2", "folders_1"),
  );
  expect(state.folders["folders_0"].folders).not.toContain("folders_2");
  expect(state.folders["folders_1"].folders).toContain("folders_2");
  expect(state.folders.count).toBe(3);
});

test("Doesn't move folder to different root", () => {
  const state = actionApplier(
    folderReducer,
    actions.createFolder("folders_graphics"),
    actions.moveFolder("folders_0", "folders_audio"),
  );
  expect(state.folders["folders_graphics"].folders).toContain("folders_0");
  expect(state.folders["folders_audio"].folders).not.toContain("folders_0");
});

test("Moves item", () => {
  const state = actionApplier(
    folderReducer,
    actions.createFolder("folders_graphics"),
    actions.createFolder("folders_graphics"),
    actions.createItem("folders_0"),
    actions.moveItem("graphics_0", "folders_1"),
  );
  expect(state.folders["folders_0"].items).not.toContain("graphics_0");
  expect(state.folders["folders_1"].items).toContain("graphics_0");
  expect(state.graphics.count).toBe(1);
});

test("Doesn't move item to different root", () => {
  const state = actionApplier(
    folderReducer,
    actions.createItem("folders_graphics"),
    actions.moveItem("graphics_0", "folders_audio"),
  );
  expect(state.folders["folders_graphics"].items).toContain("graphics_0");
  expect(state.folders["folders_audio"].items).not.toContain("graphics_0");
});

test("Creates animation", () => {
  const state = actionApplier(
    folderReducer,
    actions.createItem("folders_graphics"),
    actions.createAnimation("graphics_0"),
  );
  expect(state.animations["animations_0"]).not.toBeUndefined();
  expect(state.animations.count).toBe(1);
  expect(state.graphics["graphics_0"].animations).toContain("animations_0");
});

test("Deletes animation", () => {
  const state = actionApplier(
    folderReducer,
    actions.createItem("folders_graphics"),
    actions.createAnimation("graphics_0"),
    actions.deleteAnimation("animations_0"),
  );
  expect(state.animations["animations_0"]).toBeUndefined();
  expect(state.graphics["graphics_0"].animations).not.toContain(
    "animations_0",
  );
  expect(state.animations.count).toBe(1);
});

test("Modifies item", () => {
  const newItem = {
    id: "graphics_0",
    name: "New Name",
  };
  const state = actionApplier(
    folderReducer,
    actions.createItem("folders_graphics"),
    actions.modifyItem(newItem),
  );
  expect(state.graphics["graphics_0"].name).toBe("New Name");
  expect(state.graphics.count).toBe(1);
  expect(state.folders["folders_graphics"].items).toContain("graphics_0");
});

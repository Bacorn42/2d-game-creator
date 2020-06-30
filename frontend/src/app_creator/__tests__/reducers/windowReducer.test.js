import * as actions from "../../actions/windowActions";
import windowReducer from "../../reducers/windowReducer";
import actionApplier from "../../testUtils/actionApplier";

test("Opens window", () => {
  const state = actionApplier(
    windowReducer,
    actions.openWindow("window_0"),
    actions.openWindow("window_1"),
  );
  expect(state.windows["window_0"]).not.toBeUndefined();
  expect(state.windows["window_1"]).not.toBeUndefined();
  expect(state.count).toBe(2);
});

test("Opening same window twice does nothing", () => {
  const state = actionApplier(
    windowReducer,
    actions.openWindow("window_0"),
    actions.openWindow("window_0"),
  );
  expect(state.windows["window_0"]).not.toBeUndefined();
  expect(state.count).toBe(1);
});

test("Most recently opened window is in front", () => {
  const state = actionApplier(
    windowReducer,
    actions.openWindow("window_0"),
    actions.openWindow("window_1"),
  );
  expect(state.windows_order[0]).toBe("window_0");
});

test("Closes window", () => {
  const state = actionApplier(
    windowReducer,
    actions.openWindow("window_0"),
    actions.closeWindow("window_0"),
  );
  expect(state.windows["window_0"]).toBeUndefined();
  expect(state.windows_order).toHaveLength(0);
  expect(state.count).toBe(1);
});

test("Moving window puts it in front", () => {
  const state = actionApplier(
    windowReducer,
    actions.openWindow("window_0"),
    actions.openWindow("window_1"),
    actions.moveWindow("window_0", 0, 0),
  );
  expect(state.windows_order).toEqual(["window_1", "window_0"]);
  expect(state.count).toBe(2);
});

test("Focuses window", () => {
  const state = actionApplier(
    windowReducer,
    actions.openWindow("window_0"),
    actions.openWindow("window_1"),
    actions.focusWindow("window_0"),
  );
  expect(state.windows_order).toEqual(["window_1", "window_0"]);
  expect(state.count).toBe(2);
});

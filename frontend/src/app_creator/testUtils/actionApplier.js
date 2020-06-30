export default function actionApplier(reducer, ...actions) {
  let state = undefined;
  for (const action of actions) {
    state = reducer(state, action);
  }
  return state;
}

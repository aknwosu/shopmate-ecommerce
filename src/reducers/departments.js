const initialState = {
  departments: {}
};
export default function departmentsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DEPARTMENTS_SUCCESS": {
      return Object.assign({}, state, {
        departments: action.payload.departments
      });
    }
    default:
      return state;
  }
}

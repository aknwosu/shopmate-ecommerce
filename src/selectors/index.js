export const getCurrentUser = state => state.customers.user
export const selectDepartmentCategories = (state, department_id) => state.categories.departmentCategories[department_id]

const LOCAL_STORAGE_KEY = "selected_center_id"

export const getCenterId = () => Number(localStorage.getItem(LOCAL_STORAGE_KEY))
export const setCenterId = (selectedId: number) =>
  localStorage.setItem(LOCAL_STORAGE_KEY, String(selectedId))
export const removeCenterId = () => localStorage.removeItem(LOCAL_STORAGE_KEY)

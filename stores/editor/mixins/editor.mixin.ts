import store from "store2"
import {EditData} from "~/models/EditData"

export const editDataMixin = () => {
  const editData = ref<EditData>()
  const setEditData = (data: EditData) => editData.value = data
  const initEditData = () => editData.value = EditData.of()
  const saveEditData = () => store.session.set('SiteBuilderPage', editData.value)
  const loadEditData = () => setEditData(EditData.of(store.session.get('SiteBuilderPage')))

  return {
    editData,
    setEditData,
    saveEditData,
    loadEditData,
    initEditData
  }
}
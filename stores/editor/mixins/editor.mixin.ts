import store from "store2"
import {EditData} from "~/models/EditData"
import {useEditorStore} from "~/stores/editor/editor.store"

export const editDataMixin = () => {
  const editorStore = useEditorStore()

  const editData = ref<EditData>()
  const setEditData = (data: EditData) => editData.value = data
  const initEditData = () => editData.value = EditData.of()
  const saveEditData = () => store.session.set('SiteBuilderPage', editData.value)
  const loadEditData = () => setEditData(EditData.of(store.session.get('SiteBuilderPage')))

  const showSpacing = (value: boolean) => editorStore.toChild(() => {
    if (editData.value) editData.value.isShowSpacing = value
  })

  const showOutline = (value: boolean) => editorStore.toChild(() => {
    if (editData.value) editData.value.isShowOutline = value
  })

  const showHiddenElement = (value: boolean) => editorStore.toChild(() => {
    if (editData.value) editData.value.isShowHiddenElement = value
  })

  return {
    editData,
    setEditData,
    saveEditData,
    loadEditData,
    initEditData,

    showSpacing,
    showOutline,
    showHiddenElement,
  }
}
import store from "store2"
import {EditData, EditDataRaw} from "~/models/EditData"
import {useEditorStore} from "~/stores/editor/editor.store"
import pageApi from "~/api/page.api"

export const editDataMixin = () => {
  const editorStore = useEditorStore()

  const editData = ref<EditData>()
  const setEditData = (data: EditData) => editData.value = data
  const initEditData = (editDataRaw: EditDataRaw) => editorStore.toChild(() => editData.value = EditData.of(editDataRaw))
  const storeEditData = () => store.session.set('SiteBuilderPage', editData.value)
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

  const saveEditData = async (pageId: number) => {
    await pageApi.setPageDetail(pageId, JSON.stringify(EditData.serialize(editData.value)))
    alert('Saved')
  }

  return {
    editData,
    setEditData,
    storeEditData,
    loadEditData,
    initEditData,

    showSpacing,
    showOutline,
    showHiddenElement,
    saveEditData
  }
}
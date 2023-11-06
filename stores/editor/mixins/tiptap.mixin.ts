import {Editor} from "@tiptap/core"
import {useEditorStore} from "~/stores/editor/editor.store"

export const tiptapMixin = () => {
  const editorStore = useEditorStore()
  const isShowTiptapMenu = ref()
  const showTiptapMenu = (nodeId?: string) => isShowTiptapMenu.value = nodeId


  const tiptapEditor = ref<Editor>()
  const setTiptapEditor = (editor?: Editor) => tiptapEditor.value = editor

  const originalHtml = ref('')
  const setOriginalHtml = (value: string) => originalHtml.value = value

  const setTextWidgetData = (value: string) => {
    const isSame = toValue(originalHtml) === value
    if (!isSame) editorStore.postWidgetData(value)
  }

  return {
    isShowTiptapMenu,
    showTiptapMenu,

    tiptapEditor,
    setTiptapEditor,

    originalHtml,
    setOriginalHtml,

    setTextWidgetData
  }
}
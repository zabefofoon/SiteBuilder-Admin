import {Editor} from "@tiptap/core"

export const tiptapMixin = () => {
  const isShowTiptapMenu = ref()
  const showTiptapMenu = (nodeId?: string) => isShowTiptapMenu.value = nodeId


  const tiptapEditor = ref<Editor>()
  const setTiptapEditor = (editor?: Editor) => tiptapEditor.value = editor


  return {
    isShowTiptapMenu,
    showTiptapMenu,

    tiptapEditor,
    setTiptapEditor
  }
}
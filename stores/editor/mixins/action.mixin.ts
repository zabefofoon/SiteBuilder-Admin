import {useEditorStore} from "~/stores/editor/editor.store"
import {ActionManager} from "~/models/ActionManager"
import {AddNodeSiblingDown, AddNodeSiblingUp} from "~/models/Action"

export const actionMixin = () => {
  const editorStore = useEditorStore()

  const actionManager = ref<ActionManager>()
  const initActionManager = () => actionManager.value = ActionManager.of()

  const selectNodeIdOneToParent = (nodeId: string) => editorStore.toParent(() => {
    if (!editorStore.editData) return

    editorStore.editData.selectedNodeIds = []
    editorStore.editData.selectedNodeIds.push(nodeId)
  })

  const emptySelectedNodeIdsToParent = () => editorStore.toParent(() => {
    if (!editorStore.editData) return
    editorStore.editData.selectedNodeIds = []
  })

  const selectNodeIdManyToParent = (nodeId: string) => editorStore.toParent(() => {
    if (!editorStore.editData) return
    editorStore.editData.selectedNodeIds.push(nodeId)
  })

  const addNodeSiblingDownToChild = () => actionManager.value?.execute(AddNodeSiblingDown.of())
  const addNodeSiblingUpToChild = () => actionManager.value?.execute(AddNodeSiblingUp.of())

  return {
    actionManager,
    initActionManager,

    selectNodeIdOneToParent,
    selectNodeIdManyToParent,
    addNodeSiblingDownToChild,
    addNodeSiblingUpToChild,
    emptySelectedNodeIdsToParent
  }
}
import {useEditorStore} from "~/stores/editor/editor.store"
import {ActionManager} from "~/models/ActionManager"
import {
  AddNodeChild,
  AddNodeParent,
  AddNodeSiblingDown,
  AddNodeSiblingUp,
  Paste,
  Remove,
  RemoveParent
} from "~/models/Action"
import {Node} from "~/models/Node"
import {generateUniqueId} from "~/utils/util"

export const actionMixin = () => {
  const editorStore = useEditorStore()

  const actionManager = ref<ActionManager>()

  const copiedNodes = ref<Node[]>([])

  const initActionManager = () => actionManager.value = ActionManager.of(editorStore)
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
  const addNodeChildToChild = () => actionManager.value?.execute(AddNodeChild.of())
  const addNodeParentToChild = () => actionManager.value?.execute(AddNodeParent.of())

  const copy = () => {
    copiedNodes.value.length = 0
    editorStore.editData?.selectedNodeIds
        .forEach((selectedNodeId) => {
          const found = editorStore.editData?.findNode(selectedNodeId)
          if (found) copiedNodes.value.push(found)
        })
  }

  const cut = () => {
    copy()
    remove()
  }

  const paste = () => {
    copiedNodes.value = regenerateNodes(copiedNodes.value)
    actionManager.value?.execute(Paste.of())
  }

  const remove = () => actionManager.value?.execute(Remove.of())

  const removeParent = () => actionManager.value?.execute(RemoveParent.of())

  const regenerateNodes = (nodes: Node[]) => {
    const newCopiedNodes = Node.makeNodes(structuredClone(toRaw(nodes)))
    newCopiedNodes.forEach((childNode) => {
      childNode.id = generateUniqueId()
      childNode.nodes.forEach((node) => node.parentId = childNode.id)
      childNode.forEach(childNode.nodes, (node) => {
        node.id = generateUniqueId()
        node.nodes.forEach((child) => child.parentId = node.id)
      })
    })
    return newCopiedNodes
  }

  return {
    actionManager,
    initActionManager,

    selectNodeIdOneToParent,
    selectNodeIdManyToParent,

    addNodeSiblingDownToChild,
    addNodeSiblingUpToChild,
    addNodeChildToChild,
    addNodeParentToChild,

    emptySelectedNodeIdsToParent,

    copiedNodes,
    copy,
    cut,
    paste,

    remove,
    removeParent
  }
}
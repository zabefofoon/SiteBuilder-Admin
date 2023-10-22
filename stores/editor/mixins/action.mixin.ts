import {useEditorStore} from "~/stores/editor/editor.store"
import {ActionManager} from "~/models/ActionManager"
import {
  AddNodeChild,
  AddNodeParent,
  AddNodeSiblingDown,
  AddNodeSiblingUp,
  Paste,
  Remove,
  RemoveParent,
  SelectResponsiveMode,
  SetNodeLayoutColumn,
  SetNodeLayoutCrossAxis,
  SetNodeLayoutDirection,
  SetNodeLayoutGap,
  SetNodeLayoutHeight,
  SetNodeLayoutHidden, SetNodeLayoutInset,
  SetNodeLayoutMainAxis,
  SetNodeLayoutMaxWidth, SetNodeLayoutPadding, SetNodeLayoutPosition, SetNodeLayoutTransparent,
  SetNodeLayoutType,
  SetNodeLayoutWidth
} from "~/models/Action"
import {
  CrossAxis,
  Direction,
  MainAxis,
  Node,
  NodeDirection,
  NodeLayoutType,
  Position,
  ResponsiveMode
} from "~/models/Node"
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

  const selectNodeIdOneToChild = (nodeId: string) => editorStore.toChild(() => {
    if (!editorStore.editData) return

    editorStore.editData.selectedNodeIds = []
    editorStore.editData.selectedNodeIds.push(nodeId)
  })

  const emptySelectedNodeIdsToParent = () => editorStore.toParent(() => {
    if (!editorStore.editData) return
    editorStore.editData.selectedNodeIds = []
  })

  const emptySelectedNodeIdsToChild = () => editorStore.toChild(() => {
    if (!editorStore.editData) return
    editorStore.editData.selectedNodeIds = []
  })

  const selectNodeIdManyToParent = (nodeId: string) => editorStore.toParent(() => {
    if (!editorStore.editData) return
    editorStore.editData.selectedNodeIds.push(nodeId)
  })

  const selectNodeIdManyToChild = (nodeId: string) => editorStore.toChild(() => {
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

  const selectParent = () => {
    const found = editorStore.editData?.findNode(editorStore.editData?.selectedNodeIds[0])

    found?.parentId
        ? selectNodeIdOneToChild(found.parentId)
        : emptySelectedNodeIdsToChild()
  }

  const changeResponsiveMode = (responsiveMode: ResponsiveMode) => actionManager.value?.execute(SelectResponsiveMode.of(responsiveMode))

  const setNodeLayoutType = (layoutType: NodeLayoutType) => actionManager.value?.execute(SetNodeLayoutType.of(layoutType))

  const setNodeLayoutDirection = (direction: NodeDirection) => actionManager.value?.execute(SetNodeLayoutDirection.of(direction))

  const setNodesLayoutColumns = (length: number) => actionManager.value?.execute(SetNodeLayoutColumn.of(length))

  const setNodesLayoutGap = (gap: string) => actionManager.value?.execute(SetNodeLayoutGap.of(gap))
  const setNodesLayoutMainAxis = (mainAxis: MainAxis) => actionManager.value?.execute(SetNodeLayoutMainAxis.of(mainAxis))
  const setNodesLayoutCrossAxis = (crossAxis: CrossAxis) => actionManager.value?.execute(SetNodeLayoutCrossAxis.of(crossAxis))
  const setNodesLayoutHidden = (hidden: boolean) => actionManager.value?.execute(SetNodeLayoutHidden.of(hidden))
  const setNodesLayoutWidth = (width: string) => actionManager.value?.execute(SetNodeLayoutWidth.of(width))
  const setNodesLayoutHeight = (height: string) => actionManager.value?.execute(SetNodeLayoutHeight.of(height))
  const setNodesLayoutMaxWidth = (maxWidth: string) => actionManager.value?.execute(SetNodeLayoutMaxWidth.of(maxWidth))
  const setNodesTransparent = (transparent: boolean) => actionManager.value?.execute(SetNodeLayoutTransparent.of(transparent))
  const setNodesLayoutPadding = (direction: Direction,
                                 value: string) => actionManager.value?.execute(SetNodeLayoutPadding.of(direction, value))

  const setNodesLayoutPosition = (position: Position) => actionManager.value?.execute(SetNodeLayoutPosition.of(position))
  const setNodesLayoutInset = (direction: Direction,
                               value: string) => actionManager.value?.execute(SetNodeLayoutInset.of(direction, value))

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
    selectNodeIdManyToChild,
    selectNodeIdOneToChild,

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
    removeParent,

    selectParent,

    changeResponsiveMode,

    setNodeLayoutType,
    setNodeLayoutDirection,
    setNodesLayoutColumns,
    setNodesLayoutGap,
    setNodesLayoutMainAxis,
    setNodesLayoutCrossAxis,
    setNodesLayoutHidden,
    setNodesLayoutWidth,
    setNodesLayoutHeight,
    setNodesLayoutMaxWidth,
    setNodesTransparent,
    setNodesLayoutPadding,
    setNodesLayoutPosition,
    setNodesLayoutInset
  }
}
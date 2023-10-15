import {useEditorStore} from "~/stores/editor/editor.store"
import {Node} from "~/models/Node"

export interface Action {
  do: () => void,

  undo: () => void,

  redo: () => void,
}

export class AbstractAction implements Action {
  do(): void {
  }

  undo(): void {
  }

  redo(): void {
    this.do()
  }
}

export class AddNodeSiblingDown extends AbstractAction {

  private createdNodeIds: string[] = []
  private selectedNodeIds: string[] = []

  constructor() {
    super()
  }

  private createNodeOne = () => {
    const editorStore = useEditorStore()
    const node = Node.of()
    this.createdNodeIds.push(node.id)

    const selectedNodeId = this.selectedNodeIds.at(-1)

    const found = editorStore.editData?.findNode(selectedNodeId || '')
    const parent = editorStore.editData?.findNode(found?.parentId || '') || editorStore.editData
    const index = parent?.nodes?.findIndex((node) => node.id === selectedNodeId) || 0

    index === -1
        ? parent?.nodes?.push(node)
        : parent?.nodes?.splice(index + 1, 0, node)

  }

  do() {
    const editorStore = useEditorStore()
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds || []

    this.selectedNodeIds.length === 0
        ? editorStore.toChild(() => this.createNodeOne())
        : editorStore.toChild(() => {
          const isSameParent = this.selectedNodeIds
              .map((nodeId) => editorStore.editData?.findNode(nodeId))
              .every((node, index, array) => {
                return node?.parentId === array[0]?.parentId
              })

          isSameParent
              ? this.createNodeOne()
              : this.selectedNodeIds
                  .map((nodeId) => editorStore.editData?.findNode(nodeId))
                  .forEach((selectedNode) => {
                    const node = Node.of()
                    this.createdNodeIds.push(node.id)
                    const parent = editorStore.editData?.findNode(selectedNode?.parentId || '') || editorStore.editData
                    const index = parent?.nodes.findIndex((node) => node.id === selectedNode?.id) || -1
                    parent?.nodes.splice(index + 1, 0, node)
                  })
        })


    this.createdNodeIds.forEach((nodeId) => {
      editorStore.emptySelectedNodeIdsToParent()
      editorStore.selectNodeIdManyToParent(nodeId)
    })
  }

  undo() {
    const editorStore = useEditorStore()

    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)
            found?.parentId
                ? editorStore.editData?.findNode(found.parentId)?.removeNode(createdNodeId)
                : editorStore.editData?.removeNode(createdNodeId)
          })
    })
  }

  redo() {
    this.do()
  }

  static of() {
    return new AddNodeSiblingDown()
  }
}

export class AddNodeSiblingUp extends AbstractAction {

  private createdNodeIds: string[] = []
  private selectedNodeIds: string[] = []

  constructor() {
    super()
  }

  private createNodeOne = () => {
    const editorStore = useEditorStore()
    const node = Node.of()
    this.createdNodeIds.push(node.id)

    const selectedNodeId = this.selectedNodeIds.at(0)

    const found = editorStore.editData?.findNode(selectedNodeId || '')
    const parent = editorStore.editData?.findNode(found?.parentId || '') || editorStore.editData
    const index = parent?.nodes?.findIndex((node) => node.id === selectedNodeId) || 0

    index === -1
        ? parent?.nodes?.unshift(node)
        : parent?.nodes?.splice(index, 0, node)

  }

  do() {
    const editorStore = useEditorStore()
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds || []

    this.selectedNodeIds.length === 0
        ? editorStore.toChild(() => this.createNodeOne())
        : editorStore.toChild(() => {
          const isSameParent = this.selectedNodeIds
              .map((nodeId) => editorStore.editData?.findNode(nodeId))
              .every((node, index, array) => {
                return node?.parentId === array[0]?.parentId
              })

          isSameParent
              ? this.createNodeOne()
              : this.selectedNodeIds
                  .map((nodeId) => editorStore.editData?.findNode(nodeId))
                  .forEach((selectedNode) => {
                    const node = Node.of()
                    this.createdNodeIds.push(node.id)
                    const parent = editorStore.editData?.findNode(selectedNode?.parentId || '') || editorStore.editData
                    const index = parent?.nodes.findIndex((node) => node.id === selectedNode?.id) || -1
                    parent?.nodes.splice(index, 0, node)
                  })
        })


    this.createdNodeIds.forEach((nodeId) => {
      editorStore.emptySelectedNodeIdsToParent()
      editorStore.selectNodeIdManyToParent(nodeId)
    })
  }

  undo() {
    const editorStore = useEditorStore()

    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)
            found?.parentId
                ? editorStore.editData?.findNode(found.parentId)?.removeNode(createdNodeId)
                : editorStore.editData?.removeNode(createdNodeId)
          })
    })
  }

  redo() {
    this.do()
  }

  static of() {
    return new AddNodeSiblingUp()
  }
}
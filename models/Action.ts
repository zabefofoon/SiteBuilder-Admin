import {useEditorStore} from "~/stores/editor/editor.store"
import {Node} from "~/models/Node"

export interface Action {
  do: () => void,

  undo: () => void,

  redo: () => void,
}

export type DeletedNode = {
  index?: number
  node?: Node
}

export class AddNodeSiblingDown implements Action {

  private createdNodeIds: string[] = []
  private selectedNodeIds: string[] = []
  private deletedNodes: DeletedNode[] = []

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
          this.selectedNodeIds
              .map((nodeId) => editorStore.editData?.findNode(nodeId))
              .forEach((selectedNode) => {
                const node = Node.of(selectedNode?.parentId)
                this.createdNodeIds.push(node.id)
                const parent = editorStore.editData?.findNode(selectedNode?.parentId || '') || editorStore.editData
                const index = parent!.nodes.findIndex((child) => child.id === selectedNode?.id)
                parent?.nodes.splice(index + 1, 0, node)
              })
        })


    editorStore.emptySelectedNodeIdsToParent()
    this.createdNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  undo() {
    const editorStore = useEditorStore()

    this.deletedNodes = []
    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: found})

            parentNode?.removeNode(createdNodeId)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  redo() {
    const editorStore = useEditorStore()
    editorStore.emptySelectedNodeIdsToParent()
    this.selectedNodeIds.forEach(editorStore.selectNodeIdManyToParent)

    editorStore.toChild(() => {
      this.deletedNodes.slice().reverse().forEach((deletedNode) => {
        const parent = deletedNode.node?.parentId
            ? editorStore.editData?.findNode(deletedNode.node?.parentId)
            : editorStore.editData

        if (deletedNode.node)
          parent?.nodes.splice(deletedNode.index || 0, 0, deletedNode.node)
      })
    })

    editorStore.emptySelectedNodeIdsToParent()
    this.createdNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  static of() {
    return new AddNodeSiblingDown()
  }
}

export class AddNodeSiblingUp implements Action {
  private createdNodeIds: string[] = []
  private selectedNodeIds: string[] = []
  private deletedNodes: DeletedNode[] = []
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
          this.selectedNodeIds
              .map((nodeId) => editorStore.editData?.findNode(nodeId))
              .forEach((selectedNode) => {
                const node = Node.of(selectedNode?.parentId)
                this.createdNodeIds.push(node.id)
                const parent = editorStore.editData?.findNode(selectedNode?.parentId || '') || editorStore.editData
                const index = parent?.nodes.findIndex((node) => node.id === selectedNode?.id)
                parent?.nodes.splice(index!, 0, node)
              })
        })


    editorStore.emptySelectedNodeIdsToParent()
    this.createdNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  undo() {
    const editorStore = useEditorStore()

    this.deletedNodes = []
    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: found})

            parentNode?.removeNode(createdNodeId)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  redo() {
    const editorStore = useEditorStore()
    editorStore.emptySelectedNodeIdsToParent()
    this.selectedNodeIds.forEach(editorStore.selectNodeIdManyToParent)

    editorStore.toChild(() => {
      this.deletedNodes
          .slice()
          .reverse()
          .forEach((deletedNode) => {
            const parent = deletedNode.node?.parentId
                ? editorStore.editData?.findNode(deletedNode.node?.parentId)
                : editorStore.editData

            if (deletedNode.node)
              parent?.nodes.splice(deletedNode.index || 0, 0, deletedNode.node)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
    this.createdNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  static of() {
    return new AddNodeSiblingUp()
  }
}

export class AddNodeChild implements Action {
  private createdNodeIds: string[] = []
  private selectedNodeIds: string[] = []
  private deletedNodes: DeletedNode[] = []

  do(): void {
    const editorStore = useEditorStore()
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds || []

    editorStore.editData?.selectedNodeIds.length === 0
        ? editorStore.toChild(() => {
          const node = Node.of()
          this.createdNodeIds.push(node.id)
          editorStore.editData?.nodes.push(node)
        })
        : editorStore.toChild(() => {
          editorStore.editData?.selectedNodeIds.forEach((nodeId) => {
            const node = Node.of(nodeId)
            this.createdNodeIds.push(node.id)

            const found = editorStore.editData?.findNode(nodeId)
            found?.nodes.push(node)
          })
        })

    editorStore.emptySelectedNodeIdsToParent()
    this.createdNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  undo() {
    const editorStore = useEditorStore()

    this.deletedNodes = []
    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: found})

            parentNode?.removeNode(createdNodeId)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  redo(): void {
    const editorStore = useEditorStore()
    editorStore.emptySelectedNodeIdsToParent()
    this.selectedNodeIds.forEach(editorStore.selectNodeIdManyToParent)

    editorStore.toChild(() => {
      this.deletedNodes
          .slice()
          .reverse()
          .forEach((deletedNode) => {
            const parent = deletedNode.node?.parentId
                ? editorStore.editData?.findNode(deletedNode.node?.parentId)
                : editorStore.editData

            if (deletedNode.node)
              parent?.nodes.splice(deletedNode.index || 0, 0, deletedNode.node)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
    this.createdNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  static of() {
    return new AddNodeChild()
  }
}

export class AddNodeParent implements Action {
  createdNodeIds: string[] = []
  private selectedNodeIds: string[] = []
  private deletedNodes: DeletedNode[] = []

  do(): void {
    const editorStore = useEditorStore()
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds || []

    editorStore.editData?.selectedNodeIds.length === 0
        ? editorStore.toChild(() => {
          const node = Node.of()
          this.createdNodeIds.push(node.id)
          editorStore.editData?.nodes.push(node)
        })
        : editorStore.toChild(() => {
          editorStore.editData?.selectedNodeIds.forEach((nodeId) => {
            const found = editorStore.editData?.findNode(nodeId)!

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found?.parentId || '')
                : editorStore.editData

            const node = Node.of(parentNode?.id)
            this.createdNodeIds.push(node.id)

            const index = parentNode?.nodes.findIndex((node) => node.id === found.id)
            parentNode?.nodes.splice(index!, 0, node)

            found.parentId = node.id

            node.nodes.push(Node.makeNode(found))
            parentNode!.nodes = parentNode!.nodes.filter((node) => node.id !== nodeId)
          })
        })

    editorStore.emptySelectedNodeIdsToParent()
    this.createdNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  undo() {
    const editorStore = useEditorStore()

    this.deletedNodes = []
    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: found})

            parentNode?.removeNode(createdNodeId)

            if (found?.nodes.length) {
              found.nodes
                  .slice()
                  .reverse()
                  .forEach((foundNode, _index) => {
                    parentNode!.nodes.splice(index! + _index, 0, foundNode)
                  })
              parentNode!.nodes.forEach((node) => node.parentId = parentNode?.id)
            }
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  redo(): void {
    const editorStore = useEditorStore()
    editorStore.emptySelectedNodeIdsToParent()
    this.selectedNodeIds.forEach(editorStore.selectNodeIdManyToParent)

    editorStore.toChild(() => {
      this.selectedNodeIds
          .forEach((selectedNodeId) => {
            const found = editorStore.editData?.findNode(selectedNodeId)

            const parent = found?.parentId
                ? editorStore.editData?.findNode(found?.parentId)
                : editorStore.editData

            if (found?.id) parent?.removeNode(found.id)
          })

      this.deletedNodes
          .slice()
          .reverse()
          .forEach((deletedNode) => {
            const parent = deletedNode.node?.parentId
                ? editorStore.editData?.findNode(deletedNode.node?.parentId)
                : editorStore.editData

            if (deletedNode.node) {
              parent?.nodes.splice(deletedNode.index || 0, 0, deletedNode.node)
              deletedNode.node.nodes.forEach((node) => node.parentId = deletedNode.node?.id)
            }
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
    this.createdNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  static of() {
    return new AddNodeParent()
  }
}
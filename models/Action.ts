import type {EditorStore} from "~/stores/editor/editor.store"
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
import {Widget} from "~/models/Widget"

export interface Action {
  do: (editorStore: EditorStore) => void,

  undo: (editorStore: EditorStore) => void,

  redo: (editorStore: EditorStore) => void,
}

export type DeletedNode = {
  index?: number
  node?: Node
}

export class AddNodeSiblingDown implements Action {

  private createdNodeIds: string[] = []
  private selectedNodeIds: string[] = []
  private deletedNodes: DeletedNode[] = []

  private createNodeOne = (editorStore: EditorStore) => {
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

  do(editorStore: EditorStore) {
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds || []

    this.selectedNodeIds.length === 0
        ? editorStore.toChild(() => this.createNodeOne(editorStore))
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

  undo(editorStore: EditorStore) {
    this.deletedNodes = []
    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: Node.makeNode(found!)})

            parentNode?.removeNode(createdNodeId)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  redo(editorStore: EditorStore) {
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
  private createNodeOne = (editorStore: EditorStore) => {
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

  do(editorStore: EditorStore) {
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds || []

    this.selectedNodeIds.length === 0
        ? editorStore.toChild(() => this.createNodeOne(editorStore))
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

  undo(editorStore: EditorStore) {
    this.deletedNodes = []
    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: Node.makeNode(found!)})

            parentNode?.removeNode(createdNodeId)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  redo(editorStore: EditorStore) {
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

  do(editorStore: EditorStore): void {
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

  undo(editorStore: EditorStore) {
    this.deletedNodes = []
    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: Node.makeNode(found!)})

            parentNode?.removeNode(createdNodeId)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  redo(editorStore: EditorStore): void {
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

  do(editorStore: EditorStore): void {
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

  undo(editorStore: EditorStore) {
    this.deletedNodes = []
    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: Node.makeNode(found!)})

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

  redo(editorStore: EditorStore): void {
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

export class Paste implements Action {
  private createdNodeIds: string[] = []
  private selectedNodeIds: string[] = []
  private deletedNodes: DeletedNode[] = []

  do(editorStore: EditorStore): void {
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds || []

    this.selectedNodeIds.length === 0
        ? editorStore.toChild(() => {
          editorStore.copiedNodes
              .forEach((copiedNode) => {
                copiedNode.parentId = undefined
                editorStore.editData?.nodes.push(copiedNode)
                this.createdNodeIds.push(copiedNode.id)
              })
        })
        : editorStore.toChild(() => {
          this.selectedNodeIds
              .map((nodeId) => editorStore.editData?.findNode(nodeId))
              .forEach((selectedNode) => {
                editorStore.copiedNodes
                    .forEach((copiedNode) => {
                      copiedNode.parentId = selectedNode?.id
                      selectedNode?.nodes.push(copiedNode)
                      this.createdNodeIds.push(copiedNode.id)
                    })
              })
        })

    editorStore.emptySelectedNodeIdsToParent()
    this.createdNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  undo(editorStore: EditorStore): void {
    this.deletedNodes = []
    editorStore.toChild(() => {
      this.createdNodeIds
          .forEach((createdNodeId) => {
            const found = editorStore.editData?.findNode(createdNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: Node.makeNode(found!)})

            parentNode?.removeNode(createdNodeId)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  redo(editorStore: EditorStore) {
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
    return new Paste()
  }
}

export class Remove implements Action {
  private selectedNodeIds: string[] = []
  private deletedNodes: DeletedNode[] = []

  do(editorStore: EditorStore): void {
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds || []

    this.deletedNodes = []
    editorStore.toChild(() => {
      this.selectedNodeIds
          .forEach((selectedNodeId) => {
            const found = editorStore.editData?.findNode(selectedNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: Node.makeNode(found!)})

            parentNode?.removeNode(selectedNodeId)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  undo(editorStore: EditorStore): void {
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
    this.selectedNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  redo(editorStore: EditorStore): void {
    this.deletedNodes = []
    editorStore.toChild(() => {
      this.selectedNodeIds
          .forEach((selectedNodeId) => {
            const found = editorStore.editData?.findNode(selectedNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const index = parentNode?.nodes.findIndex((node) => node.id === found?.id)
            this.deletedNodes.push({index, node: Node.makeNode(found!)})

            parentNode?.removeNode(selectedNodeId)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  static of() {
    return new Remove()
  }
}

export class RemoveParent implements Action {
  private selectedNodeIds: string[] = []
  private deletedNodes: DeletedNode[] = []

  do(editorStore: EditorStore): void {
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds || []

    editorStore.toChild(() => {
      this.selectedNodeIds
          .forEach((selectedNodeId) => {
            const found = editorStore.editData?.findNode(selectedNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const grandParentNode = parentNode instanceof Node
                ? parentNode.parentId
                    ? editorStore.editData?.findNode(parentNode.parentId)
                    : editorStore.editData
                : undefined

            const index = grandParentNode?.nodes.findIndex((node) => node.id === parentNode?.id)

            if (parentNode?.id && found && index !== undefined) {
              grandParentNode?.removeNode(parentNode?.id)

              this.deletedNodes.push({index, node: parentNode})

              grandParentNode?.nodes.splice(index, 0, found)
              grandParentNode?.nodes.forEach((node) => node.parentId = grandParentNode?.id)
            }
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      this.deletedNodes
          .slice()
          .reverse()
          .forEach((deletedNode) => {
            const grandParent = deletedNode.node?.parentId
                ? editorStore.editData?.findNode(deletedNode.node.parentId)
                : editorStore.editData

            grandParent?.nodes.splice(deletedNode.index!, 0, deletedNode.node!)
            deletedNode.node?.nodes.forEach((node) => node.parentId = deletedNode.node?.id)
          })

      this.selectedNodeIds
          .slice()
          .reverse()
          .forEach((selectedNodeId) => {
            const found = editorStore.editData?.findNode(selectedNodeId)

            const parent = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            if (found) parent?.removeNode(found?.id)
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
    this.selectedNodeIds.forEach(editorStore.selectNodeIdManyToParent)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      this.selectedNodeIds
          .forEach((selectedNodeId) => {
            const found = editorStore.editData?.findNode(selectedNodeId)

            const parentNode = found?.parentId
                ? editorStore.editData?.findNode(found.parentId)
                : editorStore.editData

            const grandParentNode = parentNode instanceof Node
                ? parentNode.parentId
                    ? editorStore.editData?.findNode(parentNode.parentId)
                    : editorStore.editData
                : undefined

            const index = grandParentNode?.nodes.findIndex((node) => node.id === parentNode?.id)

            if (parentNode?.id && found && index !== undefined) {
              grandParentNode?.removeNode(parentNode?.id)

              grandParentNode?.nodes.splice(index, 0, found)
              grandParentNode?.nodes.forEach((node) => node.parentId = grandParentNode?.id)
            }
          })
    })

    editorStore.emptySelectedNodeIdsToParent()
  }

  static of() {
    return new RemoveParent()
  }

}

export class SelectResponsiveMode implements Action {

  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeIds: string[] = []

  constructor(private readonly responsiveMode: ResponsiveMode) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      this.selectedNodeIds = editorStore.editData?.selectedNodeIds || []
      this.originalResponsiveMode = editorStore.editData!.responsiveMode
      editorStore.editData!.responsiveMode = this.responsiveMode
      editorStore.setScreenSize(this.responsiveMode)
    })


    editorStore.emptySelectedNodeIdsToParent()
    this.selectedNodeIds.forEach(editorStore.selectNodeIdManyToChild)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      editorStore.editData!.responsiveMode = this.originalResponsiveMode
      editorStore.setScreenSize(this.originalResponsiveMode)
    })

    editorStore.emptySelectedNodeIdsToParent()
    this.selectedNodeIds.forEach(editorStore.selectNodeIdManyToChild)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      editorStore.editData!.responsiveMode = this.responsiveMode
      editorStore.setScreenSize(this.responsiveMode)
    })

    editorStore.emptySelectedNodeIdsToParent()
    this.selectedNodeIds.forEach(editorStore.selectNodeIdManyToChild)
  }

  static of(responsiveMode: ResponsiveMode) {
    return new SelectResponsiveMode(responsiveMode)
  }
}

export class SetNodeLayoutType implements Action {

  originalLayoutType: NodeLayoutType = 'stack'
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly layoutType: NodeLayoutType) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalLayoutType = found.layout[responsiveMode].type || 'stack'

      found.setLayoutType(responsiveMode!, this.layoutType)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setLayoutType(this.originalResponsiveMode, this.originalLayoutType)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setLayoutType(this.originalResponsiveMode, this.layoutType)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(layoutType: NodeLayoutType) {
    return new SetNodeLayoutType(layoutType)
  }
}

export class SetNodeLayoutDirection implements Action {

  originalDirection: NodeDirection = 'vertical'
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly direction: NodeDirection) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalDirection = found.layout[responsiveMode].direction || 'vertical'

      found.setLayoutStackDirection(responsiveMode!, this.direction)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setLayoutStackDirection(this.originalResponsiveMode, this.originalDirection)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setLayoutStackDirection(this.originalResponsiveMode, this.direction)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(direction: NodeDirection) {
    return new SetNodeLayoutDirection(direction)
  }
}

export class SetNodeLayoutColumn implements Action {

  originalLength: number = 1
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly length: number) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalLength = found.layout[responsiveMode].columns || 1

      found.setLayoutGridColumns(responsiveMode!, this.length)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setLayoutGridColumns(this.originalResponsiveMode, this.originalLength)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setLayoutGridColumns(this.originalResponsiveMode, this.length)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(length: number) {
    return new SetNodeLayoutColumn(length)
  }
}

export class SetNodeLayoutGap implements Action {

  originalGap?: string
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly gap: string) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalGap = found.layout[responsiveMode].gap

      found.setLayoutGap(responsiveMode!, this.gap)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setLayoutGap(this.originalResponsiveMode, this.originalGap || '')
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setLayoutGap(this.originalResponsiveMode, this.gap)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(gap: string) {
    return new SetNodeLayoutGap(gap)
  }
}

export class SetNodeLayoutMainAxis implements Action {

  originalMainAxis: MainAxis = 'start'
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly mainAxis: MainAxis) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalMainAxis = found.layout[responsiveMode].mainAxis || 'start'

      found.setMainAxis(responsiveMode!, this.mainAxis)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setMainAxis(this.originalResponsiveMode, this.originalMainAxis)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setMainAxis(this.originalResponsiveMode, this.mainAxis)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(mainAxis: MainAxis) {
    return new SetNodeLayoutMainAxis(mainAxis)
  }
}

export class SetNodeLayoutCrossAxis implements Action {

  originalCrossAxis: CrossAxis = 'start'
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly crossAxis: CrossAxis) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalCrossAxis = found.layout[responsiveMode].crossAxis || 'start'

      found.setCrossAxis(responsiveMode!, this.crossAxis)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setCrossAxis(this.originalResponsiveMode, this.originalCrossAxis)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setCrossAxis(this.originalResponsiveMode, this.crossAxis)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(crossAxis: CrossAxis) {
    return new SetNodeLayoutCrossAxis(crossAxis)
  }
}

export class SetNodeLayoutHidden implements Action {

  originalHidden = false
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly hidden: boolean) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalHidden = found.layout[responsiveMode].hidden

      found.setHidden(responsiveMode!, this.hidden)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setHidden(this.originalResponsiveMode, this.originalHidden)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setHidden(this.originalResponsiveMode, this.hidden)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(hidden: boolean) {
    return new SetNodeLayoutHidden(hidden)
  }
}

export class SetNodeLayoutWidth implements Action {

  originalWidth?: string
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly width: string) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalWidth = found.layout[responsiveMode].width

      found.setWidth(responsiveMode!, this.width)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setWidth(this.originalResponsiveMode, this.originalWidth)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setWidth(this.originalResponsiveMode, this.width)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(width: string) {
    return new SetNodeLayoutWidth(width)
  }
}

export class SetNodeLayoutHeight implements Action {

  originalHeight?: string
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly height: string) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalHeight = found.layout[responsiveMode].height

      found.setHeight(responsiveMode!, this.height)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setHeight(this.originalResponsiveMode, this.originalHeight)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setHeight(this.originalResponsiveMode, this.height)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(height: string) {
    return new SetNodeLayoutHeight(height)
  }
}

export class SetNodeLayoutMaxWidth implements Action {

  originalMaxWidth?: string
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly maxWidth?: string) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalMaxWidth = found.layout[responsiveMode].maxWidth

      found.setMaxWidth(responsiveMode!, this.maxWidth)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setMaxWidth(this.originalResponsiveMode, this.originalMaxWidth)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setMaxWidth(this.originalResponsiveMode, this.maxWidth)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(maxWidth?: string) {
    return new SetNodeLayoutMaxWidth(maxWidth)
  }
}

export class SetNodeLayoutTransparent implements Action {

  originalTransparent?: boolean
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly transparent: boolean) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalTransparent = found.layout[responsiveMode].transparent

      found.setTransparent(responsiveMode!, this.transparent)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setTransparent(this.originalResponsiveMode, this.originalTransparent)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setTransparent(this.originalResponsiveMode, this.transparent)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(transparent: boolean) {
    return new SetNodeLayoutTransparent(transparent)
  }
}

export class SetNodeLayoutPadding implements Action {

  originalValue?: string
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly direction: Direction,
              private readonly value: string) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode
      this.originalResponsiveMode = responsiveMode

      if (this.direction === 'left')
        this.originalValue = found.layout[responsiveMode].paddingLeft
      else if (this.direction === 'top')
        this.originalValue = found.layout[responsiveMode].paddingTop
      else if (this.direction === 'right')
        this.originalValue = found.layout[responsiveMode].paddingRight
      else
        this.originalValue = found.layout[responsiveMode].paddingBottom

      found.setPadding(responsiveMode!, this.direction, this.value)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setPadding(this.originalResponsiveMode!, this.direction, this.originalValue)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setPadding(this.originalResponsiveMode, this.direction, this.value)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(direction: Direction, value: string) {
    return new SetNodeLayoutPadding(direction, value)
  }
}


export class SetNodeLayoutPosition implements Action {

  originalPosition: Position = 'relative'
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly position: Position) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode

      this.originalResponsiveMode = responsiveMode
      this.originalPosition = found.layout[responsiveMode].position || 'relative'

      found.setPosition(responsiveMode!, this.position)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setPosition(this.originalResponsiveMode, this.originalPosition)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setPosition(this.originalResponsiveMode, this.position)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(position: Position) {
    return new SetNodeLayoutPosition(position)
  }
}


export class SetNodeLayoutInset implements Action {

  originalValue?: string
  originalResponsiveMode: ResponsiveMode = 'large'
  selectedNodeId?: string

  constructor(private readonly direction: Direction,
              private readonly value: string) {
  }

  do(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      this.selectedNodeId = editorStore.editData.selectedNodeIds[0]

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      const responsiveMode = editorStore.editData.responsiveMode
      this.originalResponsiveMode = responsiveMode

      this.originalValue = found.layout[responsiveMode][this.direction]
      found.setInset(responsiveMode!, this.direction, this.value)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return
      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setInset(this.originalResponsiveMode!, this.direction, this.originalValue)
    })

    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      if (!editorStore.editData) return

      const found = editorStore.editData.findNode(this.selectedNodeId)!
      found.setInset(this.originalResponsiveMode, this.direction, this.value)
    })
    editorStore.selectNodeIdOneToChild(this.selectedNodeId!)
  }

  static of(direction: Direction, value: string) {
    return new SetNodeLayoutInset(direction, value)
  }
}

export class SelectWidget implements Action {

  selectedNodeIds?: string[]

  constructor(private readonly widgetCode: string) {
  }

  do(editorStore: EditorStore): void {
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds

    editorStore.toChild(() => {
      editorStore.editData
          ?.selectedNodeIds
          .forEach((nodeId) => editorStore.editData
              ?.findNode(nodeId)
              ?.setWidget(Widget.of(nodeId, this.widgetCode)))

      editorStore.showWidgets(false)
    })

    editorStore.emptySelectedNodeIdsToChild()
    this.selectedNodeIds?.forEach(editorStore.selectNodeIdManyToChild)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      this.selectedNodeIds
          ?.forEach((nodeId) => editorStore.editData
              ?.findNode(nodeId)
              ?.emptyWidget())
    })

    editorStore.emptySelectedNodeIdsToChild()
    this.selectedNodeIds?.forEach(editorStore.selectNodeIdManyToChild)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      this.selectedNodeIds
          ?.forEach((nodeId) => editorStore.editData
              ?.findNode(nodeId)
              ?.setWidget(Widget.of(nodeId, this.widgetCode)))

      editorStore.showWidgets(false)
    })

    editorStore.emptySelectedNodeIdsToChild()
    this.selectedNodeIds?.forEach(editorStore.selectNodeIdManyToChild)
  }

  static of(widgetCode: string) {
    return new SelectWidget(widgetCode)
  }
}

export class DeleteWidget implements Action {

  selectedNodeIds?: string[]
  deletedWidgets: Widget[] = []

  do(editorStore: EditorStore): void {
    this.selectedNodeIds = editorStore.editData?.selectedNodeIds

    editorStore.toChild(() => {
      this.selectedNodeIds
          ?.forEach((nodeId) => {
            const found = editorStore.editData?.findNode(nodeId)
            if (found) {
              this.deletedWidgets.push(found.widget!)
              found.emptyWidget()
            }
          })
    })

    editorStore.emptySelectedNodeIdsToChild()
    this.selectedNodeIds?.forEach(editorStore.selectNodeIdManyToChild)
  }

  undo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      this.selectedNodeIds
          ?.forEach((nodeId) => {
            const found = editorStore.editData?.findNode(nodeId)
            if (found) {
              const widget = this.deletedWidgets.find((deletedWidget) => deletedWidget.parentId === found.id)
              if (widget) found.setWidget(widget)
            }
          })
    })

    editorStore.emptySelectedNodeIdsToChild()
    this.selectedNodeIds?.forEach(editorStore.selectNodeIdManyToChild)
  }

  redo(editorStore: EditorStore): void {
    editorStore.toChild(() => {
      this.selectedNodeIds
          ?.forEach((nodeId) => {
            const found = editorStore.editData?.findNode(nodeId)
            if (found) {
              this.deletedWidgets.push(found.widget!)
              found.emptyWidget()
            }
          })
    })

    editorStore.emptySelectedNodeIdsToChild()
    this.selectedNodeIds?.forEach(editorStore.selectNodeIdManyToChild)
  }

  static of() {
    return new DeleteWidget()
  }
}
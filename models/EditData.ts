import {Node} from "~/models/Node"

export type EditDataRaw = {
  nodes: Node[]
  selectedNodeIds: string[]
}

export class EditData {
  id = undefined
  nodes: Node[] = []
  selectedNodeIds: string[] = []

  constructor(editDataRaw?: EditDataRaw) {
    this.selectedNodeIds = editDataRaw?.selectedNodeIds || []
    this.nodes = Node.makeNodes(editDataRaw?.nodes || [])
  }

  findNode(nodeId?: string): Node | undefined {
    let found

    const search = (nodes: Node[] = []) => {
      if (nodes.length > 0)
        nodes?.forEach((node) => {
          if (nodeId === node.id)
            found = node
          else if (node.nodes.length > 0)
            search(node.nodes)
        })
    }
    search(this.nodes)
    return found
  }

  removeNode(nodeId: string) {
    this.nodes = this.nodes.filter((node) => nodeId !== node.id)
  }

  static of(editDataRaw?: EditDataRaw) {
    return new EditData(editDataRaw)
  }
}
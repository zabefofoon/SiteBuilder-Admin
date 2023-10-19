import {generateUniqueId} from "~/utils/util"

export class Node {
  id = generateUniqueId()
  nodes: Node[] = []

  selectedResponsiveMode: ResponsiveMode = 'large'

  layout: ResponsiveNodeLayout = {
    small: {
      type: 'stack',
      direction: 'vertical',
      hidden: false
    },
    large: {
      type: 'stack',
      direction: 'vertical',
      hidden: false
    },
  }

  constructor(public parentId?: string) {
  }

  removeNode(nodeId: string) {
    this.nodes = this.nodes.filter((node) => nodeId !== node.id)
  }

  selectResponsiveMode(responsiveMode: ResponsiveMode) {
    this.selectedResponsiveMode = responsiveMode
  }

  setLayoutType(type: NodeLayoutType) {
    this.layout[this.selectedResponsiveMode].type = type

    if (type === 'grid')
      this.layout[this.selectedResponsiveMode].columns = 1

    type === 'grid'
        ? this.layout[this.selectedResponsiveMode].direction = 'vertical'
        : this.layout[this.selectedResponsiveMode].columns = 1
  }

  setLayoutStackDirection(direction: NodeDirection) {
    this.layout[this.selectedResponsiveMode].direction = direction
  }

  setLayoutGridColumns(columns: number) {
    this.layout[this.selectedResponsiveMode].columns = columns
  }

  setLayoutGap(gap: string) {
    this.layout[this.selectedResponsiveMode].gap = gap
  }

  setWidth(width: string) {
    this.layout[this.selectedResponsiveMode].width = width
  }

  setHeight(height: string) {
    this.layout[this.selectedResponsiveMode].height = height
  }

  setMaxWidth(maxWidth: string) {
    this.layout[this.selectedResponsiveMode].maxWidth = maxWidth
  }

  setMainAxis(mainAxis: MainAxis) {
    this.layout[this.selectedResponsiveMode].mainAxis = mainAxis
  }

  setCrossAxis(crossAxis: CrossAxis) {
    this.layout[this.selectedResponsiveMode].crossAxis = crossAxis
  }

  setPosition(position: Position) {
    this.layout[this.selectedResponsiveMode].position = position
  }

  setHidden(hidden: boolean) {
    this.layout[this.selectedResponsiveMode].hidden = hidden
  }

  setTransparent(transparent?: boolean) {
    this.layout[this.selectedResponsiveMode].transparent = transparent
  }

  setPadding(direction: Direction, value?: string) {
    if (direction === 'left')
      this.layout[this.selectedResponsiveMode].paddingLeft = value
    else if (direction === 'top')
      this.layout[this.selectedResponsiveMode].paddingTop = value
    else if (direction === 'right')
      this.layout[this.selectedResponsiveMode].paddingRight = value
    else if (direction === 'bottom')
      this.layout[this.selectedResponsiveMode].paddingBottom = value
  }

  setInset(direction: Direction, value?: string) {
    if (direction === 'left')
      this.layout[this.selectedResponsiveMode].left = value
    else if (direction === 'top')
      this.layout[this.selectedResponsiveMode].top = value
    else if (direction === 'right')
      this.layout[this.selectedResponsiveMode].right = value
    else if (direction === 'bottom')
      this.layout[this.selectedResponsiveMode].bottom = value
  }

  forEach(nodes: Node[], cb: (node: Node) => void) {
    const recursive = (nodes: Node[]) => {
      nodes.forEach((child) => {
        cb(child)
        recursive(child.nodes)
      })
    }

    recursive(nodes)
  }

  static makeNode(node: Node) {
    return Object.assign(new Node(), node)
  }

  static makeNodes(nodes: Node[]) {
    const recursive = (nodes: Node[]) => {
      return nodes.map((node) => {
        const created = Node.makeNode(node)
        created.nodes = recursive(node.nodes)
        return created
      })
    }
    return recursive(nodes)
  }

  static of(parentId?: string) {
    return new Node(parentId)
  }
}

export type NodeDirection = 'horizontal' | 'vertical'

export type NodeLayoutType = 'stack' | 'grid'

export type MainAxis = 'start' | 'center' | 'end' | 'between'
export type CrossAxis = 'start' | 'center' | 'end'

export type NodeLayout = {
  type?: NodeLayoutType
  direction?: NodeDirection
  columns?: number
  gap?: string
  width?: string
  height?: string
  maxWidth?: string
  mainAxis?: MainAxis
  crossAxis?: CrossAxis
  hidden: boolean
  paddingLeft?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  position?: Position
  top?: string
  left?: string
  right?: string
  bottom?: string
  transparent?: boolean
}

export type Position = 'relative' | 'absolute' | 'sticky' | 'fixed'

export type ResponsiveNodeLayout = {
  small: NodeLayout
  large: NodeLayout
}

export type ResponsiveMode = 'small' | 'large'

export type Direction = 'left' | 'top' | 'right' | 'bottom'
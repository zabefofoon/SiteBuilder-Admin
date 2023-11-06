import {generateUniqueId} from "~/utils/util"
import {Widget} from "~/models/Widget"

export class Node {
  id = generateUniqueId()
  nodes: Node[] = []
  widget?: Widget

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

  setLayoutType(responsiveMode: ResponsiveMode,
                type: NodeLayoutType) {
    this.layout[responsiveMode].type = type

    this.layout[responsiveMode].columns = type === 'grid' ? 1 : undefined
    this.layout[responsiveMode].direction = type === 'stack' ? 'vertical' : undefined
  }

  setLayoutStackDirection(responsiveMode: ResponsiveMode,
                          direction: NodeDirection) {
    this.layout[responsiveMode].direction = direction
  }

  setLayoutGridColumns(responsiveMode: ResponsiveMode,
                       columns: number) {
    this.layout[responsiveMode].columns = columns
  }

  setLayoutGap(responsiveMode: ResponsiveMode,
               gap: string) {
    this.layout[responsiveMode].gap = gap
  }

  setMainAxis(responsiveMode: ResponsiveMode,
              mainAxis: MainAxis) {
    this.layout[responsiveMode].mainAxis = mainAxis
  }

  setCrossAxis(responsiveMode: ResponsiveMode,
               crossAxis: CrossAxis) {
    this.layout[responsiveMode].crossAxis = crossAxis
  }

  setHidden(responsiveMode: ResponsiveMode,
            hidden: boolean) {
    this.layout[responsiveMode].hidden = hidden
  }

  setWidth(responsiveMode: ResponsiveMode,
           width?: string) {
    this.layout[responsiveMode].width = width
  }

  setHeight(responsiveMode: ResponsiveMode,
            height?: string) {
    this.layout[responsiveMode].height = height
  }

  setMaxWidth(responsiveMode: ResponsiveMode,
              maxWidth?: string) {
    this.layout[responsiveMode].maxWidth = maxWidth
  }

  setTransparent(responsiveMode: ResponsiveMode,
                 transparent?: boolean) {
    this.layout[responsiveMode].transparent = transparent
  }

  setPadding(responsiveMode: ResponsiveMode,
             direction: Direction,
             value?: string) {
    if (direction === 'left')
      this.layout[responsiveMode].paddingLeft = value
    else if (direction === 'top')
      this.layout[responsiveMode].paddingTop = value
    else if (direction === 'right')
      this.layout[responsiveMode].paddingRight = value
    else if (direction === 'bottom')
      this.layout[responsiveMode].paddingBottom = value
  }

  setPosition(responsiveMode: ResponsiveMode,
              position: Position) {
    this.layout[responsiveMode].position = position
  }


  setInset(responsiveMode: ResponsiveMode,
           direction: Direction,
           value?: string) {
    if (direction === 'left')
      this.layout[responsiveMode].left = value
    else if (direction === 'top')
      this.layout[responsiveMode].top = value
    else if (direction === 'right')
      this.layout[responsiveMode].right = value
    else if (direction === 'bottom')
      this.layout[responsiveMode].bottom = value
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

  setWidget(widget: Widget) {
    this.widget = widget
  }

  setWidgetData(data: unknown) {
    if (this.widget)
      this.widget.data = data
  }

  emptyWidget() {
    this.widget = undefined
    return this
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
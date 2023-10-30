export type WidgetCategory = {
  code: string
  name: string
}

export type WidgetBrief = {
  code: string
  name: string
  description: string
  thumbnail: string
  category: string
}

export class Widget {
  id = generateUniqueId()

  constructor(public readonly parentId: string,
              public readonly widgetCode: string,
              public data?: unknown) {
  }

  static of(parentId: string,
            widgetCode: string,
            data?: unknown) {
    return new Widget(parentId, widgetCode, data)
  }
}
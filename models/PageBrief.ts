export type PageBrief = {
  id: number
  name: string | null
  url: string | null
  authorized: boolean | null
  dynamic: boolean | null
  lock: boolean | null
  activate: boolean | null
}

export type Page = {
  id: number
  name: string | null
  url: string | null
  authorized: boolean | null
  dynamic: boolean | null
  lock: boolean | null
  activate: boolean | null
  seo: Partial<Seo> | null
}

export type Node = {
  id: string
  children: Node[]
}

export type Seo = {
  description: string | null
  id: number
  image: string | null
  keyword: string | null
  title: string | null
  expose: boolean
}
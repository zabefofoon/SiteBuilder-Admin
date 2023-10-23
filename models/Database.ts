export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          activate: boolean | null
          authorized: boolean | null
          detail: string | null
          dynamic: boolean | null
          id: number
          lock: boolean | null
          name: string
          seo: number | null
          url: string | null
        }
        Insert: {
          activate?: boolean | null
          authorized?: boolean | null
          detail?: string | null
          dynamic?: boolean | null
          id?: number
          lock?: boolean | null
          name?: string
          seo?: number | null
          url?: string | null
        }
        Update: {
          activate?: boolean | null
          authorized?: boolean | null
          detail?: string | null
          dynamic?: boolean | null
          id?: number
          lock?: boolean | null
          name?: string
          seo?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_seo_fkey"
            columns: ["seo"]
            referencedRelation: "seo"
            referencedColumns: ["id"]
          }
        ]
      }
      seo: {
        Row: {
          description: string | null
          expose: boolean | null
          id: number
          image: string | null
          keyword: string | null
          title: string | null
        }
        Insert: {
          description?: string | null
          expose?: boolean | null
          id?: number
          image?: string | null
          keyword?: string | null
          title?: string | null
        }
        Update: {
          description?: string | null
          expose?: boolean | null
          id?: number
          image?: string | null
          keyword?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

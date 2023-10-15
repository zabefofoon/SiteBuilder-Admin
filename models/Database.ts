// npx supabase gen types typescript --project-id Reference ID 로 코드 생성

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
          dynamic: boolean | null
          id: number
          lock: boolean | null
          name: string
          url: string | null
        }
        Insert: {
          activate?: boolean | null
          authorized?: boolean | null
          dynamic?: boolean | null
          id?: number
          lock?: boolean | null
          name?: string
          url?: string | null
        }
        Update: {
          activate?: boolean | null
          authorized?: boolean | null
          dynamic?: boolean | null
          id?: number
          lock?: boolean | null
          name?: string
          url?: string | null
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

import {Database} from "~/models/Database"
import {Page} from "~/models/PageBrief"

export default {
  getPage: async (pageId: number) => {
    const supabaseClient = useSupabaseClient<Database>()

    const {data} = await supabaseClient
        .from('pages')
        .select('id,name,url,authorized,dynamic,lock,activate,seo(*)')
        .eq('id', pageId)
        .limit(1)
        .single()

    return data
  },

  getPageDetail: async (pageId: number) => {
    const supabaseClient = useSupabaseClient<Database>()

    const {data} = await supabaseClient
        .from('pages')
        .select('id,detail')
        .eq('id', pageId)
        .limit(1)
        .single()

    return data
  },

  setPageDetail: async (pageId: number, detail: string) => {
    const supabaseClient = useSupabaseClient<Database>()

    await supabaseClient
        .from('pages')
        .update({detail})
        .eq('id', pageId)
  },

  patchPageBooleanField: async (field: 'authorized' | 'dynamic' | 'lock' | 'activate',
                                value: boolean,
                                pageId: number,
                                url?: string | null) => {
    const supabaseClient = useSupabaseClient<Database>()

    await supabaseClient
        .from('pages')
        .update({
          [field]: value,
          url
        })
        .eq('id', pageId)
  },

  patchPageStringField: async (field: 'name' | 'url',
                               value: string,
                               pageId: number,
                               dynamic?: boolean | null) => {
    const supabaseClient = useSupabaseClient<Database>()

    await supabaseClient
        .from('pages')
        .update({
          [field]: value,
          dynamic
        })
        .eq('id', pageId)

  },

  getPages: async () => {
    const supabaseClient = useSupabaseClient<Database>()

    const {data} = await supabaseClient
        .from('pages')
        .select('id, name, url, authorized, dynamic, lock, activate')

    return data
  },

  addPage: async () => {
    const supabaseClient = useSupabaseClient<Database>()

    const {data: seoData} = await supabaseClient
        .from('seo')
        .insert({
          expose: true,
          title: null,
          description: null,
          keyword: null,
        })
        .select('id')

    const {data} = await supabaseClient
        .from('pages')
        .insert({
          name: 'Some page',
          url: '/somePage',
          authorized: false,
          dynamic: false,
          lock: false,
          activate: false,
          seo: seoData?.[0].id
        })
        .select('id, name, url, authorized, dynamic, lock, activate')
        .limit(1)
        .single()

    if (data) return data
  },

  savePage: async (page: Page) => {
    const supabaseClient = useSupabaseClient<Database>()

    const {data} = await supabaseClient
        .from('seo')
        .upsert([{
          ...page.seo
        }])
    console.log(data)

    await supabaseClient
        .from('pages')
        .upsert([
          {
            id: page.id,
            name: page.name || '',
            url: page.url,
            authorized: page.authorized,
            dynamic: page.dynamic,
            lock: page.lock,
            activate: page.activate,
          }
        ])
  }
}
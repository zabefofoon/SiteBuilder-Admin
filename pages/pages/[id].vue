<template>
  <NuxtLayout name="default">
    <div class="flex gap-4 h-full">
      <div class="flex flex-col gap-2">
        <button class="w-fit | p-2 | flex | rounded-lg | hover:text-white | hover:bg-black | border"
                title="Config page"
                :class="isConfig ? 'bg-black text-white' : 'bg-white text-black'"
                @click="router.push({query: {selectedTab: 'config'}});">
          <i class="icon icon-config | text-2xl"></i>
        </button>
        <button class="w-fit | p-2 | flex | rounded-lg | hover:text-white | hover:bg-black | border"
                title="Draw page"
                :class="isEditor ? 'bg-black text-white' : 'bg-white text-black'"
                @click="router.push({query: {selectedTab: 'editor'}});">
          <i class="icon icon-draw | text-2xl"></i>
        </button>
      </div>
      <ConfigPage v-if="page && isConfig"
                  :page="page"/>
      <Editor v-if="page && isEditor"
              :page="page"/>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Editor from "~/components/Editor.vue"
import ConfigPage from "~/components/ConfigPage.vue"
import {Page} from "~/models/PageBrief"
import {Database} from "~/models/Database"
import {computed, useRoute, useRouter} from "#imports"

const route = useRoute()
const router = useRouter()


const page = ref<Page>()

const supabaseClient = useSupabaseClient<Database>()

const isConfig = computed(() => route.query.selectedTab === 'config'
    || !route.query.selectedTab)

const isEditor = computed(() => route.query.selectedTab === 'editor')

const loadPage = async () => {
  page.value = {
    id: 0,
    name: 'name',
    url: '/',
    authorized: false,
    dynamic: false,
    lock: false,
    activate: false
  }

  /*const {data, error} = await supabaseClient
      .from('pages')
      .select('*')
      .eq('id', Number(route.params.id))
      .limit(1)
      .single()

  if (error) console.error(error)

  if (data) page.value = data*/
}

loadPage()
</script>

<style scoped>

</style>
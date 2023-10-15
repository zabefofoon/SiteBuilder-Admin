<template>
  <NuxtLayout name="default">
    <div class="flex gap-4 h-full">
      <div class="flex flex-col gap-2">
        <button class="w-fit | p-2 | flex | rounded-lg | hover:text-white | hover:bg-black | border"
                title="Config page"
                :class="selectedTab === 'config' ? 'bg-black text-white' : 'bg-white text-black'"
                @click="selectTab('config')">
          <i class="icon icon-config | text-2xl"></i>
        </button>
        <button class="w-fit | p-2 | flex | rounded-lg | hover:text-white | hover:bg-black | border"
                title="Draw page"
                :class="selectedTab === 'editor' ? 'bg-black text-white' : 'bg-white text-black'"
                @click="selectTab('editor')">
          <i class="icon icon-draw | text-2xl"></i>
        </button>
      </div>
      <ConfigPage v-if="page && selectedTab === 'config'"
                  :page="page"/>
      <Editor v-if="page && selectedTab === 'editor'"
              :page="page"/>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Editor from "~/components/Editor.vue"
import ConfigPage from "~/components/ConfigPage.vue"
import {Page} from "~/model/PageBrief"
import {Database} from "~/model/Database"
import {useRoute} from "#imports"

const route = useRoute()

const selectedTab = ref<'config' | 'editor'>('config')
const selectTab = (value: 'config' | 'editor') => selectedTab.value = value

const page = ref<Page>()

const supabaseClient = useSupabaseClient<Database>()

const loadPage = async () => {
  const {data, error} = await supabaseClient
      .from('pages')
      .select('*')
      .eq('id', Number(route.params.id))
      .limit(1)
      .single()

  if (error) console.error(error)

  if (data) page.value = data
}

loadPage()
</script>

<style scoped>

</style>
<template>
  <div class="flex flex-col gap-4 | w-full | bg-white | p-4 | border">
    <div class="flex">
      <h2 class="flex items-center gap-1 | font-bold">
        <NuxtLink to="/pages">
          <span>Pages</span>
        </NuxtLink>
        <i class="icon icon-chevron-right | text-xl"></i>
        <span>{{ dataToSave.name }}</span>
      </h2>
      <button class="ml-auto py-1 px-8 | uppercase text-white text-sm | bg-black rounded-full"
              @click="savePage">
        Save
      </button>
    </div>

    <div class="h-full | flex flex-col gap-4 | p-4 | text-sm">
      <div class="flex">
        <h4 class="w-40 | uppercase">Name</h4>
        <div>
          <input class="w-80 | py-1 px-2 | border-b"
                 placeholder="name"
                 :value="dataToSave.name"
                 @input="setDataToSave('name', $event.target.value)"/>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Url</h4>
        <div>
          <input class="w-80 | py-1 px-2 | border-b"
                 placeholder="/url"
                 :value="dataToSave.url"
                 @input="setDataToSave('url', $event.target.value)"/>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Authorized</h4>
        <div>
          <button :disabled="dataToSave.lock"
                  class="flex | px-2 py-1 | rounded-full border | text-xs"
                  :class="dataToSave.authorized ? 'bg-black text-white' : ''"
                  @click="setDataToSave('authorized', !dataToSave.authorized)">
            <span v-if="dataToSave.authorized">On</span>
            <span v-else>Off</span>
          </button>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Dynamic</h4>
        <div>
          <button :disabled="page.lock"
                  class="flex | px-2 py-1 | rounded-full border | text-xs"
                  :class="dataToSave.dynamic ? 'bg-black text-white' : ''"
                  @click="setDataToSave('dynamic', !dataToSave.dynamic)">
            <span v-if="dataToSave.dynamic">On</span>
            <span v-else>Off</span>
          </button>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Activate</h4>
        <div>
          <button :disabled="page.lock"
                  class="flex | px-2 py-1 | rounded-full border | text-xs"
                  :class="dataToSave.activate ? 'bg-black text-white' : ''"
                  @click="setDataToSave('activate', !dataToSave.activate)">
            <span v-if="dataToSave.activate">On</span>
            <span v-else>Off</span>
          </button>
        </div>
      </div>
      <hr/>
      <div class="flex">
        <h4 class="w-40 | uppercase">Expose</h4>
        <div>
          <button :disabled="dataToSave.lock"
                  class="flex | px-2 py-1 | rounded-full border | text-xs"
                  :class="dataToSave.seo?.expose ? 'bg-black text-white' : ''"
                  @click="setSeoDataToSave('expose', !dataToSave.seo?.expose)">
            <span v-if="true">On</span>
            <span v-else>Off</span>
          </button>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Title</h4>
        <div>
          <input class="w-80 | py-1 px-2 | border-b"
                 placeholder="title"
                 :value="dataToSave.seo?.title"
                 @input="setSeoDataToSave('title', $event.target.value)"/>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Description</h4>
        <div>
          <input class="w-80 | py-1 px-2 | border-b"
                 placeholder="description"
                 :value="dataToSave.seo?.description"
                 @input="setSeoDataToSave('description', $event.target.value)"/>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Keyword</h4>
        <div>
          <input class="w-80 | py-1 px-2 | border-b"
                 placeholder="keyword"
                 :value="dataToSave.seo?.keyword"
                 @input="setSeoDataToSave('keyword', $event.target.value)"/>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Image</h4>
        <div>
          <div class="w-80 h-40 | border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Page, Seo} from "~/models/PageBrief"
import pageApi from "~/api/page.api"

const props = defineProps<{
  page: Page
}>()

const dataToSave = ref<Page>(structuredClone(toRaw(props.page)))

const setDataToSave = <T extends keyof Page>(field: T,
                                             value: Page[T]) => {
  dataToSave.value[field] = value

  dataToSave.value.dynamic = field === 'url' && typeof value === 'string' && dataToSave.value.url
      ? value?.includes('/:id')
      : dataToSave.value.dynamic

  dataToSave.value.url = field === 'dynamic' && dataToSave.value.url
      ? value
          ? dataToSave.value.url.endsWith('/')
              ? dataToSave.value.url + ':id'
              : dataToSave.value.url + '/:id'
          : dataToSave.value.url.includes('/:id')
              ? dataToSave.value.url.replace('/:id', '')
              : dataToSave.value.url.replace(':id', '')
      : dataToSave.value.url
}

const setSeoDataToSave = <T extends keyof Seo>(field: T,
                                               value: Seo[T]) => {
  dataToSave.value.seo
      ? dataToSave.value.seo[field] = value
      : dataToSave.value.seo = {[field]: value}
}

const savePage = async () => {
  await pageApi.savePage(toRaw(dataToSave.value))
  alert('Saved')
}
</script>

<style scoped>

</style>
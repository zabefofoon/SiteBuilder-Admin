<template>
  <NuxtLayout name="default">
    <div class="h-full | bg-white border">
      <div class="flex flex-col gap-4 | p-4">
        <h2 class="font-bold">Pages</h2>
        <div class="overflow-x-auto">
          <table class="w-full | border-collapse">
            <thead>
            <tr>
              <th class="w-52 | px-6 py-3 | border border-l-0 border-r-0 | align-middle uppercase whitespace-nowrap font-semibold text-xs text-left">
              </th>
              <th v-for="title in titles"
                  :key="title"
                  class="px-6 py-3 | border border-l-0 border-r-0 | align-middle uppercase whitespace-nowrap font-semibold text-xs text-left">
                {{ title }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(page, index) in pages"
                :key="index"
                class="table-row | border-b border-gray-100 | hover:bg-gray-50 | cursor-pointer"
                @click="$router.push(`/pages/${page.id}`)">
              <th class="buttons | flex gap-1 | py-4 px-6 | border-t-0 border-l-0 border-r-0 | text-xs text-left">
                <button class="flex | border | p-1 | bg-white hover:bg-black hover:text-white | rounded-full"
                        title="Go to page"
                        @click.stop>
                  <i class="icon icon-go | text-lg"></i>
                </button>
                <button v-if="!page.lock"
                        class="flex | border | p-1 | bg-white hover:bg-black hover:text-white | rounded-full"
                        title="Delete page"
                        @click.stop="deletePage(page.id)">
                  <i class="icon icon-delete | text-lg"></i>
                </button>
                <button class="flex | border | p-1 | bg-white hover:bg-black hover:text-white | rounded-full"
                        title="Move to top"
                        @click.stop>
                  <i class="icon icon-up | text-lg"></i>
                </button>
                <button class="flex | border | p-1 | bg-white hover:bg-black hover:text-white | rounded-full"
                        title="Move to down"
                        @click.stop>
                  <i class="icon icon-down | text-lg"></i>
                </button>
              </th>
              <td v-for="key in getEditablePageValues(page)"
                  :key="key"
                  class="py-4 px-6 | text-xs whitespace-nowrap text-left">
                <button v-if="typeof page[key] === 'boolean'"
                        :disabled="page.lock"
                        class="flex px-2 py-1 | rounded-full border"
                        :class="page[key] ? 'bg-black text-white' : ''"
                        @click.stop="toggleValue(page, index, key, !page[key])">
                  <span v-if="page[key]">On</span>
                  <span v-else>Off</span>
                </button>
                <template v-else>
                  <input v-if="!page.lock"
                         class="w-full | p-1 | bg-transparent | border-b border-dashed"
                         :value="page[key]"
                         @change="setPageField(page, index, key, $event.target.value)"
                         @click.stop/>
                  <span v-else>{{ page[key] }}</span>
                </template>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <button class="mx-auto px-8 py-2 | w-fit | text-sm hover:text-white | border | rounded-full hover:bg-black"
                @click="addPage">
          Add Page
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type {PageBrief} from "~/models/PageBrief"
import {onMounted} from "#imports"
import {Database} from "~/models/Database"

const supabaseClient = useSupabaseClient<Database>()

const titles = ['Name', 'Url', 'Authorized', 'Dynamic', 'Activate']

const pages = ref<PageBrief[]>([])
const setPages = (value: PageBrief[]) => pages.value = value

const getEditablePageValues = (page: PageBrief) => Object
    .keys(page)
    .filter((key) => !['lock', 'id'].includes(key))

const toggleValue = async (page: PageBrief,
                           index: number,
                           field: string,
                           value: boolean) => {
  if (!['authorized', 'dynamic', 'lock', 'activate'].includes(field)) return

  const _field = <'authorized' | 'dynamic' | 'lock' | 'activate'>field
  const url = _field === 'dynamic' && page.url
      ? value
          ? page.url.endsWith('/')
              ? page.url + ':id'
              : page.url + '/:id'
          : page.url.includes('/:id')
              ? page.url.replace('/:id', '')
              : page.url.replace(':id', '')
      : page.url

  const {error} = await supabaseClient
      .from('pages')
      .update({
        [_field]: value,
        url
      })
      .eq('id', page.id)

  if (error) {
    console.error(error)
    return
  }

  pages.value[index].url = url
  pages.value[index][_field] = !pages.value[index][_field]
}

const setPageField = async (page: PageBrief,
                            index: number,
                            field: string,
                            value: string) => {
  if (!['name', 'url'].includes(field)) return

  const _field = <'name' | 'url'>field

  const dynamic = _field === 'url' && page.url
      ? value.includes('/:id')
      : page.dynamic

  const {error} = await supabaseClient
      .from('pages')
      .update({
        [_field]: value,
        dynamic
      })
      .eq('id', page.id)

  if (error) {
    console.error(error)
    return
  }

  pages.value[index][_field] = value
  pages.value[index].dynamic = dynamic
}

const loadPages = async () => {
  const {data, error} = await supabaseClient
      .from('pages')
      .select('id, name, url, authorized, dynamic, lock, activate')

  if (error) {
    console.error(error)
    return
  }

  setPages(data)
}

const addPage = async () => {
  const {data, error} = await supabaseClient
      .from('pages')
      .insert({
        name: 'Some page',
        url: '/somePage',
        authorized: false,
        dynamic: false,
        lock: false,
        activate: false
      })
      .select('id, name, url, authorized, dynamic, lock, activate')


  if (error) {
    console.error(error)
    return
  }

  pages.value.push(data[0])
}

const deletePage = async (id: number) => {
  const {error} = await supabaseClient
      .from('pages')
      .delete()
      .match({id})

  if (error) {
    console.error(error)
    return
  }

  const foundIndex = pages.value.findIndex((page) => page.id === id)
  pages.value.splice(foundIndex, 1)
}

loadPages()
</script>
<style scoped lang="scss">
.table-row {

  .buttons {
    visibility: hidden;
  }

  &:hover {
    .buttons {
      visibility: visible;
    }
  }

  &:has(:focus) {
    background: rgb(249 250 251);

    .buttons {
      visibility: visible;
    }
  }
}
</style>


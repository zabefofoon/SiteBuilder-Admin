<template>
  <div class="flex flex-col gap-4 | w-full | bg-white | p-4 | border">
    <div class="flex">
      <h2 class="flex items-center gap-1 | font-bold">
        <NuxtLink to="/pages">
          <span>Pages</span>
        </NuxtLink>
        <i class="icon icon-chevron-right | text-xl"></i>
        <span>{{ page.name }}</span>
      </h2>
      <button class="ml-auto py-1 px-8 | uppercase text-white text-sm | bg-black rounded-full">
        Save
      </button>
    </div>

    <div class="h-full | flex flex-col gap-4 | p-4 | text-sm">
      <div class="flex">
        <h4 class="w-40 | uppercase">Name</h4>
        <div>
          <input class="w-80 | py-1 px-2 | border-b"
                 :value="page.name"
                 placeholder="name"/>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Url</h4>
        <div>
          <input class="w-80 | py-1 px-2 | border-b"
                 :value="page.url"
                 placeholder="/url"/>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Authorized</h4>
        <div>
          <button :disabled="page.lock"
                  class="flex | px-2 py-1 | rounded-full border | text-xs"
                  :class="page.authorized ? 'bg-black text-white' : ''">
            <span v-if="page.authorized">On</span>
            <span v-else>Off</span>
          </button>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Dynamic</h4>
        <div>
          <button :disabled="page.lock"
                  class="flex | px-2 py-1 | rounded-full border | text-xs"
                  :class="page.dynamic ? 'bg-black text-white' : ''">
            <span v-if="page.dynamic">On</span>
            <span v-else>Off</span>
          </button>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Activate</h4>
        <div>
          <button :disabled="page.lock"
                  class="flex | px-2 py-1 | rounded-full border | text-xs"
                  :class="page.activate ? 'bg-black text-white' : ''">
            <span v-if="page.activate">On</span>
            <span v-else>Off</span>
          </button>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Language</h4>
        <div>
          <select class="border-b">
            <option>en</option>
            <option>ko</option>
            <option>ja</option>
          </select>
        </div>
      </div>
      <hr/>
      <div class="flex">
        <h4 class="w-40 | uppercase">Expose</h4>
        <div>
          <button :disabled="page.lock"
                  class="flex | px-2 py-1 | rounded-full border | text-xs"
                  :class="true ? 'bg-black text-white' : ''">
            <span v-if="true">On</span>
            <span v-else>Off</span>
          </button>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Title</h4>
        <div>
          <input class="w-80 | py-1 px-2 | border-b"
                 placeholder="title"/>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Description</h4>
        <div>
          <input class="w-80 | py-1 px-2 | border-b"
                 placeholder="description"/>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Keyword</h4>
        <div>
          <input class="w-80 | py-1 px-2 | border-b"
                 placeholder="keyword"/>
        </div>
      </div>
      <div class="flex">
        <h4 class="w-40 | uppercase">Image</h4>
        <div>
          <div class="w-80 h-40 | border"></div>
        </div>
      </div>
    </div>
    <div class="mt-auto">

    </div>
  </div>
</template>

<script setup lang="ts">
import {Page} from "~/models/PageBrief"

const props = defineProps<{
  page: Page
}>()
</script>

<style scoped>

</style>
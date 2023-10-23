<template>
  <div class="flex items-center | w-full | py-1.5 px-2 | bg-white | border">
    <button class="flex | mr-1"
            title="Back"
            @click="$router.back()">
      <i class="icon icon-chevron-left | text-2xl"></i>
    </button>
    <div class="flex gap-1">
      <button class="flex | border rounded-md | p-0.5"
              :class="editorStore.editData?.isShowSpacing ? 'bg-black text-white' : ''"
              title="Show Spacing"
              @click="editorStore.showSpacing(!editorStore.editData?.isShowSpacing)">
        <i class="icon icon-spacing | text-xl"></i>
      </button>
      <button class="flex | border rounded-md | p-0.5"
              :class="editorStore.editData?.isShowOutline ? 'bg-black text-white' : ''"
              title="Show Outline"
              @click="editorStore.showOutline(!editorStore.editData?.isShowOutline)">
        <i class="icon icon-outline | text-xl"></i>
      </button>
      <button class="flex | border rounded-md | p-0.5"
              :class="editorStore.editData?.isShowHiddenElement ? 'bg-black text-white' : ''"
              title="Show Hidden Element"
              @click="editorStore.showHiddenElement(!editorStore.editData?.isShowHiddenElement)">
        <i class="icon icon-hidden | text-xl"></i>
      </button>
    </div>
    <button class="ml-auto px-4 py-1 | text-xs text-white uppercase | bg-black rounded-md"
            title="Save Page"
            @click="editorStore.saveEditData(page.id)">
      save
    </button>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"
import {Page} from "~/models/PageBrief"

defineProps<{
  page: Page
}>()

const editorStore = useEditorStore()
</script>

<style scoped>

</style>
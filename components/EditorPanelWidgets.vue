<template>
  <div class="w-full h-full overflow-auto | bg-white | absolute top-0 right-0 transition-all"
       :class="editorStore.isShowWidgets ? 'translate-x-0' : 'translate-x-full'">
    <div class="sticky top-0 left-0 | flex gap-2 items-center | px-2 py-1 | bg-gray-500 | text-white">
      <button class="flex"
              @click="editorStore.showWidgets(false)">
        <i class="icon icon-close"></i>
      </button>
      <h4 class="w-full | text-xs">Widgets</h4>
    </div>
    <div class="grid grid-cols-2 gap-2 | py-2 px-2">
      <div v-for="index in 100"
           :key="index"
           class="border | w-full">
        <div class="w-full aspect-square | bg-gray-100"></div>
        <div class="p-2">
          <p class="text-xs">Widget</p>
          <p class="text-xs">Description</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"

const editorStore = useEditorStore()

watch(() => editorStore.editData?.selectedNodeIds,
    () => editorStore.showWidgets(false))
</script>

<style lang="scss" scoped>

</style>
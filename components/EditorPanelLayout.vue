<template>
  <div v-if="editorStore.editData?.selectedNodeIds.length === 1">
    <h4 class="px-2 py-1 | bg-gray-500 | text-white text-xs">Layout</h4>
    <div>
      <div class="flex">
        <button class="w-full | py-1 | text-xs border hover:border-gray-500 hover:text-gray-500"
                :class="editorStore.screenSize === 'small' ? ['font-bold border-black'] : ['text-gray-300']"
                @click="editorStore.changeResponsiveMode('small')">
          0px~
        </button>
        <button class="w-full | py-1 | text-xs border hover:border-gray-500 hover:text-gray-500"
                :class="editorStore.screenSize === 'large' ? ['font-bold border-black'] : ['text-gray-300']"
                @click="editorStore.changeResponsiveMode('large')">
          768px~
        </button>
      </div>
    </div>
    <ul>
      <li class="flex items-center gap-2 | px-3 py-1">
        <label for="type" class="w-20 | text-xs">type</label>
        <select id="type"
                class="w-full | text-sm border border-white hover:border-gray-500"
                :value="type"
                @change="editorStore.setNodeLayoutType($event.target.value)">
          <option>stack</option>
          <option>grid</option>
        </select>
      </li>
      <hr/>
      <li v-if="type === 'stack'"
          class="flex items-center gap-2 | px-3 py-1">
        <label for="direction"
               class="w-20 | text-xs">direction</label>
        <select id="direction"
                class="w-full | text-sm border border-white hover:border-gray-500"
                :value="direction"
                @change="editorStore.setNodeLayoutDirection($event.target.value)">
          <option value="horizontal"
                  label="horizontal"></option>
          <option value="vertical"
                  label="vertical"></option>
          <option v-show="false"
                  :value="undefined"
                  label="mix"></option>
        </select>
      </li>
      <li v-if="type === 'grid'"
          class="flex items-center gap-2 | px-3 py-1">
        <label for="columns"
               class="w-20 | text-xs">columns</label>
        <input id="columns"
               min="1"
               max="12"
               class="px-1 | w-full | text-sm border border-white hover:border-gray-500"
               type="number"
               placeholder="length"
               :value="columns"
               @keydown.stop
               @change="editorStore.setNodesLayoutColumns($event.target.value)"/>
      </li>
      <hr/>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"
import {computed} from "#imports"

const editorStore = useEditorStore()

const type = computed(() => {
  if (!editorStore.editData) return 'stack'
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].type || 'stack'
})

const direction = computed(() => {
  if (!editorStore.editData) return 'vertical'
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].direction || 'vertical'
})

const columns = computed(() => {
  if (!editorStore.editData) return 1
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].columns || 1
})
</script>

<style scoped lang="scss">

</style>
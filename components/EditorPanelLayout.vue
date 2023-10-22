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
      <li class="flex items-center gap-2 | px-3 py-1">
        <label for="gap"
               class="w-20 | text-xs">gap</label>
        <input id="gap"
               class="px-1 | w-full | text-sm border border-white hover:border-gray-500"
               placeholder="px, %, vw"
               :value="gap"
               @keydown.stop
               @change="editorStore.setNodesLayoutGap($event.target.value)"/>
      </li>
      <li class="flex items-center gap-2 | px-3 py-1">
        <label for="mainAxis"
               class="w-20 | text-xs">mainAxis</label>
        <select id="mainAxis"
                class="w-full | text-sm border border-white hover:border-gray-500"
                :value="mainAxis"
                @change="editorStore.setNodesLayoutMainAxis($event.target.value)">
          <option>start</option>
          <option>center</option>
          <option>end</option>
          <option>between</option>
          <option v-show="false" :value="undefined" label="start"></option>
        </select>
      </li>
      <li class="flex items-center gap-2 | px-3 py-1">
        <label for="crossAxis"
               class="w-20 | text-xs">crossAxis</label>
        <select id="crossAxis"
                class="w-full | text-sm border border-white hover:border-gray-500"
                :value="crossAxis"
                @change="editorStore.setNodesLayoutCrossAxis($event.target.value)">
          <option>start</option>
          <option>center</option>
          <option>end</option>
          <option v-show="false" :value="undefined" label="start"></option>
        </select>
      </li>
      <hr/>
      <li class="flex items-center gap-2 | px-3 py-1">
        <label for="crossAxis"
               class="w-20 | text-xs">hidden</label>
        <button class="w-full | px-1 | text-sm border hover:border-gray-500"
                :class="isHidden ? 'text-gray-500 border-gray-500' : 'text-gray-200 border-gray-200'"
                @click="editorStore.setNodesLayoutHidden(!isHidden)">
          hidden
        </button>
      </li>
      <hr/>
      <li class="flex items-center gap-2 | px-3 py-1">
        <label for="width"
               class="w-20 | text-xs">width</label>
        <input id="width"
               class="px-1 | w-full | text-sm border border-white hover:border-gray-500"
               placeholder="px, %, vw"
               :value="width"
               @keydown.stop
               @change="editorStore.setNodesLayoutWidth($event.target.value)"/>
      </li>
      <li class="flex items-center gap-2 | px-3 py-1">
        <label for="height"
               class="w-20 | text-xs">height</label>
        <input id="height"
               class="px-1 | w-full | text-sm border border-white hover:border-gray-500"
               placeholder="px, %, vw"
               :value="height"
               @keydown.stop
               @change="editorStore.setNodesLayoutHeight($event.target.value)"/>
      </li>
      <li class="flex items-center gap-2 | px-3 py-1">
        <label for="max-width"
               class="w-20 | text-xs">maxWidth</label>
        <input id="max-width"
               class="px-1 | w-full | text-sm border border-white hover:border-gray-500"
               placeholder="px, %, vw"
               :value="maxWidth"
               @keydown.stop
               @change="editorStore.setNodesLayoutMaxWidth($event.target.value)"/>
      </li>
      <hr/>
      <li class="flex items-start gap-2 | px-3 py-1">
        <label for="padding-left"
               class="w-20 | text-xs">padding</label>
        <div class="w-full">
          <div class="flex gap-1">
            <div class="flex gap-2 | w-1/2">
              <label for="padding-left"><i class="icon icon-padding-left"></i></label>
              <input id="padding-left"
                     class="w-full | text-sm border border-white hover:border-gray-500"
                     placeholder="px"
                     :value="paddingLeft"
                     @change="editorStore.setNodesLayoutPadding('left', $event.target.value)"/>
            </div>
            <div class="flex gap-2 | w-1/2">
              <label for="padding-right"><i class="icon icon-padding-right"></i></label>
              <input id="padding-right"
                     class="w-full | text-sm border border-white hover:border-gray-500"
                     placeholder="px"
                     :value="paddingRight"
                     @change="editorStore.setNodesLayoutPadding('right', $event.target.value)"/>
            </div>
          </div>
          <div class="flex gap-1">
            <div class="flex gap-2 | w-1/2">
              <label for="padding-top"><i class="icon icon-padding-top"></i></label>
              <input id="padding-top"
                     class="w-full | text-sm border border-white hover:border-gray-500"
                     placeholder="px"
                     :value="paddingTop"
                     @change="editorStore.setNodesLayoutPadding('top', $event.target.value)"/>
            </div>
            <div class="flex gap-2 | w-1/2">
              <label for="padding-bottom"><i class="icon icon-padding-bottom"></i></label>
              <input id="padding-bottom"
                     class="w-full | text-sm border border-white hover:border-gray-500"
                     placeholder="px"
                     :value="paddingBottom"
                     @change="editorStore.setNodesLayoutPadding('bottom', $event.target.value)"/>
            </div>
          </div>
        </div>
      </li>
      <hr/>
      <li class="flex items-center gap-2 | px-3 py-1">
        <label for="crossAxis"
               class="w-20 | text-xs">transparent</label>
        <button class="w-full | px-1 | text-sm border hover:border-gray-500"
                :class="transparent ? 'text-slate-500 border-slate-500' : 'text-slate-200 border-slate-200'"
                @click="editorStore.setNodesTransparent(!transparent)">
          transparent
        </button>
      </li>
      <hr/>
      <li class="flex items-center gap-2 | px-3 py-1">
        <label for="position"
               class="w-20 | text-xs">position</label>
        <select id="position"
                class="w-full | text-sm border border-white hover:border-gray-500"
                :value="position"
                @change="editorStore.setNodesLayoutPosition($event.target.value)">
          <option>relative</option>
          <option>absolute</option>
          <option>sticky</option>
          <option>fixed</option>
          <option v-show="false" :value="undefined" label="relative"></option>
        </select>
      </li>
      <li class="flex items-start gap-2 | px-3 py-1">
        <label for="inset"
               class="w-20 | text-xs">inset</label>
        <div class="w-full">
          <div class="flex gap-1">
            <div class="flex gap-2 | w-1/2">
              <label for="left"><i class="icon icon-padding-left"></i></label>
              <input id="left"
                     class="w-full | text-sm border border-white hover:border-gray-500"
                     placeholder="px"
                     :value="left"
                     @change="editorStore.setNodesLayoutInset('left', $event.target.value)"/>
            </div>
            <div class="flex gap-2 | w-1/2">
              <label for="right"><i class="icon icon-padding-right"></i></label>
              <input id="right"
                     class="w-full | text-sm border border-white hover:border-gray-500"
                     placeholder="px"
                     :value="right"
                     @change="editorStore.setNodesLayoutInset('right', $event.target.value)"/>
            </div>
          </div>
          <div class="flex gap-1">
            <div class="flex gap-2 | w-1/2">
              <label for="top"><i class="icon icon-padding-top"></i></label>
              <input id="top"
                     class="w-full | text-sm border border-white hover:border-gray-500"
                     placeholder="px"
                     :value="top"
                     @change="editorStore.setNodesLayoutInset('top', $event.target.value)"/>
            </div>
            <div class="flex gap-2 | w-1/2">
              <label for="bottom"><i class="icon icon-padding-bottom"></i></label>
              <input id="bottom"
                     class="w-full | text-sm border border-white hover:border-gray-500"
                     placeholder="px"
                     :value="bottom"
                     @change="editorStore.setNodesLayoutInset('bottom', $event.target.value)"/>
            </div>
          </div>
        </div>
      </li>
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

const gap = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].gap
})

const mainAxis = computed(() => {
  if (!editorStore.editData) return 'start'
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].mainAxis || 'start'
})

const crossAxis = computed(() => {
  if (!editorStore.editData) return 'start'
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].crossAxis || 'start'
})

const isHidden = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].hidden
})

const width = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].width
})

const height = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].height
})

const maxWidth = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].maxWidth
})

const transparent = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].transparent
})

const paddingLeft = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].paddingLeft
})

const paddingTop = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].paddingTop
})

const paddingRight = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].paddingRight
})

const paddingBottom = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].paddingBottom
})

const position = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].position
})

const left = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].left
})

const top = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].top
})

const right = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].right
})

const bottom = computed(() => {
  if (!editorStore.editData) return
  return editorStore.editData
      ?.findNode(editorStore.editData.selectedNodeIds[0])
      ?.layout[editorStore.editData.responsiveMode].bottom
})
</script>

<style scoped lang="scss">

</style>
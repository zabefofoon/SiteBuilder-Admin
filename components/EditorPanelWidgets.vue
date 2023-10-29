<template>
  <div class="w-full h-full overflow-auto | bg-gray-50 | absolute top-0 right-0 transition-all"
       :class="editorStore.isShowWidgets ? 'translate-x-0' : 'translate-x-full'">
    <div class="sticky top-0 left-0 | flex gap-2 items-center | px-2 py-1 | bg-gray-500 | text-white">
      <button class="flex"
              @click="editorStore.showWidgets(false)">
        <i class="icon icon-close"></i>
      </button>
      <h4 class="w-full | text-xs">Widgets</h4>
    </div>
    <div class="flex flex-col gap-4">
      <div v-for="widgetCategory in editorStore.widgetCategories"
           :key=widgetCategory.code>
        <div v-if="getWidgetBrief(widgetCategory).length > 0"
             class="bg-white border-b">
          <h3 class="text-sm | p-1 | bg-white | border-y">{{ widgetCategory.name }}</h3>
          <div class="grid grid-cols-2 gap-2 | py-2 px-2 pb-6">
            <figure v-for="widgetBrief in getWidgetBrief(widgetCategory)"
                    :key="widgetBrief.name"
                    class="border | w-full | cursor-pointer | bg-white"
                    :title="widgetBrief.description"
                    @click="editorStore.selectWidget(widgetBrief.code)">
              <div class="w-full aspect-square | border-b | bg-gray-100">
                {{ widgetBrief.thumbnail }}
              </div>
              <div class="flex flex-col gap-1 | p-2">
                <p class="text-xs">{{ widgetBrief.name }}</p>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"
import {WidgetCategory} from "~/models/Widget"

const editorStore = useEditorStore()

const getWidgetBrief = (widgetCategory: WidgetCategory) => editorStore.widgetBriefs
    .filter((widgetBrief) => widgetBrief.category === widgetCategory.code)
</script>

<style lang="scss" scoped>

</style>
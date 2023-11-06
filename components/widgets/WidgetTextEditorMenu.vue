<template>
  <div ref="element"
       tabindex="0"
       class="px-4 py-2 | absolute z-10 left-1/2 -translate-x-1/2 | bg-white border shadow-md"
       :class="[positionClass]"
       @focusout="focusoutHandler">
    <div class="flex gap-1 items-center">
      <input class="p-1 | w-12 | border"
             placeholder="px"
             :value="inputValue"
             @keydown.stop
             @change="setFontSize($event.target.value)"/>
      <button class="flex"
              @click="toggleBold()">
        <i class="icon icon-bold | text-xl"></i>
      </button>
      <button class="flex"
              @click="toggleItalic()">
        <i class="icon icon-italic | text-xl"></i>
      </button>
      <button class="flex"
              @click="toggleStrike()">
        <i class="icon icon-strike | text-xl"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"
import {Node as NodeClass} from "~/models/Node"
import {prepend} from "~/utils/util"

const props = defineProps<{
  node: NodeClass
}>()

const element = ref<HTMLDivElement>()

const editorStore = useEditorStore()

const inputValue = ref()
const setInputValue = (value: string) => inputValue.value = value


const positionClass = ref()
const setPositionClass = (value?: string) => positionClass.value = value

onMounted(() => {
  const rect = toValue(element)?.getBoundingClientRect()
  const result = rect && rect.y > 30
      ? '-top-2 -translate-y-full'
      : '-bottom-2 translate-y-full'
  setPositionClass(result)
})

watch(() => editorStore.editData?.selectedNodeIds.includes(props.node.id),
    (value) => {
      if (value) return
      editorStore.tiptapEditor?.commands.selectAll()
      editorStore.tiptapEditor?.commands.unsetCustomSelection()
      editorStore.setTiptapEditor()
      editorStore.showTiptapMenu()
    }
)
const focusoutHandler = () => {
  editorStore.tiptapEditor?.commands.unsetCustomSelection()
  editorStore.setTextWidgetData(editorStore.tiptapEditor?.getHTML() || '')
  editorStore.setTiptapEditor()
  editorStore.showTiptapMenu()
}
const setFontSize = (value: string) => {
  editorStore.tiptapEditor?.commands.setFontSize(prepend(value))
  editorStore.tiptapEditor?.commands.unsetCustomSelection()
}
const toggleBold = () => {
  editorStore.tiptapEditor?.commands.toggleBold()
}
const toggleItalic = () => {
  editorStore.tiptapEditor?.commands.toggleItalic()
}
const toggleStrike = () => {
  editorStore.tiptapEditor?.commands.toggleStrike()
}

editorStore.tiptapEditor?.on('selectionUpdate', () => {
  setInputValue(editorStore.tiptapEditor?.getAttributes('textStyle')?.fontSize || '12px')
})
</script>

<style scoped lang="scss">

</style>
<template>
  <div ref="element"
       class="px-4 py-2 | absolute z-10 left-1/2 -translate-x-1/2 | bg-white border shadow-md"
       :class="[positionClass]">
    <div class="text-2xl">
      <button @click="setCustomSpan">asdf</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"

const element = ref<HTMLDivElement>()

const editorStore = useEditorStore()

const positionClass = ref()
const setPositionClass = (value?: string) => positionClass.value = value

onMounted(() => {
  const rect = toValue(element)?.getBoundingClientRect()
  const result = rect && rect.y > 30
      ? '-top-2 -translate-y-full'
      : '-bottom-2 translate-y-full'
  setPositionClass(result)
})

const setCustomSpan = () => editorStore.tiptapEditor?.commands.setCustomSpan()
</script>

<style scoped lang="scss">

</style>
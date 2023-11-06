<template>
  <EditorContent v-if="editor"
                 :editor="editor"
                 @keydown.stop="preventUndo"/>
</template>

<script setup lang="ts">
import {EditorContent, useEditor} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {watch} from "#imports"
import {CustomSpan} from "~/components/tiptap/CustomSpan"
import {Editor} from "@tiptap/core"

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', value: string, editor?: Editor): void
  (e: 'focus', value: string, editor?: Editor): void
}>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    CustomSpan,
  ],
  onUpdate: () => emit('update:modelValue', toValue(editor)?.getHTML() || ''),
  onBlur: () => setTimeout(() => emit('blur', toValue(editor)?.getHTML() || '', editor.value), 200),
  onFocus: () => emit('focus', toValue(editor)?.getHTML() || '', editor.value)
})

watch(() => props.modelValue,
    (value) => {
      const isSame = toValue(editor)?.getHTML() === value
      if (!isSame) toValue(editor)?.commands.setContent(value, false)
    })

const preventUndo = (event: KeyboardEvent) => {
  const isCtrl = event.ctrlKey || event.metaKey
  if (event.code === 'KeyZ' && isCtrl)
    (<HTMLElement>event.target)?.blur()
}

/*
const setCustomSpan = () => toValue(editor)?.commands.setCustomSpan()
const unsetCustomSpan = () => toValue(editor)?.commands.unsetCustomSpan()
*/
</script>

<style scoped lang="scss">

</style>
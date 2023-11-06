<template>
  <EditorContent v-if="editor"
                 :editor="editor"
                 @keydown.stop="preventUndo"/>
</template>

<script setup lang="ts">
import {EditorContent, useEditor} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {watch} from "#imports"
import {CustomSelection} from "~/components/tiptap/CustomSelection"
import {Editor} from "@tiptap/core"
import {FontSize} from "tiptap-extension-font-size"
import TextStyle from "@tiptap/extension-text-style"

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
    CustomSelection,
    FontSize,
    TextStyle
  ],
  onUpdate: () => emit('update:modelValue', toValue(editor)?.getHTML() || ''),
  onBlur: () => emit('blur', toValue(editor)?.getHTML() || '', editor.value),
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
</script>

<style scoped lang="scss">

::v-deep(.PromiseMirror-focused) {
  background: dodgerblue;
}
::v-deep(.focused) {
  background: #ccc;
}
</style>
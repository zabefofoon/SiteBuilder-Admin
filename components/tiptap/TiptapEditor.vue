<template>
  <EditorContent v-if="editor"
                 :editor="editor"
                 @keydown.stop="preventUndo"/>
</template>

<script setup lang="ts">
import {EditorContent, useEditor} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {watch} from "#imports"

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', value: string): void
  (e: 'focus', value: string): void
}>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
  ],
  onUpdate: () => emit('update:modelValue', toValue(editor)?.getHTML() || ''),
  onBlur: () => emit('blur', toValue(editor)?.getHTML() || ''),
  onFocus: () => emit('focus', toValue(editor)?.getHTML() || '')
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

</style>
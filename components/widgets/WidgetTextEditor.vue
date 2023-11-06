<template>
  <TiptapEditor v-model="content"
                @focus="focusHandler"
                @blur="blurHandler"/>
</template>

<script setup lang="ts">
import {Node as NodeClass} from '~/models/Node'
import TiptapEditor from "~/components/tiptap/TiptapEditor.vue"
import {useEditorStore} from "~/stores/editor/editor.store"
import {Editor} from "@tiptap/core"

const props = defineProps<{
  node: NodeClass
}>()

const editorStore = useEditorStore()

const defaultText = `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>`
const content = ref(props.node.widget?.data || defaultText)
const setContent = (data: string) => content.value = data

const focusHandler = (value: string,
                      tiptapEditor?: Editor) => {
  editorStore.setTiptapEditor(tiptapEditor)
  editorStore.showTiptapMenu(props.node.id)
  editorStore.setOriginalHtml(value)
}

const blurHandler = (value: string,
                     tiptapEditor?: Editor) => {
  editorStore.tiptapEditor?.commands.setCustomSelection()
  editorStore.setTextWidgetData(tiptapEditor?.getHTML() || '')
}

watch(() => props.node.widget?.data,
    (data) => {
      const _data = data ? String(data) : defaultText
      setContent(_data)
    }, {deep: true})
</script>

<style lang="scss" scoped>

</style>
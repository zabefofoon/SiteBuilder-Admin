<template>
  <TiptapEditor v-model="content"
                @focus="setOriginalHtml"
                @blur="setWidgetData"/>
</template>

<script setup lang="ts">
import {Node as NodeClass} from '~/models/Node'
import TiptapEditor from "~/components/tiptap/TiptapEditor.vue"
import {useEditorStore} from "~/stores/editor/editor.store"

const props = defineProps<{
  node: NodeClass
}>()

const editor = useEditorStore()

const defaultText = `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>`
const content = ref(props.node.widget?.data || defaultText)
const setContent = (data: string) => content.value = data

const originalHtml = ref('')
const setOriginalHtml = (value: string) => originalHtml.value = value

const setWidgetData = (value: string) => {
  const isSame = toValue(originalHtml) === value
  if (!isSame) editor.postWidgetData(value)
}

watch(() => props.node.widget?.data,
    (data) => {
      const _data = data ? String(data) : defaultText
      setContent(_data)
    }, {deep: true})
</script>

<style lang="scss" scoped>

</style>
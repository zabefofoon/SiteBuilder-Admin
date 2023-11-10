<template>
  Picture
</template>

<script setup lang="ts">
import {Node as NodeClass} from '~/models/Node'
import {useEditorStore} from "~/stores/editor/editor.store"

defineProps<{
  node: NodeClass
}>()

const editorStore = useEditorStore()

onMounted(() => {
  editorStore.postRequestShowModal('ModalMedia', 'picture')
})
</script>

<style lang="scss" scoped>

</style>
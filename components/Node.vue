<template>
  <div class="border border-dashed"
       :class="editorStore.editData?.selectedNodeIds.includes(node.id) ? 'border-orange-500' : ''"
       @click.stop="clickHandler">
    <div v-if="!node.nodes.length">{{ node.id }}</div>
    <Node v-for="node in node.nodes"
          :key="node.id"
          :node="node"/>
  </div>
</template>

<script setup lang="ts">
import {Node} from '~/models/Node'
import {useEditorStore} from "~/stores/editor/editor.store"

const props = defineProps<{
  node: Node
}>()

const editorStore = useEditorStore()

const clickHandler = (event: MouseEvent) => {
  event.ctrlKey || event.metaKey
      ? editorStore.selectNodeIdManyToParent(props.node.id)
      : editorStore.selectNodeIdOneToParent(props.node.id)
}

</script>

<style lang="scss" scoped>

</style>
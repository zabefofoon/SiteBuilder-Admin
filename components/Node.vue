<template>
  <div class="node | border border-dashed"
       :class="[spacingClass, outlineClass, selectedClass, gridClass, flexClass]"
       @click.stop="clickHandler">
    <div class="text-xs">
      id: {{ node.id }}<br/>
      parent: {{ node.parentId }}<br/>
    </div>
    <Node v-for="node in node.nodes"
          :key="node.id"
          :node="node"/>
  </div>
</template>

<script setup lang="ts">
import {Node as NodeClass, ResponsiveMode} from '~/models/Node'
import {useEditorStore} from "~/stores/editor/editor.store"

const props = defineProps<{
  node: NodeClass
}>()

const editorStore = useEditorStore()

const clickHandler = (event: MouseEvent) => {
  event.ctrlKey || event.metaKey
      ? editorStore.selectNodeIdManyToParent(props.node.id)
      : editorStore.selectNodeIdOneToParent(props.node.id)
}

const spacingClass = computed(() => true ? 'p-2' : '')

const outlineClass = computed(() => true ? 'border-1' : 'border-0')

const selectedClass = computed(() => editorStore.editData
    ?.selectedNodeIds
    .includes(props.node.id) ? 'border-gray-500' : '')

const gridClass = computed(() => (<ResponsiveMode[]>Object.keys(props.node.layout))
    .reduce<string>((acc, current) => {
      let result = ''
      if (props.node.layout[current].type === 'grid')
        result = result + `${current}:type-${props.node.layout[current].type} `
      if (props.node.layout[current].columns)
        result = result + `${current}:columns-${props.node.layout[current].columns} `
      return acc + result
    }, ''))

const flexClass = computed(() => (<ResponsiveMode[]>Object.keys(props.node.layout))
    .reduce<string>((acc, current) => {
      let result = ''
      if (props.node.layout[current].direction === 'horizontal')
        result = result + `${current}:direction-${props.node.layout[current].direction} `
      if (props.node.layout[current].gap)
        result = result + `${current}:gap-${props.node.layout[current].gap} `
      if (props.node.layout[current].mainAxis !== undefined)
        result = result + `${current}:mainAxis-${props.node.layout[current].mainAxis} `
      if (props.node.layout[current].crossAxis !== undefined)
        result = result + `${current}:crossAxis-${props.node.layout[current].crossAxis} `

      return acc + result
    }, ''))
</script>

<style lang="scss" scoped>

</style>
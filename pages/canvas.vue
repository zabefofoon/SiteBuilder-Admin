<template>
  <div v-click-away="() => editorStore.emptySelectedNodeIdsToParent()"
       class="bg-white | border | h-full min-h-screen">
    <span class="text-xs">{{ editorStore?.editData }}</span>
    <hr/>
    <Node v-for="node in editorStore.editData?.nodes || []"
          :key="node.id"
          :node="node"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "#imports"
import {useEditorStore} from "~/stores/editor/editor.store"
import Node from "~/components/Node.vue"
import {directive as vClickAway} from "vue3-click-away"

const editorStore = useEditorStore()

const listenShortcut = (event: KeyboardEvent) => editorStore.postKeydownEvent(event)

const listenMessage = (event: MessageEvent) => {
  if (event.data.type === 'updateToChild')
    editorStore.loadEditData()
}

onMounted(() => {
  setTimeout(() => editorStore.postLoadIframeToParent(), 500)

  window.addEventListener('message', listenMessage)
  window.addEventListener('keydown', listenShortcut)
})

</script>

<style scoped>

</style>
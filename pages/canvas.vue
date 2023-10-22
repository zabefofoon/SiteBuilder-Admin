<template>
  <div class="bg-white | border | h-full min-h-screen"
       @click="editorStore.emptySelectedNodeIdsToParent">
    <ClientOnly>
      <UiStyle>{{ generatedCss }}</UiStyle>
    </ClientOnly>
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
import {generateCss} from "~/utils/css.util"
import UiStyle from "~/components/UiStyle.vue"

const editorStore = useEditorStore()

const listenShortcut = (event: KeyboardEvent) => editorStore.postKeydownEvent(event)

const listenMessage = (event: MessageEvent) => {
  if (event.data.type === 'updateToChild')
    editorStore.loadEditData()
}

const generatedCss = computed(() => generateCss(editorStore.editData?.nodes || [], editorStore.editData?.isShowHiddenElement))

onMounted(() => {
  setTimeout(() => editorStore.postLoadIframeToParent(), 500)

  window.addEventListener('message', listenMessage)
  window.addEventListener('keydown', listenShortcut)
})

</script>

<style scoped>

</style>
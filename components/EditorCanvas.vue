<template>
  <div class="w-full | bg-white | border">
    <iframe class="w-full h-full"
            ref="iframe"
            src="/canvas"/>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"
import {onBeforeUnmount, onMounted} from "#imports"

const editorStore = useEditorStore()
const iframe = ref<HTMLIFrameElement>()

const listenShortcut = ({code, ctrlKey, shiftKey, metaKey}: KeyboardEvent) => {
  const isCtrl = ctrlKey || metaKey
  if (code === 'KeyZ' && isCtrl)

    shiftKey
        ? editorStore.actionManager?.executeRedo()
        : editorStore.actionManager?.executeUndo()

  editorStore.postUpdateToChild()
}

const listenMessage = (event: MessageEvent) => {
  if (event.data.type === 'updateToParent')
    editorStore.loadEditData()

  if (event.data.type === 'loadIframe') {
    editorStore.setCanvasIframe(iframe.value)
    editorStore.initEditData()
    editorStore.initActionManager()
    editorStore.saveEditData()
  }

  if (event.data.type === 'keydownToParent')
    listenShortcut(event.data.event)
}

onMounted(() => {
  window.addEventListener('message', listenMessage)
  window.addEventListener('keydown', listenShortcut)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', listenMessage)
  window.removeEventListener('keydown', listenShortcut)
})

</script>

<style scoped>

</style>
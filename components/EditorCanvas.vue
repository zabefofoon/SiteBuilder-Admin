<template>
  <div class="flex flex-col items-center gap-1 | w-full h-full">
    <EditorCanvasToolbar/>
    <iframe class="w-full"
            :style="{...editorStore.calculatedScreenSize}"
            ref="iframe"
            src="/canvas"/>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"
import {onBeforeUnmount, onMounted} from "#imports"
import EditorCanvasToolbar from "~/components/EditorCanvasToolbar.vue"

const editorStore = useEditorStore()
const iframe = ref<HTMLIFrameElement>()

const listenShortcut = (event: KeyboardEvent) => {
  const isCtrl = event.ctrlKey || event.metaKey
  if (event.code === 'KeyZ' && isCtrl) {
    event.shiftKey
        ? editorStore.actionManager?.executeRedo()
        : editorStore.actionManager?.executeUndo()

    event.preventDefault()
  }

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
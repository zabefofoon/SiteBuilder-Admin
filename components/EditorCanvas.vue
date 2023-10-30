<template>
  <div class="flex flex-col items-center gap-1 | w-full h-full">
    <EditorCanvasToolbar :page="page"/>
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
import {Page} from "~/models/PageBrief"
import pageApi from "~/api/page.api"

const props = defineProps<{
  page: Page
}>()


const editorStore = useEditorStore()
const iframe = ref<HTMLIFrameElement>()

const listenShortcut = (event: KeyboardEvent) => {
  const isCtrl = event.ctrlKey || event.metaKey
  if (event.code === 'KeyZ' && isCtrl) {
    event.shiftKey
        ? editorStore.actionManager?.executeRedo()
        : editorStore.actionManager?.executeUndo()

    event.preventDefault?.()
  }

  editorStore.postUpdateToChild()
}

const listenMessage = async (event: MessageEvent) => {
  if (event.data.type === 'updateToParent')
    editorStore.loadEditData()

  if (event.data.type === 'loadIframe') {
    editorStore.setCanvasIframe(iframe.value)
    await loadPageDetail()
    editorStore.initActionManager()
    editorStore.storeEditData()
  }

  if (event.data.type === 'keydownToParent')
    listenShortcut(event.data.event)

  if (event.data.type === 'updateWidgetData')
    editorStore.setWidgetData(event.data.data)
}

onMounted(() => {
  window.addEventListener('message', listenMessage)
  window.addEventListener('keydown', listenShortcut)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', listenMessage)
  window.removeEventListener('keydown', listenShortcut)
})

const loadPageDetail = async () => {
  const result = await pageApi.getPageDetail(props.page.id)
  const editDataRaw = result?.detail ? JSON.parse(result.detail) : {}
  editorStore.initEditData(editDataRaw)
}

</script>

<style scoped>

</style>
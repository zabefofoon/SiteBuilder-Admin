import {useEditorStore} from "~/stores/editor/editor.store"

export const messengerMixin = () => {
  const editorStore = useEditorStore()

  const canvasIframe = ref<HTMLIFrameElement>()
  const setCanvasIframe = (iframe?: HTMLIFrameElement) => canvasIframe.value = iframe

  const postLoadIframeToParent = () => {
    console.log('postLoadIframeToParent')
    window
        .parent
        .postMessage({
          type: 'loadIframe'
        })
  }

  const postUpdateToChild = () => {
    canvasIframe.value
        ?.contentWindow
        ?.postMessage({
          type: 'updateToChild'
        }, '*')
  }

  const postUpdateToParent = () => {
    window
        .parent
        .postMessage({
          type: 'updateToParent'
        })
  }

  const postKeydownEvent = ({code, ctrlKey, shiftKey, metaKey}: KeyboardEvent) => {
    window.parent
        .postMessage({
          type: 'keydownToParent',
          event: {code, ctrlKey, shiftKey, metaKey}
        })
  }

  const toChild = (cb: () => void) => {
    cb()
    editorStore.storeEditData()
    postUpdateToChild()
  }

  const toParent = (cb: () => void) => {
    cb()
    editorStore.storeEditData()
    postUpdateToParent()
  }

  return {
    canvasIframe,
    setCanvasIframe,

    postLoadIframeToParent,
    postUpdateToChild,
    postUpdateToParent,
    postKeydownEvent,

    toChild,
    toParent
  }
}
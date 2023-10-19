<template>
  <div class="w-80 | bg-white | border">
    <div class="flex flex-col">
      <button class="text-left"
              @click="editorStore.addNodeSiblingDownToChild()">
        addDown
      </button>
      <button class="text-left"
              @click="editorStore.addNodeSiblingUpToChild()">
        addUp
      </button>
      <button class="text-left"
              @click="editorStore.addNodeChildToChild()">
        addChild
      </button>
      <button class="text-left"
              @click="editorStore.addNodeParentToChild()">
        addParent
      </button>
      <button class="text-left"
              @click="editorStore.copy()">
        copy
      </button>
      <button class="text-left"
              @click="editorStore.cut()">
        cut
      </button>
      <button class="text-left"
              @click="editorStore.paste()">
        paste
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"

const editorStore = useEditorStore()
</script>

<style scoped lang="scss">

</style>
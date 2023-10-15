<template>
  <div class="w-80 | bg-white | border">
    <button @click="editorStore.addNodeSiblingDownToChild()">addDown</button>
    <button @click="editorStore.addNodeSiblingUpToChild()">addUp</button>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"

const editorStore = useEditorStore()
</script>

<style scoped>

</style>
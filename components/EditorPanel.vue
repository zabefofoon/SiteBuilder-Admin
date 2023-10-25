<template>
  <div class="w-80 | relative | bg-white | border | overflow-hidden">
    <EditorPanelNode/>
    <EditorPanelLayout/>
    <EditorPanelWidgets/>
  </div>
</template>

<script setup lang="ts">
import EditorPanelNode from "~/components/EditorPanelNode.vue"
import EditorPanelLayout from "~/components/EditorPanelLayout.vue"
</script>

<style scoped lang="scss">

</style>
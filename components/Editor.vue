<template>
  <div class="w-full | flex gap-4">
    <EditorCanvas :page="page"/>
    <EditorPanel :page="page"/>
  </div>
</template>

<script setup lang="ts">
import EditorCanvas from "~/components/EditorCanvas.vue"
import EditorPanel from "~/components/EditorPanel.vue"
import {Page} from "~/models/PageBrief"

defineProps<{
  page: Page
}>()

</script>

<style scoped>

</style>
<template>
  <VueFinalModal
      class="flex justify-center items-center"
      content-class="flex flex-col gap-2 | mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2">
    <h2 class="text-xl">
      {{ title }}
    </h2>
    <slot/>
    <div class="flex items-center gap-2">
      <button v-if="useConfirm"
              class="ml-auto py-1 px-3 | bg-black | text-white | border rounded-lg"
              @click="emit('done')">
        Done
      </button>
      <button v-if="useCancel"
              class="py-1 px-3 | border rounded-lg"
              @click="emit('cancel')">
        Cancel
      </button>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import {VueFinalModal} from "vue-final-modal"

defineProps<{
  title: string
  useConfirm: boolean
  useCancel: boolean
}>()

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'cancel'): void
}>()
</script>

<style scoped lang="scss">

</style>
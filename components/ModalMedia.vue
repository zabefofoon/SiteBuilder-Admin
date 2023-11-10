<template>
  <Modal title="Media"
         use-confirm
         use-cancel
         @done="emit('done')"
         @cancel="emit('cancel')">
    <div class="flex flex-col | w-[64vw] | h-[64vh]">
      <ul class="flex | uppercase | translate-y-[1px]">
        <li class="border border-b-1 border-b-white rounded-t-lg | text-sm | py-1 px-3">image</li>
        <li class="border border-b-0 rounded-t-lg | text-sm | py-1 px-3">video</li>
        <li class="border border-b-0 rounded-t-lg | text-sm | py-1 px-3">youtube</li>
      </ul>
      <div class="h-full | border"></div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "~/components/Modal.vue"

defineProps<{
  mediaType: string
}>()

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'cancel'): void
}>()
</script>

<style scoped lang="scss">

</style>
<template>
  <Modal
    title="Media"
    use-confirm
    use-cancel
    @done="emit('done')"
    @cancel="emit('cancel')">
    <div class="flex flex-col | w-[64vw] | h-[64vh]">
      <!-- Tabs -->
      <ul class="flex | uppercase | translate-y-[1px]">
        <li
          v-for="mediaType in MEDIA_TYPES"
          :key="mediaType"
          class="border rounded-t-lg"
          :class="getTabSelectableClass(mediaType)">
          <button
            class="uppercase text-sm | py-1 px-3"
            @click="selectMediaType(mediaType)">
            {{ mediaType }}
          </button>
        </li>
      </ul>
      <!-- Tabs -->
      <div
        class="h-full | border"
        @drop.prevent="dropHandler"
        @dragover.prevent="checkDragging(true)"
        @dragleave="checkDragging(false)">
        <ModalMediaDragging v-if="isDragging" />
        <template v-else>
          <ModalMediaPicture v-if="selectedMediaType === 'picture'" />
          <ModalMediaVideo v-if="selectedMediaType === 'video'" />
          <ModalMediaYoutube v-if="selectedMediaType === 'youtube'" />
        </template>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue';
import type { MediaType } from '~/models/Media';

const props = defineProps<{
  mediaType: MediaType
}>()

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'cancel'): void
}>()

const MEDIA_TYPES: MediaType[] = ['picture', 'video', 'youtube']

const selectedMediaType = ref(props.mediaType)
const selectMediaType = (value: MediaType) => (selectedMediaType.value = value)

const selectedClasses = 'border-b-1 border-b-white'
const unSelectedClasses = 'border-b-0 bg-gray-100 text-gray-400'

const getTabSelectableClass = (mediaType: MediaType) =>
  toValue(selectedMediaType) === mediaType ? selectedClasses : unSelectedClasses

const isDragging = ref(false)
const checkDragging = (value: boolean) => (isDragging.value = value)

const dropHandler = (event: DragEvent) => {
  console.log(event)
  checkDragging(false)
}
</script>

<style scoped lang="scss"></style>

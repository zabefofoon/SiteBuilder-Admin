<template>
  <div>
    <h4 class="px-2 py-1 | bg-gray-500 | text-white text-xs">Node</h4>
    <div class="flex flex-col">
      <button class="config-button"
              title="Select parent"
              @click="editorStore.selectParent()">
        <i class="icon icon-select"></i>
        <span class="text-xs">select Parent</span>
      </button>
      <hr/>
      <div class="flex">
        <button class="config-button"
                title="Add down"
                @click="editorStore.addNodeSiblingDownToChild()">
          <i class="icon icon-plus"></i>
          <span class="text-xs">add</span>
        </button>
        <div class="border-l"></div>
        <button class="config-button"
                title="Add up"
                @click="editorStore.addNodeSiblingUpToChild()">
          <i class="icon icon-arrow-up"></i>
          <span class="text-xs">up</span>
        </button>
        <div class="border-l"></div>
        <button class="config-button"
                title="Add child"
                @click="editorStore.addNodeChildToChild()">
          <i class="icon icon-child"></i>
          <span class="text-xs">child</span>
        </button>
        <div class="border-l"></div>
        <button class="config-button"
                title="Add parent"
                @click="editorStore.addNodeParentToChild()">
          <i class="icon icon-child -rotate-180"></i>
          <span class="text-xs">parent</span>
        </button>
      </div>
      <hr/>
      <div class="flex">
        <button class="config-button"
                title="Remove"
                @click="editorStore.remove()">
          <i class="icon icon-trash"></i>
          <span class="text-xs">remove</span>
        </button>
        <div class="border-l"></div>
        <button class="config-button"
                title="Remove parent"
                @click="editorStore.removeParent()">
          <span class="relative">
            <i class="icon icon-trash"></i>
            <i class="icon icon-arrow-up text-xs absolute -ml-1"></i>
          </span>
          <span class="text-xs">parent</span>
        </button>
      </div>
      <hr/>
      <div class="flex">
        <button class="config-button"
                title="Copy"
                @click="editorStore.copy()">
          <i class="icon icon-copy"></i>
          <span class="text-xs">copy</span>
        </button>
        <div class="border-l"></div>
        <button class="config-button"
                title="Cut"
                @click="editorStore.cut()">
          <i class="icon icon-cut"></i>
          <span class="text-xs">cut</span>
        </button>
        <div class="border-l"></div>
        <button class="config-button"
                title="Paste"
                @click="editorStore.paste()">
          <i class="icon icon-paste"></i>
          <span class="text-xs">paste</span>
        </button>
      </div>
      <hr/>
      <div class="flex">
        <button class="config-button"
                title="Add Widget"
                @click="editorStore.showWidgets(true)">
          <i class="icon icon-add-widget"></i>
          <span class="text-xs">widget</span>
        </button>
        <div class="border-l"></div>
        <button class="config-button">
          <i class="icon icon-remove"></i>
          <span class="text-xs">remove</span>
        </button>
      </div>
      <hr/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useEditorStore} from "~/stores/editor/editor.store"

const editorStore = useEditorStore()
</script>

<style scoped lang="scss">
.config-button {
  width: 100%;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: .25rem;

  padding: .5rem 0;

  border: 1px solid white;

  &:active {
    background: rgb(241 245 249);
  }

  &:hover {
    border: 1px solid black;
  }

  &:disabled {
    opacity: .4;
    border: 1px solid white;
  }
}
</style>
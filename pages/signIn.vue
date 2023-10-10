<template>
  <div class="flex items-center justify-center | w-screen h-screen">
    <div class="w-80 | flex flex-col gap-4">
      <div class="flex flex-col gap-4 | px-4 py-4 | border shadow-md">
        <h2 class="text-2xl font-bold">Site Builder</h2>
        <div class="flex flex-col gap-2">
          <input class="p-2 | border"
                 type="email"
                 placeholder="email"/>
          <input class="p-2 | border"
                 type="password"
                 placeholder="password"/>
        </div>
      </div>
      <button class="p-2 | text-white | bg-black shadow-md hover:bg-neutral-700 hover:shadow-sm">Sign</button>
    </div>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
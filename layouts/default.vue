<template>
  <div class="flex flex-col | w-screen h-screen | overflow-hidden">
    <header class="flex items-center | pl-12 | h-10 | border | font-bold">
      <NuxtLink to="/">SiteBuilder</NuxtLink>
    </header>
    <div class="h-full | bg-zinc-100 | p-4">
      <div class="h-full | bg-white border">
        <slot/>
      </div>
    </div>
    <footer class="flex items-center | px-4 | h-8 | border text-xs">v0.0.0</footer>
    <Aside/>
  </div>
</template>
<script setup lang="ts">

import Aside from "~/components/Aside.vue"
</script>
<template>
  <aside class="w-80 h-full | absolute left-0 z-10 | bg-white shadow-md | transition-all"
         :class="isShowNav ? '' : '-translate-x-80'">
    <div class="h-8 | absolute top-0 right-0 translate-x-full | flex items-center | px-2 | cursor-pointer border-r rounded-r-full"
         :class="isShowNav ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'"
         @click="showNav(!isShowNav)">
      <button class="flex">
        <i class="icon icon-menu | text-ms | transition-all hover:rotate-90"></i>
      </button>
    </div>
    <Nav/>
  </aside>
  <div class="absolute | w-full h-full | bg-black | transition-all"
       :class="isShowNav ? 'opacity-20' : 'opacity-0 pointer-events-none'"
       @click="showNav(false)"></div>
</template>

<script setup lang="ts">
import Nav from "~/components/Nav.vue"

const isShowNav = ref(false)
const showNav = (value: boolean) => isShowNav.value = value

onBeforeRouteLeave(() => {
  showNav(false)
})
</script>

<style scoped>

</style>
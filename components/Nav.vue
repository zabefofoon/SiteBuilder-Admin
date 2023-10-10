<template>
  <nav class="flex flex-col | h-full">
    <NuxtLink to="/">
      <div class="py-8 | text-sm text-center | border-b bg-black text-white">
        Hello, Rowan!
      </div>
    </NuxtLink>
    <ul>
      <NuxtLink to="pages">
        <li class="hover:bg-black hover:text-white"
            :class="$route.path.includes('/pages') ? 'bg-gray-100' : ''">
          <button class="w-full | border-b | px-4 py-2 | text-sm text-left">Pages</button>
        </li>
      </NuxtLink>
      <NuxtLink to="corners">
        <li class="hover:bg-black hover:text-white"
            :class="$route.path.includes('/corners') ? 'bg-gray-100' : ''">
          <button class="w-full | border-b | px-4 py-2 | text-sm text-left">Corners</button>
        </li>
      </NuxtLink>
      <NuxtLink to="messages">
        <li class="hover:bg-black hover:text-white"
            :class="$route.path.includes('/messages') ? 'bg-gray-100' : ''">
          <button class="w-full | border-b | px-4 py-2 | text-sm text-left">Messages</button>
        </li>
      </NuxtLink>
    </ul>
    <button class="flex items-center justify-center gap-4 | mt-auto py-3 | text-sm text-center | border-t hover:bg-black hover:text-white"
            @click="signOut">
      <span>Sign out</span>
    </button>
  </nav>
</template>
<script setup lang="ts">
const {auth} = useSupabaseClient()

const signOut = async () => {
  const {error} = await auth.signOut()
  if (error) alert(error.message)
  navigateTo('/login')
}


</script>
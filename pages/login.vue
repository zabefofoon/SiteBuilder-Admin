<template>
  <div class="flex items-center justify-center | w-screen h-screen">
    <div class="w-80 | flex flex-col gap-4">
      <div class="flex flex-col gap-4 | px-4 py-4 | border shadow-md">
        <h2 class="text-2xl font-bold">Site Builder</h2>
        <div class="flex flex-col gap-2">
          <input v-model="email"
                 class="p-2 | border"
                 type="email"
                 placeholder="email"/>
          <input v-model="password"
                 class="p-2 | border"
                 type="password"
                 placeholder="password"
                 @keydown.enter="signIn"/>
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </div>
      </div>
      <button class="p-2 | text-white | bg-black shadow-md hover:bg-neutral-700 hover:shadow-sm"
              @click="signIn">Sign in
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">
const {auth} = useSupabaseClient()

const email = ref('')
const password = ref('')
const errorMessage = ref()
const setErrorMessage = (value?: string) => errorMessage.value = value

const loading = ref(false)
const setLoading = (value: boolean) => loading.value = value
const signIn = async () => {
  setLoading(true)
  const {error} = await auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  setLoading(false)
  error
      ? setErrorMessage(error?.message)
      : navigateTo('/')

}

</script>

<style scoped>

</style>
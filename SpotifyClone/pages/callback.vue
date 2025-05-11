<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1a0000] to-black text-white px-4">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Processing authentication...</h1>
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500 mx-auto"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const code = route.query.code as string
  const error = route.query.error as string

  if (error) {
    console.error('Authentication error:', error)
    router.push('/')
    return
  }

  if (!code) {
    console.error('No code received')
    router.push('/')
    return
  }

  try {
    await authStore.initialize()

    const response = await fetch('/api/spotify/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })

    const data = await response.json()
    console.log('Token data from server:', data)

    if (data.access_token) {
      await authStore.setTokens(
        data.access_token,
        data.refresh_token,
        data.expires_in
      )
      await authStore.fetchUserProfile()
      router.push('/')
    } else {
      throw new Error('No access token received')
    }
  } catch (error) {
    console.error('Error during authentication:', error)
    router.push('/')
  }
})
</script>

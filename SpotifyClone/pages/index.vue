<template>
<div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a0000] to-black text-white px-4">
  <div class="text-center max-w-md w-full">
      <h1 class="text-5xl font-extrabold mb-10 text-red-500 drop-shadow-lg">
        Welcome to Spotify Clone
      </h1>

      <div
        v-if="authStore.isAuthenticated"
        class="bg-zinc-800 p-6 rounded-2xl shadow-lg"
      >
        <p class="mb-4 text-lg">
          Logged in as: <strong>{{ authStore.user?.display_name }}</strong>
        </p>

        <img
          v-if="authStore.user?.images?.[0]?.url"
          :src="authStore.user.images[0].url"
          alt="Profile"
          class="mx-auto rounded-full w-28 h-28 mb-4 border-4 border-red-500"
        />

        <button
          @click="logout"
          class="bg-white hover:bg-gray-100 text-red-600 font-bold py-2 px-6 rounded-full transition"
        >
          Logout
        </button>
      </div>

      <div v-else class="bg-zinc-800 p-6 rounded-2xl shadow-lg">
        <p class="mb-4 text-gray-300">Start listening now</p>
        <button
          @click="login"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const authStore = useAuthStore()

const login = () => {
  const scope = [
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-top-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'streaming'
  ].join(' ')

  const params = new URLSearchParams({
    client_id: config.public.spotifyClientId,
    response_type: 'code',
    redirect_uri: config.public.spotifyRedirectUri,
    scope
  })

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
}

const logout = () => {
  authStore.logout()
  window.location.reload()
}
</script>

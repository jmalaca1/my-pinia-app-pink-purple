<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'
import AppButton from '@/components/AppButton.vue'
import FormField from '@/components/FormField.vue'
import { useAuthStore } from '@/stores/auth'
import { useAsync } from '@/composables/useAsync'

useTitle('Sign in · Projects')

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const { loading, error, fieldErrors, run } = useAsync()

const form = reactive({ email: '', password: '' })
async function onSubmit() {
  try {
    await run(() => auth.login(form))
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/projects'
    router.replace(redirect)
  } catch {
    // error captured
  }
}
</script>
<template>
  <h1>Login Page</h1>
  <main class="flex flex-1 items-center justify-center px-5 py-16">
    <div class="rise w-full max-w-sm">
      <div class="mb-8 text-center">
        <span class="chip chip-accent mb-4">Welcome back</span>
        <h1 class="mt-3 text-2xl font-semibold tracking-tight text-text">Sign in to Projects</h1>
        <p class="mt-1.5 text-sm text-text-2">Your workspace is waiting.</p>
      </div>
      <form
        class="card flex flex-col gap-4 p-6"
        @submit.prevent="onSubmit"
      >
        <FormField
          v-model="form.email"
          label="Email"
          type="email"
          autocomplete="email"
          required
          placeholder="you@company.com"
        />
        <FormField
          v-model="form.password"
          label="Password"
          type="password"
          autocomplete="current-password"
          required
        />

        <p
          v-if="error && Object.keys(fieldErrors).length === 0"
          class="flex items-center gap-2 rounded-md border border-danger/30 bg-danger-soft px-3 py-2 text-xs text-danger"
          role="alert"
          aria-live="polite"
        >
          <span aria-hidden="true">⚠</span>
          {{ error.message }}
        </p>

        <AppButton
          type="submit"
          :loading="loading"
        >
          {{ loading ? 'Signing in…': 'Sign in' }}
        </AppButton>
      </form>
      <p class="mt-5 text-center text-sm text-text-2">
        New here?
        <RouterLink
          to="/register"
          class="font-medium text-accent underline-offset-4 hover:underline"
        >
          Create an account
        </RouterLink>
      </p>
    </div>
  </main>
</template>
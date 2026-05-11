<script setup>
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTitle } from '@vueuse/core'
import AppButton from '@/components/AppButton.vue'
import FormField from '@/components/FormField.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { useProjectsStore } from '@/stores/projects'
import { useAsync } from '@/composables/useAsync'

useTitle('Dashboard · Projects')

const store = useProjectsStore()
const { list, loading, error } = storeToRefs(store)

const editing = ref(null)
const showForm = ref(false)

const form = reactive({ name: '', description: '' })

const {
  loading: formLoading,
  error: formError,
  fieldErrors: formFieldErrors,
  run: runForm,
} = useAsync()

function openNew() {
  editing.value = null
  form.name = ''
  form.description = ''
  showForm.value = true
}

function openEdit(project) {
  editing.value = project
  form.name = project.name
  form.description = project.description ?? ''
  showForm.value = true
}

function cancel() {
  showForm.value = false
  formError.value = null
  formFieldErrors.value = {}
}

async function onSubmit() {
  try {
    await runForm(() =>
      editing.value ? store.update(editing.value.id, { ...form }) : store.create({ ...form }),
    )
    showForm.value = false
  } catch {
    // shown
  }
}

async function onDelete(project) {
  if (!window.confirm(`Delete project "${project.name}"?`)) return
  await store.remove(project.id)
}

onMounted(() => {
  store.fetchAll().catch(() => {})
})
</script>

<template>
  <main class="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
    <header class="rise rise-1 mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="mono mb-1.5 text-text-3">DASHBOARD</p>
        <h1 class="text-3xl font-semibold tracking-tight text-text">Your projects</h1>
        <p class="mt-1 text-sm text-text-2">
          {{ list.length }} {{ list.length === 1 ? 'project' : 'projects' }} · Keep shipping.
        </p>
      </div>
      <AppButton @click="openNew">
        <span
          aria-hidden="true"
          class="text-base leading-none"
          >+</span
        >
        New project
      </AppButton>
    </header>

    <section
      v-if="showForm"
      class="rise card mb-8 p-5"
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-sm font-semibold text-text">
          {{ editing ? 'Edit project' : 'New project' }}
        </h2>
        <span class="mono text-text-3">{{ editing ? `#${editing.id}` : 'draft' }}</span>
      </div>
      <form
        class="flex flex-col gap-4"
        @submit.prevent="onSubmit"
      >
        <FormField
          v-model="form.name"
          label="Name"
          required
          placeholder="e.g. Senior thesis"
          :error="formFieldErrors.name"
        />
        <FormField
          v-model="form.description"
          label="Description"
          placeholder="What is this project about?"
          :error="formFieldErrors.description"
        />
        <p
          v-if="formError && Object.keys(formFieldErrors).length === 0"
          class="flex items-center gap-2 rounded-md border border-danger/30 bg-danger-soft px-3 py-2 text-xs text-danger"
          role="alert"
          aria-live="polite"
        >
          <span aria-hidden="true">⚠</span>
          {{ formError.message }}
        </p>
        <div class="flex justify-end gap-2">
          <AppButton
            variant="ghost"
            type="button"
            @click="cancel"
            >Cancel</AppButton
          >
          <AppButton
            type="submit"
            :loading="formLoading"
          >
            {{
              formLoading
                ? editing
                  ? 'Saving…'
                  : 'Creating…'
                : editing
                  ? 'Save changes'
                  : 'Create project'
            }}
          </AppButton>
        </div>
      </form>
    </section>
    <p
      v-if="loading && list.length === 0"
      class="text-sm text-text-2"
    >
      Loading projects…
    </p>
    <p
      v-else-if="error && list.length === 0"
      class="flex items-center gap-2 rounded-md border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger"
      role="alert"
      aria-live="polite"
    >
      <span aria-hidden="true">⚠</span>
      {{ error.message }}
    </p>

    <div
      v-else-if="list.length === 0"
      class="card rise flex flex-col items-center gap-3 p-12 text-center"
    >
      <span class="grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M11 5v12M5 11h12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <h2 class="text-base font-semibold text-text">Nothing here yet</h2>
      <p class="max-w-sm text-sm text-text-2">
        Create your first project to start organising tasks and tracking progress.
      </p>
      <AppButton
        class="mt-2"
        @click="openNew"
        >Create your first project</AppButton
      >
    </div>
    <div
      v-else
      class="rise rise-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ProjectCard
        v-for="project in list"
        :key="project.id"
        :project="project"
        @edit="openEdit"
        @delete="onDelete"
      />
    </div>
  </main>
</template>
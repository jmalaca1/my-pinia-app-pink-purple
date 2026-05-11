<script setup>
defineProps({
  project: { type: Object, required: true },
})

defineEmits(['edit', 'delete'])
</script>

<template>
  <article class="card card-hover group relative flex flex-col gap-3 p-5">
    <RouterLink
      :to="{ name: 'project-detail', params: { id: project.id } }"
      class="absolute inset-0 rounded-[inherit]"
      :aria-label="`Open project ${project.name}`"
    />
    <div class="flex items-start justify-between gap-3">
      <div class="flex min-w-0 flex-col gap-1">
        <h3 class="truncate text-base font-semibold text-text">
          {{ project.name }}
        </h3>
        <p
          v-if="project.description"
          class="line-clamp-2 text-sm text-text-2"
        >
          {{ project.description }}
        </p>
        <p
          v-else
          class="text-sm text-text-3 italic"
        >
          No description
        </p>
      </div>

      <div
        class="relative z-10 flex shrink-0 gap-1 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        <button
          type="button"
          class="grid h-7 w-7 place-items-center rounded-md border border-border bg-surface-2 text-text-2 transition-colors hover:border-border-strong hover:text-text"
          aria-label="Edit project"
          @click="$emit('edit', project)"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M2 12l1-4 6.5-6.5a1.4 1.4 0 012 2L5 10 1 11l1-1"
              stroke="currentColor"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          class="grid h-7 w-7 place-items-center rounded-md border border-border bg-surface-2 text-text-2 transition-colors hover:border-danger/50 hover:text-danger"
          aria-label="Delete project"
          @click="$emit('delete', project)"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M2 4h10M5 4V2.5A.5.5 0 015.5 2h3a.5.5 0 01.5.5V4m-5 0l.5 8h5l.5-8"
              stroke="currentColor"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between pt-2">
      <span class="mono text-text-3">#{{ project.id }}</span>
      <span
        class="mono flex items-center gap-1 text-text-3 transition-colors group-hover:text-accent"
      >
        Open
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          class="transition-transform group-hover:translate-x-0.5"
        >
          <path
            d="M1 5h8M5 1l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
  </article>
</template>
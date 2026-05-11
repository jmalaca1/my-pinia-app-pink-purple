<script setup>
import { computed } from 'vue'
import { TASK_STATUSES, TASK_STATUS_LABELS } from '@/lib/constants'

const props = defineProps({
  task: { type: Object, required: true },
  updating: { type: Boolean, default: false },
})

const emit = defineEmits(['update-status', 'delete'])

const status = computed({
  get: () => props.task.status,
  set: (value) => emit('update-status', value),
})

const chipClass = {
  todo: 'chip',
  in_progress: 'chip chip-warning',
  done: 'chip chip-success',
}

function toggleDone() {
  emit('update-status', props.task.status === 'done' ? 'todo' : 'done')
}
</script>

<template>
  <li
    class="card group flex items-center gap-3 px-4 py-3 transition-colors hover:border-border-strong"
  >
    <button
      type="button"
      class="grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors"
      :class="
        task.status === 'done'
          ? 'text-accent-ink)] border-accent bg-accent'
          : 'border-border hover:border-accent'
      "
      :aria-label="task.status === 'done' ? 'Mark as to-do' : 'Mark as done'"
      @click="toggleDone"
    >
      <svg
        v-if="task.status === 'done'"
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
      >
        <path
          d="M2 5.5L4.5 8 9 3"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div class="flex min-w-0 flex-1 flex-col">
      <p
        class="truncate text-sm font-medium text-text"
        :class="task.status === 'done' ? 'text-text-3 line-through' : ''"
      >
        {{ task.title }}
      </p>
      <p
        v-if="task.description"
        class="line-clamp-1 text-xs text-text-2"
      >
        {{ task.description }}
      </p>
    </div>

    <div class="flex shrink-0 items-center gap-2">
      <span :class="chipClass[task.status]">{{ TASK_STATUS_LABELS[task.status] }}</span>
      <label
        class="sr-only"
        :for="`status-${task.id}`"
        >Status</label
      >
      <select
        :id="`status-${task.id}`"
        v-model="status"
        :disabled="updating"
        class="mono h-7 rounded-md border border-border bg-surface-2 px-2 text-text-2 transition-colors hover:border-border-strong hover:text-text focus:border-accent focus:outline-none"
      >
        <option
          v-for="s in TASK_STATUSES"
          :key="s"
          :value="s"
          class="bg-surface text-text"
        >
          {{ TASK_STATUS_LABELS[s] }}
        </option>
      </select>
      <button
        type="button"
        class="grid h-7 w-7 place-items-center rounded-md border border-transparent text-text-3 opacity-0 transition-all group-hover:opacity-100 hover:border-danger/40 hover:text-danger focus:opacity-100"
        aria-label="Delete task"
        @click="$emit('delete', task)"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 3l8 8M11 3l-8 8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </li>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'ghost', 'danger'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v),
  },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})

const classes = computed(() => {
  const base =
    'inline-flex items-center justify-center gap-1.5 rounded-md border font-medium transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]'
  const sizes = {
    sm: 'h-7 px-2.5 text-xs',
    md: 'h-9 px-3.5 text-sm',
  }
  const byVariant = {
    primary:
      'border-transparent bg-accent text-[color:var(--color-accent-ink)] hover:brightness-110 shadow-[0_0_0_1px_rgba(94,234,212,0.3),0_8px_24px_-12px_rgba(94,234,212,0.4)]',
    ghost: 'border-border bg-surface text-text hover:border-border-strong hover:bg-surface-2',
    danger:
      'border-transparent bg-[color:var(--color-danger-soft)] text-danger hover:bg-danger hover:text-bg',
  }
  return `${base} ${sizes[props.size]} ${byVariant[props.variant]}`
})
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    :aria-busy="loading ? 'true' : 'false'"
  >
    <span
      v-if="loading"
      class="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>
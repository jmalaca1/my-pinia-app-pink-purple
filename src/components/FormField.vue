<script setup>
import { useId } from 'vue'

defineProps({
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: '' },
  hint: { type: String, default: '' },
})

defineEmits(['update:modelValue'])

const fieldId = useId()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      :for="fieldId"
      class="flex items-center justify-between text-xs font-medium text-text-2"
    >
      <span class="flex items-center gap-1">
        {{ label }}
        <span
          v-if="required"
          class="text-danger"
          aria-hidden="true"
          >*</span
        >
      </span>
      <span
        v-if="hint"
        class="mono text-text-3"
        >{{ hint }}</span
      >
    </label>
    <input
      :id="fieldId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error ? `${fieldId}-err` : undefined"
      class="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text transition-colors placeholder:text-text-3 hover:border-border-strong focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
      :class="error ? 'border-danger focus:border-danger focus:ring-danger/30' : ''"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p
      v-if="error"
      :id="`${fieldId}-err`"
      class="flex items-center gap-1.5 text-xs text-danger"
      role="alert"
      aria-live="polite"
    >
      <span aria-hidden="true">⚠</span>
      {{ error }}
    </p>
  </div>
</template>
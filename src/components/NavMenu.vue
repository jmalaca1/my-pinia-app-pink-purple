<script setup>
const linkClass =
  'text-sm text-text-2 hover:text-text transition-colors [&.router-link-active]:text-text'
</script>
<template></template>
  <header class="sticky top-0 z-40 backdrop-blur-xl">
    <div class="border-b border-border bg-bg/70">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <RouterLink
          to="/projects"
          class="flex items-center gap-2.5 text-sm font-semibold text-text"
        >
          <span
            class="grid h-7 w-7 place-items-center rounded-lg bg-accent text-accent-ink"
            aria-hidden="true"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <rect
                x="2"
                y="2"
                width="10"
                height="10"
                rx="2"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M5 7l1.5 1.5L9 6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          Projects
          <span
            class="chip ml-1 hidden sm:inline-flex"
            translate="no"
            >beta</span
          >
        </RouterLink>
        <nav
          class="flex items-center gap-4"
          aria-label="Primary"
        >
          <RouterLink
            to="/login"
            :class="linkClass"
            >Sign in</RouterLink
          >
          <RouterLink
            to="/register"
            class="roudned-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-ink transition-opacity hover:opacity-90"
            >Get started</RouterLink
          >
        </nav>
      </div>
    </div>
  </header>
</template>

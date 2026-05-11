import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiFetch } from '@/lib/api'

export const useProjectsStore = defineStore('projects', () => {
  const list = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      list.value = (await apiFetch('/projects', { auth: true })) ?? []
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  async function create(payload) {
    const project = await apiFetch('/projects', {
      method: 'POST',
      body: payload,
      auth: true,
    })
    list.value.push(project)
    return project
  }

  async function update(id, payload) {
    const updated = await apiFetch(`/projects/${id}`, {
      method: 'PATCH',
      body: payload,
      auth: true,
    })
    const index = list.value.findIndex((p) => p.id === id)
    if (index !== -1) list.value[index] = updated
    return updated
  }

  async function remove(id) {
    await apiFetch(`/projects/${id}`, { method: 'DELETE', auth: true })
    list.value = list.value.filter((p) => p.id !== id)
  }

  async function getById(id) {
    const existing = list.value.find((p) => p.id === id)
    if (existing) return existing
    return apiFetch(`/projects/${id}`, { auth: true })
  }

  function reset() {
    list.value = []
    error.value = null
  }

  return { list, loading, error, fetchAll, create, update, remove, getById, reset }
})
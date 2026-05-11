import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiFetch } from '@/lib/api'

export const useTasksStore = defineStore('tasks', () => {
  const list = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentProjectId = ref(null)

  async function fetchByProject(projectId) {
    loading.value = true
    error.value = null
    currentProjectId.value = projectId
    try {
      list.value = (await apiFetch(`/projects/${projectId}/tasks`, { auth: true })) ?? []
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  async function create(projectId, payload) {
    const task = await apiFetch(`/projects/${projectId}/tasks`, {
      method: 'POST',
      body: payload,
      auth: true,
    })
    list.value.push(task)
    return task
  }

  async function update(id, payload) {
    const updated = await apiFetch(`/tasks/${id}`, {
      method: 'PATCH',
      body: payload,
      auth: true,
    })
    const index = list.value.findIndex((t) => t.id === id)
    if (index !== -1) list.value[index] = updated
    return updated
  }

  async function remove(id) {
    await apiFetch(`/tasks/${id}`, { method: 'DELETE', auth: true })
    list.value = list.value.filter((t) => t.id !== id)
  }

  function reset() {
    list.value = []
    currentProjectId.value = null
    error.value = null
  }

  return {
    list,
    loading,
    error,
    currentProjectId,
    fetchByProject,
    create,
    update,
    remove,
    reset,
  }
})
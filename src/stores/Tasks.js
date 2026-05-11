import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  
  getters: {
    getTasksByProject: (state) => (projectId) => {
      return state.tasks.filter(task => task.projectId === projectId)
    }
  },
  
  actions: {
    addTask(task) {
      this.tasks.push(task)
    },
    
    updateTask(updatedTask) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
    },
    
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId)
    }
  }
})
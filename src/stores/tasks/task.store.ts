import { Task, TaskStatus } from "../../interfaces";
import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid'
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";


interface TaskState {
  tasks: Record<string, Task>
  draggingTaskId?: string

  getTaskByStatus: (status: TaskStatus) => Task[]
  addTask: (title: string, status: TaskStatus) => void

  setDraggingTaskId: (taskId: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void
}

const storeApi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/immer", never]]> = (set, get) => ({

  tasks: {
    'ABC-1': { id: "ABC-1", title: "Task 1", status: "open" },
    'ABC-2': { id: "ABC-2", title: "Task 2", status: "in-progress" },
    'ABC-3': { id: "ABC-3", title: "Task 3", status: "open" },
    'ABC-4': { id: "ABC-4", title: "Task 4", status: "open" },
  },

  getTaskByStatus: (status) => {
    const tasks = get().tasks

    return Object.values(tasks).filter(task => task.status === status)
  },

  setDraggingTaskId: (taskId) => {
    set(({ draggingTaskId: taskId }))
  },

  removeDraggingTaskId: () => {
    set(({ draggingTaskId: undefined }))
  },
  changeTaskStatus: (taskId, status) => {
    // const task = get().tasks[taskId]
    // task.status = status

      set((state: TaskState) => {
        state.tasks[taskId].status = status
      })

    // set(state => ({
      
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task
    //   }

    // }))
  },

  onTaskDrop: (status) => {
    const taskId = get().draggingTaskId
    if ( !taskId ) return 

    get().changeTaskStatus(taskId, status)
    get().removeDraggingTaskId()

  },

  addTask: (title, status) => {

    const newTask: Task = { id: uuidv4(), title, status }

    set(state => {
      state.tasks[newTask.id] = newTask
    })

    // Requiere npm i immer
    // set(produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask
    //   }))

    // forma nativa de zustand sin immer

    // set(state => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask
    //   }
    // }))

  }

})

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      immer( storeApi ),
      { name: "task-store" }
    )
  )
)
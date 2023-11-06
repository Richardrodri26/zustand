import { useState } from "react"
import { useTaskStore } from "../stores"
import swal from 'sweetalert2'
import { TaskStatus } from "../interfaces"

interface Options {
  status: TaskStatus
}

export const useTasks = ({ status }: Options) => {
  const isDragging = useTaskStore(state => !!state.draggingTaskId)
  const onTaskDrop = useTaskStore(state => state.onTaskDrop)
  const addTask = useTaskStore(state => state.addTask)
  const [onDragOver, setOnDragOver] = useState(false)

  const handleAddTask = async () => {

    const { isConfirmed, value } = await swal.fire({
      title: 'Nueva Tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Ingrese el nombre de la tarea',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe de ingresar un nombre para la tarea'
        }
      }
    })

    if (!isConfirmed) return 

    addTask(value, status)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(false)
  }
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    onTaskDrop(status)
    setOnDragOver(false)
  }

  return {
    isDragging,
    onDragOver,

    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
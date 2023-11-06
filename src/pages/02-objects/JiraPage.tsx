import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {

  const doneTask = useTaskStore(state => state.getTaskByStatus("done"))
  const inProgressTask = useTaskStore(state => state.getTaskByStatus("in-progress"))
  const pendingTasks = useTaskStore(state => state.getTaskByStatus("open"))

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks tasks={pendingTasks} title='Pendientes' status='open' />
          
          <JiraTasks tasks={inProgressTask} title='Avanzando' status='in-progress' />
          
          <JiraTasks tasks={doneTask} title='Terminadas' status='done' />

      </div>

      



    </>
  );
};
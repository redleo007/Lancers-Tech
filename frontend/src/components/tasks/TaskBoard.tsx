import React from 'react'
import useTaskStore from '../../store/taskstore'


const columns = ['todo', 'inprogress', 'done'] as const


const TaskBoard: React.FC = () => {
const tasks = useTaskStore((s: { tasks: any }) => s.tasks)
const move = useTaskStore((s: { moveTask: any }) => s.moveTask)


return (
<div className="task-board">
{columns.map((col) => (
<div key={col} className="task-column">
<h4>{col.toUpperCase()}</h4>
{tasks.filter((t: { status: string }) => t.status === col).map((task: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }) => (
<div key={task.id} className="task-card">
<div>{task.title}</div>
<div className="task-actions">
{col !== 'todo' && <button onClick={() => move(task.id, 'todo')}>To TODO</button>}
{col !== 'inprogress' && <button onClick={() => move(task.id, 'inprogress')}>To InProgress</button>}
{col !== 'done' && <button onClick={() => move(task.id, 'done')}>To Done</button>}
</div>
</div>
))}
</div>
))}
</div>
)
}


export default TaskBoard
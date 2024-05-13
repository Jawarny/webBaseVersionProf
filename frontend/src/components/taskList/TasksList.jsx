import Card from "../UIElements/Card";
import TaskItem from "../taskItem/TaskItem";

import "./TasksList.css";

const TaskList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="task-list center">
        <Card>
          <h2>No tasks found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="task-list">
      {props.items.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          image={task.imageUrl}
          title={task.title}
          description={task.description}
          creatorId={task.creator}
        />
      ))}
    </ul>
  );
};

export default TaskList;

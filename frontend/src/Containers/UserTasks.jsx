import { useParams } from "react-router-dom";
import TasksList from "../components/taskList/TasksList";
import TASKS from "../data/tasks";

const UserTasks = () => {
  const userId = useParams().userId;
  const loadedTasks = TASKS.filter((task) => task.creator === userId);
  return <TasksList items={loadedTasks} />;
};

export default UserTasks;

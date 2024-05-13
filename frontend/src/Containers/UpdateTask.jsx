import { useParams } from "react-router-dom";

import "./TaskForm.css";
import TASKS from "../data/tasks";

export default function UpdateTask() {
  const taskId = useParams().taskId;
  const taskSelected = TASKS.find((t) => t.id === taskId);

  if (!taskSelected) {
    return (
      <div className="center">
        <h2>Could not find task!</h2>
      </div>
    );
  }

  function addTaskSubmitHandler(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const updatedTask = {
      id: "u1Test",
      title: data.title,
      description: data.description,
      pictureUrl: data.pictureUrl,
      creator: "u1",
    };
    TASKS.push(newTask);
    console.log(TASKS);
    event.target.reset();
  }

  return (
    <form onSubmit={addTaskSubmitHandler}>
      <h2>Update Task</h2>

      <div className="control">
        <label htmlFor="title">Task title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={taskSelected.title}
        />
      </div>

      <div className="control">
        <label htmlFor="description">Task description</label>
        <textarea
          id="description"
          type="text"
          name="description"
          rows="4"
          cols="35"
          defaultValue={taskSelected.description}
        />
      </div>

      <div className="control">
        <label htmlFor="pictureUrl">Picture url</label>
        <input
          id="pictureUrl"
          type="text"
          name="pictureUrl"
          defaultValue={taskSelected.imageUrl}
        />
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Update
        </button>
      </p>
    </form>
  );
}

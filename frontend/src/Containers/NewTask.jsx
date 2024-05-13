import { useContext } from 'react';
import TASKS from '../data/tasks';
import './TaskForm.css';
import { AuthContext } from '../context/auth-context';
import { useHttpClient } from '../hooks/http-hook';
import ModalMessageErreur from '../components/UIElements/ModalMessageErreur';
import Spinner from '../components/UIElements/LoadingSpinner';

const NewTask = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  async function addTaskSubmitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const newTask = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: '1',
      assignee: 'u1',
    };
    console.log(JSON.stringify(newTask));

    console.log('---------------');

    await sendRequest(
      'http://localhost:5000/api/tasks',
      'POST',
      JSON.stringify(newTask),
      {
        Authorization: 'Bearer ' + auth.token,
      }
    );
    event.target.reset();
  }

  return (
    <form onSubmit={addTaskSubmitHandler}>
      <h2>New Task</h2>
      <div>
        {isLoading && <Spinner />}
        <ModalMessageErreur message={error} onClose={() => clearError()} />
      </div>

      <div className="control">
        <label htmlFor="title">Task title</label>
        <input id="title" type="text" name="title" />
      </div>

      <div className="control">
        <label htmlFor="description">Task description</label>
        <textarea
          id="description"
          type="text"
          name="description"
          rows="4"
          cols="35"
        />
      </div>

      <div className="control">
        <label htmlFor="dueDate">Date</label>
        <input id="dueDate" type="text" name="dueDate" />
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Add
        </button>
      </p>
    </form>
  );
};

export default NewTask;

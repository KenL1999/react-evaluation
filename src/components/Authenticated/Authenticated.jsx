import * as React from "react";
import s from "./Authenticated.module.css";
import { BadgeAlert, Trash2 } from "lucide-react";
import { filterTasks, sortTasks } from "./utils";
import { useAuth } from "../../contexts/authContext";
import Button from "../Button";
import {
  getTasks,
  createTask,
  editTask,
  deleteTask,
} from "../../services/tasks";

function Authenticated() {
  // const logout = () => {};
  const { logout } = useAuth();
  const [status, setStatus] = React.useState("idle");
  const [formStatus, setFormStatus] = React.useState("idle");
  const [tasks, setTasks] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("");
  const [filters, setFilters] = React.useState({
    onlyPending: false,
    onlyImportant: false,
  });

  React.useEffect(() => {
    setStatus("loading");
    const fetchUserTasks = async () => {
      try {
        const userTasks = await getTasks();
        setTasks(userTasks);
        setStatus("success");
      } catch (error) {
        console.error("Error to get the tasks", error);
        setStatus("error");
      }
    };
    fetchUserTasks();
  }, []);

  const handleFilterChange = (event) => {
    const { id, checked } = event.target;
    setFilters({ ...filters, [id]: checked });
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortBy(value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = Object.fromEntries(formData.entries());

    // crear task
    try {
      setFormStatus("loading");

      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
      setFormStatus("idle");
    } catch (error) {
      console.error("Error to create the task", error);
      setFormStatus("error");
    }
  }

  async function handleEdit(task) {
    // editar task
    try {
      await editTask(task.id, { important: !task.important });
      const dataTask = await getTasks();
      setTasks(dataTask);
      setStatus("success");
    } catch (error) {
      console.error("error to edit the task", error);
    }
  }

  async function handleDelete(id) {
    // eliminar task
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("error to delete the task", error);
    }
  }

  async function handleComplete(task) {
    try {
      await editTask(task.id, { completed: !task.completed });
      const dataTask = await getTasks();
      setTasks(dataTask);
      setStatus("success");
    } catch (error) {
      console.error("error to complete the task", error);
    }
  }

  const isLoading = status === "loading";
  const isCreating = formStatus === "loading";

  const filteredTasks = filterTasks(tasks, filters);
  const sortedTasks = sortTasks(filteredTasks, sortBy);

  return (
    <>
      <form className={s["task-form"]} onSubmit={handleSubmit}>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="do the dishes"
          required
          aria-label="title"
          disabled={isCreating}
        />
        <input
          id="due_date"
          type="date"
          name="due_date"
          aria-label="due_date"
          disabled={isCreating}
        />
        <Button disabled={isCreating}>
          {isCreating ? "Adding..." : "Add task"}
        </Button>
      </form>

      <div className={s["tasks-wrapper"]}>
        <aside className={s.aside}>
          <div className={s["input-group"]}>
            <label htmlFor="sort_by">Sort by</label>
            <select id="sort_by" onChange={handleSortChange}>
              <option value="due_date-asc">Due Date (old first)</option>
              <option value="due_date-desc">Due Date (new first)</option>
              <option value="alphabetical-asc">Alphabetical (a-z)</option>
              <option value="alphabetical-desc">Alphabetical (z-a)</option>
            </select>
          </div>
          <div className={s["input-group"]}>
            <label>Filter</label>
            <div className={s.checkbox}>
              <input
                type="checkbox"
                id="onlyPending"
                checked={filters.onlyPending}
                onChange={handleFilterChange}
              />
              <label htmlFor="onlyPending">Only pending</label>
            </div>
            <div className={s.checkbox}>
              <input
                type="checkbox"
                id="onlyImportant"
                checked={filters.onlyImportant}
                onChange={handleFilterChange}
              />
              <label htmlFor="onlyImportant">Only important</label>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        </aside>
        <div className={s["tasks-list"]}>
          {(isLoading || isCreating) && <p>Loading...</p>}

          {tasks.length > 0 &&
            sortedTasks.map((task) => (
              <div key={task.id} className={s["task-wrapper"]}>
                <div className={s["task-data"]}>
                  <input
                    key={task.id}
                    type="checkbox"
                    id={task.id}
                    checked={task.completed}
                    onChange={() => {
                      handleComplete(task);
                    }}
                  />
                  <div className={s["title-wrapper"]}>
                    <label htmlFor={task.id} className={s["task-title"]}>
                      {task.title}
                    </label>
                    <small className={s["task-due_date"]}>
                      {task["due_date"]}
                    </small>
                  </div>
                </div>
                <div className={s.actions}>
                  <Button
                    variant={task.important ? "primary" : "outline"}
                    onClick={() => {
                      handleEdit(task);
                    }}
                  >
                    <BadgeAlert />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Authenticated;

"use client";

import { useState } from "react";
import { TaskItem } from "./task-item";
import styles from "./task-list.module.css";

export type Task = {
  id: string;
  title: string;
  state: "PINNED" | "COMPLETED" | "ACTIVE";
};

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [tasksList, setTasksList] = useState<Task[]>(tasks);
  const [newTaskValue, setNewTaskValue] = useState("");

  const handleAdd = () => {
    if (newTaskValue === "") {
      return;
    }
    const newTask: Task = {
      id: Math.random().toString(),
      title: newTaskValue,
      state: "ACTIVE",
    };
    setTasksList([...tasksList, newTask]);
    setNewTaskValue("");
  };

  const handleDelete = (id: string) => {
    const newTasksList = tasksList.filter((task) => task.id !== id);
    setTasksList(newTasksList);
  };

  const handleToggleCompleted = (id: string) => {
    const newTasksList = tasksList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          state: (task.state === "ACTIVE" ? "COMPLETED" : "ACTIVE") as
            | "PINNED" | "COMPLETED" | "ACTIVE",
        };
      }
      return task;
    });
    setTasksList(newTasksList);
  };

  const countActiveTask = () => {
    return tasksList.filter((task) => task.state === "ACTIVE").length;
  };

  console.log("👉", tasksList);

  return (
    <>
      <div>
        <section className={styles.counter}>
          <div className={styles.taskLabel}>{countActiveTask()} tasks</div>
        </section>
        <section className={styles.section}>
          {tasksList.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleDelete={handleDelete}
              handleToggleCompleted={handleToggleCompleted}
            />
          ))}
        </section>
      </div>
      <section className={styles.inputContainer}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.taskInput}
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
        />
        <button className={styles.taskButton} onClick={handleAdd}>
          Add Task
        </button>
      </section>
    </>
  );
}

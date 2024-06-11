import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { Edit_todo } from "./Edit_todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Todo = () => {
  const [task, setTask] = useState([]);
  const [newtask, setnewtask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const inputreft = useRef(null);
  useEffect(() => {
    if (inputreft.current) {
      inputreft.current.focus();
    }
  }, []);
  const handlechangeiput = (event) => {
    setnewtask(event.target.value);
    // console.log(event.target.value);
  };
  const handlepress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  // Thêm task
  const addTask = () => {
    const trimmedTask = newtask.trim();
    const isTextOnly = /^[\p{L}\s.,!?]+$/u.test(newtask);

    if (trimmedTask && isTextOnly) {
      const isDuplicate = task.some(
        (item) => item.text.toLowerCase() === trimmedTask.toLowerCase()
      );

      if (!isDuplicate) {
        const newItem = {
          id: uuidv4(),
          text: trimmedTask,
        };
        console.log(newItem.id);
        setTask([...task, newItem]);
        setnewtask("");
        if (inputreft.current) {
          inputreft.current.focus();
        }
        toast.success("Task Add successfully!");
      } else {
        toast.error("Task already exists!");
      }
    } else {
      toast.error("Task should contain only text !");
    }
  };

  //Xóa Task
  const deleteTask = (id) => {
    const deleteTasks = task.filter((item) => item.id !== id);
    setTask(deleteTasks);
    toast.success("Task Remove successfully!");
  };

  // Sửa
  const handleEdit = (id) => {
    const taskToEdit = task.find((item) => item.id === id);
    setEditingTask(taskToEdit);
    setShowModal(true);
  };
  const saveEditedTask = (editedTask) => {
    const updatedTasks = task.map((item) =>
      item.id === editedTask.id ? editedTask : item
    );
    setTask(updatedTasks);
    setEditingTask(null);
    setShowModal(false); // Đóng modal sau khi lưu thành công
    toast.success("Task Edit successfully!");
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <div className="todo">
      <div className="todo__list">
        <h1>To-do-app</h1>
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter your task..."
            onChange={handlechangeiput}
            ref={inputreft}
            value={newtask}
            onKeyDown={handlepress}
          />
          <button className="btn__add" onClick={addTask}>
            Add
          </button>
        </div>
        <ul>
          {task.map((item, index) => {
            return (
              <li key={item.id}>
                {item.text}
                <div className="todo__item">
                  <div className="item__delete">
                    <FaTrash
                      onClick={() => {
                        deleteTask(item.id);
                      }}
                    ></FaTrash>
                  </div>
                  <div className="item__edit">
                    <FaRegEdit onClick={() => handleEdit(item.id)} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <ToastContainer />

      {showModal && (
        <Edit_todo
          todo={editingTask}
          onSave={saveEditedTask}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
// Dự án todo ap đơn giản

import React, { useState } from "react";
import Modal from "react-modal";

export const Edit_todo = ({ onSave, onClose, todo }) => {
  const [editTodo, setEditTodo] = useState(todo.text);

  const handleChangeEdit = (event) => {
    setEditTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ ...todo, text: editTodo });
    onClose();
  };

  return (
    <div className="Edit__container">
      <Modal isOpen={true} className="modal__list" >
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={editTodo} onChange={handleChangeEdit} />
        <button type="submit" className="btn__save">Save</button>
        <button type="button" className="btn__close" onClick={onClose}>
          Cancel
        </button>
      </form>
      </Modal>
    </div>
  );
};

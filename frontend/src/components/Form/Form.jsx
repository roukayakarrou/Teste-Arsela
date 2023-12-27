import React, { useState } from "react";
import { ShareModal } from "@components";
import useBearStore from "../../state/State";
import { useDrop, useDrag } from "react-dnd";
import { FaTimes } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";
import "./Form.css";

const toolboxItemComponents = {
  label: ({ label, onRemove }) => (
    <div className="dropped-item-content">
      <label>{label}</label>
      <button className="remove-button" onClick={onRemove}>
        <FaTimes />
      </button>
    </div>
  ),
  input: ({ label, onRemove }) => (
    <div className="dropped-item-content">
      <input placeholder={label} />
      <button className="remove-button" onClick={onRemove}>
        <FaTimes />
      </button>
    </div>
  ),
  checkbox: ({ onRemove }) => (
    <div className="dropped-item-content">
      <input type="checkbox" />
      <button className="remove-button" onClick={onRemove}>
        <FaTimes />
      </button>
    </div>
  ),
  radiobox: ({ onRemove }) => (
    <div className="dropped-item-content">
      <input type="radio" />
      <button className="remove-button" onClick={onRemove}>
        <FaTimes />
      </button>
    </div>
  ),
  calendar: ({ onRemove }) => (
    <div className="dropped-item-content">
      <input type="date" />
      <button className="remove-button" onClick={onRemove}>
        <FaTimes />
      </button>
    </div>
  ),
};

function Form() {
  const [droppedItems, setDroppedItems] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [formId, setFieldId] = useState("");
  const setSecretKey = useBearStore((state) => state.setSecretKey);

  const [, drop] = useDrop({
    accept: "toolboxItem",
    drop: (item) => {
      const uniqueId = `${item.id}-${Math.random().toString(36).substr(2, 9)}`;
      setDroppedItems((prev) => [...prev, { ...item, uniqueId }]);
    },
  });

  const [, drag] = useDrag({
    type: "droppedItem",
  });

  const handleRemoveItem = (uniqueId) => {
    const updatedItems = droppedItems.filter((item) => item.uniqueId !== uniqueId);
    setDroppedItems(updatedItems);
  };

  const handleSaveForm = () => {
    if (droppedItems.length > 0) {
      console.log("Dropped Items:", droppedItems);

      const currentSecretKey = useBearStore.getState().secretKey;
      const payload = { data: droppedItems };

      // Check if secretKey is not empty and add it to the payload
      if (currentSecretKey && currentSecretKey.trim() !== "") {
        payload.secretKey = currentSecretKey;
      }

      axios.post(`${import.meta.env.VITE_API_URL}/form`, payload)
        .then((response) => {

          const newSecretKey = response.data.secretKey;
          const newFieldId = response.data.id;

          if (newSecretKey && newSecretKey.trim() !== "") {
            setSecretKey(newSecretKey);
          }

          setFieldId(newFieldId);

          setDroppedItems([]);
          setShowShareModal(true);
        })
        .catch((error) => {
          console.error("Error during POST request:", error);
        });
    } else {
      console.log("No items dropped.");
    }
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  return (
    <div className="form" id="form" ref={drop}>
      <h2>Form Title</h2>
      <div className="dropped-items">
        {droppedItems.map((item, index) => (
          <div key={item.uniqueId} className="dropped-item" ref={(node) => drag(node, { index })}>
            {toolboxItemComponents[item.id] ? (
              React.createElement(toolboxItemComponents[item.id], {
                ...item,
                onRemove: () => handleRemoveItem(item.uniqueId),
              })
            ) : (
              <div>Unknown item type: {item.id}</div>
            )}
          </div>
        ))}
      </div>
      <div className="controls">
        <button id="save-form" onClick={handleSaveForm}>
          <FaRegSave /> Save My Form
        </button>
      </div>
      <ShareModal show={showShareModal} handleClose={handleCloseShareModal} url={`http://localhost:5173/submit-form/${formId}`} />
    </div>
  );
}

export default Form;

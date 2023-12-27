import "./Submit.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "@components";
import { useParams } from "react-router-dom";

const TextInputField = ({ label }) => (
  <div>
    <label>{label}</label>
    <input type="text" />
  </div>
);

const CheckboxField = ({ label }) => (
  <div>
    <label>
      <input type="checkbox" />
      {label}
    </label>
  </div>
);

const RadioField = ({ label }) => (
  <div>
    <label>
      <input type="radio" />
      {label}
    </label>
  </div>
);

const DateInputField = ({ label }) => (
  <div>
    <label>{label}</label>
    <input type="date" />
  </div>
);

function Form() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/form/${id}`);
        setFormData(response.data.form.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred while fetching form data");
        }
      }
    };

    fetchData();
  }, [id]);

  // mapping of component types to React components
  const componentMap = {
    label: TextInputField,
    radiobox: RadioField,
    calendar: DateInputField,
  };

  const renderField = (field) => {
    const Component = componentMap[field.id];

    if (!Component) {
      return <div key={field.uniqueId}>Unknown field type: {field.id}</div>;
    }
    return <Component key={field.uniqueId} label={field.label} />;
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="submit-body">
          {error ? (
            <p className="error">{error}</p>
          ) : formData ? (
            <>
              <div className="form-content">
                {/* <h1>Form Content here</h1> */}
                {formData.map(renderField)}
              </div>
              <div className="controls">
                <button>Submit</button>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;

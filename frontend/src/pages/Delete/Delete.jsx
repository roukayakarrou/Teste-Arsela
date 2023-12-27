import { useState, useEffect } from "react";
import useBearStore from "../../state/State"
import Modal from "react-modal";
import axios from "axios";
import "./Delete.css";
import { Header, Nav, Footer } from "@components";

function Delete() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forms, setForms] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const secretKey = useBearStore((state) => state.secretKey);
  const setSecretKey = useBearStore((state) => state.setSecretKey)

  useEffect(() => {
    const storedSecretKey = localStorage.getItem("form_secret_key");
    setSecretKey(storedSecretKey)

    if (!storedSecretKey) {
      setIsModalOpen(true);
    } else {
      fetchFormsData(storedSecretKey);
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSecretKey = () => {
    if (secretKey.trim() !== "") {
      localStorage.setItem("form_secret_key", secretKey.trim());
      closeModal();
      fetchFormsData(secretKey.trim());
    } else {
      console.error("Invalid secret key");
    }
  };

  const fetchFormsData = async (key) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/my/forms`,
        {
          secretKey: key,
        }
      );

      setForms(response.data.data);
      setErrorMsg(null);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMsg("No forms were found");
      } else {
        console.error("Error fetching forms data:", error);
        setErrorMsg(`Error fetching forms data: ${error.message}`);
      }
    }
  };

  const deleteForm = async (formId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/form/${formId}`,{
        data: {secretKey: secretKey}
      });

      fetchFormsData(secretKey.trim());
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An error occurred while fetching form data");
      }
    }
  };

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      padding: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <>
      <Header />
      <div className="delete-body">
        <Nav />
        <div className="forms-list">
          <h2>Delete a form</h2>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Delete Secret Key Modal"
            style={modalStyles}
          >
            <h2 style={{ color: "black", marginBottom: "10px", fontFamily: "var(--main-font)" }}>
              We couldn't find a saved secret key
            </h2>
            <p style={{ color: "black", marginBottom: "15px", fontFamily: "var(--main-font)" }}>
              Please enter your secret key to access your forms:
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                name="Secret Key"
                type="text"
                // prevents value cannot be none
                value={secretKey || ""}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter your secret key"
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontFamily: "var(--main-font)",
                }}
              />
              <button
                style={{
                  backgroundColor: "rgba(173, 216, 230, 0.5)",
                  color: "black",
                  padding: "10px",
                  cursor: "pointer",
                  fontFamily: "var(--main-font)",
                  borderRadius: "5px",
                  border: "none",
                }}
                onClick={handleSaveSecretKey}
              >
                Save Secret Key
              </button>
            </div>
          </Modal>

          {errorMsg && <p style={{ color: "red", fontFamily: "var(--main-font)" }}>{errorMsg}</p>}

          {forms.length > 0 && (
            <div>
              <h3 style={{ color: "black", fontFamily: "var(--main-font)" }}>Your Forms:</h3>
              {forms.map((form) => (
                <div key={form._id} style={{ marginBottom: "10px" }}>
                  <button
                    style={{
                      backgroundColor: "rgba(173, 216, 230, 0.5)",
                      color: "black",
                      padding: "10px",
                      cursor: "pointer",
                      fontFamily: "var(--main-font)",
                      borderRadius: "5px",
                      border: "none",
                    }}
                  >
                    {/* {form.name} - {form.id} */}
                    {form._id}
                  </button>
                  <button
                    key={`delete-${form._id}`}
                    style={{
                      backgroundColor: "rgba(173, 216, 230, 0.5)",
                      color: "black",
                      padding: "5px",
                      cursor: "pointer",
                      fontFamily: "var(--main-font)",
                      borderRadius: "5px",
                      border: "none",
                      marginLeft: "5px",
                    }}
                    onClick={() => deleteForm(form._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Delete;
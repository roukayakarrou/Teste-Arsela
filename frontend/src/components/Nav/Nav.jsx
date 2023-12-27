import "./Nav.css";
import { useState } from "react";
import useBearStore from "../../state/State"
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Modal from "react-modal";


function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const secretKey = useBearStore((state) => state.secretKey);
  const setSecretKey = useBearStore((state) => state.setSecretKey)

  const navigateTo = (to) => {
    navigate(to);
  };

  const handleDeleteSecretKey = () => {
    const storedSecretKey = localStorage.getItem("form_secret_key");
    setSecretKey(storedSecretKey);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteSecretKey = () => {
    localStorage.removeItem("form_secret_key");
    setSecretKey("")
    setIsDeleteModalOpen(false);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    // backgroundColor will change depending on current pathname
    <div className="nav">
      <h2>No sign-up needed!</h2>
      <span
        style={{ backgroundColor: location.pathname === "/" ? "rgba(173, 216, 230, 0.5)" : "transparent" }}
        onClick={() => navigateTo("/")}
      >
        <IoMdAddCircle /> Create a new form
      </span>
      <span
        style={{ backgroundColor: location.pathname === "/delete" ? "rgba(173, 216, 230, 0.5)" : "transparent" }}
        onClick={() => navigateTo("/delete")}
      >
        <MdDeleteForever /> Delete a form
      </span>
      <span
        style={{ backgroundColor: location.pathname === "/view-submissions" ? "rgba(173, 216, 230, 0.5)" : "transparent" }}
        onClick={() => navigateTo("/view-submissions")}
      >
        <FaEye /> View form submissions
      </span>
      <span onClick={handleDeleteSecretKey}>
        <RiLogoutCircleRLine /> Delete my secret key
      </span>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Secret Key Modal"
        style={{
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
        }}
      >
        <h2 style={{ color: "black", marginBottom: "10px", fontFamily: "var(--main-font)" }}>
          Make sure you've written your secret key somewhere safe!
        </h2>
        <p style={{ color: "black", marginBottom: "15px", fontFamily: "var(--main-font)" }}>
          Your secret key: {secretKey}
        </p>
        <p style={{ color: "black", fontFamily: "var(--main-font)" }}>This will delete your saved secret key from your browser</p>
        <p style={{ color: "black", fontFamily: "var(--main-font)" }}>Are you sure you want to delete it?</p>
        <button
          style={{
            backgroundColor: "rgba(173, 216, 230, 0.5)",
            color: "black",
            padding: "10px",
            marginRight: "10px",
            cursor: "pointer",
            fontFamily: "var(--main-font)",
            borderRadius: "5px",
            border: "none",
          }}
          onClick={confirmDeleteSecretKey}
        >
          Confirm
        </button>
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
          onClick={closeModal}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
}

export default Nav;
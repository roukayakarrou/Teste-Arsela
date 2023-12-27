import "./ShareModal.css";
import React, { useState } from "react";
import ClipboardCopy from "clipboard-copy";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share";
import Modal from "react-modal";

const ShareModal = ({ show, handleClose, url, secretKey }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    ClipboardCopy(url);
    setCopied(true);
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      contentLabel="Share Success"
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
      <button className="close-button" onClick={handleClose}>
        &times;
      </button>
      <div className="modal-body">
      <h3>Your Form Was Successfully Generated</h3>
        <p>{url}</p>
        <p>Secret key: {secretKey}</p>
        <p className="info">Keep this secret key safe, it's the only way you can manage you form</p>
        
        <button className="copy-button" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
        <div className="social-buttons">
          <FacebookShareButton url={url} quote="Check out my form">
            <FacebookIcon size={32} round />
          </FacebookShareButton>{" "}
          <TwitterShareButton url={url} title="Check out my form">
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          {/* Add more social sharing options as needed */}
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;

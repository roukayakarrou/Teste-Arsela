// const config = require("../config/config");
const Form = require("../models/forms.model");
const { Types } = require("mongoose");

const createForm = async (req, res) => {
  try {
    
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Request body cannot be empty"
        });
      }

    const form = await Form.create(req.body);
    await form.save();
    return res.status(201).json({
      success: true,
      secretKey: form.secretKey,
      id: form._id
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    console.error("[+] Error creating a form:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

const readForm = async (req, res) => {
  try {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid form id format"
      });
    }

    const form = await Form.findById(id, {
      secretKey: 0,
      updatedAt: 0,
      createdAt: 0,
      __v: 0,
      _id: 0,
    });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: `Form with id ${id} was not found`
      });
    }

    return res.status(200).json({
      success: true,
      form
    });
  } catch (error) {
    console.error("[+] Error reading a form:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

const deleteForm = async (req, res) => {
  try {
    
    if (!req.body || !req.body.secretKey || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request is empty or missing the secretKey"
      });
    }

    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid id format"
      });
    }
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: `Form with id ${id} was not found`
      });
    }
    const secretKeyFromBody = req.body.secretKey;
    if (secretKeyFromBody !== form.secretKey) {
      return res.status(401).json({
        success: false,
        message: "Invalid secretKey"
      });
    }
    
    const deletedForm = await Form.findByIdAndDelete(id);
    if (!deletedForm) {
      return res.status(404).json({
        success: false,
        message: `Form with id ${id} was not found`
      });
    }
    return res.status(200).json({
      success: true,
      message: "Form has been deleted"
    });
  } catch (error) {
    console.error("[+] Error deleting a form:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

const getForms = async (req, res) => {
  try {
    if (!req.body || !req.body.secretKey || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request is empty or missing the secretKey"
      });
    }

    const secretKeyFromBody = req.body.secretKey;

    const forms = await Form.find({ secretKey: secretKeyFromBody }).select({
      secretKey: 0,
      updatedAt: 0,
      createdAt: 0,
      __v: 0,
    });

    if (forms.length === 0) {
      return res.status(401).json({
        success: false,
        message: "No forms found with the provided secretKey"
      });
    }

    return res.status(200).json({
      success: true,
      data: forms,
      message: "Forms data retrieved successfully"
    });
  } catch (error) {
    console.error("[+] Error retrieving forms data:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};



module.exports = { createForm, readForm, deleteForm, getForms };
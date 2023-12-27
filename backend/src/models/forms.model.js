const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  secretKey: {
    type: String,
    default: () => nanoid(10),
    // unique: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true
});

formSchema.pre("save", function(next) {
  if (!this.secretKey) {
    this.secretKey = nanoid(10);
  }
  next();
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;

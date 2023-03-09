const mongoose = require("mongoose");

//defining patient schema
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  //storing the ref of report so that it will help while gettign users reports
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

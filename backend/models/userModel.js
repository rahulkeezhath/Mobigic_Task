const mongooose = require('mongoose')

const userSchema = new mongooose.Schema({
  username: {
    type: String,
    required: [true, "Please Add Username"],
  },
  password: {
    type: String,
    required: [true, "Please Add Password"],
  },
});

module.exports = mongooose.model("User", userSchema)
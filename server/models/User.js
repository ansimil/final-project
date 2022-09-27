const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    wishlist: [{
      type: Schema.Types.ObjectId,
      ref: 'Wishlist'
    }],
    cart: [{
      type: Schema.Types.ObjectId,
      ref: 'Cart'
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

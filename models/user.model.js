const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  student_id: { type: String, required: true },
  year: { type: Number, required: true },
  profile_picture: { type: String }
}, {
  timestamps: true // This adds createdAt and updatedAt timestamps
});

const User = mongoose.model('User', UserSchema);
export default User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  district: String,
  province: String,
});

const SocialMediaSchema = new Schema({
  facebook: String,
  line: String,
  instagram: String,
  google_id: String
})

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  nickname: String,
  username: String,
  password: String,
  email: String,
  image_path: String,
  privilege: String,
  approved: String,
  social_media: SocialMediaSchema,
  address: AddressSchema
});


const User = mongoose.model('user', UserSchema);

module.exports = User;
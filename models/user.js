const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  street: String,
  state: String,
  province: String,
  postcode: String,
  country: String
});

const SocialMediaSchema = new Schema({
  facebook: String,
  line: String,
  instagram: String
})

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  nickname: String,
  username: String,
  password: String,
  email: String,
  image_path: String,
  google_id: String,
  privilege: String,
  social_media: SocialMediaSchema,
  address: AddressSchema

});


const User = mongoose.model('user', UserSchema);

module.exports = User;
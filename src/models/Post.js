const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

PostSchema.pre('save', function() {
  !this.url ? this.url = `${process.env.APP_URL}/files/${this.key}` : this.url = this.url
}) ;

module.exports = mongoose.model("Post", PostSchema);

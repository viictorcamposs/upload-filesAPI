const mongoose = require('mongoose');
const aws = require('aws-sdk');
const path = require('path');
const { unlink } = require('fs');
const { promisify } = require('util');

const s3 = new aws.S3();

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

PostSchema.pre('remove', async function() {
  if(process.env.STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: 'uploadfiles-api',
      Key: this.key
    }).promise()
  } else {
    return promisify(unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key))
  }
});

module.exports = mongoose.model("Post", PostSchema);

'use strict';

// External Modules
const path = require('path');
const axios = require('axios');
const fetch = require('node-fetch');
const formdata = require('form-data');

// Internal Modules
// const { regexUrl } = require(path.join(__dirname, '..', 'library', 'functions'));

function uploadByBuffer(buffer, contentType = 'image/png', agent) {
  return new Promise(async (resolve, reject) => {
    if (!Buffer.isBuffer(buffer)) return reject('Buffer is not a buffer');
    const formData = new formdata();
    formData.append('photo', Buffer.from(buffer), {
      filename: 'blob',
      contentType,
      ...agent && { agent }
    });
    await axios({
      method: 'POST',
      url: 'https://telegra.ph/upload',
      data: formData.getBuffer(),
      headers: {
        ...formData.getHeaders()
      }
    }).then(({ data }) => {
      if (data.error) return reject(data.error);
      resolve({
        link: 'https://telegra.ph' + data[0].src,
        path: data[0].src,
      });
    }).catch(reject);
  });
}
async function uploadByUrl(url, contentType = 'image/png', agent) {
  //if (!regexUrl(url)) throw 'invalid is url';
  const response = await fetch(url);
  const result = await response.body;
  if (!result) throw 'response is not stream';
  let chunks = new Array();
  for await (var cache of result) {
    chunks.push(cache);
  }
  const buffer = Buffer.concat(chunks);
  const lastResult = await uploadByBuffer(buffer, response.headers.get('content-type'), agent);
  return lastResult;
}

module.exports = { uploadByBuffer, uploadByUrl };
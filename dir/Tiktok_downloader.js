const xa = require('xfarr-api');

module.exports = async function (req, res) {
 url = req.query.url
  if(url==null) {
     res.send("module by xfarr. parameter search dibutuhkan, contoh: &url=https://vt.tiktok.com/ZSdoX6rGx/?k=1")
  } else {
        result = await xa.downloader.tiktok(url)
        return result
  }
}
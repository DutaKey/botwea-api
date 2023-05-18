const {uploadByBuffer,uploadByUrl} = require(process.cwd()+"/lib/telegraph.js")

module.exports = async function (req, res, path) {
  url = req.query.url
  type = req.query.type
  if(url==null) {
    res.render("../views/alert",{mslh: "parameter url required. telegraph posting gambar.<br><strong>Example:</strong> Not available", title: "Exam"})
  } else {
    return uploadByUrl(url)
  }
}
const axios = require("axios")
const cheerio = require("cheerio")

module.exports = async function (req, res, path) {
   search = req.query.search
  if(search==null){
    res.json({result: "query search required. contoh: &search=server-viko-dk-05-06"})
  } else {
    return axios.get(`https://telegra.ph/`+search).then((val) => {
    const $ = cheerio.load(val.data)

      // load header
      posted = $('body div.tl_page_wrap div.tl_page main header address a').text()
      title = $('body div.tl_page_wrap div.tl_page main header h1').text()
      date = $('body div.tl_page_wrap div.tl_page main header address time').text()
      con = $('body div.tl_page_wrap div.tl_page main').text().trim()
      image = $('article div.ql-editor figure div img').attr('src')
     return {
     Title: title,
     Posted: posted,
     Date: date,
     Content: con,
     img: image
    }
    })
  }
}
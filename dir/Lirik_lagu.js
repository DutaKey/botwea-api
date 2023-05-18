const hx = require('hxz-api');

module.exports = async function (req, res) {
 
  if(req.query.judul==null) {
    res.render(process.cwd()+"/views/docs/docsread.ejs", {title: "Example Lirik lagu", subtitle: `resource module npm by hxz-api. parameter query judul lagu dibutuhkan cuy, contoh: &judul=black catcher`, content: ""})
  } else {
      result = await hx.lirik(String(req.query.judul))
      return result
  }
}
const hx = require('hxz-api');

module.exports = async function (req, res) {
 
  if(req.query.user==null) {
    res.render(process.cwd()+"/views/docs/docsread.ejs", {title: "Example IGstalk", subtitle: `resource module npm by hxz-api. parameter query username dibutuhkan, contoh: &user=vikodwik_rmx`, content: ""})
  } else {
      result = hx.igstalk(req.query.user)
      return result
  }
}
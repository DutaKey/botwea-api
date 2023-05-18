const hx = require('hxz-api');

module.exports = async function (req, res) {
  if(req.query.judul==null) {
    res.send("resource module npm by hxz-api. Parameter query judul dibutuhkan cuyy, exam: &judul=pegunungan")
  } else {
   resl = await hx.pinterest(req.query.judul)
     return {type: "Array", url: resl}
  }
}
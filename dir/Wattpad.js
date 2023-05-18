const xa = require('xfarr-api');

module.exports = async function (req, res) {
 
  if(req.query.search==null) {
     res.send("module by xfarr. parameter search dibutuhkan, contoh: &search=cinta")
  } else {
      result = await xa.search.wattpad(req.query.search)
      return result
  }
}
const lib = require(process.cwd()+"/lib/function.js");

module.exports = async function(req, res) {
  let random_level = Math.floor(Math.random() * 135)
  let random_eq = Math.floor(Math.random() * 20)
  lvl = req.query.level
  foorm = `<form action="/api/TebakgambarV2" method="get">
  <input type="text" id="apikey" name="apikey" placeholder="Your apikey">
  <input type="text" id="username" name="username" value="${req.session.username}" placeholder="username">
  <label for="level">Choose a level:</label>
  <select id="level" name="level">
    <option value="10">10</option>
    <option value="30">30</option>
    <option value="50">50</option>
    <option value="90">90</option>
    <option value="999">999 max</option>
  </select>
  <input type="submit">
</form>`
  if (lvl == undefined) {
    res.render("../views/alert", { mslh: "parameter level require. bisa anda coba dibawah ini <br> " + foorm, title: "Exam" })
  } else {
    respon = await lib.tebakgambar(req, lvl)
    return respon
  }
}
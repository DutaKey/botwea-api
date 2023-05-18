const lib = require(process.cwd()+"/lib/function.js");

module.exports = async function (req, res) {
  // tampilan docs
  examp = await lib.gitagram("komang")
  const dataFile = `
<h3>URI Parameters</h3>
<p class="urlbg">&nbsp;GET</p>
<input type="text" class="url" disabled value="uri : https://api-1.brizyy.repl.co/api/Chord_music?apikey=${req.session.kunci || 'YOUR_APIKEY'}&username=${req.session.username || 'YOUR_USERNAME'}">
<p class="keybg">&nbsp;APIKEY</p>
<input type="text" class="key" disabled value="apikey : ${req.session.kunci || 'YOUR_APIKEY'}" disabled>
<p class="querybg">&nbsp;PARAMS</p>
<input type="text" class="query" disabled value="search : find something" disabled>
<h3>Result JSON</h3>
<textarea rows="8" cols="40">${JSON.stringify(examp, null, 2)}</textarea>
`
  let search = req.query.search
  if(search==null) {
    res.render(process.cwd()+"/views/docs/docsread.ejs", {title: "Example Chord music", subtitle: `menampilkan lirik + chord, sumber scraping data website <code><a href="https://gitagram.com/">gitagram.com</a></code>`, content: dataFile})
  } else {
    response = await lib.gitagram(search)
    return response
  }
}
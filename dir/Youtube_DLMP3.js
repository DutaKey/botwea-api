const yt = require('viko-ytdl');
const yts = require("yt-search");

module.exports = async function (req, res, path) {
  url = req.query.url
  foorm = `<form action="/api/Youtube_DLMP3" method="get">
  <label for="level">Input url from youtube:</label>
  <input type="text" id="url" name="url" placeholder="https://youtube.com/xxxxxx"><br><br>
    <input type="text" id="username" name="username" value="${req.session.username}" placeholder="username">
  <input type="text" id="apikey" name="apikey" placeholder="Your apikey">
  <input type="submit">
  </form>`
  if(url==undefined){
     res.render("../views/alert",{mslh: "parameter url required. format yang digunakan iyalah webm silahkan konversi webm ke mp3 menggunakan ffmpeg kedalam project anda, jika perlu<br><strong>Example:</strong> "+foorm, title: "Exam"})
  } else {
      return new Promise((resolve, reject) => {
      const id = yt.getVideoID(url)
      const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        
        let audio = []
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
            console.log(pormat[i].mimeType)
            let aud = pormat[i]
            audio.push(aud.url)
          }
        }
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
        const result = {
          title: title,
          thumb: thumb,
          channel: channel,
          published: published,
          views: views,
          url: audio[1]
        }
        return(result)
      })
      resolve(yutub)
    
      })
  }
}
const yt = require('ytdl-core');
const yts = require("yt-search");

module.exports = async function (req, res, path) {
  url = req.query.url
  foorm = `<form action="/api/Youtube_DLMP4" method="get">
  <label for="level">Input url from youtube:</label>
  <input type="text" id="url" name="url" placeholder="https://youtube.com/xxxxxx"><br><br>
    <input type="text" id="username" name="username" value="${req.session.username}" placeholder="username">
  <input type="text" id="apikey" name="apikey" placeholder="Your apikey">
  <input type="submit">
  </form>`
  if(url==undefined){
     res.render("../views/alert",{mslh: "parameter url required.<br><strong>Example:</strong> "+foorm, title: "Exam"})
  } else {
      return new Promise((resolve, reject) => {
    try {
      const id = yt.getVideoID(url)
      const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        let video = []
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
            let vid = pormat[i]
            video.push(vid.url)
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
          url: video[0]
        }
        return(result)
      })
      resolve(yutub)
    } catch (error) {
        reject(error);
      }
      console.log(error)
  })
  }
}
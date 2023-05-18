const axios = require("axios")
const cheerio = require("cheerio");

module.exports = async function (req, res) {
 
  if(req.query.msg==null) {
     res.send(" parameter query msg, img, tagname contoh: https://api.botwa.id/api/Quote_chat?apikey=APIKEY&username=XXXX&msg=Hai&tagname=viko&hex=96faac . fungsi hex: background color chat")
  } else {
    if(req.query.tagname==null) return res.json({result: "parameter &tagname require"})
      result = await quote(req.query.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgA-QWqNjqkToO6fNiofJlPgnxgaatMZDn848lrZrLVTti2nnkxLKnhWU&s=10", req.query.tagname, req.query.msg, "#"+req.query.hex)
      res.type('webp').send(result);
      return undefined 
  }
}

async function quote(url, username, message, color) {
    try {
      const postData = { type: 'quote', format: 'webp', backgroundColor: color || '#0b0b0b', width: 512, height: 768, scale: 2, messages: [{ entities: [], avatar: true, from: { id: 1, name: username, photo: { url } }, text: message, replyMessage: {} }] };
	    const response = await axios('https://bot.lyo.su/quote/generate', { method: 'POST', data: postData });
	    const getBaseResult = response.data.result.image;
	    const decode = Buffer.from(getBaseResult, 'base64');
	    return decode;
    } catch (error) {
      throw error;
    }
}
const googleTTS = require('google-tts-api');

module.exports = async function (req, res, path) {
  speech = req.query.text
  bhs = req.query.lang
  if (speech==null){
    res.json({result: "text required dibutuhkan parameter text contoh: &text=halo "})
  } else {
    
    if(bhs==null){
      res.json({result: "lang required dibutuhkan parameter lang untuk menambahkan bahasa yang akan diucapkan contoh: &lang=id berdasarkan ISO 639"})
    } else {
    const results = googleTTS.getAllAudioUrls(speech, {
  lang: bhs,
  slow: false,
  host: 'https://translate.google.com',
  splitPunct: ',.?',
  });
  return results
  }
  }
  
}
const axios = require("axios")
const cheerio = require("cheerio")

module.exports = async function (req, res) {
   if(req.query.info==null){
     return axios.get(`https://bmkg.go.id/`).then((val) => {
    const $ = cheerio.load(val.data)
    // load gempa
     SR = $('#meteorologi-geofisika div div  div.col-md-4.md-margin-bottom-10 div.gempabumi-home-bg.margin-top-13 div div.col-md-6.col-xs-6.gempabumi-detail.no-padding ul li:nth-child(2)').text()
     tgl = $('#meteorologi-geofisika div div div.col-md-4.md-margin-bottom-10 div.gempabumi-home-bg.margin-top-13 div div.col-md-6.col-xs-6.gempabumi-detail.no-padding ul li:nth-child(1) span').text()
      loc = $('#meteorologi-geofisika div div div.col-md-4.md-margin-bottom-10 div.gempabumi-home-bg.margin-top-13 div div.col-md-6.col-xs-6.gempabumi-detail.no-padding ul li:nth-child(4)').text()
      dalaman = $('#meteorologi-geofisika div div div.col-md-4.md-margin-bottom-10 div.gempabumi-home-bg.margin-top-13 div div.col-md-6.col-xs-6.gempabumi-detail.no-padding ul li:nth-child(3)').text()
      wilayahPusat = $('#meteorologi-geofisika div div div.col-md-4.md-margin-bottom-10 div.gempabumi-home-bg.margin-top-13 div div.col-md-6.col-xs-6.gempabumi-detail.no-padding ul li:nth-child(5)').text()
      Rd = $('#meteorologi-geofisika div div div.col-md-4.md-margin-bottom-10 div.gempabumi-home-bg.margin-top-13 div div.col-md-6.col-xs-6.gempabumi-detail.no-padding ul li:nth-child(6)').text()
      img = $('#meteorologi-geofisika div div div.col-md-4.md-margin-bottom-10 div.gempabumi-home-bg.margin-top-13 div div:nth-child(1) a img').attr('src')
      api0 = {
    Tanggal: tgl,
    Magnitudo: SR,
    Kedalaman: dalaman,
    Lokasi: loc,
    Wilayah_pusat: wilayahPusat,
    Radius_dirasakan: Rd,
    imageUrl: img
    }
    // load peringatan dini
      notif = $('#meteorologi-geofisika div div div.col-md-8.md-margin-bottom-20 div.peringatan-dini-home.owl-carousel-v1.md-margin-bottom-20 div div.peringatan-dini-home-bg.col-md-10').text()
      api1 = {
    Peringatan: notif,
    }
    if(tgl==""){
      return {
     signal: "bmkg sedang menyiarkan gempa terbaru, silahkan tunggu sampai subdomain warning hilang",
     source: "https://warning.bmkg.go.id/"
      }
    } else {
      return {
     Earthquake: api0,
     EarlyWarning: api1
    }
    }
  })
   } else {
     res.json({category: "Information", status: true})
   }
}
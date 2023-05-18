'use strict';

// const lib = require(process.cwd()+"/lib/function.js");
// import module
const formData = require('form-data');
const path = require('path');
const axios = require('axios');
const cheerio = require("cheerio");
const fetch = require('node-fetch');

async function gitagram(query){
  const glink = await axios.get(`https://www.gitagram.com/index.php?s=${query}&cat=`)
  const plink = cheerio.load(glink.data)('#content').find('tbody > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').attr('href')
    if (plink == undefined) {
      res.json({result: "chords not found"})
    } else {
    const { data } = await axios.get(plink)
    const $ = cheerio.load(data)
      
     result = {
      site_search: "https://www.gitagram.com/index.php?s="+query,
      profileImage: $('article > div > header > div > div.hcontent > figure > a > img').attr('src'),
      publisher: $('article > div > header > div > div.entry-meta.level.is-hidden-mobile.is-size-7 > div > div:nth-child(1) > span > span:nth-child(2)').text().trim().replaceAll("     ", " - "),
      artist: $('article > div > header > div > div.hcontent > div > a > span').text().trim().replace("‣", ""),
      title: $('article > div > header > div > div.hcontent > h1').text().trim(),
      basic_key: $('article > div > div.content > pre').attr("data-key"),
      content: $('article > div > div.content > pre').text().trim()
    }
    return result
  }
}

async function tebakgambar(req, lvl){
return axios.get(`https://raw.githubusercontent.com/xfar05/database/master/games/tebakgambar.json`).then((val) => {
      let random_level = Math.floor(Math.random() * 999);
      if(req.query.level=="random"){
        const respe = val.data[random_level]
        return {
        index: respe.index,
        img: respe.img,
        answer: respe.jawaban,
        deskripsi: respe.deskripsi,
        type: "random"
        }
      } else {
      const response = val.data[lvl||0]
      if(response==null) return "database not found"    
      return {
        index: response.index,
        img: response.img,
        hint: response.jawaban.replace(/[AIUEOB|aiueob]/g, "*"),
        answer: response.jawaban,
        deskripsi: response.deskripsi,
        type: "not random"
       }
      }
    })
}

module.exports = { gitagram, tebakgambar };
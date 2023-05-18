const express = require('express');
const app = express();
const fs = require("fs")
const helmet = require("helmet")
const Database = require("@replit/database")
const db = new Database()
const {ProjectName} = require("./settings.json")
const formidableMiddleware = require('express-formidable');
const si = require('systeminformation');
const ipFilter = require('express-ipfilter').IpFilter
const path = require('path');
const session = require('express-session')
var bodyParser = require('body-parser');
var http = require('http');
var hash = require('hash')
var cookieParser = require('cookie-parser');
var enforce = require('express-sslify');
const rateLimit = require('express-rate-limit');
var cors = require("cors")
// captcha
var Recaptcha = require('express-recaptcha').RecaptchaV2
var recaptcha = new Recaptcha('6LcXcRcmAAAAAHbIzJdguDRy-a31lIH4pHT-JWjD', '6LdeORcmAAAAAPGNgVouhNLKsVn7opClHtrjo-Lc', { hl: 'id', callback: 'cb' })
// limit 
function limitku(max, Ms){
  const limiter = rateLimit({
	windowMs: Ms, 
	max: max,
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
 return limiter
}
// security helmet
const helem = helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
    crossOriginEmbedderPolicy: false
})
var existingDataWithEscapedKeys = { 
__: 1, b: 2, 'parent%': 3 
}
var myHash = new hash(existingDataWithEscapedKeys)
const infokan = ProjectName

app.set("json spaces", 2)
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function makeid(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result+=characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const randomperip = makeid(50)
// session
app.use(session({ secret: 'vikoapi', cookie: { maxAge: 86400000 }}))

// alertfunc
function alertTrow(r,e,a,d,ax,drx,res){
  pki = {
    title: ProjectName,
    alertRegis: r,
    alertErr: e,
    alertAlready: a,
    buttonDisable: d,
    randomTxt: randomperip,
    redirect: drx || "",
    captcha: res.recaptcha || ""
  }
  return pki
}
const pth = process.cwd();
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/about', function(req, res) {
    res.render(process.cwd()+"/views/about",{title: "About"})
})
// area register
app.post('/auth/register/:id', recaptcha.middleware.render, recaptcha.middleware.verify, helmet.xssFilter(), limitku(3, 60000), function(req, res) {
    req.session.capta = req.body['g-recaptcha-response']
    if (req.session.capta) {
        if(require("./settings.json").register==false){
      res.json({status: 404, result: "List page not found, probably offline"})
    } else {
     username = req.body.gmail
    password = req.body.password
    forProject = req.body.forProject
    if(req.session.sysGoto==randomperip) {
    res.redirect("/auth/register")
    } else {
      if(forProject.length >= 16) {
         throw res.send("403 forbidden")
      } else {
      db.list().then(keys => {
        check = keys.includes(username);
      if(check==true) { res.render(process.cwd()+'/views/register',alertTrow(0,0,1,0,null, req.session.redirect_url, res))
      } else {     
      if (username.length >= 17) {
        res.json("anda hengker, 403 forbidden")
      } else {
        imageProfile = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
      if(req.params.id==randomperip){
        myHash.set(username, password)
        geTpw = myHash.get(username)
        db.set(username, {password: geTpw, apikey: makeid(18), ip: req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for']).split(',')[0] : "", forProject: forProject, console_ip: null, limit: 2000, image: imageProfile}).then(() => {}).catch((e)=>{res.send("Database: "+e)});
    res.render(process.cwd()+'/views/register',alertTrow(1,0,0,1,null,req.session.redirect_url, res))
      } else {
        res.send("error when registering, please contact the owner if there is a problem")
      }}
     }
    });
    }
   }}

    } else {
      res.json({recaptcha: "captcha error"})
    }
    
});
app.get('/register', helmet.xssFilter(), recaptcha.middleware.render, async (req, res) => {
  req.session.redirect_url = req.query.redirect_url
  if(req.session.sysGoto==randomperip){
  res.redirect("/dasboard")
  } else {
    if(req.session.user==1) {
   res.render(process.cwd()+'/views/register',alertTrow(1,0,0,1,req.session.user, "", res))
  } else {
    res.render(process.cwd()+'/views/register', alertTrow(0,0,0,0, null, req.session.redirect_url, res))
    }
  }
});
// area register end
app.get('/stats', limitku(1, 1000), async function(req, res) {
    dt = new Date();
  try {
    if(req.session.sysGoto==randomperip){
    consoleg = await db.get(req.session.username);
      
    si.currentLoad().then(data => {
      si.osInfo().then(db => {
       si.system().then(d => {
    res.json({
      result: {
        cpuLoad: data.currentLoadUser.toFixed(0),
        serverTime: dt,
        manufacter:d.manufacturer,
        model:d.model,
        versi: require("./package.json").version,
        logofile: db.logofile,
        codepage: db.codepage,
        platform: db.platform,
        memUsage: process.memoryUsage(),
        console_ip: consoleg.console_ip || "silent"
      }
    });
   })
  })
  }).catch(error => res.json({Err: error}));
  } else {res.json({result: "login required", trigger: 1})}
  }catch(error){
    console.log(error)
  }
});
// area login
app.get('/login', helmet.xssFilter(), (req, res, next) => {
  req.session.redirect_url = req.query.redirect_url;
  if(req.session.sysGoto==randomperip) return res.redirect("/dasboard")
  res.render(process.cwd()+'/views/login', {
    warning: 0,
    warningWrongpw: 0,
    log: "",
    title: ProjectName
  })
})
app.post('/auth/login', helmet.xssFilter(), limitku(1, 900), function(req, res) {
    username = req.body.gmail
    password = req.body.password
    redirect = req.session.redirect_url
    if(req.session.sysGoto==randomperip) throw res.redirect("/dasboard")
    if (username.length >= 17) {
        res.json("anda hacker😔☝️, 403 forbidden")
     } else {
    db.get(username).then(value => {
       if(value==null){
      res.render(process.cwd()+'/views/login', {
      warning: 1,
      warningWrongpw: 0,
      log: "",
      title: ProjectName
       })
       } else {
        if(value.password==password){
          req.session.sysGoto = randomperip
          req.session.kunci = value.apikey
          req.session.username = username
          req.session.password = password
          req.session.ipadse = value.ip
          setTimeout(function(){           
            res.redirect(redirect||"/dasboard")
          },1000)        
        } else {
     res.render(process.cwd()+'/views/login', {
      warning: 0,
      warningWrongpw: 1,
      log: "",
      title: ProjectName
       })
      }
     }
    });
   }
})
// area login end
// area log out
app.get('/auth/:id/logout', helmet.xssFilter(), (req, res, next) => {
  ctr = req.params.id
  if(ctr==req.session.username){
    req.session.destroy(function(err) {})
    setTimeout(function(){           
      res.redirect("/")
    },1200)
  } else {
   res.redirect("../../../")
  }
})
// area log out end
// area setting
app.get('/setting/apikey', async (req, res, next) => {
  if(req.session.sysGoto==randomperip) {
    res.render("../views/settings",{apikey: req.session.kunci, popup: ""})
  } else {
    res.render(process.cwd()+'/views/login', {
      warning: 0,
      warningWrongpw: 0,
      log: 403,
      title: ProjectName
      })
  }
})
app.post('/settings/apikey', helmet.xssFilter(), limitku(1, 900), async (req, res, next) => {
  apikey = req.body.apikey
  console.log(req.body)
  if(req.session.sysGoto==randomperip) {
  if(apikey==" "){
   if(apikey==null) return res.redirect("./")
   res.render("../views/settings",{apikey: req.session.kunci, popup: "apikey cannot be empty"})
  } else {
    data = await db.get(req.session.username);
   data.apikey = String(apikey.replaceAll(/\s/g, '').replaceAll(/&/g, ""))
   req.session.kunci = apikey.replaceAll(/\s/g, '').replaceAll(/&/g, "")
   db.set(req.session.username, data);
   res.render("../views/settings",{apikey: req.session.kunci, popup: "Success change apikey "+apikey})
  }
  } else {
    res.redirect("../../")
  }
})
// area setting end

// area api engine

app.get('/api/:id', cors(), async function(req, res, next) {
    result = req.params.id
  ipmu = req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for']).split(',')[0] : ""
  dateku = new Date().toLocaleString('en-US', {timeZone:'Asia/Jakarta'});
  if(ipmu==require('./settings.json').ip_ban){
    res.json({result: "Ip address ini telah di ban oleh admin", status: 403})
  } else {
   key = await db.get(req.query.username);
    x = req.query.apikey
    try {
    if (x==key.apikey){
    datalim = await db.get(req.query.username);
    output = require("./dir/"+result)
    rest = await output(req, res)
    if(rest===undefined){
      
    } else {
      if(datalim.limit==0) {
    res.json({status: 403, account: req.query.username, result: "Your Baygon limit runs out, please top up at  *"+ProjectName+"*"})
      } else {
  
        res.json({status: 200, account: req.query.username, ip_address: req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for']).split(',')[0] : "", result: rest, information: await require("./settings.json").info})
      datawrite = await db.get(req.query.username);
      function tes(){
        datalim.limit -= 1
        db.set(req.query.username, datalim);
        datawrite.console_ip = ipmu.replace(req.session.ipadse, "YOU") +` - ${result} - `+dateku
      db.set(req.query.username, datawrite);
      }setTimeout(tes, 1000)
      }
      
      
    }
    } else {
  res.json({status: 404, account: req.query.username, result: "invalid api key, visit *"+ProjectName+"* to see"})
    }
    }catch(error) {
      if(error=="TypeError: Cannot read properties of null (reading 'apikey')"){
     res.json({status: 404, result: "Username not found, please register to get api key"})
      } else {
    res.render(process.cwd()+"/views/alert",{mslh: error+ "<br>path: /api/"+result, title: 500})
      }
    }
  }   
});
// area api engine end

// contact bot
app.get('/contact/bot-report', helmet.xssFilter(), (req, res) => {
  msg = req.query.msg
  if(msg==null){
  res.json({result: ":( no comand"})
  } else {
    res.redirect("http://wa.me/6281358514465?text="+msg)
  }
})
// page area
app.get('/page/tool/:id', helmet.xssFilter(), (req, res, err) => {
  res.header(`Access-Control-Allow-Origin`, `example.com`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  out=req.params.id
  if(out==null){
    res.redirect("../../dasboard")
  } else {
    if(req.session.sysGoto==randomperip){
        res.render(process.cwd()+"/page/tool/"+out, {title: out, initialScale: req.query.initial_scale || "0.8", req: req})     
    } else {
      res.render(process.cwd()+"/views/alert",{mslh: "403 forbidden, Akses ke sumber daya yang diminta dilarang silahkan login/register", title: 403})
    }
  }
})
// page area end

app.get('/', (req, res) => {
 req.session.redirect_url = null
  db.list().then(keys => {
  res.render(process.cwd()+"/views/landing", {title: ProjectName, account_database: keys.length, req: req, randomperip: randomperip, subtit: require("./settings.json").subtitle})
  })
})
/*app.get('/file/admin/db', async(req, res) => {
   if(req.query.pw=="satuduatiga") {
     switch(req.query.type){
       case 'list':
       read = await db.list();
       res.json(read)
         break;
       case 'get':
         get = await db.get(req.query.username);
         res.json(get)
         break;
       case 'clear':
          db.empty();
         res.json({status: true})
         break;
       default:
         res.send("not found type")
         break;
     }
   } else {
     res.json({status: 401, result: "no access"})
   }
})*/
// profile area
app.get('/username/@:id', helmet.xssFilter(), async(req, res) => {
   dateku = new Date().toLocaleString('en-US', {timeZone:'Asia/Jakarta'});
  user = req.params.id
  data = await db.get(String(user.replaceAll(" ", "")));
   if(data==null){
     res.send("Username not found")
   } else {
     res.render(process.cwd()+"/views/profile",{title: user, username: user, onglen: dateku, req: req, lastOnline: data.last_seen, project: data.forProject, profileImg: data.image})
   }
})
// end profile area

// dasboard area
app.get('/dasboard', async(req, res) => {
   res.redirect("/~")
})

app.get('/branch', helem, async(req, res) => {
  
  res.header("Access-Control-Allow-Origin", "*");
  ipmu = req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for']).split(',')[0] : ""
  console.log("["+ipmu+"] Docs")
  if(req.session.sysGoto==randomperip){
    db.list().then(keys => {
    
    res.render(process.cwd()+'/views/index',{
    user: req.session.username,
    pw: req.session.password,
    namesub: "Branching fork",
    path_content: "branch",
    profileImg: datawrite.image,
    apikey: req.session.kunci,
    title: ProjectName,
    ip_asli: req.session.ipadse,
    information: require("./settings.json").info,
    ip: ipmu,
    ip_ban: require('./settings.json').ip_ban,
    readApi: fs.readdirSync("./dir"),
    readTool: fs.readdirSync("./page/tool"),
    account_database: keys.length,
    versi: require("./package.json").version
    })
   });
  } else {
    res.redirect("/login")
  }
})

app.get('/docs', helem, async(req, res) => {
  
  res.header("Access-Control-Allow-Origin", "*");
  ipmu = req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for']).split(',')[0] : ""
  console.log("["+ipmu+"] Docs")
  if(req.session.sysGoto==randomperip){
    db.list().then(keys => {
    
    res.render(process.cwd()+'/views/index',{
    user: req.session.username,
    pw: req.session.password,
    namesub: "Docs",
    path_content: "docs",
    apikey: req.session.kunci,
    profileImg: datawrite.image,
    title: ProjectName,
    ip_asli: req.session.ipadse,
    information: require("./settings.json").info,
    ip: ipmu,
    ip_ban: require('./settings.json').ip_ban,
    readApi: fs.readdirSync("./dir"),
    readTool: fs.readdirSync("./page/tool"),
    account_database: keys.length,
    versi: require("./package.json").version
    })
   });
  } else {
    res.redirect("/login")
  }
})

const {uploadByBuffer,uploadByUrl} = require(process.cwd()+"/lib/telegraph.js")
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

app.post('/post/image', upload.single('image'), async(req, res) => {
  data = await db.get(req.session.username);
  if(req.session.sysGoto==randomperip){
  if(data.password==req.session.password){
    
    try {
    imeg = await uploadByBuffer(req.file.buffer)
    data.image = imeg.link
    res.redirect("/username/@"+req.session.username)
    db.set(req.session.username, data);
    } catch (e) {
    res.json(e)
    }
    
  } else {
    res.json({result: "Error uploading image"})
  }
  }
})
app.get('/~', async(req, res) => {
  req.session.redirect_url = null
  const nDateku = new Date().toLocaleString('en-US', {timeZone:'Asia/Jakarta'});
  res.header("Access-Control-Allow-Origin", "*");
  ipmu = req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for']).split(',')[0] : ""
   read = await db.list();
   
  if(req.session.sysGoto==randomperip){
    check = read.includes(req.session.username);
    if(check==true) {
    datawrite = await db.get(req.session.username);
    datawrite.last_seen = nDateku
    db.set(req.session.username, datawrite);
    console.log("["+ipmu+"] Dasboard ")
    
    res.render(process.cwd()+'/views/index',{
    user: req.session.username,
    pw: req.session.password,
    namesub: "Dasboard",
    profileImg: datawrite.image,
    path_content: "dasboard",
    apikey: req.session.kunci,
    title: ProjectName,
    ip_asli: req.session.ipadse,
    information: require("./settings.json").info,
    ip: ipmu,
    db_branching: await getHs(),
    ip_ban: require('./settings.json').ip_ban,
    readApi: fs.readdirSync("./dir"),
    readTool: fs.readdirSync("./page/tool"),
    account_database: read.length,
    limit_key: datawrite.limit
    })
  } else {res.json({result: "Your username is missing, contact the admin to solve this problem"})}
  } else {
    res.redirect("/login")
  }
})
// dasboard area end


// public file db.get("key").then(value => {});
app.use('/', express.static('public'))
//app.use((req, res) => );
app.get('*', function(req, res){
  res.status(404).render(process.cwd()+"/views/alert",{mslh: "page not found :(", title: 404})
});

/*var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})*/
app.use(enforce.HTTPS()); http.createServer(app).listen(app.get('port'), function() {
console.log('Express server online');
});

// jan dihapus aowkwok:)
async function getHs(){
  try {
    const dbres = await fetch('https://database-server.brizyy.repl.co/app/list');
  db_branching = await dbres.json();
  return db_branching
  }catch (err){
    return null
  }
}

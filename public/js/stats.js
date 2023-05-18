
var canOnlylogin = once(function(){
	       $.notify("Warning: Session expired, please login again", "warn");
      function setTimes(){
        location.href = "./"
      }
  setTimeout(setTimes, 2000)
});
async function country(){
   response = await fetch("https://api.country.is/");
   result = await response.json();
   logsku("Your country is "+result.country, "green")
  document.getElementById("country").innerHTML = "Country: <small>"+result.country+`</small>&nbsp;<div style="position: relative; border-radius: 3px; border: 1px solid black;" class="fib fi fi-${result.country.toLowerCase()}"></div>`
}country()

async function logJSONData() {
  // cpu system
  fuc = document.getElementById("logs").value
  
  document.getElementById("logs").style.color = "blue"
  plat = document.getElementById("platform");
  ss = document.getElementById("statscpu");
  ps = document.getElementById("progresscpu");
  mn = document.getElementById("manufactur");
  os = document.getElementById("os");
  mem = document.getElementById("memo");
  try {
    const response = await fetch("/stats");
    const cpus = await response.json();
    if(cpus.result.cpuLoad>60){
      ss.style.color = "red"
      ps.style.color = "red"
      logsku("CPU overloaded "+cpus.result.cpuLoad+"%", "red")
    } else {
      ss.style.color = null
      ps.style.color = null
      
    }
    ss.innerText = cpus.result.cpuLoad+"%"
    localStorage.setItem("yourlogin", 1)
    ps.style.width= cpus.result.cpuLoad+"%"
    plat.innerText= cpus.result.platform + " - "+cpus.result.logofile
    mn.innerText = cpus.result.manufacter
    os.innerText = cpus.result.versi
      logip(cpus.result.console_ip, "blue")
      if(cpus.trigger==1){
        canOnlylogin()
    } else {
   mem.innerHTML = "Rss: "+formatBytes(cpus.result.memUsage.rss)+" <br>HeapUsed: "+formatBytes(cpus.result.memUsage.heapUsed)+"<br>HeapTotal: "+formatBytes(cpus.result.memUsage.heapTotal)+"<br>External: "+ formatBytes(cpus.result.memUsage.external)
      }
  }catch(error){
    too = `SyntaxError: Unexpected token 'T', "Too many r"... is not valid JSON`
    if(error==too){
      logsku("Too many request /stats", "red")
    } else {
      logsku(error, "red")
    }
  }
}
setInterval(logJSONData, 3000)

function once(fn, context) { 
	var result;

	return function() { 
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
}

function formatBytes(bytes, decimals = 2) { 
    if (!+bytes) return '0 B'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
 const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
const i = Math.floor(Math.log(bytes) / Math.log(k))
  
 return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function myDas(){
    setTimeout(function(){
      $('.loader-bg').hide();
    },1000)
}
function getCurrent(respon, apikey, username){
  location.href = 
  window.location.href = "/api/"+respon+"?apikey="+apikey+"&username="+username
  $('.loader-bg').show();
  document.getElementById("loaderlog").innerText = "Path: "+"/api/"+respon
  setTimeout(() => {$('.loader-bg').hide()}, 2000)
}

var clipboard = once(function(){
  $.notify("Apikey is copied to the clipboard\nplease don't share this secret key", "success");
})
function myClip() {
  clipboard()
  var copyText = document.getElementById("apikeycuy");
  // Select the text field
  copyText.select();
  document.execCommand('copy');
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

function myChangeAPI(x){
  location.href = x
}

function logsku(x, color) {
 d = new Date();
 v = document.getElementById("logs")
 v.value += "["+ d.getHours() +":" + d.getMinutes() + ":" + d.getSeconds() + "] "+ x + '\r\n'
 v.style.color = color
 v.scrollTop = v.scrollHeight;
}
function logip(x, color) {
 d = new Date();
 v = document.getElementById("logip")
 v.value = x
 v.style.color = color
}
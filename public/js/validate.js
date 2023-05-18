setTimeout(function(){
  cli = localStorage.getItem("sesiuse")
  document.getElementById("ingmail").value = cli
},200)

function myPass() {
  var x = document.getElementById("myPas");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
document.getElementById('ingmail').value = getCookie("username")

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=0'
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
setInterval(function(){
setCookie("username",document.getElementById('ingmail').value, 5)
},1000)
function AvoidSpace(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k == 32) return false;

}
setInterval(function(){
  puty = document.getElementById("ingmail").value
localStorage.setItem("sesiuse", puty)
},100)
function removeSpaces(string) {
 return string.split(' ').join('');
  
}

function cili(){
  if(localStorage.getItem("yourlogin")==1){
    alert("silahkan login kembali")
  } else {}
}
function myDas(){
      $('.loader-bg').fadeToggle();
}
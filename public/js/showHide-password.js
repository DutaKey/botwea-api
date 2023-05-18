function myPass() {
  var x = document.getElementById("myPas");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function AvoidSpace(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k == 32) return false;
    sesiini = document.getElementById("ingmail").value
  localStorage.setItem("sesiuse",sesiini)
}

function removeSpaces(string) {
 return string.split(' ').join('');
}
setInterval(function(){
 ndec = document.getElementById("ingmail").value
 ndep = document.getElementById("myPas").value
  //session
  
  
  buttonDis()
  if(ndec=="") {
    localStorage.setItem("ss", 27)
    document.getElementById("valid").innerText = ""
    document.getElementById("validp").innerText = ""
  } else {
    if(ndec.length<=4){
  document.getElementById("valid").innerText = "* username terlalu pendek"
  localStorage.setItem("ss", 0)
  } else {
  document.getElementById("valid").innerText="Username ✓"
  localStorage.setItem("ss", 1)
  }
  }
  if(ndep=="") {
    localStorage.setItem("ss1", 20)
  document.getElementById("validp").innerText = ""
  } else {
    if(ndep.length<=7){
  document.getElementById("validp").innerText = "* password terlalu pendek"
  localStorage.setItem("ss1", 0)
  } else {
  document.getElementById("validp").innerText = "Password ✓"
  localStorage.setItem("ss1", 1)
    }
  }
})

function buttonDis(){
if(localStorage.getItem("ss")==localStorage.getItem("ss1")) {
   document.getElementById("buttonsub").disabled = false;
  } else {
    document.getElementById("buttonsub").disabled = true;
  }
}


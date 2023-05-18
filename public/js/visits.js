function cb(response) {
    document.getElementById('visits').innerText = response.value;
  
}
function myDas(){
    setTimeout(function(){
      $('.loader-bg').hide();
    },1000)
}
function upok(){
  document.getElementById("openbutton").innerHTML = `<br><center><input type="submit"></input></center>`
}
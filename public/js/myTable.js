var canOnlylogin = once(function(){
	$.notify("Warning: Session expired, please login again", "warn");
  location.href = "./"
});
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


async function getCurrent(respon, apikey, username){
  const response = await fetch("/stats");
  const cpus = await response.json();
  if(cpus.trigger==1){
        canOnlylogin()
  } else {
    location.href = "/api/"+respon+"?apikey="+apikey+"&username="+username
  $('.loader-bg').show();
  document.getElementById("loaderlog").innerText = "Path: "+"/api/"+respon
  setTimeout(() => {$('.loader-bg').hide()}, 2000)
  }
}

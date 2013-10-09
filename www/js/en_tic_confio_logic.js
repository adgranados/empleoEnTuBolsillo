// JavaScript Document

onDeviceReady = function(){
	var ref = window.open('http://apache.org', '_blank', 'location=yes');	
}
showVideo= function(videoCode){
	var url = "http://www.youtube.com/embed/"+videoCode
	sessionStorage.setItem("videoURL",url);
	window.location.href = "video.html";
	
	/* $.mobile.changePage("video.html", {
            transition: "pop",
            reverse: false,
            changeHash: false
        }); */
}

vermas = function(url){
	sessionStorage.setItem("vermasurl",url);
	//window.location.href = "vermas.html";
	if(url != null){
		window.open(url, '_blank');
	}

}

facebookGo = function(url){
	sessionStorage.setItem("compartirurl",url);
	
	if(url != null){
		window.location.href = "facebook.html";
		//window.open('https://m.facebook.com/sharer.php?u='+url, '_blank');
	}
}

twitterGo = function(url,title){
	sessionStorage.setItem("compartirurl",url);
	sessionStorage.setItem("compartirtitle",title);

	/*if(title == null || title == 'null'){
		title=" "
	}*/

	if(url != null){
		//urlShare = 'http://www.enticconfio.gov.co/'
		//titleShare = 'Probando..'
		
		//window.open('https://twitter.com/share?url='+urlShare+'&screen_name=enticconfio&text='+titleShare, '_blank');

		window.location.href = "twitter.html";
	}
}

eventosGo = function(itemIndex){
	sessionStorage.setItem("EventoIndex",itemIndex);
	window.location = "eventos.html";

}

 generateItem = function(itemd,collapsible){
	  	
	var typeItem 	= itemd["type"];
	var title 	    = itemd["title"];
	if(title == null || title == 'null')
		title = "Novedad sin titulo";
	var url 	    = itemd["url"];	
	
	if(!/^(http:\/\/).+$/i.test(url))
	 	url = null


	var vermas 	    = itemd["urlmas"];
	var texto 	    = itemd["text"];
	if(texto==null || texto == "null")
		texto = "";
		
	var articulo = $('<div data-role="collapsible" style="background-color:rgba(255,204,0,.5);font-family:HelveticaNeueRegular;"></div>');	
	
	articulo.append("<h3>"+title+"</h3>");	
	 var vermasLinks = "";
			if(vermas!=null && vermas != "" && vermas.match(/null/g)==null){
				//vermasLinks = '<div data-role="navbar"><ul><li><a href="#" onclick="vermas(\''+vermas+'\')" data-role="button" data-theme="b">ver mas</a></li><li>'+'<a href="#" onclick="facebookGo(\''+vermas+'\')" rel="external"  data-role="button" data-theme="b">Compartir en Facebook!!</a></li><li><a href="#" onclick="twitterGo(\''+vermas+'\',\''+title+'\')" rel="external"  data-role="button" data-theme="b">Compartir en Twitter!!</a></li></ul></div>';
				//vermasLinks = '<div data-role="navbar"><ul><li>'+'<a href="#" onclick="facebookGo(\''+vermas+'\')" rel="external"  data-role="button" data-theme="b">Compartir en Facebook!!</a></li><li><a href="#" onclick="twitterGo(\''+vermas+'\',\''+title+'\')" rel="external"  data-role="button" data-theme="b">Compartir en Twitter!!</a></li></ul></div>';

				//vermasLinks = '<div style="text-align:right;"><a href="#" onclick="facebookGo(\''+vermas+'\')" rel="external" data-theme="b"><img src="img/Facebook64x64.png" /></a><a href="#" onclick="twitterGo(\''+vermas+'\',\''+title+'\')" rel="external" data-theme="b"><img src="img/Twitter64x64.png" /></a></div>';
				//vermasLinks = vermasLinks + '<div style="text-align:right;"><a href="#" onclick="facebookGo(\''+vermas+'\')" rel="external" data-theme="b"><img src="img/Facebook48x48.png" /></a><a href="#" onclick="twitterGo(\''+vermas+'\',\''+title+'\')" rel="external" data-theme="b"><img src="img/Twitter48x48.png" /></a></div>';
				



				vermasLinks = '<hr/>';
				vermasLinks = vermasLinks + '<div style="text-align:right;"> <table align="right"><tr><td>Compartir en:</td><td><a href="#" onclick="facebookGo(\''+vermas+'\')" rel="external" data-theme="b"><img src="img/Facebook32x32.png" /></a> </td><td> <a href="#" onclick="twitterGo(\''+vermas+'\',\''+title+'\')" rel="external" data-theme="b"><img src="img/Twitter32x32.png" /></a></td></tr></table></div><br/><br/>';
				


				//vermasLinks = vermasLinks + '<div style="text-align:right;"><a href="#" onclick="facebookGo(\''+vermas+'\')" rel="external" data-theme="b"><img src="img/Facebook24x24.png" /></a><a href="#" onclick="twitterGo(\''+vermas+'\',\''+title+'\')" rel="external" data-theme="b"><img src="img/Twitter24x24.png" /></a></div>';


				//vermasLinks = vermasLinks + '<div style="width:45%;" data-role="navbar"><ul><li>'+'<a href="#" onclick="facebook.html" rel="external"  data-role="button" data-theme="b"><img src="img/Facebook64x64.png" /></a></li><li><a href="#" onclick="twitterGo(\''+vermas+'\',\''+title+'\')" rel="external"  data-role="button" data-theme="b"><img src="img/Twitter64x64.png" /></a></li></ul></div>';


				//href="https://www.facebook.com/sharer/sharer.php?u='+vermas+'" target="_blank"
				//'+vermas+'\'
				
			}
	switch (typeItem){
		case "video":
			pattern = /.*\/v\/([A-z0-9]*)/i
				var videoCode = null
				if(url != null){
					regResponse = pattern.exec(url)
					if(regResponse != null)
						videoCode = regResponse[1];
				}
			
			var parrafo = [];
			
			if(texto!="")
				texto += '<br /><hr style="border:2px dashed #F90" />';
				
			var video = "";
			if(videoCode != null){
				//video = '<a href="" onclick="showVideo(\''+videoCode+'\')"  data-position-to="window" data-role="button" >'
				//video = video + '<img src="http://img.youtube.com/vi/'+videoCode+'/0.jpg" width="100%" /></a>';

				video = "<div style='width: 100%; left: 0px; top: 0px; display: block; background-image:url(img/banner-video-evento.png); background-size: 100% 100%; background-repeat: no-repeat;'>"
				video = video + "<a href='' onclick=\"showVideo('"+videoCode+"')\">"
				video = video + "<img src='http://img.youtube.com/vi/"+videoCode+"/0.jpg' style='width:99%; border-radius:10px;opacity: 0.1' ></a></div>"


				//video = '<iframe class="format-video" id="video_container" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen></iframe>'
				//videoautoheight();
				//window.addEventListener('resize', videoautoheight, false);
			}else
				video = 'No llego la data del video';
				
			parrafo = $('<p style="text-align:justify;">'+texto+'<br />'+video+vermasLinks+'</p>');
			articulo.append(parrafo);
			if(url != null){
				//$("#video_container").attr("src",url);
				/*popup_video = '<div data-role="popup" id="popupVideo" data-overlay-theme="a" data-theme="d" data-tolerance="15,15" class="ui-content"><iframe src="'+url+'" width="100%" height="100%" seamless></iframe></div>';				
				articulo.append(popup_video);*/				
			}
		break;
		case "text":
			var parrafo = $('<p style="text-align:justify;">'+(texto!="null"?texto:"")+'<br />'+vermasLinks+'</p>');
			articulo.append(parrafo);	
		break;
		case "imageText":
			var parrafo = "";
			if(url != null){
				parrafo = $('<p style="text-align:justify;"><img src="'+url+'" width="100%" style="border:4px dashed #F90;border-radius:10px;"><br />'+(texto!="null"?texto:"")+'<br />'+vermasLinks+'</p>');
			}else{
				parrafo = $('<p style="text-align:justify;">'+(texto!="null"?texto:"")+'<br />'+vermasLinks+'</p>');
			}
			
			articulo.append(parrafo);	
			break;
		case "image":
			var parrafo = "";
			if(url != null){
				parrafo = $('<p style="text-align:justify;"><img src="'+url+'" width="100%" style="border:4px dashed #F90;border-radius:10px;"><br />'+vermasLinks+'</p>');
				articulo.append(parrafo);
			}else{
				parrafo = $('<p style="text-align:justify;"><b>Imagen no disponible</b><br />'+vermasLinks+'</p>');
				articulo.append(parrafo);
			}
			break;
	}
	
	$(collapsible).append(articulo);
	$(collapsible).trigger('create');
  }

  
  itemFail = function(collapsibleSetId){
	  		var articulo = $('<div data-role="collapsible" style="background-color:rgba(255,204,0,.5);"></div>');	
	articulo.append("<h3>No Hay Novedades</h3>");	
		var parrafo = $('<p style="text-align:justify;">Verifica si estas conectado a internet</p>');
		articulo.append(parrafo);		
		$(collapsibleSetId).append(articulo);
		$(collapsibleSetId).trigger('create');
		
	}



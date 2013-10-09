generateItem = function(dataItem){
	var typeItem 	= dataItem["type"];
	var title 	    = dataItem["title"];
	var url 	    = dataItem["url"];	
	var vermas 	    = dataItem["urlmas"];
	var texto 	    = dataItem["text"];
	var addedOn     = new Date();
				
	switch (typeItem){
		case "video": 
		
		
			var news = $('<div data-role="collapsible">');
			news.append("<h3>"+title+"</h3>");
			news.append(texto);
			$("#newsPornigrafia").append(news);
			
			/*var article = $("<article>");
			article.append("<head><h1>"+title+"</h1></head>");
			article.append("<p>"+texto+"</p>");
			article.append("<p><a href='"+vermas+"'>ver mas </a></p>");
			$("#tips").append(article);*/
		/*	     <div data-role="collapsible" data-collapsed="false">
                    <h3>Section 1</h3>
                    <p>I'm the collapsible set content for section 1.</p>
                    </div>
        
		*/
			
			/*title: "test 1 Grooming", type: "video", url: "http://www.youtube.com/v/5P5lSk7Z9Rw?version=3&hl=es_ES", urlmas: "http://www.enticconfio.gov.co/moviles-grooming/item/676-test-1-grooming.html", text: "<p>
↵	Texto introductorio articulo grooming</p>
↵"*/
			
			
			break;
	}
}

$(function(){
	

	var dbSize = 5 * 1024 * 1024; // 5MB
	registerDB = openDatabase("Conductas", "1.0", "Conductas", dbSize);
	
	registerDB.transaction(function(tx) {
				  
	tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='conductas'",[],function(tx,resp){
		
		if(resp.rows.length == 0){
				tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                  "conductas(ID INTEGER PRIMARY KEY ASC,name TEXT, image TEXT, description TEXT)", []);
				  tx.executeSql('INSERT INTO conductas (name,image,description) VALUES ("Pornografia Infantil","porno.jpg","bla bla bla bla")');
				  //tx.executeSql("INSERT INTO conductas values(?,?,?)", ["Pornografia Infantil","porno.jpg","bla bla bla bla"]);
				  
  	
			}
	console.log(resp);
	});
	/*
		
    tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                  "conductasNovedades(ID INTEGER PRIMARY KEY ASC,conducta_id INTEGER, type TEXT, title TEXT, vermas TEXT,url TEXT,texto TEXT, added_on DATETIME)", []);
				  */
  });
	
	$('#page_pornografiainfantil').live('pageshow',function(event, ui){

		var url ="http://www.enticconfio.gov.co/rest/consultarTipsConducta?pkey=fe1132c415f6b7968f54e68c8264d17c10208288&pwd=/5GfdtrsLk&&conducta=grooming";
	
		
		$.get(url, {},function(data) {
		  	$.each(data,function(index,item){
				generateItem(item);
			});
		});


	});
	
	
	$("#solicitarConferencia").submit(function(){

		var params = new Array();
		params.push({'name':'pkey','value':'fe1132c415f6b7968f54e68c8264d17c10208288'});
		params.push({'name':'pwd','value':'/5GfdtrsLk&'});

		var fields = $("#solicitarConferencia").serializeArray();
		params = params.concat(fields);		

		var url = "http://www.enticconfio.gov.co/rest/solicitarConferencia";

		$.post(url, params,function(data){
		    console.log(data); 	
			navigator.notification.alert(
				"La Solicitud fue realizada con exito",
				function(){},
				"En Tic Confio",
				"Cerrar"
			)
			navigator.notification.alert("La Solicitud fue realizada con exito");	   
			 
		  }, "json");
		
		return false;
	});
});





/*
* @todo: debido a que la informacion  suministrada por el rss no proporciona i magenes y url para ampliar la informacion del riesgo, 
         se adicionan los datos de los riesgos comununes encontrados en el site oficioal de en tic confio.
*/
var riesgos_params = {
	"Pornografía Infantil":{
			"image":"denuncia_la_pornografia_infantiledited-1.jpg",
		},
	"Ciberacoso":{
		"image":"ciberacosoedited-1.jpg",
	},
	"Grooming":{
		"image":"sexting_y_groomingedited-1.jpg",
	},
	"Sexting":{
			"image":"sexting_y_groomingedited-1.jpg",
		},
	"Ciberdependencia":{
		"image":"ciberdependenciaedited-1.jpg"
			},
	"Fraudes electrónicos":{
			"image":"ciberdependenciaedited-1.jpg",
		}
	}

var url = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Departamento_Administrativo_de_la_Presidencia/datosenticconfio';


$.ajax({ 
        url: url ,
        type: "GET",
        cache: false,
        dataType: "xml",
        crossDomain: true,
        data: {},
        success : function(response){
			 $(response).find("entry").eq(0).children().eq(6).children().eq(0).children();
			
			var campanas = {};
			
			$(response).find("entry").each(function(index, element) {
					
				var properties = $(element).children().eq(6).children().eq(0).children();
				var nombre_campana 		= $(properties[2]).text();
				
				if(campanas[nombre_campana] == undefined){
					campanas[nombre_campana] 	= {}
					var descripcion_campana 	= $(properties[3]).text();
					campanas[nombre_campana] 	= {};
					campanas[nombre_campana]["nombre"]= nombre_campana;
					campanas[nombre_campana]["descripcion"]= descripcion_campana;
					campanas[nombre_campana]["riesgos"]=[]
				}
				
				var riesgo_que_mitiga 	= $(properties[4]).text();
				var descripcion_de_riesgo = $(properties[5]).text();
				var image_url = "";
				if(riesgos_params[riesgo_que_mitiga]!= undefined)
					image_url = riesgos_params[riesgo_que_mitiga]["image"]
				var riesgo = {
					"riesgo":riesgo_que_mitiga,
					"descripcion":descripcion_de_riesgo,
					"imagen": image_url 
				}
				campanas[nombre_campana]["riesgos"].push(riesgo);
            });
			
			var container = $("<div></div>");
			for(c in campanas){
				var div = $("<div data-role='collapsible' data-theme='b'></div>");
				var campana_nombre = $("<h3>"+campanas[c].nombre+"</h3>"); 
				div.append(campana_nombre)
				nombre_imagen ="img/ciberpapaya.jpg"; 
				console.log(campana_nombre);
				if(campanas[c].nombre != "Ciberpapaya"){
					
					nombre_imagen = "img/delitos-informaticosedited-1.jpg";
				}
				var campana_descripcion = $("<p style='text-align:justify;'><img src='"+nombre_imagen+"' style='width:100%; border-radius:10px; box-shadow:10px 10px 5px #888888;' /><br/>"+campanas[c].descripcion+"</p>"); 
				
				
				var riesgos_container = $("<div data-role='collapsible-set'></div>");
				for(r in campanas[c].riesgos){
					
					//var image = $("<h3>"+campanas[c].riesgos[r].riesgo+"</h3>");
					//if(campanas[c].riesgos[r].imagen != undefined)
						//image = $("<img src='img/"+ campanas[c].riesgos[r].imagen +"' />");
					//li.append(image);
					var riesgo_container = $("<div data-role='collapsible' ></div>")
					var riesgo_title = $("<h3 data-theme='c'>"+campanas[c].riesgos[r].riesgo+"</h3>");
					riesgo_container.append(riesgo_title);
					var riesgo_descripcion = $("<div style='text-align:justify;font-weight:normal;'>"+campanas[c].riesgos[r].descripcion+"</div>");
					riesgo_container.append(riesgo_descripcion);
					riesgos_container.append(riesgo_container);
					
				}
				campana_descripcion.append(riesgos_container);
				div.append(campana_descripcion);	
				
				container.append(div);
			}
			
			$("#informate_container").html(container);
		}
});
//rss = require('node-rss');
//var url = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Departamento_Administrativo_de_la_Presidencia/datosenticconfio';
//var url = 'http://www.enticconfio.gov.co/movilesrssv2a';
//var url = 'cerebrum.co';

//var response = rss.parseURL(url,function(res){
//	console.log(res);
//});
var url = 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Departamento_Administrativo_de_la_Presidencia/datosenticconfio';


$.ajax({ 
        url: url ,
        type: "GET",
        cache: false,
        dataType: "jsonp",
        crossDomain: true,
        data: {},
        success : function(response){
		console.log(res);
	}
});
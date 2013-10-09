xmlToJson = function (xml) {
            
            // Create the return object
            var obj = {};

            if (xml.nodeType == 1) { // element
                // do attributes
                if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) { // text
                obj = xml.nodeValue;
            }

            // do children
            if (xml.hasChildNodes()) {
                for(var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof(obj[nodeName]) == "undefined") {
                        obj[nodeName] = xmlToJson(item);
                    } else {
                        if (typeof(obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xmlToJson(item));
                    }
                }
            }
            return obj;
        };

processSOAP = function (url, PostDATA, function_callback){
            var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open('POST', url, true);
            xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4) {
                            if (xmlhttp.status == 200) {
                                function_callback(xmlToJson(xmlhttp.responseXML))
                            }
                        }
                    }
                    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
                    xmlhttp.send(PostDATA);
}

        var url_wsdl = "http://190.27.194.177:9007/OPECWS/services/OpecServiceImplPort?wsdl";


        GetAllOpecs = function (callback){
            var url = url_wsdl;
            var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cnsc="http://cnsc/"><soapenv:Header/><soapenv:Body><cnsc:GetAllOpecs/></soapenv:Body></soapenv:Envelope>';

            processSOAP(url,sr,function(response){
                callback(response);
            })
        } 
        GetOpec = function(convocatoria_id,callback){
            var url = url_wsdl;
            var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cnsc="http://cnsc/"><soapenv:Header/><soapenv:Body><cnsc:GetOpec><!--Optional:--><arg0>'+convocatoria_id+'</arg0></cnsc:GetOpec></soapenv:Body></soapenv:Envelope>';
            processSOAP(url,sr,function(response){
                callback(response);
            })
        }

        GetAllEmpleosOpec = function (convocatoria_id,callback){

            if(convocatoria_id == undefined)
                convocatoria_id = "";
            
            var url = url_wsdl;
            var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cnsc="http://cnsc/">   <soapenv:Header/> <soapenv:Body> <cnsc:GetAllEmpleosOpec> <!--Optional:--> <arg0>'+convocatoria_id+'</arg0> </cnsc:GetAllEmpleosOpec> </soapenv:Body> </soapenv:Envelope>';

            processSOAP(url,sr,function(response){
                callback(response);
            })

        }

        GetCiudadesEmpleosOpecToSelect = function (convocatoria_id, select_id){
             if(convocatoria_id == undefined)
                convocatoria_id = "";
            
            var url = url_wsdl;
            var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cnsc="http://cnsc/">   <soapenv:Header/> <soapenv:Body> <cnsc:GetAllEmpleosOpec> <!--Optional:--> <arg0>'+convocatoria_id+'</arg0> </cnsc:GetAllEmpleosOpec> </soapenv:Body> </soapenv:Envelope>';

            processSOAP(url,sr,function(response){
                console.log(response);

                response = response["soap:Envelope"]["soap:Body"]["ns2:GetAllEmpleosOpecResponse"]["return"]
                if(response != undefined){
                    ciudades = []
                    $.each(response,function(index, data){
                        var ciudad = data["ciudad"]["#text"]
                        if(ciudad != undefined)
                            if(ciudades.indexOf(ciudad) == -1)
                                ciudades.push(ciudad)
                    });
                    $("#"+select_id).empty()
                    $("#"+select_id).append("<option value='-1'>Filtrar por Ciudad</option>")
                    $.each(ciudades,function(index,data){
                        $("#"+select_id).append("<option value='"+data+"'>"+data+"</option>")
                    });
                }

                
             
            })
        }





        GetAllEmpleosOpecByCiudad = function (convocatoria_id, ciudad, callback){
            if(convocatoria_id == undefined)
                convocatoria_id = "";

            if(ciudad == undefined)
                ciudad=""

            var url = url_wsdl;

            var sr ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cnsc="http://cnsc/"> <soapenv:Header/> <soapenv:Body> <cnsc:GetAllEmpleosOpecByCiudad> <!--Optional:--> <arg0>'+convocatoria_id+'</arg0> <!--Optional:--> <arg1>'+ciudad+'</arg1> </cnsc:GetAllEmpleosOpecByCiudad> </soapenv:Body> </soapenv:Envelope>';

            processSOAP(url,sr, function(response){
                callback(response)
            })
        }

        GetNivelesEmpleosOpecToSelect = function (convocatoria_id, select_id){
            if(convocatoria_id == undefined)
                convocatoria_id = "";
            
            var url = url_wsdl;
            var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cnsc="http://cnsc/">   <soapenv:Header/> <soapenv:Body> <cnsc:GetAllEmpleosOpec> <!--Optional:--> <arg0>'+convocatoria_id+'</arg0> </cnsc:GetAllEmpleosOpec> </soapenv:Body> </soapenv:Envelope>';

            processSOAP(url,sr,function(response){

                response = response["soap:Envelope"]["soap:Body"]["ns2:GetAllEmpleosOpecResponse"]["return"]
                if(response != undefined){
                    niveles = []
                    $.each(response,function(index, data){
                        var nivel = data["nivel"]["#text"]
                        if(nivel != undefined)
                            if(niveles.indexOf(nivel) == -1)
                                niveles.push(nivel)
                    });
                    $("#"+select_id).empty()
                    $("#"+select_id).append("<option value='-1'>Filtrar por Nivel</option>")
                    $.each(niveles,function(index,data){
                        $("#"+select_id).append("<option value='"+data+"'>"+data+"</option>")
                    });
                }

                
             
            })
         }



        GetAllEmpleosByNivel = function (convocatoria_id, nivel,callback){
            
            if(convocatoria_id == undefined)
                convocatoria_id = "";

            if(nivel== undefined)
                nivel = "";

            var url = url_wsdl;

            var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cnsc="http://cnsc/"><soapenv:Header/><soapenv:Body><cnsc:GetAllEmpleosOpecByNivel><!--Optional:--><arg0>'+convocatoria_id+'</arg0><!--Optional:--><arg1>'+nivel+'</arg1></cnsc:GetAllEmpleosOpecByNivel></soapenv:Body></soapenv:Envelope>';
            processSOAP(url,sr,function(response){
                callback(response);
            })

        }




        GetAllEmpleosByRequisitosEstudios = function (convocatoria_id, requisitoEstudio,callback){
            
            if(convocatoria_id == undefined)
                convocatoria_id = "";

            if(nivel== undefined)
                nivel = "";

            var url = url_wsdl;

            var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cnsc="http://cnsc/"><soapenv:Header/><soapenv:Body><cnsc:GetAllEmpleosOpecByRequisitosEstudios><!--Optional:--><arg0>'+convocatoria_id+'</arg0><!--Optional:--><arg1>'+requisitoEstudio+'</arg1></cnsc:GetAllEmpleosOpecByRequisitosEstudios></soapenv:Body></soapenv:Envelope>';
            processSOAP(url,sr,function(response){
                callback(response);
            })

        }

        GetAllNoticiasOpec = function(convocatoria_id,callback){
            
            if(convocatoria_id == undefined)
                convocatoria_id = "";

            var url = url_wsdl;

            var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cnsc="http://cnsc/"><soapenv:Header/><soapenv:Body><cnsc:GetAllNoticiasOpec><!--Optional:--><arg0>'+convocatoria_id+'</arg0></cnsc:GetAllNoticiasOpec></soapenv:Body></soapenv:Envelope>'

            processSOAP(url,sr,function(response){
                callback(response);
            })
        }


var Base64 = {

// private property
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
},

// public method for decoding
decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = Base64._utf8_decode(output);

    return output;

},

// private method for UTF-8 encoding
_utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
},

// private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }

    return string;
}

}
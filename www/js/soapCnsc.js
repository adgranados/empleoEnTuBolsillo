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
        una y q despues si se crean otras

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


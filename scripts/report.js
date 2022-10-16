var Global= "http://localhost:8081/api/";
//var Global = "http://129.151.123.155:8081/api/";

function reportStatus(){
    $.ajax({
        url: Global + "Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           
            pintarRespuestaStatus(respuesta);
        }

    });
}
////////////////////////////////////////
function pintarRespuestaStatus(items){
    console.log(items);
    let myTable="<table>";
 
        myTable+="<tr>";
        myTable+="<td>"+items.completed+"</td>";
        myTable+="<td>"+items.cancelled+"</td>";
        myTable+="</tr>";

    myTable+="</table>";
    $("#list").append(myTable);
}

function pintarRespuestaClients(items){
   
}


function reportDate(){

}

function reportClients(){
    $.ajax({
        url: Global + "Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           
            pintarRespuestaClients(respuesta);
        }

    });
}
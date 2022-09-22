function getQuadbikes(){
//FUNCION GET
    $.ajax({
        url : ' https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
        type : 'GET',
        dataType: 'json',
        contentType:'application/json',
        success : function(response) {
            let cs=response.items;
            $("#listQuadbike").empty();
            for(i=0;i<cs.length;i++){
                $("#listQuadbike").append(cs[i].id+" <b>"+cs[i].brand+"</b> "+cs[i].model+" "+cs[i].category_id+" "+ cs[i].name);
                $("#listQuadbike").append("<button onclick='deleteQuadbike("+cs[i].id+")'>Borrar</button><br>");
            }
        },
        error : function(xhr, status) {
            //alert("Ha ocurrido un problema al mostrar los clientes");
        }
    });
}


function saveQuadbike() {
    let idQuadbike=$("#idQuadbike").val();
    let brandQuadbike=$("#brandQuadbike").val();
    let modelQuadbike=$("#modelQuadbike").val();
    let category_id=$("#category_id").val();
    let nameQuadbike=$("#nameQuadbike").val();

    let data={
        id:parseInt(idQuadbike),
        brand:brandQuadbike,
        model:modelQuadbike,
        category_id:parseInt(category_id),
        name:nameQuadbike
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);


    $.ajax({
        url : ' https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
        type : 'post',
        dataType: 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            //console.log("La cuatrimoto se ha guardado correctamente");
        },
        error : function(xhr, status) {
            //console.log('Ha ocurrido un problema al guardar la cuatrimoto');
        },
        complete: function(){
            getQuadbikes();
        }
    });
}


function updateQuadbike(){
    let idQuadbike=$("#idQuadbike").val();
    let brandQuadbike=$("#brandQuadbike").val();
    let modelQuadbike=$("#modelQuadbike").val();
    let category_id=$("#category_id").val();
    let nameQuadbike=$("#nameQuadbike").val();

    let data={
        id:parseInt(idQuadbike),
        brand:brandQuadbike,
        model:modelQuadbike,
        category_id:parseInt(category_id),
        name:nameQuadbike
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : ' https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
        type : 'PUT',
        dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            //console.log("La cuatrimoto se ha actualizado correctamente");
        },
        error : function(xhr, status) {
            //console.log('Ha ocurrido un problema al actualizar la cuatrimoto');
        },
        complete: function(){
            getQuadbikes();
        }
    });

}

function deleteQuadbike(idQuadbike){
    let data={
        id:idQuadbike
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : ' https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
        type : 'DELETE',
        //dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            console.log("La cuatrimoto se ha borrado correctamente");
        },
        error : function(xhr, status) {
           alert('Ha ocurrido un problema al borrar la cuatrimoto');
        },
        complete: function(){
            getQuadbikes();
        }
    });

}

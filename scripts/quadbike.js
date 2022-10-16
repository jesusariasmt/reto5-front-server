var Global= "http://localhost:8081/api/";
//var Global = "http://129.151.123.155:8081/api/";

function getQuadbike(idQuadbike){

	$("#idQuadbike").val(idQuadbike);

	$.ajax({
	    url : Global + 'Quadbike/' +  idQuadbike,
	    type : 'GET',
			dataType: 'json',
			contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
                $("#name").val(cs.name);
				$("#brand").val(cs.brand);
				$("#year").val(cs.year);
                $("#description").val(cs.description);
				
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}

function getQuadbikes(){
    //FUNCION GET
      $.ajax({
          url : Global + 'Quadbike/all',
          type : 'GET',
          //dataType: 'json',
          //contentType:'application/json',
		header: 'Access-Control-Allow-Origin: *',
          success : function(response) {
                let cs=response;
                $("#list").empty();
                for(i=0;i<cs.length;i++){
                    $("#list").append(cs[i].id+" <b>"+ cs[i].name +"</b> " + cs[i].brand + " " + cs[i].year + " " +cs[i].description+ " ");
                    $("#list").append("<button onclick='deleteQuadbike("+cs[i].id+")'>Borrar</button>");
					$("#list").append("<button onclick='getQuadbike(" +cs[i].id +")'>Actualizar</button><br>");
                }
          },
          error : function(xhr, status) {
            alert("Ha ocurrido un problema al mostrar las cuatrimotos");
          }
      });
    }


function saveQuadbike() {
    let nombre=$("#name").val();
    let marca=$("#brand").val();   
    let modelo=$("#year").val();
	let descripcion=$("#description").val();

    let data={
	    name:nombre,
        brand:marca,
        year:parseInt(modelo),
		description: descripcion
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);


    $.ajax({
        url : Global + 'Quadbike/save',
        type : 'post',
        dataType: 'json',
        data:dataToSend,
        contentType:'application/json',
				header: 'Access-Control-Allow-Origin: *',
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
		let id=$("#idQuadbike").val();
        let nombre=$("#name").val();
        let marca=$("#brand").val();
		let modelo=$("#year").val();
		let descripcion=$("#description").val();

		let data={
			id: id,
			name:nombre,
			brand:marca,
			year:parseInt(modelo),
			description: descripcion
		};

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : Global + 'Quadbike/update',
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
        url : Global + 'Quadbike/' + data.id,
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

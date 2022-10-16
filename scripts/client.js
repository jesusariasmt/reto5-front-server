var Global= "http://localhost:8081/api/";
//var Global = "http://129.151.123.155:8081/api/";

function getClient(idClient){
	$("#idClient").val(idClient);

	let id = idClient;

	$.ajax({
	    url : Global + 'Client/' +  id,
	    type : 'GET',
			//dataType: 'json',
			//contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
			    $("#email").val(cs.email);
				$("#password").val(cs.password);
				$("#name").val(cs.name);
				$("#age").val(cs.age);
				

	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}

function getClients(){
//FUNCION GET
	$.ajax({
	    url : Global + 'Client/all',
	    type : 'GET',
		  //dataType: 'json',
		  //contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
	   		$("#list").empty();
	   		for(i=0;i<cs.length;i++){
	   			$("#list").append(cs[i].idClient+" <b>"+cs[i].email+"</b> "+cs[i].name+" "+cs[i].age + " ");
	   			$("#list").append("<button onclick='deleteClient("+cs[i].idClient+")'>Borrar</button>" + " ");
				$("#list").append("<button onclick='getClient(" +cs[i].idClient +")'>Actualizar</button><br>");
	   		}
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}


function saveClient() {
	
	let mailCliente=$("#email").val();
	let password=$("#password").val();
	let nombre=$("#name").val();
	let edad=$("#age").val();
	

	let data={
		
		email:mailCliente,
		password:password,
		name:nombre,
		age:parseInt(edad)
	};

	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);


	$.ajax({
		url : Global + 'Client/save',
		type : 'post',
		dataType: 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
			//alert("El cliente se ha guardado correctamente");

	    },
	    error : function(xhr, status) {
	        //alert('Ha ocurrido un problema al guardar el cliente');
	    },
	    complete: function(){
	    	getClients();
	    }
	});
}


function updateClient(){
	let id=$("#idClient").val();
	let mailCliente=$("#email").val();
	let password=$("#password").val();
	let nombre=$("#name").val();
	let edad=$("#age").val();
	

	let data={
		idClient: id,
		email:mailCliente,
		password:password,
		name:nombre,
		age:parseInt(edad)
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : Global + 'Client/update',
	    type : 'PUT',
	 		dataType : 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
			//alert("El cliente se ha actualizado correctamente");

	    },
	    error : function(xhr, status) {
	       //alert('Ha ocurrido un problema al actualizar el cliente');
	    },
	    complete: function(){
	    	getClients();
	    }
	});

}

function deleteClient(idCliente){
	let data={
		id:idCliente
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : Global + 'Client/' + data.id,
	    type : 'DELETE',
	    dataType : 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
				//console.log("El cliente se ha borrado correctamente");
	    },
	    error : function(xhr, status) {
	       //alert('Ha ocurrido un priblema al borrar el cliente');
	    },
	    complete: function(){
	    	getClients();
	    }
	});

}

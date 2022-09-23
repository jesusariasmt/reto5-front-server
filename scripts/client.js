function getClients(){
	$.ajax({
	    url : ' https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
	    type : 'GET',
		dataType: 'json',
		contentType:'application/json',
	    success : function(response) {
	   		let cs=response.items;
	   		$("#list").empty();
	   		for(i=0;i<cs.length;i++){
	   			$("#list").append(cs[i].id+" <b>"+cs[i].name+"</b> "+cs[i].email+" "+cs[i].age + " ");
	   			$("#list").append("<button onclick='deleteClient("+cs[i].id+")'>Borrar</button></br> </br>");
	   		}
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}


function saveClient() {
	let idClient=$("#idClient").val();
	let name=$("#nameClient").val();
	let emailClient=$("#emailClient").val();
	let age=$("#ageClient").val();

	let data={
		id:parseInt(idClient),
		name:name,
		email:emailClient,
		age:parseInt(age)
	};

	let dataToSend=JSON.stringify(data);


	$.ajax({
		url : ' https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
		type : 'post',
		dataType: 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
	
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
	let idCliente=$("#idClient").val();
	let name=$("#nameClient").val();
	let emailClient=$("#emailClient").val();
	let ageClient=$("#ageClient").val();
	let data={
		id:idCliente,
		name:name,
		email:emailClient,
		age:ageClient
	};
	let dataToSend=JSON.stringify(data);
	
	$.ajax({
	    url : ' https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
	    type : 'PUT',
	 	dataType : 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
			alert("El cliente se ha actualizado correctamente");
	    },
	    error : function(xhr, status) {
	       //alert('Ha ocurrido un problema al actualizar el cliente');
	    },
	    complete: function(){
	    	getClients();
	    }
	});
}

function deleteClient(idClient){
	let data={
		id:idClient
	};
	let dataToSend=JSON.stringify(data);
	
	$.ajax({
	    url : ' https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
	    type : 'DELETE',
	 //   dataType : 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
			console.log("El cliente se ha borrado correctamente");
	    },
	    error : function(xhr, status) {
	       alert('Ha ocurrido un priblema al borrar el cliente');
	    },
	    complete: function(){
	    	getClients();
	    }
	});
}

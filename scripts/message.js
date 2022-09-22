function getMessages(){
    //FUNCION GET
        $.ajax({
            url : 'https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type : 'GET',
            dataType: 'json',
            contentType:'application/json',
            success : function(response) {
                   let cs=response.items;
                   $("#list").empty();
                   for(i=0;i<cs.length;i++){
                       $("#list").append(cs[i].id+" <b>"+cs[i].messagetext+"</b> ");
                       $("#list").append("<button onclick='deleteMessage("+cs[i].id+")'>Borrar</button><br>");
                   }
            },
            error : function(xhr, status) {
              alert("Ha ocurrido un problema al mostrar los mensajes");
            }
        });
    }


function saveMessage() {
    let id=$("#idMessage").val();
    let bodyMessage=$("#bodyMessage").val();

    let data={
        id:id,
        messagetext:bodyMessage
    };

    let dataToSend=JSON.stringify(data);

    $.ajax({
        url : ' https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        type : 'post',
        dataType: 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            //alert("El mensaje se ha enviado correctamente");
        },
        error : function(xhr, status) {
            //alert('Ha ocurrido un problema al enviar el mensaje');
        },
        complete: function(){
            getMessages();
        }
    });
}


function updateMessage(){
	let id=$("#idMessage").val();
    let bodyMessage=$("#bodyMessage").val();
	let data={
		id:id,
        messagetext:bodyMessage
	};
	let dataToSend=JSON.stringify(data);
	$.ajax({
	    url : 'https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
	    type : 'PUT',
	 	dataType : 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
			alert("Mensaje Actualizado correctamente");
	   		//$("#").val("");
			//$("#").val("");
			//$("#").val("");
			//$("#").val("");
	    },
	    error : function(xhr, status) {
	       //alert('Ha ocurrido un problema al actualizar el mensaje');
	    },
	    complete: function(){
	    	getMessages();
	    }
	});
}


function deleteMessage(idMessage){
    let data={
        id:idMessage
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : ' https://g3efc9e5e9cd9ec-oiw2e4sz708myfhs.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        type : 'DELETE',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            console.log("El mensaje se ha borrado correctamente");
        },
        error : function(xhr, status) {
           alert('Ha ocurrido un problema al borrar el mensaje');
        },
        complete: function(){
            getMessages();
        }
    });
}

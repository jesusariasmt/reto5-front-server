//var Global = "http://129.151.123.155:8081/api/";
var Global = "http://localhost:8081/api/";
function getMessage(idMessage){

  $("#idMessage").val(idMessage);

  $.ajax({
      url : Global + 'Message/' +  idMessage,
      type : 'GET',
      //dataType: 'json',
      //contentType:'application/json',
      success : function(response) {
          let cs=response;
          $("#messageText").val(cs.messageText);
      },
      error : function(xhr, status) {
          console.log("Ha ocurrido un problema");

      }
  });
}

function getMessages(){
    //FUNCION GET
      $.ajax({
          url : Global + 'Message/all',
          type : 'GET',
          //dataType: 'json',
          //contentType:'application/json',
          success : function(response) {
                 let cs=response;
                 $("#list").empty();
                 for(i=0;i<cs.length;i++){
                     $("#list").append(cs[i].idMessage+" <b>"+cs[i].messageText+"</b> "+ " ");
                     $("#list").append("<button onclick='deleteMessage("+cs[i].idMessage+")'>Borrar</button>" + " ");
                     $("#list").append("<button onclick='getMessage(" +cs[i].idMessage +")'>Actualizar</button><br>");
                 }
          },
          error : function(xhr, status) {
            console.log("Ha ocurrido un problema al mostrar los mensajes");
          }
      });
}


function saveMessage() {
    let cuerpoMensaje=$("#messageText").val();

    let data={
        messageText:cuerpoMensaje
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);


    $.ajax({
        url : Global +'Message/save',
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
    let cuerpoMensaje=$("#messageText").val();

    let data={
        idMessage: id,
        messageText:cuerpoMensaje
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : Global + 'Message/update',
        type : 'PUT',
        dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            //alert("El mensaje se ha enviado correctamente");
        },
        error : function(xhr, status) {
           //alert('Ha ocurrido un problema al actualizar el mensaje');
        },
        complete: function(){
            getMessages();
        }
    });

}

function deleteMessage(idMensaje){
    let id=idMensaje;

    $.ajax({
        url : Global + 'Message/' + id,
        type : 'DELETE',
     //   dataType : 'json',
      //  data:dataToSend,
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

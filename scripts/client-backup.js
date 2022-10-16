//GET, POST , PUT Y DELETE
// funcion ver en pantalla
function getClients(){
    $.ajax({
        url:"http://localhost:8081/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    });

}

//---------------funcion crear un cliente----------
function saveClient(){
    if ($("#email").val().length==0 || $("#password").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0){
        //alert("Todos los campos son obligatorios");
        Swal.fire('Todos los campos son obligatorios')
    }else{



    let cajas = {
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };
    
    $.ajax({
        url:"http://localhost:8081/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
           //mensaje de alerta
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cliente creado correctamente',
                showConfirmButton: false,
                timer: 1500
              })
              setTimeout(()=>{
                window.location.reload();
              },1550)
        }
    });
}
}
//--------------funcion actualizar cliente----------
function updateClient(idBotonActualizar){
   // console.log(idBotonActualizar);
    
    if ($("#email").val().length==0 || $("#password").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0){
       // alert("Todos los campos son obligatorios para actualizar los datos");
       Swal.fire('Todos los campos son obligatorios para actualizar los datos')
    }else{

    let cajas = {
        idClient:idBotonActualizar,
        email:$("#email").val(),
        description:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };
    
    $.ajax({
        url:"http://localhost:8081/api/Client/update",
        type:"PUT",
        datatype:"JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
           // alert("se actualizo correctamente el cliente");
           Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'se actualizo correctamente la informacion',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(()=>{
            window.location.reload();
          },1550)
        }
    });
}


}


//----------------funcion eliminar cliente---------------
function deleteClient(idBoton){ 
    let myData={
      id:idBoton
  };
  $.ajax({
      url:"http://localhost:8081/api/Client/"+idBoton,
      type:"DELETE",
      datatype:"JSON",
      data:JSON.stringify(myData),
      contentType: "application/json",
      success:function(respuesta){
         //mensaje de alerta
          Swal.fire({
              title: 'Esta seguro de borrar el client? con el ID:'+idBoton,
              text: "si estas seguro se borrara definitivamente",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si,eliminar!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Borrado!',
                  'el cliente se a eliminado correctamente.',
                  'success'  
                )
                setTimeout(()=>{
                  window.location.reload();
                },1000)
      }

  });
  }
})





}


////////////////////////////////////////
function pintarRespuesta(items){
    // let myTable="<table>";
     //tabla
    let myTable="<table class=' text-left mt-24 font-bold table-fixed mt- '>";
   
    myTable+="<th class=' text-lg p-6 border-0 bg-indigo-500  text-white border-b-4 border-blue-800 rounded-l'>ID</th>";
  
    myTable+="<th class='text-lg p-6 border-0  bg-indigo-500 text-white border-b-4 border-blue-800'>Email</th>";
   
    myTable+="<th class='text-lg p-6  border-0 bg-indigo-500 text-white border-b-4 border-blue-800'>Nombre</th>";
    myTable+="<th class='text-lg p-6  border-0 bg-indigo-500 text-white border-b-4 border-blue-800'>Edad</th>";
    myTable+="<th class='text-lg pl-7 border-0  bg-indigo-500 text-white border-b-4 border-blue-800'>Actualizar</th>";
    myTable+="<th class='text-lg px-6 py-3 border-0  bg-indigo-500 text-white border-b-4 border-blue-800 rounded-r'>Eliminar</th>";
    for(i=0;i<items.length;i++){
        myTable+="<tr class='odd:bg-white even:bg-slate-50'>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].password+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
         //boton de actualizar
        myTable+="<td> <button onclick='updateClient("+items[i].idClient+")'class='text-white font-bold px-6 py-3 rounded-lg   bg-indigo-600 hover:bg-gradient-to-r from-indigo-900 hover:to-indigo-600 hover:text-gray-300 ml-10 hover:duration-200 '>actualizar</button> " ;
         //boton de Eliminar
        myTable+="<td> <button onclick='deleteClient("+items[i].idClient+")'class='text-white font-bold px-6 py-3 rounded-lg   bg-indigo-600 hover:bg-gradient-to-r from-indigo-900 hover:to-indigo-600  ml-10 hover:duration-200 hover:shadow-slate-900'> Eliminar </button> " ;
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#list").append(myTable);
}
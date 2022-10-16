//GET, POST , PUT Y DELETE
var Global= "http://localhost:8081/api/";
//var Global = "http://129.151.123.155:8081/api/";

function getCategorys(){
    $.ajax({
        url: Global +"Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    });
}
//--------------funcion crear Category---------------
function saveCategory(){
    if ($("#name").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios");
        
    }else{

    let cajas = {
        name:$("#name").val(),
        description:$("#description").val()
    };
    
    $.ajax({
        url: Global +"Category/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            //alert("se creo correctamente la categoria");
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Categoria creada correctamente',
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
//-----------funcion de actualizar--------------------
function updateCategory(idBotonActualizar){
    console.log(idBotonActualizar);
    
    if ($("#name").val().length==0 || $("#description").val().length==0){
       // alert("Todos los campos son obligatorios para actualizar los datos");
       Swal.fire('Todos los campos son obligatorios para actualizar los datos')
    }else{

    let cajas = {
        idCategory:idBotonActualizar,
        name:$("#name").val(),
        description:$("#description").val()
    };
    
    $.ajax({
        url: Global + "Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
           // alert("se actualizo correctamente la gama");
           Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'se actualizo correctamente la gama',
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


//funcion de borrar
function deleteCategory(idBoton){
    
    
          let myData={
            id:idBoton
        };
        $.ajax({
            url: Global + "Category/"+idBoton,
            type:"DELETE",
            datatype:"JSON",
            data:JSON.stringify(myData),
            contentType: "application/json",
            success:function(respuesta){
                //alert("se ha borrado correctamente la gama")
                Swal.fire({
                    title: 'Esta seguro de borrar la categoria? con el ID:'+idBoton,
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
                        'la gama se a borrado correctamente.',
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
    //tabla
    let myTable="<table class=' text-left mt-24 font-bold table-fixed mt- '>";
    //ID
    myTable+="<th class=' text-lg p-6 border-0 bg-indigo-500  text-white border-b-4 border-blue-800 rounded-l'>ID</th>";
    //nombre
    myTable+="<th class='text-lg p-6 border-0  bg-indigo-500 text-white border-b-4 border-blue-800'>Nombre</th>";
    //descripcion
    myTable+="<th class='text-lg p-6  border-0 bg-indigo-500 text-white border-b-4 border-blue-800'>Descripcion</th>";
    //actualizar
    myTable+="<th class='text-lg pl-7 border-0  bg-indigo-500 text-white border-b-4 border-blue-800'>Actualizar</th>";
    //eliminar
    myTable+="<th class='text-lg px-6 py-3 border-0  bg-indigo-500 text-white border-b-4 border-blue-800 rounded-r'>Eliminar</th>";
    ////
    for(i=0;i<items.length;i++){
        myTable+="<tr class='hover:bg-emerald-200 hover:text-white even:bg-gray-200 even:static ' >";
        myTable+="<td class='p-6  '>"+items[i].id+"</td>";
        myTable+="<td class='p-6  '>"+items[i].name+"</td>";
        myTable+="<td class='p-6  '>"+items[i].description+"</td>";
        //boton de actualizar
        myTable+="<td> <button onclick='updateCategory("+items[i].id+")'class='text-white font-bold px-6 py-3 rounded-lg   bg-indigo-600 hover:bg-gradient-to-r from-indigo-900 hover:to-indigo-600 hover:text-gray-300 ml-10 hover:duration-200 '>actualizar</button> " ;
        //boton de Eliminar
        myTable+="<td> <button onclick='deleteCategory("+items[i].id+")'class='text-white font-bold px-6 py-3 rounded-lg   bg-indigo-600 hover:bg-gradient-to-r from-indigo-900 hover:to-indigo-600  ml-10 hover:duration-200 hover:shadow-slate-900'> Eliminar </button> " ;
        myTable+="</tr>";
    } 
    myTable+="</table>";
    $("#list").append(myTable);
   
}

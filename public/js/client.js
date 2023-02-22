const socket = io.connect();

/* ---------------------------- products section ---------------------------- */
const productList = document.getElementById('product-list')

axios
.get("/api/productos-test") // acá con axios hacemos el get a la ruta correspondiente (recorda importar axios en tu index.html)
.then((products)=>{
const table = products.data.map((res)=>
`<div class ='table-responsive'>
<table class='table table-dark'>
  <tr>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Foto</th>
  </tr>
  <tr>
    <td>${res.nombre}</td>
    <td>$${res.precio}</td>
    <td>
      <img
      width='50'
      src=${res.foto}
      alt='Image not found'/>
    </td>
  </tr>
</table>
</div>`
  )
  productList.innerHTML = `<div>${table}</div>`
})

/* ---------------------------- messages section ---------------------------- */

socket.on('view-messages', messages => {
  console.log(messages);
  const html = createList(messages);
  document.getElementById('message-list').innerHTML = html;
});

function createList(messages) {
  return messages.map(message => {
    return (`
            <div>
                <b style="color:blue;">${message.author.nombre}</b>
                [<span style="color:brown;">${message.author.apellido}</span>] :
                <i style="color:green;">${message.text}</i>
            </div>
        `)
  }).join(" ");
}


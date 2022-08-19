const express = require('express')
const { Router } = express


const app = express()
const productos = Router()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const listaProductos = [{
    titulo:"Acondicionador",
    id:"1"
},
{
    titulo:"Shampoo",
    id:"2"
},
{
    titulo:"Jabon",
    id:"3"
}]


app.use(express.json())
app.use(express.urlencoded({extended:true}))





productos.get('/', (req, res) => {
    res.send(listaProductos)
})




productos.get('/:id', (req, res) => {

    const id = req.params.id

    const productoBuscado = listaProductos.filter(producto=>producto.id === id)

    if(listaProductos.length < id){
        console.log("No se ha encontrado un producto con dicho ID")
    } else {
        res.send(productoBuscado)
    }

})




productos.post('/', (req, res) => {

    const {titulo , id} = req.body

    if(!titulo || !id){
        res.status(400).send('producto no encontrado')
    }


},(req, res) => {

    listaProductos.push({titulo, id})
    
    res.send('producto guardado con exito')} 
)





productos.put('/:id', async (req, res) => {
    try{
    const id = req.params.id

    // const {titulo} = req.body

    await db.User.update(
        {titulo, id},
        {
            where: {
                id,
            },
        }
    );
    res.status(200).send('Usuario actualizado');
}catch(error){
    res.status(400).send('No se pudo actualizar el producto')
}
});




productos.delete('/:id',(req, res) => {
    // Elimina un producto segun su id
    const id = req.params.id
    // filtrar los datos para identificar el objeto a eliminar y eliminarlo
    const productoBorrado = listaProductos.filter((elemento) => elemento.id !== id);
    console.log(productoBorrado)
    if (productoBorrado.length == listaProductos.length) {
      console.log("No se encontro un item con dicho id para eliminar");
    } else {
    // guardar el nuevo array con el nuevo objeto agregado
    res.send("Elemento eliminado")
  }
})


app.use('/api/producto', productos)


const PORT = 8080
app.listen(PORT, () => {
    console.log('server on')
})
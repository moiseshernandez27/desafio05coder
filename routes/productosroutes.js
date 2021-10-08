const express = require('express')
const router = express.Router()
const array = require('../productos/productos.array')

router.get('/', (req, res) => {
    res.render('home', {})
})

router.get('/products', (req, res) => {
    if(array.length !== 0){
        res.render('products', { layout: 'layoutProducts', data: array })        
    }else{
        res.send('Array Empty')        

    }
})

router.post('/', (req, res) => {

    try {
        const { title, price, thumbnail } = req.body
        let d = (arr) => {

            let cantidad = arr.length

            if (cantidad !== 0) {
                let ultimo = arr[arr.length - 1];
                return ultimo.id
            }
        }

        let result = d(array)

        const newObj = {
            id: result == undefined ? 1 : result + 1,
            title,
            price,
            thumbnail
        }
        array.push(newObj)
        console.log('ok!!');
        res.redirect('/api/products')
    } catch (error) {
        console.log('Error al agregar'+error);
    }
})

router.put('/:id', (req, res) => {

    try {
        const id = req.params.id
        const { title, price, thumbnail } = req.body
        console.log(title);
        console.log(price);
        console.log(thumbnail);

        let indexx = array.findIndex(i => i.id == id);
        console.log(indexx);

        const newProd = {
            id: id,
            title,
            price,
            thumbnail
        }

        console.log('newProd', newProd);
        array[indexx] = newProd
        console.log('ArrayProducts', array);
        res.send(array)

    } catch (error) {
        console.log(error);
    }
})

router.delete('/products/delete/:id', (req, res) => {

    try {

        const id = req.params.id
        let indexx = array.findIndex(i => i.id == id);

        array.splice(indexx, 1)

        res.redirect('/api')
    } catch (error) {
        console.log(error);
    }
})

module.exports = array
const express = require('express')
const app = express()
const ProductsRoutes = require('./routes/products.routes')
const handlebars = require('express-handlebars')

app.use(express.json())
 app.use(express.urlencoded());

 app.use('/api', ProductsRoutes)

app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main'
}))

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    res.status(404).json({ msg: 'Pagina No Encontrada' })
})

app.listen(8080, () => {
    console.log('Run on port 8080 ', 8080)
})
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const cartRoutes = require('./routes/cartRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/admin', adminRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is up")
})


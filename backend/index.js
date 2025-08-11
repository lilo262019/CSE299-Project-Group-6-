const express = require('express')
const dotenv = require("dotenv")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const productRouter =require('./routes/products') 
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const cartRouter = require('./routes/cart')
const port = 3000;

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err))
app.use(cors());

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb',extended: true}));


app.use('/api/products',productRouter)
app.use('/api/',authRouter)
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter)
app.use('/api/carts',cartRouter)


app.listen(process.env.PORT ||port, '0.0.0.0' ,() => console.log(`Example app listening on port ${process.env.PORT}!`))
const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON response
app.use(express.json()) 

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes
const ServRoutes = require('./routes/ServRoutes')
const UserRoutes = require('./routes/userRoutes')

app.use('/serv', ServRoutes)
app.use('/users', UserRoutes)

app.listen(5000)
console.log('rodando, porta 5000')
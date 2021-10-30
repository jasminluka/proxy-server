const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const errorHandler = require('./middleware/error')

const PORT = process.env.PORT || 5000

const app = express()

// Cors
app.use(cors())

// Rate Limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100  // in 10 mins
})
app.use(limiter)
app.set('trust proxy', 1)

// Set static folder
app.use(express.static('public'))

app.use('/api', require('./routes'))

// Error handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
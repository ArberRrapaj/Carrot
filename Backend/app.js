require('dotenv').config()
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let bodyParser = require('body-parser')
let swaggerize = require('swaggerize-express')
let cors = require('cors')
let app = express()

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
}

// here is the magic
app.use(cors(corsOptions))

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))
app.use(swaggerize({
  api: path.resolve('./config/swagger.json'),
  handlers: path.resolve('./handlers'),
  security: path.resolve('./security')
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app

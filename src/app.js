import express from 'express'
import path from 'path'
import { engine } from 'express-handlebars'

import __dirname from './dirname.js'

import RoutesIndex from './routes/index.routes.js'


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(__dirname, 'views')))

app.engine('hbs', engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)



app.use(RoutesIndex)

export default app
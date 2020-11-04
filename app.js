import express from 'express'
import logger from 'morgan';
const app = express()
import { router } from './route'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import { adminRouter } from './src/admin';

// import { socketHelper } from './chat'
import { videe } from './videe'


import { configJWTStrategy } from './src/api/middlewares/authentication/auth'
var cors = require('cors')

require('dotenv').config()

var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'mainlayout');

// socketHelper()
videe()


const port = `${process.env.PORT}`
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(cors())
configJWTStrategy()

app.use('/admin', adminRouter);


router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/', router)
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
}

app.set('view engine', 'ejs');
// app.use(express.static('public'))

app.use(express.static(__dirname + '/public'));
// app.use('/public/assets', express.static('/public/assets'));

app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.listen(port, () => console.log(`App listening on port ${port}!`))


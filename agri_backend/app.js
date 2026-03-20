const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
require('dotenv').config();
// const errorHandler = require('./middlewares/errorHandler')
// const logger = require('./logger')

// let url = []
// if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'Production'){
//     url = [
//         'https://www.emhafarm.in',
//         'http://www.emhafarm.in',
//         'https://emhafarm.in',
//         'http://emhafarm.in',
//         'www.emhafarm.in',
//         'emhafarm.in',
        // 'http://localhost:5173'
//     ]
// }else{
//     url.push(process.env.UI_LOCAL_URL)
// }

let url = ['http://localhost:5173']
// let url = [
//         'https://www.emhafarm.in',
//         'http://www.emhafarm.in',
//         'https://emhafarm.in',
//         'http://emhafarm.in',
//         'www.emhafarm.in',
//         'emhafarm.in'
//     ]

let corsOptions = {
    origin: url,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.set('trust proxy', true);

const _dirname = path.resolve();

app.use((req, res, next) => {  // all success logs
  res.on('finish', () => {
    // logger.info(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});


const generalRoutes = require('./routes/general.route')
const productRoutes = require('./routes/product.route')
const userRoutes = require('./routes/user.route')
const traceRoutes = require('./routes/trace.route')

app.use('/api/general', generalRoutes);
app.use('/api/product', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trace', traceRoutes);

app.use(function (req, res, next) {
    res.status(404);
    // respond with html page
    return res.status(404).json({
        status: 404,
        message: 'API NOT FOUND! Please check the endpoint and the HTTP request type! or contact admin  ',
        data: {
            url: req.url
        }
    });
});

// app.use(errorHandler);

module.exports = app;
const app = require('./app')
const http = require('http')
require('dotenv').config();
// const logger = require('./logger')

const port  = process.env.PORT || 5000

require('./config/db.js')

let server = http.createServer(app);
server.listen(port, "0.0.0.0",()=>{
    console.log(`running on port http://localhost:${port}`)
})
const app = require('./server.js')
const port = process.env.PORT || 5001

app.listen(port)
console.log('http://localhost:' + port)

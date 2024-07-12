const express = require('express')

const app = express()
const PORT = 3000


// test
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// listening
app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`)
})
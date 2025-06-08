const express = require('express')
app = express()
const homeRoutes = require('./routes/home')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/', homeRoutes)

app.listen(3150, () => {
  console.log('Ready to detect dogs!')
})

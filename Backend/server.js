const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
// require('dotenv').config()
// console.log(process.env)
app.use(bodyParser.json())
app.use(cors())
const port = 3000

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('password');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult})
  })

  app.delete('/',async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult})
  })

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {MongoClient} from 'mongodb'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('game-store')
const games = database.collection('games')

const PORT = process.env.PORT

client.connect()
console.log('mongodb connected');


const app = express()
app.use(cors())
app.use(express.json())


app.listen(PORT,()=> console.log('api running')
)

app.get('/', async(req,res)=>{
    const allGames = await games.find().toArray()
    res.json(allGames)
})

app.post('/games',async(req,res)=>{
    await games.insertOne({name:'god of war', favourite:true})
    res.json('added')
})
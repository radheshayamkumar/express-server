const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;


// app.get('/', (req,res)=>{
//     res.status(200)
//     res.send('<h1>Hello World!</h1>')
// })

// app.get('/home', (req,res)=>{
//     res.status(201)
//     res.send('<h1> This is a Homepage </h1>')
// })


// ------------------------------------------------------------------------------------
app.use(express.json())
let teaData =[];
let nextId = 1;

//Add a new Tea :
app.post('/teas', (req,res)=>{
    const {name, price} = req.body;

    if (!name || price === undefined) {
        return res.status(400).send({ error: 'Name and price are required.' });
    }
    const newTea = {id: nextId++, name ,price }
    teaData.push(newTea);
    res.status(200).send(newTea);
})

//Get all the Tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData);
})

//get a tea with id
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea){
        res.status(407).send('Tea Not Found')
    }
    res.status(200).send(tea)
})

//update tea

app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
  
    if (!tea) {
      return res.status(404).send('Tea not found')
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
  })
  
  //delete tea
  
  app.delete('/teas/:id', (req, res) => {
    console.log("delete")
    console.log(req.params.id)
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
      return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    res.status(200).send('deleted')
  })
  
  

app.listen(PORT, ()=>{
    console.log((`app is listining on port no : ${PORT}...`))
})
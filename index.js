const express = require('express');
const bodyParser=  require( 'body-parser' );
const os = require('os');
const app = express();
const FSM = require('fsm');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true  } ) );

app.use(express.static('dist'));


let currentPerson = {},
  totalAccepeted = 0,
  persons = [
    {id:1,name:'nirit',pendingPayments:1500},
    {id:2,name:'bar',pendingPayments:0},
    {id:3,name:'tova',pendingPayments:218},
    {id:4,name:'gilad',pendingPayments:5096},
    {id:5,name:'aviv',pendingPayments:120},
    {id:6,name:'yael',pendingPayments:7},
    {id:7,name:'anat',pendingPayments:16893}
  ];

let clickManager = new FSM.clickFSM(acceptMoney.bind(this),dismiss.bind(this));


async function acceptMoney(){
  await new Promise((resolve)=>setTimeout(()=>resolve(),5000));
  totalAccepeted += currentPerson.pendingPayments;
  persons = persons.filter(p=>p!==currentPerson.id);
  currentPerson = {};
  //TODO add websocket to notify new states
  clickManager.dispatchTransition('reset');
}

function dismiss(){
  console.log('dismissed');
}



app.get('/getUsername', (req, res) => {
  res.header('Access-Control-Allow-Origin','http://localhost:3000');
res.send({ username: os.userInfo().username });
});

app.get('/getPersons', (req, res) => {
  console.log(persons);
res.header('Access-Control-Allow-Origin','http://localhost:3000');
res.send(JSON.stringify({ persons }));
});

app.post('/acceptMoney',(req,res)=>{
  try{
    currentPerson = JSON.parse(Object.keys(req.body)[0]);
clickManager.dispatchTransition('click')
  .then(()=>{
  res.header('Access-Control-Allow-Origin','http://localhost:3000');
console.log('totalAccepeted',totalAccepeted);
res.send(JSON.stringify({totalAccepeted}));
}) ;
}catch(error){
  console.log('invalid input');
}
});

app.listen(8080, () => console.log('Listening on port 8080!'));

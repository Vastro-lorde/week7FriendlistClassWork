// importing the required modules
const express = require(`express`);
const bodyParser = require('body-parser')
const app = express();
const {friendsList} = require(`./models/friendsList`)

// creating middlewares
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.urlencoded({extended: true}))
app.use(express.json())

// declaring global variables
let friendLists = friendsList.friendsList;
class friend{
    constructor(id, name, department, points){
        this.id = id;
        this.name = name;
        this.department = department;
        this.points = points;
    }
}

// creating the server
app.get('/', (req,res)=>{
    res.json(friendsList);
});

//create a new friend
app.post('/models',(req,res)=>{
    console.log(req.body);
    const myFriend = new friend(
        `${+friendLists.length +1}`,
        `${req.body.name}`,
        `${req.body.department}`,
        `${req.body.points}`
    )
    friendLists.push(myFriend);
    res.json(friendsList);
});

// get a single friend
app.post('/models/:id', (req,res)=>{
    const friendId = +req.params.id;
    const findFriend = friendLists.filter(friendLists => friendLists.id === friendId);
    res.json(findFriend);
});

// update a current friend
app.put('/models/:id', (req,res)=>{
    console.log(req.body);
    const friendsId = +req.params.id;
    const getFriend = friendLists.filter(friendLists => friendLists.id === friendsId);
    console.log(getFriend);
    res.json(getFriend);
    // req.body.name = getFriend.name
})

// listening and callback function
app.listen(3000, ()=>{
    console.log(`Running at http://localhost:3000`);
});
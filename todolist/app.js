const express= require("express");
const bodyParser= require("body-parser");
const { urlencoded } = require("express");

const app= express();

let items= ["coding", "programming"];
let workList= [];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/',function(req, res){
    var today= new Date();
    
    options= {
        weekday: "long",
        day: "numeric",
        month: "long",
    }
    var day= today.toLocaleDateString("en-US", options);
    res.render("lists",{kindOfDay: day, newListItem: items});
    
})

app.post('/', function(req, res){
    item= req.body.newItem;
    if(req.body.list==="Work")
    {
        workList.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect('/');
    }
    
})

app.get('/work', function(req, res){
    res.render("lists", {
        kindOfDay: "Work list",
        newListItem: workList
    })
})

app.listen(3000, function(){
    console.log("server is up and running at port 3000");
})
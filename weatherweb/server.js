const bodyParser= require("body-parser");
const express= require("express");
const { request } = require("http");
const https= require("https");
const app= express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname+ "/index.html");
    
})

app.post("/", function(req, res){
    
    const cityName= req.body.cityName;
    const apikey= "7ec04b3b64a4a662471f3888ff64bb28";
    const url= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+ apikey+"&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData= JSON.parse(data);
            const temp= weatherData.main.temp;
            const iconid= weatherData.weather[0].icon;
            const imageurl= " http://openweathermap.org/img/wn/"+ iconid + "@2x.png";
            const weatherdescription= weatherData.weather[0].description;
            res.write("<h1>The temperature at " + cityName + " is "+ temp+" degree celcius</h1>" );
            res.write("<h1>The weather at " + cityName + " is "+ weatherdescription + "</h1>");
            res.write("<img src="+ imageurl + " >");
            res.send();
        })
    })
})

app.listen(3000, function(){
    console.log("server is up and running on port 3000");
})
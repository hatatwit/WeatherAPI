const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html")
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
})

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "84e1dba77a767358d3d13a83f62a1cf4";
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + units;

    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data){
            const weaterData = JSON.parse(data);
            const temp = weaterData.main.temp;
            const weatherDes = weaterData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + weaterData.weather[0].icon + "@2x.png";
            res.write("<h1>The temperature in " + query +" is " + temp + " degrees Celcius</h1>")
            res.write("<p>The weather is currently " + weatherDes + " </p>")
            res.write("<img src='"+ icon + "'>");
    
            res.send
    
        })
    })
})



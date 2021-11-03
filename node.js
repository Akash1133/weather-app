const express =require('express')
const path=require('path')
const request=require('request')
var axios = require("axios").default;
const bodyparser=require('body-parser')
const app=express();

app.set('view engine','ejs');
app.set('views','template');
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyparser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyparser.json())

app.get('/',(req,res)=>{
    
   res.render('index.ejs')
    
});

app.post('/weather',(req,res)=>{
    const city=req.body.city;
    console.log(city)
    request(`https://api.weatherapi.com/v1/current.json?key=87bec691ece14879ad4173810210211&q=${city}&aqi=yes`,(error,response)=>{
     
        const data=JSON.parse(response.body);
        console.log(data);
        if(data.error)
        {
            res.render('error.ejs');
        }
        else{
            const temp=data.current.temp_c;
            const image=data.current.condition.icon;
            const obj={temp,image};
        res.render("result.ejs",{obj});
        }

    })
})




app.listen(5000,()=>{
    console.log("connected")
})

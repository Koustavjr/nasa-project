const http=require("http");
require('dotenv').config()

const app=require("./app");
const {mongoConnect}=require('./services/mongo');

const {loadplanetsData}=require('./models/planets.model');

const {loadLaunchData}=require('./models/launches.model');

const PORT=process.env.PORT || 8000;


const server=http.createServer(app);


async function launchServer(){
    
    await mongoConnect()
    await loadplanetsData();
    await loadLaunchData();
   
    server.listen(PORT,()=>{
        console.log("Server launched");
    });    
}

launchServer();

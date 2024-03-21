const path=require('path');
const express=require('express');
const morgan=require('morgan');

/*const planetsRouter=require('./routes/planets/planets.routes');
const launchesRouter=require('./routes/launches/launches.router');*/

const api=require('./routes/api');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,'..','public')));

/*app.use('/planets',planetsRouter);
app.use('/launches',launchesRouter);*/

app.use('/v1',api);
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
});
module.exports=app;
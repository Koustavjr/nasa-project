
// allows supporting multiple version of api at the same time

const express=require('express');

const planetsRouter=require('./planets/planets.routes');
const launchesRouter=require('./launches/launches.router');

const api=express.Router();

api.use('/planets',planetsRouter);
api.use('/launches',launchesRouter);

module.exports=api;
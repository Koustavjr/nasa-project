const {parse} =require('csv-parse');
const path=require('path');
const fs=require('fs');

const planets=require('./planets.mongo');

//const habitablePlanets=[];




// function to check habitable planet
function isHabitablePlanet(planet)
{
    if(planet['koi_disposition']==='CONFIRMED' && planet['koi_insol']>0.36 && planet['koi_insol']<1.11 
    && planet['koi_prad']<1.6)
        return true;
}



function loadplanetsData(){
return new Promise((resolve,reject)=>{fs.createReadStream(path.join(__dirname,'..','..','data','planets.csv'))
.pipe(parse({
    comment:'#',
   columns:true, // will return array of js objects when columns:true is set else only values
}))
.on('data',async(data)=>
{       if(isHabitablePlanet(data)==true){
            //habitablePlanets.push(data)
            // TODO: Replace create with insert + update = upsert
           
            /*await planets.create({
                keplerName:data.kepler_name
            });*/

            savePlanet(data)
        }
}).on('error',(err)=>{
    console.log(err);
    reject(err);
})/*.on('end',()=>{
    console.log(`${habitablePlanets.length} habitable planets found!`);
    resolve();
});*/
.on('end',async ()=>{
    const countPlanetsFound=(await getAllPlanets()).length;
    console.log(`${countPlanetsFound} habitable planets found!`);
    resolve();
});
});
}

/*function getAllPlanets()
{
    return habitablePlanets;
}*/

async function getAllPlanets()
{
    return await planets.find({},{
        '__v':0,'_id':0
    });
}


async function savePlanet(planet)
{ try{
    await planets.updateOne({
        keplerName: planet.kepler_name,
    },{
        keplerName:planet.kepler_name,
    },{
        upsert:true,
    });
}
catch(err)
{
    console.error(`Error finding planet ${err}`);
}
}



module.exports={
    loadplanetsData,
 //   planets:habitablePlanets,
    getAllPlanets,
}
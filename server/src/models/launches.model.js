const launchesDatabase=require('./launches.mongo')
const planets=require('./planets.mongo')
const axios=require('axios');

//const launches =new Map();
const DEFAULT_FLIGHT_NUMBER=100;
/*//let latestFlightNumber=100;
const launch={
    flightNumber:100, // flight_number
    mission:'Kepler Exploration X', //name
    rocket:'Explorer IS1', //rocket.name
    launchDate:new Date('December 27,2030'), // date_local
    target:'Kepler-442 b',  // not applicable
    customers:['ZTM','NASA'], // payload.customers for each payload
    upcoming:true, // upcoming
    success:true //success
}
    saveLaunch(launch);*/
async function saveLaunch(launch)
{
    
    await launchesDatabase.findOneAndUpdate({
        flightNumber:launch.flightNumber
    },launch,{
        upsert:true
    });
}

async function getLatestFlightNumber()
{
    const latestLaunch= await launchesDatabase.findOne()
                                .sort('-flightNumber');
            if(!latestLaunch)
            {
                return DEFAULT_FLIGHT_NUMBER;
            }
            return latestLaunch.flightNumber;
}


//launches.set(launch.flightNumber,launch);
/*function getAllLaunches()
{
    return Array.from(launches.values())
//  return launchesDatabase
}*/

async function getAllLaunches(limit,skip)
{
  
  return await launchesDatabase.
  find({},{'__v':0,'_id':0})
    .sort({flightNumber:1})
  .skip(skip)
  .limit(limit)
}

async function findLaunch(filter)
{
    return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId)
{
    return await findLaunch({
        flightNumber:launchId
    });
}

/*function existsLaunchWithId(launchId)
{
    return launches.has(launchId);
}*/


async function scheduleNewLaunch(launch)
{
    const planet=await planets.findOne({
        keplerName:launch.target,
    })

    /*console.log('Launch target:', launch.target);
console.log('Found planet:', planet);*/

    if(!planet)
    {
         throw new Error('Planet could not be found');
    }
    const newFlightNumber= await getLatestFlightNumber()+1;

    const newLaunch=Object.assign(
        launch,
        {
        success:true,
        upcoming:true,
        customers:['Zero to Mastery','NASA'],
        flightNumber:newFlightNumber,
        }
    );

    await saveLaunch(newLaunch)
}

/*function addNewLaunch(launch)
{
    latestFlightNumber++;
    launches.set(latestFlightNumber,Object.assign(launch,{
        success:true,
        upcoming:true,
        customers:['Zero to Mastery','NASA'],
        flightNumber:latestFlightNumber,
    }));
}*/


async function abortLaunchById(launchId){
     
    const aborted=await launchesDatabase.updateOne({
        flightNumber:launchId
    },{
        upcoming:false,
        success:false
    });

    return aborted.modifiedCount===1;
   }

/*function abortLaunchById(launchId){
 const abort=launches.get(launchId);
 abort.upcoming=false;
 abort.success=false;
 return abort;
}*/
 
const SPACEX_API_URL='https://api.spacexdata.com/v4/launches/query';

async function populateLaunches()
{
    console.log("Downloading launches data");
    const response=await axios.post(SPACEX_API_URL,{
        "query":{},
        "options":{
            pagination:false,
            populate:[{
                path:"rocket",
                select:{
                    name:1
                }
            },
            {
            path:"payloads",
            select:{
                customers:1       
            }
            }
            ]
        }
    });

    if(response.status!==200)
    {
        console.log('Failed to download');
        throw new Error('Launch data Download failed!')
    }
const launchDocs=response.data.docs;

for(const launchDoc of launchDocs)
{
    const payloads=launchDoc['payloads'];
    const customers=payloads.flatMap((payload)=>{
       return  payload['customers']
    });
    const launch={
    flightNumber:launchDoc['flight_number'],
    mission:launchDoc['name'], //name
    rocket:launchDoc['rocket']['name'], //rocket.name
    launchDate:launchDoc['date_local'], // date_local
    upcoming:launchDoc['upcoming'], // upcoming
    success:launchDoc['success'], //success
    customers, // payload.customers for each payload

}

console.log(`${launch.flightNumber},${launch.mission}`);
await saveLaunch(launch)
}
}
async function loadLaunchData()
{
    const firstLaunch= await findLaunch({
        flightNumber:1,
        rocket:'Falcon 1',
        mission:'FalconSat',
    });
    if(firstLaunch)
    {
        console.log('Launch data already loaded!');
    }
    else
    {
        await populateLaunches();
    }
       
}



module.exports={
    getAllLaunches,
    existsLaunchWithId,
    //addNewLaunch,
    scheduleNewLaunch,
    abortLaunchById,
    loadLaunchData,
}
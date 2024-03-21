const {getAllLaunches,
//addNewLaunch,
scheduleNewLaunch,
existsLaunchWithId,
abortLaunchById}=require('../../models/launches.model');

const{getPagination}=require('../../services/query');
/*function httpGetAllLaunches(req,res)
{
    return res.status(200).json(getAllLaunches());
}*/

async function httpGetAllLaunches(req,res)
{
 //   console.log(req.query);
 const{limit,skip}=getPagination(req.query);
 const launches=await getAllLaunches(limit,skip);
    return res.status(200).json(launches);
}

/*function httpAddNewLaunch(req,res)
{
    const launch=req.body;
    if(!launch.mission || !launch.launchDate || !launch.rocket || !launch.target)
    {
        return res.status(400).json({
            error:'Missing required launch property',
        })
    }

    launch.launchDate=new Date(launch.launchDate);
    
    if(isNaN(launch.launchDate))
    {
        return res.status(400).json({
            error:'Invalid Launch Date'
        })
    }

//    addNewLaunch(launch);
    scheduleNewLaunch(launch);
    return res.status(201).json(launch);

}*/

async function httpAddNewLaunch(req,res)
{
    const launch=req.body;
    if(!launch.mission || !launch.launchDate || !launch.rocket || !launch.target)
    {
        return res.status(400).json({
            error:'Missing required launch property',
        })
    }

    launch.launchDate=new Date(launch.launchDate);
    
    if(isNaN(launch.launchDate))
    {
        return res.status(400).json({
            error:'Invalid Launch Date'
        })
    }

    //addNewLaunch(launch);
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);

}


async function httpAbortLaunch(req,res)
{
    const launchId=Number(req.params.id);
    const existLaunch =await existsLaunchWithId(launchId);
    if(!existLaunch)
        {
            return res.status(400).json({
                error:'Launch not found',
            })
        }

        /*const abort=abortLaunchById(launchId);
        return res.status(200).json(abort);*/
        const abort=await abortLaunchById(launchId);
        if(!abort)
        {
            return res.status(400).json({
                error:"Launch not aborted"
            })
        }
        return res.status(200).json({
            ok:true
        });

}


/*function httpAbortLaunch(req,res)
{
    const launchId=Number(req.params.id);
    if(!existsLaunchWithId(launchId))
        {
            return res.status(400).json({
                error:'Launch not found',
            })
        }

        const abort=abortLaunchById(launchId);
        return res.status(200).json(abort);

}*/
module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}
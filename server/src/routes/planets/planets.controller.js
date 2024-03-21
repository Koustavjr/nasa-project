const {getAllPlanets}=require('../../models/planets.model');

/*function httpGetAllPlanets(req,res)
{
    return res.status(200).json(getAllPlanets());
}*/

async function httpGetAllPlanets(req,res)
{
    return res.status(200).json(await getAllPlanets());
}

module.exports={
    httpGetAllPlanets,
}
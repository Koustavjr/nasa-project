const API_URL='http://localhost:8000/v1';
//const API_URL='v1';
//const API_URL='https://nasa-project-backend-4xjf.onrender.com';
async function httpGetPlanets() {
  // TODO: Once API is ready.
  const response=await fetch(`${API_URL}/planets`);
  // Load planets and return as JSON.
  return await response.json();
}

async function httpGetLaunches() {
   // TODO: Once API is ready.
   const response=await fetch(`${API_URL}/launches`);
   // Load planets and return as JSON.
   const fetchedLaunches= await response.json();
  // Load launches, sort by flight number, and return as JSON.
  return fetchedLaunches.sort((a,b)=>{
    return a.flightNumber-b.flightNumber;
  })
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  try{
  return await fetch(`${API_URL}/launches`,{
    method:'post',
    headers:{
    "Content-Type":"application/json",
    },
    body:JSON.stringify(launch),
    
  });}
  catch(err)
  {
    return {
      ok:false,
    }
  }
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try{
    return await fetch(`${API_URL}/launches/${id}`,{
      method:"delete",
    })
  }catch(err){
    console.log(err);
    return {
      ok:false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
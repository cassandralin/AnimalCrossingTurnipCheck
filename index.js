var axios = require("axios")
var childProc = require('child_process');
var args = process.argv.slice(2);
//allows you to enter a turnip price, if not search will be set to 500
var turnipPrice = args[0] || 500



//to run use node index + desired turnip price if it is different than 500
//will check for islands with no fee, and automatically open up tabs with islands that fit criteria
const turnipApi = () => {
  axios.post('https://api.turnip.exchange/islands/', {
    "islander": "neither",
    "category": "turnips",
    "fee": 0
  }).then((res) => {
    if (!res.data.success) {
      return
    } 
    let filteredIslands = res.data.islands.filter(island => {
     return island.turnipPrice > turnipPrice &&
      parseInt(island.queued.split('/')[0]) < 5 &&
      island.thumbsupt >= island.thumbsdown     
    })
   const islandUrls = filteredIslands.map(island => ` https://turnip.exchange/island/${island.turnipCode}`)
   var command = "open"
   islandUrls.forEach(islandUrl => command += islandUrl)
   console.log(filteredIslands.length)
   childProc.exec(command);
  }) 
} 

turnipApi()


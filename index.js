const axios = require('axios')
const express = require('express')
const ejs = require('ejs')

const PORT=3000

const app = express();
app.set('view engine','ejs')
const client_id=115817
const client_secret='e84f61e3beac66279122709e23fb5e6511f193ea'

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'MdwsAVs3qUtm8CwjJIwP1GyaSmsqbMuT',
    issuerBaseURL: 'https://dev-kkycyhndpe5shyv8.us.auth0.com'
  };
//   app.use(auth(config));



app.get('/', async (req, res) => {
     res.render('home');
  });

app.get('/dashboard',async (req,res)=>{
    const code = req.query.code
    const response = await axios.post(`https://www.strava.com/api/v3/oauth/token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code`)
    const athlete = response.data.athlete
    const access_token = response.data.access_token
    const result = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`)
    res.render('dashboard',{user:athlete,activities:result.data})
});

app.listen(PORT,(err)=>{
    if(err)
    console.log("something went wrong",err)
    console.log(`server running at ${PORT}`)
})
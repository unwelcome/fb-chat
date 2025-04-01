const CryptoJS = require("crypto-js");
const path = require('path');
const fs = require('fs');

const users = new Map();
const cacheDirectory = path.join(__dirname, '../cache');
const cacheFile = path.join(cacheDirectory, 'data_cache.json');
const cacheExpirationTime = 60 * 1000;


function sessionMiddleware(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

function checkUserExist(login, password=null){
    if(users[login] && password === null) return true;
    if(users[login] && password === users[login]) return true;
    return false;
}

const sessionRegister = (req, res) => {
  const { login, password } = req.body;
  const passwordSHA256 = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

  if(checkUserExist(login)){
    console.log('singup: user already exist!');
    res.status(405).json({message: 'user already exist!'});
  }
  else{
    console.log('signup: creating new user!');
    users[login] = passwordSHA256;
    console.log(users);
  } 
}

const sessionLogin = (req, res) => {
    const { login, password } = req.body;
    const passwordSHA256 = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    if(checkUserExist(login, passwordSHA256)){
        console.log('login: user found!');
        req.session.user = { login: login };
        res.status(202).json({message: 'Authorization success!'});
    }
    else{
        console.log('login: user not found!');
        res.status(404).json({message: 'Wrong data!'});
    }
}

const sessionProfile = (req, res) => {
    res.json({message: `Welcome, ${req.session.user.login}! This is your profile!`});
}

const sessionLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({message: 'Logout failed'});
        }
        res.json({message: 'Logout successful!'});
    });
}

function getCachedData() {
    try {
        const data = fs.readFileSync(cacheFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

function saveCachedData(data) {
    fs.writeFileSync(cacheFile, JSON.stringify(data), 'utf-8');
}

function isCacheValid() {
    try {
        const stats = fs.statSync(cacheFile);
        const cacheAge = Date.now() - stats.mtimeMs;
        return cacheAge <= cacheExpirationTime;
    } catch (error) {
        return false;
    }
}

const sessionData = (req, res) => {
    if (isCacheValid()) {
        const cachedData = getCachedData();
        console.log('Serving data from cache');
        return res.json(cachedData);
    }

    const newData = {
        message: 'New data generated at ' + new Date().toISOString(),
        randomValue: Math.floor(Math.random() * 1000 + 1)
    };

    saveCachedData(newData);
    console.log('Generating new data and saving to cache');
    res.json(newData);
}

module.exports = {
    sessionMiddleware,
    sessionRegister,
    sessionLogin,
    sessionProfile,
    sessionLogout,
    sessionData
};
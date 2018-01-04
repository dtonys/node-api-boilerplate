console.log('auth.js');


async function signup( req, res, next ) {
  res.send('update auth');
}

async function login( req, res, next ) {

  res.send('create auth');
}

async function session( req, res, next ) {
  res.send('get auth');
}
import User from 'models/user';
import bcrypt from 'bcrypt';
import {
  createSessionWithCookie,
  getCurrentSessionAndUser,
  deleteSession,
} from 'helpers/session';
import {
  SESSION_COOKIE_NAME,
} from 'models/session';

export async function signup( req, res, next ) {
  const {
    email,
    password,
  } = req.body;

  // check if user already exists with email
  const existingUser = await User.findOne({ email: email });
  if ( existingUser ) {
    res.status(422);
    res.json({
      error: {
        message: 'User email already in use',
      },
    });
    return;
  }

  try {
    // generate password hash
    const passwordHash = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, ( err, hash ) => {
        if ( err ) {
          reject(err);
        }
        resolve(hash);
      });
    });
    // create user
    const user = await User.create({
      email: email,
      password_hash: passwordHash,
    });

    // log user in
    await createSessionWithCookie(user._id.toString(), res);

    // return user
    res.json({
      data: user,
    });
    return;
  }
  catch ( error ) {
    next(error);
  }
}

export async function login( req, res, next ) {
  const {
    email,
    password,
  } = req.body;

  // find user by email
  try {
    const user = await User.findOne({ email: email });
    if ( !user ) {
      // user not found
      res.status(404);
      res.json({
        error: {
          message: 'Email not found',
        },
      });
      return;
    }

    const validPassword = await new Promise(( resolve, reject ) => {
      bcrypt.compare(password, user.password_hash, ( err, valid ) => {
        if ( err ) {
          reject(err);
        }
        resolve(valid);
      });
    });
    if ( !validPassword ) {
      // wrong password
      res.status(422);
      res.json({
        error: {
          message: 'Wrong password',
        },
      });
      return;
    }
    // log user in
    await createSessionWithCookie( user._id.toString(), res );
    // login success
    res.json({
      data: user,
    });
    return;
  }
  catch ( error ) {
    next( error );
  }
}

export async function logout( req, res, next ) {
  const sessionId = req.cookies[SESSION_COOKIE_NAME];
  if ( sessionId ) {
    try {
      await deleteSession(sessionId);
      res.clearCookie(SESSION_COOKIE_NAME);
      res.json({
        data: null,
      });
      return;
    }
    catch ( error ) {
      next(error);
      return;
    }
  }
  res.json({
    data: null,
  });
}

export async function session( req, res /* ,next */ ) {
  const sessionId = req.cookies[SESSION_COOKIE_NAME];
  if ( !sessionId ) {
    res.json({
      data: null,
    });
    return;
  }
  const { currentUser, currentSession } = await getCurrentSessionAndUser( sessionId );
  if ( !currentUser || !currentSession ) {
    res.json({
      data: null,
    });
    return;
  }
  const _currentUser = currentUser.toObject();
  delete _currentUser.password_hash;
  res.json({
    data: {
      currentUser: _currentUser,
      currentSession,
    },
  });
}

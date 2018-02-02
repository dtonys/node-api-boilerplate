import createEncryptor from 'simple-encryptor';
import lodashDifference from 'lodash/difference';
import lodashGet from 'lodash/get';
import Session, {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from 'models/session';
import User from 'models/user';
import { handleAsyncError } from 'helpers/express';


const encryptor = createEncryptor( process.env.ENCRYPTION_SECRET );
export async function getCurrentSessionAndUser( sessionId ) {
  if ( !sessionId ) {
    return { user: null, session: null };
  }
  const userId = encryptor.decrypt(sessionId);
  const [ currentUser, currentSession ] = await Promise.all([
    User.findOne({ _id: userId }),
    Session.findOne({ _id: sessionId }),
  ]);
  return {
    currentUser,
    currentSession,
  };
}

export async function isValidSession( sessionId ) {
  const session = await Session.findOne({ _id: sessionId });
  return Boolean(session);
}

export async function deleteSession( sessionId ) {
  await Session.remove({ _id: sessionId });
}

export async function createSession( userId ) {
  const encryptedUserId = encryptor.encrypt(userId);
  const session = await Session.create({
    _id: encryptedUserId,
  });
  return session;
}

export async function createSessionWithCookie( userId, res ) {
  const createdSession = await createSession( userId );
  res.cookie(
    SESSION_COOKIE_NAME,
    createdSession._id,
    {
      httpOnly: true, // Prevent client side javascript from stealing session token
      maxAge: 1000 * SESSION_DURATION_SECONDS,
    }
  );
}

export async function loggedInOnly( req, res, next ) {
  const { currentUser } = await getCurrentSessionAndUser( req.cookies[SESSION_COOKIE_NAME] );
  if ( currentUser ) {
    next();
    return;
  }
  res.status(401);
  res.json({
    error: 'Unauthorized access',
  });
}

export function requireRoles( roles ) {
  async function requireRolesMiddleware( req, res, next ) {
    const { currentUser } = await getCurrentSessionAndUser( req.cookies[SESSION_COOKIE_NAME] );
    const userRoles = lodashGet( currentUser, 'roles' );
    const hasRequiredRoles = userRoles && lodashDifference(roles, userRoles).length === 0;
    if ( hasRequiredRoles ) {
      next();
      return;
    }
    res.status(401);
    res.json({
      error: 'Unauthorized access',
    });
  }
  return handleAsyncError(requireRolesMiddleware);
}

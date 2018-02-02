import User from 'models/user';
import { handleAsyncError } from 'helpers/express';


export const create = handleAsyncError( async ( req, res ) => {
  const payload = req.body;
  const user = await User.create(payload);
  res.json({
    data: user,
  });
});

export const update = handleAsyncError( async ( req, res ) => {
  const payload = req.body;
  const { id } = req.params;
  await User.update(
    { _id: id },
    payload,
  );
  const updatedUser = await User.findById(id);
  res.json({
    data: updatedUser,
  });
});

export const get = handleAsyncError( async ( req, res ) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    data: user,
  });
});

export const list = handleAsyncError( async ( req, res ) => {
  const users = await User.find();
  res.json({
    data: {
      items: users,
    },
  });
});

export const remove = handleAsyncError( async ( req, res ) => {
  const { id } = req.params;
  const deletedUser = await User.findOneAndRemove({ _id: id });
  res.json({
    data: deletedUser,
  });
});

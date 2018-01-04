import User from 'models/user';


export async function create( req, res, next ) {
  const payload = req.body;
  try {
    const user = await User.create(payload);
    res.json({
      data: user,
    });
  }
  catch (error) {
    next(error);
  }
}

export async function update( req, res, next ) {
  const payload = req.body;
  const { id } = req.params;
  try {
    await User.update(
      { _id: id },
      payload,
    );
    const updatedUser = await User.findById(id);
    res.json({
      data: updatedUser,
    });
  }
  catch (error) {
    next(error);
  }
}

export async function get( req, res, next ) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json({
      data: user,
    });
  }
  catch (error) {
    next(error);
  }
}

export async function list( req, res, next ) {
  try {
    const users = await User.find();
    res.json({
      data: {
        items: users,
      },
    });
  }
  catch (error) {
    next(error);
  }
}

export async function remove( req, res, next ) {
  const { id } = req.params;
  try {
    const deletedUser = await User.findOneAndRemove({ _id: id });
    res.json({
      data: deletedUser,
    });
  }
  catch (error) {
    next(error);
  }
}

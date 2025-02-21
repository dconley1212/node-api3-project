const { getById } = require("../users/users-model");
// const yup = require("yup");

function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  getById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        next({ status: 404, message: "user not found" });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  if (req.body.name && req.body.name.trim()) {
    next();
  } else {
    next({ status: 400, message: "missing required name field" });
  }
}

// const messageSchema = yup.object({
//   text: yup.string().trim().min(1).required(),
// });

const validatePost = async (req, res, next) => {
  if (req.body.text && req.body.text.trim()) {
    next();
  } else {
    next({ status: 400, message: "missing required text field" });
  }

  // try {
  //   const validatedPost = await messageSchema.validate(req.body);
  //   req.body = validatedPost;
  //   next();
  // } catch (err) {
  //   next(err);
  // }
};

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};

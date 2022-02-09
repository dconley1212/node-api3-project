const { getById, insert } = require("../users/users-model");

function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  getById(id)
    .then((user) => {
      if (user) {
        res.json(user);
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

function validatePost(req, res, next) {}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};

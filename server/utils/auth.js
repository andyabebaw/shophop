const jwt = require("jsonwebtoken");

const secret = "mysupersercret";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
// console.log(token);
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
      // console.log(token);

    }

    if (!token) {
      return req;
    }

    try {
      // console.log(token);
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;

      // console.log("===== Enter authMiddleware with valid token =====");
      // console.log("data: ", data);
    } catch (err) {
      // console.log("===== Error Happened! =====");
      console.log("error: ", err);
      // console.log("invalid token or token expired");
    }

    return req;
  },
  signToken: function ({ _id, name, email, isAdmin }) {
    const payload = { _id, name, email, isAdmin };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

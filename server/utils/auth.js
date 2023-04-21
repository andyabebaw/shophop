const jwt = require("jsonwebtoken");

const secret = "mysupersercret";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;

      // console.log("===== Enter authMiddleware with valid token =====");
      // console.log("data: ", data);
    } catch (err) {
      console.log("===== Error Happened! =====");
      console.log("error: ", err);
    }

    return req;
  },
  signToken: function ({ _id, name, email, admin }) {
    const payload = { _id, name, email, admin };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

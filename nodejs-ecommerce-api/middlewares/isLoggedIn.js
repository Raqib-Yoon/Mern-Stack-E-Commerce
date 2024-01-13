import { getTokenFromHeader, verifyToken } from "../utils/index.js";

const isLoggedIn = (req, res, next) => {
  // get token from the header of req
  const token = getTokenFromHeader(req);
  //   verify token
  const decoded = verifyToken(token);
  //return verified user id
  if (!decoded) {
    res.status(400).json({
      error: "Expired/invalid token. Please login again.",
    });
  } else {
    req.userAuthId = decoded.id;
  }
  next()
};

export default isLoggedIn;

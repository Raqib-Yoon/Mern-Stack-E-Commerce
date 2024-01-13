const getTokenFromHeader = (req) => {
  const token = req.headers.authorization;
  if (!token) {
    console.log("No token provided.");
  } else {
    return token;
  }
};

export default getTokenFromHeader;

export default {
  secret: process.env.JWT_SECRET || "mysecret",
  expiresIn: "60m",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "myanothersecret",
  refreshExpiresIn: "7d"
};

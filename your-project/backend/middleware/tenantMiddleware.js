import mongoose from "mongoose";

const dbConnections = {};

const tenantMiddleware = async (req, res, next) => {
  // const tenantId = req.headers["x-tenant-id"];
  // if (!tenantId) return res.status(400).json({ error: "Tenant ID is required" });

  if (!dbConnections[tenantId]) {
    try {
      const dbURI = process.env.MONGO_URI.replace("<TENANT>", tenantId);
      dbConnections[tenantId] = await mongoose.createConnection(dbURI);
      console.log(`Connected to tenant database: ${tenantId}`);
    } catch (error) {
      return res.status(500).json({ error: "Database connection failed" });
    }
  }

  req.db = dbConnections[tenantId];
  next();
};

export default tenantMiddleware;

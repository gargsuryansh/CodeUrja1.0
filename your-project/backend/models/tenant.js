import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema(
  {
    tenantId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    name: { 
      type: String, 
      required: true 
    },
  }
);

export default mongoose.model("Tenant", TenantSchema);

import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGOOSE_LOCAL_URL);
        console.log("Successfully connected database ",conn.connection.host)
        
    } catch (error) {
        console.log("fald connect to database ",error.message );
        process.exit(1);
        
    }
}
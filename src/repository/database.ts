import mongoose from "mongoose";




export async function connect() {
    try {


        if (!process.env.DBHOST) {
            throw new Error('DBHOST not set in env file');
        }
        await mongoose.connect(process.env.DBHOST);
    }
    catch (error) {
        console.log(error);
    }
}
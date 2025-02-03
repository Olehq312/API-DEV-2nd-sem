import mongoose from "mongoose";



export async function testConnection() {
    try{
        await connect();
        await disconnect();
        console.log('Connection test successful');
    }

    catch (error) {
        console.log(error);

    }

}

export async function connect() {
    try {


        if (!process.env.DBHOST) {
            throw new Error('DBHOST not set in env file');
        }
        await mongoose.connect(process.env.DBHOST);

        if(mongoose.connection.db){
           await mongoose.connection.db.admin().command({ping: 1});
           console.log('Connection etablished');
        }
        else{
            throw new Error('Could not connect to database');
        }
    }
    catch (error) {
        console.log(error);
    }
}

export async function disconnect() {
    try {
        await mongoose.disconnect();
        console.log('Connection closed');
    }
    catch (error) {
        console.log(error);
    }
}
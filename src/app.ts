import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';
import routes from './routes';


dotenvFlow.config();


const app: Application = express();

app.use('/api', routes);

export function startServer() {

    testConnection();


    

    const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function () {
        console.log('Server is up and running on port: ' + PORT);
    });
}


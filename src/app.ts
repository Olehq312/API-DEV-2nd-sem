import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import cors from 'cors';
import { testConnection } from './repository/database';
import routes from './routes';




dotenvFlow.config();


const app: Application = express();



export function startServer() {

    app.use(express.json());

// add cors
    setupCors();


    app.use('/api', routes);


    testConnection();


    

    const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function () {
        console.log('Server is up and running on port: ' + PORT);
    });
}

export function setupCors() {
    console.log('Setting up CORS');
    // kw 2-dec-2024 - Working CORS setup without credentials. Could refactor
    app.use(
        cors({
            origin: "*", // Allow requests from any origin
            // kw 29-nov-2024 - allow methods + headers + credentials
            methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
            allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Allow specific headers
            credentials: true,
        })
    );

    // kw 2-dec-2024 - set the Access-Control-Allow-Origin header for preflight requests - console error 
    app.options('*', (req: Request, res: Response) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'auth-token, Origin, X-Requested-With, Content-Type, Accept');
        // test for credentials
        res.header('Access-Control-Allow-Credentials', 'true');
        res.sendStatus(200);
    });
}




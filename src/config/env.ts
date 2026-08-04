import { config } from 'dotenv';

config({ path: '.env'});

const db = {
    uri: process.env.DB_URI
};

const jwt = {
    secretkey: process.env.JWT_SECRET_KEY
}

export { 
    db,
    jwt
};
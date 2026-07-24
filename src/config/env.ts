import { config } from 'dotenv';

config({ path: '.env'});

const db = {
    uri: process.env.DB_URI
};
console.log(process.env.DB_URI)

export { db };
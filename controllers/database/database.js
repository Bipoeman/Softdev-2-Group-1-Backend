import mysql from 'mysql';
import fs from 'fs';

const filepath = fs.readFileSync("./controllers/database/cert.pem");
const conn = mysql.createConnection({
    host: process.env.host, user: process.env.user, // Do not use username as it will be collided with host username
    password: process.env.password, database: process.env.database, port: 3306, ssl: {
        rejectUnauthorized: true, ca: filepath
    }
});


export default conn;

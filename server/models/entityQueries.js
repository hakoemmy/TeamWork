import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => {
  console.log(err);
});

const createTables = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    gender VARCHAR NOT NULL,
    job_role VARCHAR NOT NULL,
    department VARCHAR NOT NULL,
    address VARCHAR NOT NULL
);
INSERT INTO users (
     first_name, last_name, email, password, gender,
     job_role, department, address
    ) VALUES (
         'TUYISENGE',
         'Sylvain',
        'sylvain@gmail.com',
        '$2b$10$nhZCvSMTdKg/MI7gVTWwj.WCeq7tTSpr4xj4xzVmIbdCoHnwj9nwy',
        'Male',
        'Web developer',
        'IT',
        'Kigali,Rwanda'
);

DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles(
    id SERIAL NOT NULL PRIMARY KEY,
    authorId SERIAL NOT NULL,
    title VARCHAR NOT NULL,
    article VARCHAR NOT NULL,
    created_on VARCHAR NOT NULL,
    updated_on VARCHAR NOT NULL
); 
INSERT INTO articles (authorId, title, article, created_on, updated_on)
   VALUES (
       2,
       'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
       'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
       '09/03/2019 12:04:59',
       '09/03/2019 12:04:59'
       
);

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments(
    id  SERIAL NOT NULL PRIMARY KEY,
    authorId SERIAL NOT NULL,
    articleId SERIAL NOT NULL,
    comment VARCHAR NOT NULL,
    created_on VARCHAR NOT NULL,
    updated_on VARCHAR NOT NULL
); 
INSERT INTO comments (authorId, articleId, comment, created_on, updated_on)
   VALUES (
       2,
       1,
       'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
       '09/03/2019 12:04:59',
       '09/03/2019 12:04:59'

);

`);

export default createTables;

const express = require('express');
const taskRouter = express.Router();


// DB CONNECTION
const pool = require('../modules/pool');

// GET
taskRouter.get('/', (req,res) => {
    // Builds string to use in database later
    // This string will be used to get all data from the
    // restaurants table
    const queryString = `SELECT * FROM weekend-to-do-app ORDER BY "name" ASC;`;

    // Use the connection from the database (called 'pool')
    // and use the query string above, to get the data
    // out of the database
    pool.query(queryString)
        .then((response) => {
            // If that is successful, go ahead and send all 
            // that data, down to the client side
            res.send(response.rows);
        })
        .catch((err) => {
            // If it was not successful, let us know there
            // was an error
            console.log('Error getting data from database: ', err);
            res.sendStatus(500);
        })
});

// POST
taskRouter.post('/', (req,res) => {
    // Create a variable that has a name reflective of the name it
    // had on the client side. Set this equal to the req.body,
    // which was provided to us by body-parser
    const taskObject = req.body;

    console.log(taskObject);

    // Setting up the query string used for SQL later to save the 
    // data in. Note the $1,$2,$3 will eventually map to values
    // we enter when we get to the actual query
    const queryString = `INSERT INTO "weekend-to-do-app" ("name", "gender", "age", "readyForTransfer", "notes")
                    VALUES ($1,$2,$3,'false',$4);`;

    // Hey connection to the database, run a query with the
    // string we built above. Mapping the values inside the array
    // in the order they are provided.
    pool.query(queryString, [taskObject.name, taskObject.gender, taskObject.age, taskObject.notes])
        .then((response) => {
            // 201 tells the client that the server was able to
            // save to the database. 'Created' is what the client sees
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error saving to DB: ', err);
            res.sendStatus(500);
        });
});

// PUT


// DELETE
taskRouter.delete('/delete/:id', (req, res) => {
    const queryString = `DELETE FROM "weekend-to-do-app" WHERE id=$1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error delete: '.err);
        });
}); // this is for the router
module.exports = taskRouter;

taskRouter.put('/readyForTransfer/:id', (req,res) => {
    const queryString = `UPDATE "weekend-to-do-app" SET "readyForTransfer"=true WHERE id=$1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error updating :', err);
            res.sendStatus(500);
        });
});
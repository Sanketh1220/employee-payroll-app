const express = require('express');

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/', (request, response) => {
    response.json ({
       "Message" : "Hey! ,Welcome to employee payroll app."
    })
})

app.listen(3000, function () {
    console.log("Server is up and running on port 3000")
});
const EmployeeInfo = require('../models/employeeInfo.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Employee Info content can not be empty"
        });
    }

    // Create a employee info
    const employeeInfo = new EmployeeInfo({
        firstName: req.body.firstName || "Untitled First Name",
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    // save employee info in database
    employeeInfo.save()
        .then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({
                message: error.message || "Some error occured while creating the employee info"
            });
        });
};

// Retrieve and return all employee's infor from the database.
exports.findAll = (req, res) => {
    EmployeeInfo.find()
    .then(employeeInfo => {
        res.send(employeeInfo);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving info of employee."
        });
    });
}

// Find a single employee info with a employeeId
exports.findOne = (req, res) => {
    EmployeeInfo.findById(req.params.employeeInfoId)
    .then(employeeInfo => {
        if(!employeeInfo) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.employeeInfoId
            });            
        }
        res.send(employeeInfo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Info not found with id " + req.params.employeeInfoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.employeeInfoId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Employee Info content can not be empty"
        });
    }

    // Find note and update it with the request body
    EmployeeInfo.findByIdAndUpdate(req.params.employeeInfoId, {
        firstName: req.body.firstName || "Untitled First Name",
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }, {new: true})
    .then(employeeInfo => {
        if(!employeeInfo) {
            return res.status(404).send({
                message: "Employee info not found with id " + req.params.employeeInfoId
            });
        }
        res.send(employeeInfo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee info not found with id " + req.params.employeeInfoId
            });                
        }
        return res.status(500).send({
            message: "Error updating employee info with id " + req.params.employeeInfoId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    EmployeeInfo.findByIdAndRemove(req.params.employeeInfoId)
    .then(employeeInfo => {
        if(!employeeInfo) {
            return res.status(404).send({
                message: "Employee info not found with id " + req.params.employeeInfoId
            });
        }
        res.send({message: "Employee info deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee info not found with id " + req.params.employeeInfoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee info with id " + req.params.employeeInfoId
        });
    });
};
const e = require("express");
const Employee = require("../model/Employee");

const responseData = {
    STATUS: "SUCCESS",
    RESPONSE: null,
    MESSAGE: null
}

const errorData = {
    STATUS: "FAILED",
    RESPONSE: null,
    MESSAGE: null
}

const postFunc = async (req, res) => {
    try {
        let data = null;
        if (Object.keys(req.body).length > 0) {
            let errorArr = validationFunc(req.body);
            if (errorArr.length > 0) {
                errorData.MESSAGE = "Incorrect Request Body";
                res.status(400).json(errorData);
                return
            } else {
                data = await Employee.create(req.body);
                responseData.RESPONSE = data;
                res.status(201).json(responseData);
            }

        } else {
            errorData.MESSAGE = "Request Body is Empty";
            res.status(400).json(errorData);
        }


    } catch (error) {
        console.log("Error in postFunc :: ", error.message);
        errorData.MESSAGE = error.message;
        res.status(400).json(errorData);
    }
}

const validationFunc = (body) => {
    let keys = ["empName", "empEmail", "empAge", "empGender", "id", "Employee_Registered_Date", "Employee_Updated_Date"];
    let errors = [];
    let bodyKeys = Object.keys(body);
    if (!body.empName || typeof (body.empName) !== 'string' || !body.empGender || typeof (body.empGender) !== 'string'
        || !body.empEmail || typeof (body.empEmail) !== 'string') {
        errors.push("Error in request body ");
    }
    if (body.empAge && !(body.empAge >= 21 && body.empAge <= 70)) {
        errors.push("Error in Age parameter")
    }
    console.log("Errors are before checking fields :: ", errors);
    bodyKeys.map((key) => {
        if (!keys.includes(key)) {
            errors.push("Unknown Field Error");
        }
    })
    console.log("Errors after checking fields --> ", errors)
    return errors;
}

const getAllFunc = async (req, res) => {
    try {
        const errorArr = validationFunc(req.body);
        if (errorArr.length > 0) {
            errorData.MESSAGE = "Incorrect Request Body..";
            res.status(400).json(errorData);
        } else {
            const whereCondtn = await filterData(req.body);
            console.log(whereCondtn)
            const data = await Employee.findAll({ where: whereCondtn });
            responseData.RESPONSE = data;
            res.status(200).json(responseData);
        }
    } catch (error) {
        console.log("Error in getAllFunc :: ", error)
        errorData.MESSAGE = error.message;
        res.status(400).json(errorData);
    }
}
const filterData = async (body) => {
    let whereCondition = {};
    if (body.id) {
        whereCondition["id"] = body.id;
    }
    if (body.empName) {
        whereCondition["empName"] = body.empName;
    }
    if (body.empAge) {
        whereCondition["empAge"] = body.empAge;
    }
    if (body.empGender) {
        whereCondition["empGender"] = body.empGeneder;
    }
    if (body.empEmail) {
        whereCondition["empEmail"] = body.empEmail;
    }
    return whereCondition;
}
const updateFunc = async (req, res) => {
    try {
        const data = await Employee.update(req.body, { where: { id: Number(req.params.id) } });
        responseData.RESPONSE = data;
        res.status(200).json(responseData);
    } catch (error) {
        console.log("Error in updateFunc :: ", error)
        errorData.MESSAGE = error.message;
        res.status(400).json(errorData);
    }
}
const deleteFunc = async (req, res) => {
    try {
        const errorArr = validationFunc(req.body);
        if (errorArr.length > 0) {
            errorData.MESSAGE = "Incorrect Request Body..";
            res.status(400).json(errorData);
            return

        } else {
            const whereCondtn = await filterData(req.body);
            console.log(whereCondtn)
            const data = await Employee.destroy({ where: whereCondtn });
            responseData.RESPONSE = data;
            res.status(200).json(responseData);
        }
    } catch (error) {
        console.log("Error in deleteFunc :: ", error)
        errorData.MESSAGE = error.message;
        res.status(400).json(errorData);
    }
}

const paginationFunc = async (req, res) => {
    try {
        if (req.body && req.body.pageNumber && req.body.pageSize && Object.keys(req.body).length === 2) {
            const data = await Employee.findAndCountAll({ where: {}, offset: (req.body.pageNumber - 1) * req.body.pageSize, limit: req.body.pageSize })
            responseData.RESPONSE = data;
            res.status(200).json(responseData);
        } else {
            errorData.MESSAGE = "Incorrect Request Body..";
            res.status(400).json(errorData);

        }
    } catch (error) {
        console.log("Error in paginationFunc :: ", error)
        errorData.MESSAGE = error.message;
        res.status(400).json(errorData);
    }
}
module.exports = {
    postFunc,
    getAllFunc,
    updateFunc,
    deleteFunc,
    paginationFunc
}
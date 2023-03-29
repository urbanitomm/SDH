var express = require("express");
var cors = require("cors");
var app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use('/', router);

// patient list is an array of objects with a id, first name, last name
const patientList = [
    { "firstname": "John", "lastname": "Smith", "email": "test@test.com", "password": "test" }
];

//index.html route

router.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/Lab2.html");
 });

// GET /patients - list of patients names( firstname, lastname)
router.get('/api/patients', (req, res) => {
    res.json(patientList);
});

// GET /patients/:id - complete patient information
router.get('/api/patients', (req, res) => {
    const id = req.params.id;
    const patient = patientList.find(patient => patient.id == id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.status(404).send("Patient not found");
    }
});

// POST /patients - add a new patient
router.post("/api/patients", (req, res, next) => {
    const patient = req.body;
    patientList.push(patient);
    res.status(201).json(patient);
});

// PUT /patients/:id - update a patient
router.put("/api/patients/:id", (req, res, next) => {

    const id = req.params.id;
    const patient = req.body;
    const index = patientList.findIndex(patient => patient.id == id);



    if (index >= 0) {
        patientList[index] = patient;
        res.json(patient);
    }
    else {
        res.status(404).send("Patient not found");
    }
});

// DELETE /patients/:id - delete a patient
router.delete("/api/patients/:id", (req, res, next) => {

    const id = req.params.id;
    const index = patientList.findIndex(patient => patient.id == id);

    if (index >= 0) {
        patientList.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send("Patient not found");
    }
});

app.listen(3000, () => {

    console.log("Server running on port 3000");

}

);
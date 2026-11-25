const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

let students = [
    {
        id: 1,
        name: "Rahul",
        email: "rahul@gmail.com",
        age: 22,
        course: "Python"
    },
    {
        id: 2,
        name: "Anu",
        email: "anu@gmail.com",
        age: 21,
        course: "Node.js"
    }
];

let nextId = 3;

app.post("/students", (req, res) => {
    const { name, email, age, course } = req.body;

    const student = {
        id: nextId++,
        name,
        email,
        age,
        course
    };

    students.push(student);

    res.status(201).json(student);
});

app.get("/students", (req, res) => {
    res.status(200).json(students);
})

app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, age, course } = req.body;

    students[index] = {
        id,
        name,
        email,
        age,
        course
    };

    res.json(students[index]);

});

app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});
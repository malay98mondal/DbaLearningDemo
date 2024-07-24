const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8002;

// Middleware to parse JSON bodies
app.use(express.json());

// Connection
mongoose.connect("mongodb://127.0.0.1:27017/shopping_cart")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo Error", err));

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
});

// Model Initialize
const Users = mongoose.model("users", userSchema);

// REST API
app.get("/api/users", async (req, res) => {
    try {
        const users = await Users.find({});
        res.setHeader("X-MyName", "Aadi");
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ msg: "Error fetching users" });
    }
});

app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const result = await Users.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            jobTitle: body.jobTitle,
            gender: body.gender
        });

        console.log(result);
        return res.status(201).json({ msg: "Success" });
    } catch (err) {
        return res.status(500).json({ msg: "Error creating user" });
    }
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

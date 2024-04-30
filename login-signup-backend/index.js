import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/myauthDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB connected");

    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
    });

    const User = new mongoose.model("User", userSchema);

    // Route handlers
    app.get("/", (req, res) => {
        res.send("Welcome to my API");
    });

    app.post("/login", async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                if (password === user.password) {
                    res.send({ message: "Login Successful", user });
                } else {
                    res.send({ message: "Password Incorrect" });
                }
            } else {
                res.send({ message: "User not registered" });
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
    

    app.post("/register", async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                res.send({ message: "User already exists" });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                await newUser.save();
                res.send({ message: "Successfully Registered" });
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    app.listen(9002, () => {
        console.log("BE started at port 9002");
    });
})
.catch((error) => {
    console.error("Error connecting to database:", error);
});



import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/util.js";
export const signUp = async (req, res) => {
    try {
        const { name, username, email, password, role } = req.body;
        if (!name || !username || !password || !email)
            return res.status(400).json({ message: 'All fields are required' });
        const user = await User.findOne({
            $or: [{ email }, { username }],
        });
        if (user) {
            if (user.email === email)
                return res.status(400).json({ message: 'Email already exists' });
            if (user.username === username)
                return res.status(400).json({ message: 'Username already exists' });
        };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, username, password: hashedPassword, email, role });
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username && !password)
            return res.status(400).json({ message: 'All fields are required' });

        const user = await User.findOne({
            $or: [{ email: username }, { username }],
        });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        generateToken(user._id, res);
        res.status(200).json({ message: 'Logged in successfully', user: user.name });
    } catch (error) {
        console.error("Internal error: " + error.message);
    }
};


export const logOut = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send("Logout route");
}
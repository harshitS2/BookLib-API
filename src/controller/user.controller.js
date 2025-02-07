import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const signUp = async (req, res) => {
    try{
        const { name, username, email, password, role } = req.body;
    if (!name || !username || !password || !email)
        return res.status(400).json({ message: 'All fields are required' });
    const user = await User.findOne({
        $or: [{ email }, { username }],
    });
    if (user){
        if(user.email === email)
            return res.status(400).json({ message: 'Email already exists' });
        if(user.username === username)
            return res.status(400).json({ message: 'Username already exists' });
    };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({name, username, password: hashedPassword, email, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
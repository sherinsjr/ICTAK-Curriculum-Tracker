const UserData = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



//Create a new User

exports.signupUser = async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;

    // Check if the username or email already exists
    const existingUser = await UserData.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingUser) {
      return res.status(409).json({ message: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserData({
      name,
      email,
      username,
      password: hashedPassword,
      role: role || 'user', // Set the role as 'user' by default if not specified
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
      console.log(err)
    res.status(500).json({ message: "Internal server error" });
  }
  }
  
  exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username exists
      const user = await UserData.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Create a JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        "mysecretkey123" // Replace with your own secret key
      );
  
      console.log("Retrieved User:", user);
      console.log("Generated Token:", token);
  
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  exports.userRole = async (req, res) => {
    try {
      // Verify and decode the token
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, "mysecretkey123");
  
      console.log("Decoded Token:", decodedToken);
  
      // Retrieve the user
      const user = await UserData.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("Retrieved User:", user);
  
      res.status(200).json({ role: user.role });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
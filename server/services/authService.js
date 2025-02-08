const JWT_SECRET = "JAdudfuwefwe(&(&(9889fe93*93jfedc";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../data/userModel");

const registerUser = async (email, password) => {
  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ where: { email } });

    if (existingUser) {
      return {
        success: false,
        message: "User already exist.",
      };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Registration failed. Please try again later.",
    };
  }
};

const login = async (email, password) => {
  try {
    // Check if user already exists
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid credentials." };
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log("Generated token:", token); // For debugging

    return {
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email },
    };
  } catch (error) {
    return {
      success: false,
      message: "Login failed. Please try again later.",
    };
  }
};

module.exports = { login, registerUser };

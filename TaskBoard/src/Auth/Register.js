import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { registerUser } from "../utils/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let valid = true;

        if (!name) {
            setNameError("Name is required");
            valid = false;
        } else {
            setNameError("");
        }

        if (!validateEmail(email)) {
            setEmailError("Invalid email address");
            valid = false;
        } else {
            setEmailError("");
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 6 characters");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (!valid) {
            return;
        }

        try {
            const response = await registerUser({ name, email, password });
            // Handle successful registration
            login(response);
            navigate("/taskboard");
        } catch (error) {
            console.error("Failed to register:", error);
            setEmailError("Failed to register. Please try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ pt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!nameError}
                        helperText={nameError}
                    />
                    <TextField
                        label="Email"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Register
                    </Button>
                </form>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Already have an account?{" "}
                        <Button
                            variant="text"
                            onClick={() => navigate("/login")}
                        >
                            Login here
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;

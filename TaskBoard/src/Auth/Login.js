import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { loginUser } from "../utils/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        // Add any specific password validation rules here
        return password.length >= 6;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let valid = true;

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
            const response = await loginUser({ email, password });
            login(response);
            navigate("/taskboard"); // Redirect to the task board
        } catch (error) {
            console.error("Failed to login:", error);
            setEmailError("Invalid email or password");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ pt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
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
                        Login
                    </Button>
                </form>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Don't have an account?{" "}
                        <Button
                            variant="text"
                            onClick={() => navigate("/register")}
                        >
                            Register here
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;

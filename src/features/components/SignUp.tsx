import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signUp } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError("Passwords do not match");
    }

    if (emailRef.current && passwordRef.current) {
      try {
        setError("");
        setLoading(true);
        await signUp(emailRef.current.value, passwordRef.current.value);
        navigate("/");
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          setError("Email already in use");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email");
        } else if (error.code === "auth/weak-password") {
          setError("Password is too weak");
        } else {
          setError("Failed to create an account");
        }
        console.error("Error creating account:", error);
      }

      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          // component="form"
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            sx={{
              "& .MuiInputBase-input": {
                color: "gray",
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
            }}
            ref={emailRef}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            sx={{
              "& .MuiInputBase-input": {
                color: "gray",
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
            }}
            ref={passwordRef}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            sx={{
              "& .MuiInputBase-input": {
                color: "gray",
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
            }}
            ref={passwordConfirmRef}
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            id="password-confirm"
            autoComplete="current-password"
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid>
            <Grid item>
              <Link to="/login">{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

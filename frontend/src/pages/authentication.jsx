import * as React from 'react';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import styles from '../styles/auth.module.css';

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                const result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            console.log(err);
            const errorMessage = err.response?.data?.message || "An error occurred";
            setError(errorMessage);
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.leftPanel}>
                <div className={styles.backgroundOverlay}></div>
                <div className={styles.brandName}>
                    <h1>Nexus</h1>
                </div>
                <div className={styles.welcomeText}>
                    <h2>Welcome to Nexus</h2>
                    <p>Connect with your team through high-quality video meetings. Simple, reliable, and modern.</p>
                </div>
            </div>
            
            <div className={styles.rightPanel}>
                <div className={styles.formContainer}>
                    <div className={styles.formHeader}>
                        <div className={styles.avatarIcon}>
                            <LockOutlinedIcon />
                        </div>
                    </div>
                    
                    <div className={styles.tabContainer}>
                        <button 
                            className={`${styles.authTab} ${formState === 0 ? styles.activeTab : ''}`}
                            onClick={() => setFormState(0)}
                        >
                            Sign In
                        </button>
                        <button 
                            className={`${styles.authTab} ${formState === 1 ? styles.activeTab : ''}`}
                            onClick={() => setFormState(1)}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div>
                        {formState === 1 && (
                            <TextField
                                className={styles.formField}
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        )}

                        <TextField
                            className={styles.formField}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={username}
                            autoFocus={formState === 0}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        
                        <TextField
                            className={styles.formField}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                        />

                        <div className={styles.errorText}>{error}</div>

                        <button
                            className={styles.submitButton}
                            type="button"
                            onClick={handleAuth}
                        >
                            {formState === 0 ? "Login" : "Register"}
                        </button>
                    </div>
                </div>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
            />
        </div>
    );
}
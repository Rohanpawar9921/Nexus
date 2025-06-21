import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import styles from "../styles/home.module.css";
import { Button, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }
    
    return (
        <div className={styles.homeContainer}>
            <div className={styles.navBar}>
                <div className={styles.logo}>
                    <h2>Nexus</h2>
                </div>

                <div className={styles.navActions}>
                    <div 
                        className={styles.historyButton}
                        onClick={() => navigate("/history")}
                    >
                        <RestoreIcon />
                        <p>History</p>
                    </div>

                    <Button 
                        className={styles.logoutButton}
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                        variant="outlined"
                        color="error"
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className={styles.meetContainer}>                <div className={styles.leftPanel}>
                    <h2><span>Connect</span> with Your <span>Loved Ones</span> Seamlessly, Bridging Distances with Every Call</h2>

                    <div className={styles.joinContainer}>
                        <TextField 
                            onChange={e => setMeetingCode(e.target.value)} 
                            id="outlined-basic" 
                            label="Meeting Code" 
                            variant="outlined" 
                            fullWidth
                            sx={{
                                input: { color: 'white' },
                                label: { color: 'rgba(255, 255, 255, 0.7)' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                    '&.Mui-focused fieldset': { borderColor: '#64dfdf' },
                                }
                            }}
                        />
                        <Button 
                            onClick={handleJoinVideoCall} 
                            variant='contained'
                            sx={{
                                background: 'linear-gradient(45deg, #3498db, #64dfdf)',
                                padding: '15px 30px',
                                fontWeight: '600',
                                boxShadow: '0 4px 15px rgba(100, 223, 223, 0.4)',
                                '&:hover': {
                                    boxShadow: '0 7px 20px rgba(100, 223, 223, 0.5)',
                                    background: 'linear-gradient(45deg, #2980b9, #3ecbd6)'
                                }
                            }}
                        >
                            Join
                        </Button>
                    </div>
                    
                    <div className={styles.createMeeting} onClick={() => {
                        const randomCode = Math.random().toString(36).substring(2, 8);
                        setMeetingCode(randomCode);
                    }}>
                        <span>+ Create a new meeting</span>
                    </div>
                </div>
                <div className={styles.rightPanel}>
                    <img src='/logo3.png' alt="Video conference illustration" />
                </div>
            </div>
        </div>
    )
}


export default withAuth(HomeComponent)
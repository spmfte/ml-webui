import React, { useState } from 'react';
import { Button, Container, TextField, MenuItem, Alert, Snackbar, Tooltip } from '@mui/material';
import axios from 'axios';

function ControlPanel({ onStartStream, onStopStream }) {
    const [inputSource, setInputSource] = useState('webcam');
    const [inputUrl, setInputUrl] = useState('');
    const [streaming, setStreaming] = useState(false);  // State to track if streaming is active
    const [alertInfo, setAlertInfo] = useState({ open: false, severity: '', message: '' });

    const handleStart = async () => {
        try {
            await axios.post('http://localhost:5000/start_video');
            onStartStream(); // Start streaming
            setStreaming(true); // Set streaming state to true
            console.log('Streaming started successfully.');
            setAlertInfo({ open: true, severity: 'success', message: 'Streaming started successfully.' });
        } catch (error) {
            console.error('Failed to start the streaming:', error);
            setAlertInfo({ open: true, severity: 'error', message: 'Failed to start the streaming.' });
        }
    };

    const handleStop = async () => {
        try {
            await axios.post('http://localhost:5000/stop_video');
            onStopStream(); // Stop streaming
            setStreaming(false); // Set streaming state to false
            console.log('Streaming stopped successfully.');
            window.location.reload();  // Reload the page to reset the state
            setAlertInfo({ open: true, severity: 'success', message: 'Streaming stopped successfully.' });
        } catch (error) {
            console.error('Failed to stop the streaming:', error);
            setAlertInfo({ open: true, severity: 'error', message: 'Failed to stop the streaming.' });
        }
    };

    const handleCloseAlert = () => {
        setAlertInfo({ ...alertInfo, open: false });
    };

    return (
        <Container maxWidth="sm">
            <TextField
                select
                label="Input Source"
                value={inputSource}
                onChange={(e) => setInputSource(e.target.value)}
                fullWidth
                margin="normal"
            >
                <MenuItem value="youtube">YouTube</MenuItem>
                <MenuItem value="webcam">Webcam</MenuItem>
            </TextField>
            {inputSource === 'youtube' && (
                <TextField
                    label="YouTube URL"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            )}
            <div>
                <div align="center">
                    {!streaming ? (
                        <Tooltip title="Start the stream">
                            <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }} onClick={handleStart}>
                                Start Stream
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Stop the stream">
                            <Button variant="outlined" style={{ borderColor: 'black', color: 'black' }} onClick={handleStop}>
                                Stop Stream
                            </Button>
                        </Tooltip>
                    )}
                </div>
                <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
                        {alertInfo.message}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}

export default ControlPanel;

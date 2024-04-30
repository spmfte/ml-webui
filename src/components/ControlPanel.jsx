import React from 'react';
import { Button, Container, TextField, MenuItem } from '@mui/material';
import axios from 'axios';

function ControlPanel({ onStartStream }) {
    const [inputSource, setInputSource] = React.useState('webcam');
    const [inputUrl, setInputUrl] = React.useState('');

    const handleStart = async () => {
        try {
            await axios.post('http://localhost:5000/start_video');
            onStartStream(); // Start streaming
            console.log('Streaming started successfully.');
        } catch (error) {
            console.error('Failed to start the streaming:', error);
        }
    };

    const handleStop = async () => {
        try {
            await axios.post('http://localhost:5000/stop_video');
            console.log('Streaming stopped successfully.');
            window.location.reload();
        } catch (error) {
            console.error('Failed to stop the streaming:', error);
        }
    };

    return (
        <Container>
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
            <Button variant="contained" color="success" onClick={handleStart}>
                Start Stream
            </Button>
            <Button variant="contained" color="error" onClick={handleStop}>
                Stop Stream
            </Button>
        </Container>
    );
}

export default ControlPanel;

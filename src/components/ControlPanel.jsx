import React from 'react';
import { Button, Container, TextField, MenuItem } from '@mui/material';

function ControlPanel({ onStartStream, onStopStream }) {
    const [inputSource, setInputSource] = React.useState('webcam');

    const handleStart = () => {
        onStartStream(); // Start streaming
    };

    const handleStop = () => {
        onStopStream(); // Stop streaming
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

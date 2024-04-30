import React, { useState } from 'react';
import { CssBaseline, Typography, AppBar, Toolbar, Container } from '@mui/material';
import ControlPanel from './components/ControlPanel';
import VideoPlayer from './components/VideoPlayer';

function App() {
    const [streaming, setStreaming] = useState(false);
    const videoSrc = `http://localhost:5000/process_video?input_source=webcam`; // Default to webcam for simplicity

    const handleStartStream = () => {
        setStreaming(true);
    };

    const handleStopStream = () => {
        setStreaming(false);
    };

    return (
        <div>
            <CssBaseline />
            <AppBar position="static" style={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={{ color: 'white' }}>
                        ML-UI
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                <ControlPanel onStartStream={handleStartStream} onStopStream={handleStopStream} />
                <VideoPlayer streaming={streaming} videoSrc={videoSrc} />
            </Container>
        </div>
    );
}

export default App;

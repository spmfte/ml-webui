import React, { useState } from 'react';
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
            <h1>Video Streaming App</h1>
            <ControlPanel onStartStream={handleStartStream} onStopStream={handleStopStream} />
            <VideoPlayer streaming={streaming} videoSrc={videoSrc} />
        </div>
    );
}

export default App;

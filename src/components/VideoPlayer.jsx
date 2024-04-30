// src/components/VideoPlayer.jsx
import React from 'react';
import { Card, CardContent } from '@mui/material';

function VideoPlayer({ streaming, videoSrc }) {
    return (
        <Card>
            <CardContent>
                {streaming ? 
                    <img src={videoSrc} alt="Video Stream" style={{ width: '100%' }} /> :
                    <p>Stream not active</p>
                }
            </CardContent>
        </Card>
    );
}

export default VideoPlayer;

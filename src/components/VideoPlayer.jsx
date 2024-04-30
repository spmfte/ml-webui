// src/components/VideoPlayer.jsx
import React from 'react';
import { Card, CardMedia, LinearProgress, Typography } from '@mui/material';

function VideoPlayer({ streaming, videoSrc }) {
    if (!streaming) {
        return (
            <div style={{ textAlign: 'center', width: '100%' }}>
                <LinearProgress />
                <Typography variant="subtitle1" color="textSecondary" style={{ opacity: 0.5 }}>
                    Waiting for stream
                </Typography>
            </div>
        );
    }

    return (
        <Card sx={{ maxWidth: '100%', margin: 'auto' }}>
            <CardMedia>
                <img src={videoSrc} alt="Video Stream" style={{ width: '100%' }} />
            </CardMedia>
        </Card>
    );
}

export default VideoPlayer;


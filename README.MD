# YOLO WebUI

![preview](/public/yolo-webui.png)

![Endpoint Status](https://img.shields.io/badge/endpoint-up-brightgreen?style=for-the-badge&logo=appveyor)
![YOLO Model Version](https://img.shields.io/badge/YOLO-v8n--seg-blue?style=for-the-badge&logo=appveyor)
![Backend Framework](https://img.shields.io/badge/backend-Flask-lightgrey?style=for-the-badge&logo=flask)
![Frontend Framework](https://img.shields.io/badge/frontend-React-blue?style=for-the-badge&logo=react)

## Introduction

The **YOLO WebUI** project serves as an interface for the YOLO object detection and tracking model, facilitating real-time, interactive video streaming. It leverages functionalities from `@segment-object-track.py`, `@ControlPanel.jsx`, and `@VideoPlayer.jsx` to support both educational and practical needs in object tracking.

## Table of Contents

- [Features](#features)
- [Components](#components)
- [Usage](#usage)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Developer](#developer)

## Features

The YOLO WebUI is designed to enhance real-time interaction with video data through key features:
- **Real-time Video Streaming**: Efficiently displays live video feeds using the `VideoPlayer` component.
- **Object Detection and Tracking**: Integrates the YOLO model via `segment-object-track.py` to identify and follow objects within the video stream.
- **Interactive Control Panel**: Facilitates user interaction with the video stream, allowing for start/stop control and source selection through `ControlPanel.jsx`.

## Components

Key components of the YOLO WebUI include:
- **Control Panel (`ControlPanel.jsx`)**: Manages video stream operations and source selection.
- **Video Player (`VideoPlayer.jsx`)**: Renders the video content to users.
- **Backend Services (`segment-object-track.py`)**: Processes video and tracks objects using the YOLO model.

## Usage

To effectively use the YOLO WebUI, follow these detailed steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/spmfte/ml-webui
   ```
2. Change to the repository directory:
   ```bash
   cd ml-webui
   ```
3. Make the startup script executable:
   ```bash
   chmod +x start.sh
   ```
4. Run the setup script to install dependencies and set up the environment:
   ```bash
   python setup.py
   ```
5. Start the server using the startup script:
   ```bash
   ./start.sh
   ```
6. Open a web browser and navigate to:
   ```
   localhost:3000
   ```
   Here, you can interact with the YOLO WebUI, manipulate the video stream, and choose the input source using the control panel.

## Contributing

> Todo
## License

> Todo
## Developer
<a href="https://github.com/spmfte/dot.files/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=spmfte/dot.files" />
</a>

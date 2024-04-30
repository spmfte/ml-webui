#   src/services/segment-object-track.py
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import cv2
import pafy
from ultralytics import YOLO
from ultralytics.utils.plotting import Annotator, colors
from collections import defaultdict

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

# Global objects
track_history = defaultdict(lambda: [])
model = YOLO("yolov8n-seg.pt")  # Initialize the YOLO model

@app.route('/test')
def test():
    return jsonify({"message": "CORS is configured correctly"})

@app.route('/process_video', methods=['GET', 'POST'])
def process_video():
    # Retrieve input source from GET or POST request
    if request.method == 'POST':
        input_source = request.json.get('input_source')
        input_url = request.json.get('input_url')
    else:
        input_source = request.args.get('input_source')
        input_url = request.args.get('input_url')

    # Initialize video capture based on the input source
    if input_source == 'webcam':
        cap = cv2.VideoCapture(0)
    elif input_source == 'youtube' and input_url:
        video = pafy.new(input_url)
        best = video.getbest(preftype="mp4")
        cap = cv2.VideoCapture(best.url)
    else:
        return jsonify({"error": "Invalid input source"}), 400

    if not cap.isOpened():
        return jsonify({"error": "Failed to open video source"}), 500

    def generate_frames():
        try:
            while True:
                success, frame = cap.read()
                if not success:
                    break
                _, buffer = cv2.imencode('.jpg', frame)
                yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        finally:
            cap.release()

    return Response(stream_with_context(generate_frames()), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
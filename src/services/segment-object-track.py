#   src/services/segment-object-track.py
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import cv2
import pafy
import threading
from ultralytics import YOLO
from ultralytics.utils.plotting import Annotator, colors
from collections import defaultdict
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

# Global objects
track_history = defaultdict(lambda: [])
model = YOLO("yolov8n-seg.pt")  # Initialize the YOLO model
model_active = False  # Control flag to activate or deactivate the model

@app.route('/test')
def test():
    return jsonify({"message": "CORS is configured correctly"})


@app.route('/process_video', methods=['GET', 'POST'])
def process_video():
    global model_active
    if not model_active:
        return jsonify({"error": "Model is not active"}), 403

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

                # Annotate frame with detections
                annotator = Annotator(frame, line_width=2)
                results = model.track(frame, persist=True)
                masks, track_ids, class_names, confidences = [], [], [], []

                if results[0].boxes.id is not None and results[0].masks is not None:
                    masks = results[0].masks.xy
                    track_ids = results[0].boxes.id.int().cpu().tolist()
                    class_names = results[0].boxes.cls.int().cpu().tolist()
                    confidences = results[0].boxes.conf.float().cpu().tolist()

                for mask, track_id, class_id, confidence in zip(masks, track_ids, class_names, confidences):
                    full_class_name = model.names[class_id]
                    class_name = full_class_name.split(":")[-1].strip()
                    confidence_str = f"{confidence:.2f}"
                    det_label = f"{class_name} {confidence_str}"
                    annotator.seg_bbox(mask=mask, mask_color=colors(track_id, True), det_label=det_label)

                    if track_id not in track_history:
                        track_history[track_id] = class_name
                        threading.Thread(target=lambda: print(f"Detected: {class_name}")).start()

                annotated_frame = annotator.result()
                _, buffer = cv2.imencode('.jpg', annotated_frame)
                yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        finally:
            cap.release()

    return Response(stream_with_context(generate_frames()), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stop_video', methods=['POST'])
def stop_video():
    global model_active
    model_active = False
    return jsonify({"message": "Video streaming and model have been stopped successfully"})

@app.route('/start_video', methods=['POST'])
def start_video():
    global model_active
    model_active = True
    return jsonify({"message": "Video streaming and model have been started successfully"})

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
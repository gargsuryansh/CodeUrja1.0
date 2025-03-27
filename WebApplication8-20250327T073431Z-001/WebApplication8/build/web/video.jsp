<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Conferencing with Live Captions</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background: linear-gradient(to right, #1e3c72, #2a5298);
            color: white;
            padding: 20px;
            margin: 0;
        }
        .video-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        .video-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 45%;
            max-width: 700px;
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        }
        video {
            width: 100%;
            height: 400px;
            border-radius: 10px;
            border: 3px solid #ffffff;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        }
        button {
            padding: 12px 25px;
            background: #ff9800;
            color: white;
            font-size: 18px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s;
            margin-top: 15px;
        }
        button:hover {
            background: #e68900;
        }
        #transcript {
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 15px;
            font-size: 18px;
            margin-top: 20px;
            border-radius: 8px;
            width: 90%;
            max-width: 800px;
            display: inline-block;
            text-align: left;
            min-height: 50px;
            overflow-y: auto;
            max-height: 150px;
            border: 2px solid white;
        }
    </style>
    <script>
        let localStream;
        let remoteStream;
        let recognition;
        let isRecognizing = false;

        async function startCall() {
            try {
                localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                document.getElementById("localVideo").srcObject = localStream;
                remoteStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                document.getElementById("remoteVideo").srcObject = remoteStream;
                startSpeechRecognition();
            } catch (error) {
                console.error("Error accessing webcam: ", error);
            }
        }

        function startSpeechRecognition() {
            if (!('webkitSpeechRecognition' in window)) {
                console.error("Web Speech API is not supported in this browser.");
                return;
            }
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            isRecognizing = true;
            recognition.onresult = function(event) {
                let transcriptDiv = document.getElementById('transcript');
                let finalTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript + " ";
                    }
                }
                if (finalTranscript.length > 0) {
                    transcriptDiv.innerHTML += finalTranscript;
                }
            };
            recognition.onerror = function(event) {
                console.error("Speech recognition error:", event.error);
                if (event.error !== 'no-speech') {
                    restartRecognition();
                }
            };
            recognition.onend = function() {
                if (isRecognizing) {
                    restartRecognition();
                }
            };
            recognition.start();
        }
        function restartRecognition() {
            setTimeout(() => {
                if (recognition && isRecognizing) {
                    recognition.start();
                }
            }, 1000);
        }
        function stopRecognition() {
            if (recognition) {
                isRecognizing = false;
                recognition.stop();
            }
        }
    </script>
</head>
<body>
    <h1>Video Conferencing with Live Captions</h1>
    <button onclick="startCall()">Start Video Call</button>
    <button onclick="stopRecognition()">Stop Captions</button>
    <div class="video-container">
        <div class="video-box">
            <h3>You</h3>
            <video id="localVideo" autoplay playsinline></video>
        </div>
        <div class="video-box">
            <h3>Remote User</h3>
            <video id="remoteVideo" autoplay playsinline></video>
        </div>
    </div>
    <h3>Live Captions:</h3>
    <div id="transcript">Waiting for speech...</div>
</body>
</html>

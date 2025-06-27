import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Logic = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [finalTranscript, setFinalTranscript] = useState(""); // replaces live one after Whisper
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser doesn't support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  const startRecording = async () => {
    resetTranscript();
    setFinalTranscript(""); // Clear previous Whisper transcript
    setRecording(true);
    recordedChunks.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = event => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);

      // sending the text to Whisper backend
      const formData = new FormData();
      formData.append('audio', blob, 'recording.webm');

      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          setFinalTranscript(data.transcript); // Overwrite live with Whisper transcript
          console.log("Whisper transcription:", data.transcript); // printing it on the console for testing purpose
        });
      };

    mediaRecorderRef.current.start();
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  };

  const stopRecording = () => {
    setRecording(false);
    SpeechRecognition.stopListening();
    mediaRecorderRef.current.stop();
  };

  return (
    <div>
      <h2>Hybrid Speech Recognition</h2>
      <button onClick={startRecording} disabled={recording}>Start</button>
      <button onClick={stopRecording} disabled={!recording}>Stop</button>
      <p><strong>Live Transcript:</strong> {finalTranscript||transcript}</p>
    </div>
  );
};

export default Logic;

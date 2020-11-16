import '../App.css';
import React, { useRef } from "react";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { Handpoints } from "./Handpoints";

function View() {
    const webcamView = useRef(null);
    const canvasView = useRef(null);

    const oneHandpose = async () => {
        // Load the MediaPipe handpose model.
        const dataInfo = await handpose.load();
        console.log("Handpose model is here.");
        //  Loop and detect hand
        setInterval(() => {
            detectHand (dataInfo);
        }, 50);
      };

    const detectHand = async (info) => {
        // Check data is available
        if (
          typeof webcamView.current !== "undefined" &&
          webcamView.current !== null &&
          webcamView.current.video.readyState === 4
        ) {
          // Video Properties
          const video = webcamView.current.video;
          const videoWidth = webcamView.current.video.videoWidth;
          const videoHeight = webcamView.current.video.videoHeight;
    
          // Video height and width
          webcamView.current.video.width = videoWidth;
          webcamView.current.video.height = videoHeight;
    
          // Canvas height and width
          canvasView.current.width = videoWidth;
          canvasView.current.height = videoHeight;
    
          // Getting hand recognition
          const oneHand = await info.estimateHands(video);
          console.log(oneHand);
    
          // Draw hand points on the canvas
          const canvasInfo = canvasView.current.getContext("2d");
          Handpoints(oneHand, canvasInfo);
        }
      };

      oneHandpose();
  return (
    <div className="App">
        <h1>Welcome to one-handed point detection</h1>
        <p><a href='https://ai.googleblog.com/2019/08/on-device-real-time-hand-tracking-with.html'>You can read more on the Google Blog : here</a></p>
        <Webcam
          ref={webcamView}
          className="webcam_view"
        />
         <canvas
          ref={canvasView}
          className="canvas_view"
        />
    </div>
  );
}

export default View;

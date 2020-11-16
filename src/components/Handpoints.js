// Points for fingers
const fingersPoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };

  export const Handpoints = (hand, canvasStyle) => {
    // Check if we have hand
    if (hand.length > 0) {
      // Loop through each handPoints
      hand.forEach((handPoints) => {
        // Grab landmarks
        const landmarks = handPoints.landmarks;
  
        // Looping through fingers
        for (let j = 0; j < Object.keys(fingersPoints).length; j++) {
          let finger = Object.keys(fingersPoints)[j];
          //  Looping through pairs of joints
          for (let a = 0; a < fingersPoints[finger].length - 1; a++) {
            // Geting pairs of joints
            const firstJointIndex = fingersPoints[finger][a];
            const secondJointIndex = fingersPoints[finger][a + 1];
  
            // Draw path
            canvasStyle.beginPath();
            canvasStyle.moveTo(
              landmarks[firstJointIndex][0],
              landmarks[firstJointIndex][1]
            );
            canvasStyle.lineTo(
              landmarks[secondJointIndex][0],
              landmarks[secondJointIndex][1]
            );
            canvasStyle.strokeStyle = "silver";
            canvasStyle.lineWidth = 2;
            canvasStyle.stroke();
          }
        }
  
        // Looping through landmarks and draw em
        for (let i = 0; i < landmarks.length; i++) {
          //  x point
          const x = landmarks[i][0];
          //  y point
          const y = landmarks[i][1];
          // draw hand points on the canva
          canvasStyle.beginPath();
          canvasStyle.arc(x, y, 4, 0, 3 * Math.PI);
  
          //draw hand lines on the canva
          canvasStyle.fillStyle = "silver";
          canvasStyle.fill();
        }
      });
    }
    else {
      console.log('Please raise one hand of the video image')
      canvasStyle.font = "30px Arial";
      canvasStyle.fillText("Please raise one hand of the video image", 10, 50);
    }
  };
  
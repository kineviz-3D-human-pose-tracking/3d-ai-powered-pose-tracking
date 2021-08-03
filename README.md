
# AI Powered 3D Human Pose Tracking and Analysis

This project uses Pose Detection API ([PoseNet](https://blog.tensorflow.org/2018/05/real-time-human-pose-estimation-in.html)/[MoveNet](https://blog.tensorflow.org/2021/05/next-generation-pose-detection-with-movenet-and-tensorflowjs.html)) supports multiple models for running real-time pose estimation by simply estimating where key body joints are. 

Try out the [Live Demo](https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=movenet) **Although impressive, the pose is still in 2D.** 

The main **stretch goal** of this project is to create 3D pose and eventually get the 3D pose using [GraphXR](https://www.kineviz.com/visualization) to visualize the data. GraphXR is a browser-based visualization tool that brings unprecedented speed, power, and flexibility to the exploration of data in 2D and XR. 

![camera_setup](https://user-images.githubusercontent.com/60201466/127975106-a2da261d-1176-49de-8147-e800477b9523.png)

By positioning two webcams, pointed at orthogonal directions, we can combine the two 2D poses into a single 3D pose stream.

Traditional 3D motion capture systems require a sophisticated setup and are very costly and can reduce computational power significantly. This system makes 3D pose capture accessible by much more people.

## Table of Contents
  * [Architectural Diagram](#architectural-diagram)
  * [Description](#description)
    * [Dependencies](#dependencies)
    * [Preparing the data](#preparing-the-data)
    * [Demo](#demo)
    * [Inference](#inference)
  * [Citation](#citation)
  * [Acknowledgments](#acknowledgments)
  * [Contact](#contact)

## Architectural Diagram

<img src="photos/architectural_diagram.png" width="700" height="600">


## Clients on ObservableHQ

[ObservableHQ](https://codewithhugo.com/observablehq-notebooks-for-javascript-demos-and-prototypes/) that introduces the notebook paradigm to JavaScript projects. (for those of you familiar with Jupyter notebooks, this is the equivalent with JavaScript instead of Python).

**How does MoveNet/PoseNet work**

There are two steps:

* First create a detector by chosing one of the models form SupportedModels, including MoveNet and PoseNet.
    
    For example:
    
            const model = poseDetection.SupportedModels.MoveNet;
            const detector = await poseDetection.createDetector(model);
            
* Then you can use the detector to detect poses.
            
            const poses = await detector.estimatePoses(image);

The returned poses list contains detected poses for each individual in the image. For single-person models, there will only be one element in the list. If the model cannot detect any poses, the list will be empty.

For each pose, it contains a confidence score of the pose and an array of keypoints. PoseNet and MoveNet both return *17 keypoints.* 

<img src="photos/keypoints.png" width="300" height="300">

Each keypoint contains x, y, score and name.

Example output:

        [
          {
            score: 0.8,
            keypoints: [
              {x: 230, y: 220, score: 0.9, name: "nose"},
              {x: 212, y: 190, score: 0.8, name: "left_eye"},
              ...
            ]
          }
        ]



## Links to our client-side notebooks

Stream from webcam 1 | Stream from webcam 2 | Receiver 3D
------------ | ------------- | -------------
Captrures coordinates x, y | Capture coordinates x, y | Combines coordinates into x, y, z
[Webcam 1](https://observablehq.com/@mt-cs/posenet-webcam-1) | [Webcam 2](https://observablehq.com/d/d2b73e086b4f386f) | [Receiver 3D](https://observablehq.com/d/74978e5d2497a671)


    
## Server


**socket.io**

Please see the documentation for **socket.io** [here](https://socket.io/docs/v4/index.html)

Socket.io enables real-time bidirectional event-based communication.

-  **index.js** server (this repository)

     * this server listens on port *9000*
     * informs when user gets connected and disconnected
     * broadcast and emits skeleton data to the listening clients

## Installation
   
   
Install npm before running index.jx:

       $ npm install
       
       $ npm install socket.io
       
       $ npm install express
       

## How to Run it 

The following example attaches socket.io to a plain Node.JS HTTP server listening on port 9000.

Simply run 

        $  node index.js
    
to start the server in the terminal and you should get confirmation response 

   *listening on port 9000* 
   
   
## How to Test

Mocha is a feature-rich JavaScript test framework running on [Node.js](https://nodejs.org/en/) and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases. Hosted on [GitHub](https://github.com/mochajs/mocha).

**Installation**

        $ npm install --global mocha
    
**Then run tests with**

        $ npm test
        $ npm i supertest
    
*More information about Mocha you can find [here](https://mochajs.org/)*




---

## Credits

Developed for the [Kineviz Summer Project](https://kineviz.com/) by:
* Marisa Tania
* Barbora Novakova
* Nikko Sacramento
* Thom Lauret

Sponsor: Weidong Yang

Instructor: Mario Lim

Code credits:
* PoseNet: [Loren Riesenfeld](https://observablehq.com/@lorenries/estimating-pose-in-the-browser-with-posenet-and-tensorflow-)
* MoveNet: [Taras Novak](https://observablehq.com/@randomfractals/tensorflow-movenet-webcam)
* Socket.io: [Sylvain Lesage](https://observablehq.com/@severo/hello-socket-io)

---

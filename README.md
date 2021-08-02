# AI Powered 3D Human Pose Tracking and Analysis


This project uses Pose Detection API ([Posenet](https://blog.tensorflow.org/2018/05/real-time-human-pose-estimation-in.html)/[Movenet](https://blog.tensorflow.org/2021/05/next-generation-pose-detection-with-movenet-and-tensorflowjs.html)) supports multiple models for running real-time pose estimation by simply estimating where key body joints are. 

Try out the [Live Demo](https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=movenet) **Although impressive, the pose is still in 2D.** 

The main **stretch goal** of this project is to create 3D pose and eventually get the 3D pose using [GraphXR](https://www.kineviz.com/visualization) to visualize the data. GraphXR is a browser-based visualization tool that brings unprecedented speed, power, and flexibility to the exploration of data in 2D and XR. 

![picture](photos/setup.png)

By positioning two webcams, pointed at orthogonal directions, we can combine the two 2D poses into a single 3D pose stream.

Traditional 3D motion capture systems require a sophisticated setup and are very costly. This system makes 3D pose capture accessible by much more people.


## Architectural Diagram

![picture](photos/architectural_diagram.png)


## Clients on ObservableHQ

[ObservableHQ](https://codewithhugo.com/observablehq-notebooks-for-javascript-demos-and-prototypes/) that introduces the notebook paradigm to JavaScript projects. (for those of you familiar with Jupyter notebooks, this is the equivalent with JavaScript instead of Python).

Links:


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
    
*More information about Mocha you can find [here](https://mochajs.org/)*

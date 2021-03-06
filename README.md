
# AI Powered 3D Human Pose Tracking and Analysis


MoveNet: [[Webcam 1](https://observablehq.com/@mt-cs/movenet-3d-pose-tracking-webcam-1)] 
[[Webcam 2](https://observablehq.com/@mt-cs/movenet-3d-pose-tracking-webcam-2)]
[[Receiver](https://observablehq.com/@mt-cs/movenet-3d-pose-tracking-receiver)]

PoseNet: [[Webcam 1](https://observablehq.com/@mt-cs/posenet-webcam-1)] 
[[Webcam 2](https://observablehq.com/@mt-cs/posenet-webcam-2)]
[[Receiver](https://observablehq.com/@mt-cs/posenet-receiver)]

| Webcam 1 | Webcam 2 |
| --- | --- |
| ![Webcam1](https://user-images.githubusercontent.com/60201466/128408730-f40e4d74-a736-42d8-9369-4f5f363ca147.gif) | ![Webcam2](https://user-images.githubusercontent.com/60201466/128409678-da137bb6-a809-4c82-a65b-4e15976cd499.gif) | 

| GraphXR 3D |
| --- |
| ![GraphXR](https://user-images.githubusercontent.com/60201466/128415056-15f7c8b5-0e29-4de8-8963-f483263e9d34.gif) | 

## Table of Contents
  * [Description](#description)
    * [Setup](#setup)
    * [Architectural Diagram](#architectural-diagram)
    * [TensorFlow](#tensorflow)
    * [PoseNet](#posenet)
    * [MoveNet](#movenet)
    * [Client Side](#client-side)
    * [Server Side](#server-side)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Launch a Linux Virtual Machine](#Launch-a-Linux-Virtual-Machine)
  * [Client-Server Network](#client-server-network)
  * [Tests](#tests)
  * [GraphXR](#graphXR)
  * [Demo Tutorial](#demo-tutorial)
  * [Future Improvements and Applications](#future-application)
  * [Dependencies](#dependencies)
  * [Credits](#credits)
  * [Acknowledgments](#acknowledgments)
  * [Contact](#contact)

## Description

Whether it's for games, motion analysis in health and fitness, virtual reality development, or medical examinations, many applications require that people and their movements be captured digitally in 3D in real-time. Until now, this was possible only with expensive systems using multiple cameras and/or by having people wear special suits and tracking points or tracking devices. With the AI power and combining multi-device data streams through Socket.io, this project offers the possibility of turn smartphones and webcams into a multi-view body tracking system without using any trackers. We present an affordable solution to detect 3D poses by just using two webcams. The latest development in using deep learning for pose estimation has impressive stability, speed, and tolerance to occlusion. This project uses Pose Detection API ([PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)/ [MoveNet](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet)) that supports multiple models for running real-time pose estimation by simply estimating where key body joints are. By positioning two webcams, pointed at orthogonal directions, we can combine the two 2D poses into a single 3D pose stream. Traditional 3D motion capture systems require a sophisticated setup and are very costly, hence the multi-webcam system makes 3D pose capture accessible by many more people.

[![AI Powered 3D Human Pose Tracking and Analysis](https://user-images.githubusercontent.com/60201466/128764309-bbcc80df-d393-4192-9d3a-c90e4de8cfec.png)](https://www.youtube.com/watch?v=qVdNwlup_ZQ)

The long-term goal of this project is to interact in the VR world without controllers or wearables. By detecting 3D gestures in non-costly ways, we hope to reduce the need for body trackers, hardware usage, and also computational power and make 3D interaction in VR more accessible. Full-body tracking for skeletal animation allows for more user expression that could humanize users in the VR world. There are endless use cases including hand motion interaction with data, video games, and virtual meetings in 3D.

## Setup

Positioning two webcams pointed at orthogonal directions is the simplest way to combine the two 2D poses into a single 3D pose stream. Both cameras are placed at a 90 degrees angle to get the ***x, y, z coordinates*** for plotting in  [Three-dimensional space](https://en.wikipedia.org/wiki/Three-dimensional_space).

![camera_setup](https://user-images.githubusercontent.com/60201466/127975106-a2da261d-1176-49de-8147-e800477b9523.png)


## Architectural Diagram


<img src="photos/architectural_diagram.png" width="700" height="600">

## TensorFlow

[TensorFlow](https://www.tensorflow.org/) is an end-to-end open-source platform for machine learning. TensorFlow allows developers to create dataflow graphs???structures that describe how data moves through a graph, or a series of processing nodes. Each node in the graph represents a mathematical operation, and each connection or edge between nodes is a multidimensional data array or tensor.

**Important concepts**
* Pose: at the highest level, PoseNet and MoveNet will return a pose object that contains a list of keypoints and an instance-level confidence score for each detected person.

* Keypoint: a part of a person???s pose that is estimated, such as the nose, right ear, left knee, right foot, etc. It contains both a position and a keypoint confidence score. PoseNet and MoveNet both detects *17 keypoints*  illustrated in the following diagram.

<img src="photos/keypoints.png" width="300" height="300">

For each pose, it contains a confidence score of the pose and an array of keypoints. Each keypoint contains x, y, score, and name.

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

**Although impressive, the pose is still in 2D.** 

The goal of this project is to reconstruct 3D skeleton points using two angles of these 2D pose estimations. 

## PoseNet

[Posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) is a pre-trained machine learning library that can estimate human poses. It was released by Google Creative Lab and built on Tensorflow.js. It's powerful and fast enough to estimate human poses in real-time and works entirely in the browser. Even better, it has a relatively simple API. However, the lacking accuracy/performance was improved by the newer version MoveNet.

**How to estimate skeleton key points with PoseNet**


* In PoseNet you can estimate both single or multiple people. In this project we focus on estimating single poses:
    
            const model = await posenet.load(+modelMultiplier)
            const pose = await model.estimateSinglePose(source);
            

## MoveNet

[MoveNet Model](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet) is the latest pre-trained machine learning library [released](https://blog.tensorflow.org/2021/05/next-generation-pose-detection-with-movenet-and-tensorflowjs.html) by [TensorFlow](https://www.tensorflow.org) team, as part of a larger [Pose Detection](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection) [TensorFlow.js models](https://www.tensorflow.org/js/models) set. MoveNet is a convolutional neural network model that runs on RGB images and predicts human joint locations of a single person that runs faster than real-time ([30+ FPS](https://blog.tensorflow.org/2021/05/next-generation-pose-detection-with-movenet-and-tensorflowjs.html)).

The [pose Animator](https://blog.tensorflow.org/2020/05/pose-animator-open-source-tool-to-bring-svg-characters-to-life.html) meshes SVG, [face landmarks detection](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection), and motion capture with [pose estimation](https://www.tensorflow.org/lite/examples/pose_estimation/overview) allows [real-time human pose estimation in the browser](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5).

We encouraged you to check our [2D Webcam Pose Detection With PoseNet](https://observablehq.com/@mt-cs/posenet-webcam-1) to compare the robustness of the two pose detection models. Compared to TensorFlow's older model PoseNet, the [MoveNet model](https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=movenet) has a powerful combination of speed and accuracy needed that allows an accurate depiction of difficult poses. 


**How does MoveNet work**

There are two steps:

* First create a detector by choosing one of the models from SupportedModels, including MoveNet.
    
            const model = poseDetection.SupportedModels.MoveNet;
            const detector = await poseDetection.createDetector(model);
            
* Then you can use the detector to detect poses.
            
            const poses = await detector.estimatePoses(image);

The returned poses list contains detected poses for each individual in the image. For single-person models, there will only be one element in the list. If the model cannot detect any poses, the list will be empty.



## Client Side

The development of the clients is done on [ObservableHQ](https://observablehq.com/@mt-cs/movenet-3d-pose-tracking-webcam-1). It is the notebook paradigm for [JavaScript projects](https://codewithhugo.com/observablehq-notebooks-for-javascript-demos-and-prototypes/).

Two notebook webcams are equivalent to one another, which emit data to the server. The third ObservableHQ notebook is the receiver that takes in both webcams data from the server.

## Links To ObservableHQ Notebooks


**MoveNet**

Stream from webcam 1 | Stream from webcam 2 | Receiver 3D
------------ | ------------- | -------------
Captures coordinates x, y | Captures coordinates x, y | Combines coordinates into x, y, z
[Webcam 1](https://observablehq.com/@mt-cs/movenet-3d-pose-tracking-webcam-1) | [Webcam 2](https://observablehq.com/@mt-cs/movenet-3d-pose-tracking-webcam-2) | [Receiver 3D](https://observablehq.com/@mt-cs/movenet-3d-pose-tracking-receiver)

**PoseNet**

Stream from webcam 1 | Stream from webcam 2 | Receiver 3D
------------ | ------------- | -------------
Captures coordinates x, y | Captures coordinates x, y | Combines coordinates into x, y, z
[Webcam 1](https://observablehq.com/@mt-cs/posenet-webcam-1) | [Webcam 2](https://observablehq.com/@mt-cs/posenet-webcam-2) | [Receiver 3D](https://observablehq.com/@mt-cs/posenet-receiver)


## Server Side

Browsers running on multiple devices will be connected using **Socket.IO.** [Socket.IO](https://socket.io/docs/v4/index.html) is a library that enables real-time, bidirectional, and event-based communication between the browser and the server.

Socket.IO is **NOT** a WebSocket implementation. The Socket.IO client is a ???slight??? wrapper around the WebSocket API. Although Socket.IO indeed uses WebSocket as transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.

**How does that work?**

Please see the documentation for **socket.io** [here](https://socket.io/docs/v4/index.html)

Socket.IO is a library that enables real-time, bidirectional, and event-based communication between the browser and the server. It is divided into two parts:
* Server-Side: it is a Node.js server
* Client-Side: it is a Javascript client library for the browser (which can be also run from Node.js), In this project the client is both webcam 1 and webcam 2 ObservableHQ notebook.

The client will try to establish a [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) connection if possible and will fall back on HTTP long-polling if not. WebSocket is a communication protocol that provides a full-duplex and low-latency channel between the server and the browser. More information can be found [here](https://en.wikipedia.org/wiki/WebSocket).


-  **index.js** server (this repository)

     * this server listens on port *9000*
     * informs when a user gets connected and disconnected
     * broadcast and emits skeleton data to the listening clients


## Installation

Install npm before running index.jx:

        $ npm install

        $ npm install --global mocha
    

## Usage

**How to Run it**

The following example attaches socket.io to a plain Node.JS HTTP server listening on port 9000.

Simply run 

        $  node index.js
    
to start the server in the terminal and you should get a confirmation response 

   *listening on port 9000* 

## Local Host vs. Virtual Machine

In our clients, you can change the URL to LocalHost with port of your choice (make sure to update server's URL & port as needed) to first test out the fuctionality of this project. However, in order to combine the two webcams, we created an [Ubuntu Virtual Machine on AWS](https://ubuntu.com/aws).

Creating a VM makes it possible to allow multiple systems operating from the same console at the same time with less overhead. More over it allows the separation of software from the physical host computer. It is necessary to have at least **8 GB of RAM available** on your VM for running this project. 

For more information how to set up the VM that is hosted by AWS follow this tutorial??[Launch an Ubuntu Linux Virtual Machine](https://techexpert.tips/amazon-aws/ec2-ubuntu-linux-virtual-machine/)
   
   
## Client-Server Network

To share data from multiple devices we need to add Cross-Origin Resource Sharing [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to our dependancy. CORS represents an HTTP-header based mechanism that let a server to indicate any origins (domain/port) other than its own. 

Our clients-side are running on ObservableHQ that was loaded over HTTPS. Firstly to force connection from HTTP to HTTPS, we need to get [Let's Encrypt Certificate](https://letsencrypt.org/docs/) to obtain a browser-trusted certificate and validate our VM domain.

![howitworks_challenge](https://user-images.githubusercontent.com/60201466/129121970-1a830ec4-f762-4e05-b544-3f990a1d545c.png)

To add CORS dependency on Node.js server:

1.??Using CORS in index.js

        const cors = require('cors')
        const app = express()
        const port = process.env.PORT || 3333

        app.use(cors())

2. Use the same https instance with io and add your certificates when creating server in index.js

       const httpsServer =????https.createServer({
         key: fs.readFileSync('privkey.pem'),
         cert: fs.readFileSync('fullchain.pem'),
         requestCert: false,
         rejectUnauthorized: false
       }, app).listen(port, () => console.log('listening on port ' + port));

       const io = require("socket.io")(httpsServer); //not https module, it should be use https instance



## Tests

**How to Test**

[Mocha](https://mochajs.org/) is a feature-rich JavaScript test framework running on [Node.js](https://nodejs.org/en/) and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting while mapping uncaught exceptions to the correct test cases. Hosted on [GitHub](https://github.com/mochajs/mocha).

To run:

        $ npm test
    
*More information about Mocha you can find [here](https://mochajs.org/)*



## GraphXR

[GraphXR](https://www.kineviz.com/visualization) is a browser-based visualization tool that brings unprecedented speed, power, and flexibility to the exploration of data in 2D and XR. [GraphXR](https://www.kineviz.com/) enables graph exploration in virtual reality (VR). Utilizing GraphXR, we display the combined two webcam streams as a 3D skeleton of **nodes** that are connected by **edges** in an interactive virtual 3D graph space and provides a powerful set of tools to explore and modify the data.

[![Graph XR 3D AI Demo](https://user-images.githubusercontent.com/60201466/128616725-f2466cff-8234-403c-94d1-261a12eaa2c3.png)
](https://www.youtube.com/watch?v=mi5JO6QNtEQ)


**How to run collected data in GraphXR**


To visualize data in a 3D environment, we input CSV files to [Kineviz GraphXR](https://www.kineviz.com/?gclid=CjwKCAjwmK6IBhBqEiwAocMc8gQj_BLHfVHzERnLd8sHldIo0SXmMglRqNBq2CgklB5mUINKPAXDQxoCm38QAvD_BwE).

Follow these steps:

   ??? Create an account on [GraphXR Next](https://graphxrnext.kineviz.com/register)\
   ??? Download skel.grove and skelly.graphxr from [GitHub](https://github.com/kineviz-3D-human-pose-tracking/streamer-receiver-socketio/tree/main/graphXR) folder\
   ??? Create a new Project in GraphXR Next\
   ??? Open the recently created project\
   ??? Click on Project icon on left and then Extensions and pick Grove\
   ??? Click on View attached files and change into desired .csv data\
   ??? Drag skelly.graphxr and paste it into the background\
   ??? Hold right-click to rotate the Skeleton as needed\
   ??? Go to Settings to adjust the visualization\
   ??? If you want to escape into Virtual Reality World, you can put on your goggles and watch your skeleton in there


  
Watch the full Tutorial **[here](https://user-images.githubusercontent.com/55717978/128306293-05b63fce-02df-4850-b2de-71b35a593f3f.mp4)** for more details. 



**Supported Environments**

      WINDOWS, MAC OSX AND LINUX
      
        ??? The GraphXR client runs best in Google Chrome. Compatibility with other
          browsers may vary
          
      OCULUS RIFT, HTC VIVE AND WINDOWS MIXED REALITY
      
       ??? The GraphXR client includes Beta support for Virtual Reality (VR) hardware in
         the Google Chrome browser via WebXR.
         
      CLOUD, PRIVATE CLOUD, AND ON-PREMISES DATA HOSTING
      
        ??? GraphXR Explorer and Analyst editions support local and cloud storage. In
          addition, GraphXR Enterprise is available via on-premises or private cloud
          deployments.
     

*For more information check out [GraphXR User Guide](https://static1.squarespace.com/static/5c58b86e8dfc8c2d0d700050/t/5df2bc684c2e38505cf2be1c/1576189042217/GraphXR_User_Guide_v2_2_1.pdf)*
   


## Demo Tutorial


[![Running AI Powered 3D Human Pose Tracking and Analysis](https://user-images.githubusercontent.com/60201466/128557336-dffa8da8-42e3-4427-bfdf-ca1dedf14a5c.png)](https://youtu.be/Kue8udG9MhI)


## Future Improvements and Applications

For this project implementation, we chose a configuration that minimizes the mathematical computation complexity, but it's not necessary to have this restriction.

??? **Placement of the camera**\
    The next step is to move away from the orthogonal placement of the webcams, we can experimenting placing the camera in different angles and reconstruct the Z point using epipolar geometry. We can deal with lost frames using the time-domain filter to improve accuracy and precision.

??? **Improve the stability**\
    For improving accuracy and reliability, the [Kalman filter](https://en.wikipedia.org/wiki/Kalman_filter) is one of the most commonly used linear estimators [minimum mean-square-error](https://en.wikipedia.org/wiki/Minimum_mean_square_error).

??? **Directly connect Receiver to GraphXR**\
    In this project, we collect data in CSV before we input them to GraphXR for development and analysis purposes. For future improvements, we can stream data from the receiver directly to Kineviz GraphXR [Grove](https://www.kineviz.com/grovesample) using Socket.IO. By doing this step, we can open up potential gesture control to interact with data in the 3D virtual environment, as explained below.

??? **Gesture Recognition in the Virtual World**\
    We can use this project to collect **Machine Learning data for Gesture Recognition** and be able to use those gestures in the **Virtual Environment**. Gestures can be used for interactivity with different objects. Most Extended Reality (XR) tracking is done from the glasses so often users do not see their hands.  with the two webcams placement in the front users, we can see the hand and full-body gestures. This gives us the ability to immerse ourselves in the virtual environment and integrate the virtual body with the real body. Recognizing simple natural gestures like push, pull, grab, drag can be a game-changer in interactivity in XR.



## Dependencies

 
  * [tensorflow](https://www.tensorflow.org/)
  * [node.js](https://nodejs.dev/)
  * [npm](https://www.npmjs.com/)
      * [cors](https://www.npmjs.com/package/cors)
      * [express](https://www.npmjs.com/package/express)
      * [socket.io](https://www.npmjs.com/package/socket.io)
      * [husky](https://www.npmjs.com/package/husky)
  * [mocha](https://mochajs.org/)

## Credits

Developed for the [Kineviz](https://kineviz.com/) and [University of San Francisco](https://www.usfca.edu/arts-sciences/graduate-programs/computer-science?gclid=Cj0KCQjwu7OIBhCsARIsALxCUaOnomqGePhLPOYnIdNZNowVP2aSLsepdMYOe9W5Gb3InnI8b5lDKxAaAk03EALw_wcB) Summer Project by:
* [Marisa Tania](https://www.linkedin.com/in/marisatania/)
* [Barbora Novakova](https://www.linkedin.com/in/barbora-novakova-666029126/)

Sponsor: Weidong Yang

Code credits:
* PoseNet: [Loren Riesenfeld](https://observablehq.com/@lorenries/estimating-pose-in-the-browser-with-posenet-and-tensorflow-)
* MoveNet: [Taras Novak](https://observablehq.com/@randomfractals/tensorflow-movenet-webcam)
* Socket.io: [Sylvain Lesage](https://observablehq.com/@severo/hello-socket-io)

## Acknowledgments

We sincerely thank:
* [Weidong Yang](https://www.linkedin.com/in/yangweidong/) and the [Kineviz](https://www.kineviz.com/) Team for our biweekly meetings
* [Nikko Sacramento](https://www.linkedin.com/in/nikkosac/) for plotting the 3D skeleton in GraphXR and running the data in VR
* Sean Li for debugging the cors issue
* [Thom Lauret](https://www.linkedin.com/in/thomlauret/) for the more robust AWS server
* Professor [Mario Lim](https://www.linkedin.com/in/mario-lim-243556/) for helpful crossover network connection discussions
* [Alex Law](https://www.linkedin.com/in/alexandria-law/) for posting the blogpost and voice over
* [Cynthia Yu](https://www.shuhuancynthiayu.com/about) for being our model

## Contact
The code of this repository was implemented by [Barbora Novakova](mailto:barunka838@gmail.com) and [Marisa Tania](mailto:mt.marisatania@gmail.com). Feel free to reach out!

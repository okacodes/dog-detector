# Dog Detector
It does exactly what it sounds like! It detects dogs.

<!-- **Link to project:** http://recruiters-love-seeing-live-demos.com/ -->

<p align="center">
  <img src="/images/dog-detector.gif" width="250">
</p>

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, TensorFlowJS, NodeJS, Express

I linked a pre-trained model from TensorFlowJS called Coco-SSD to my index, so it will be loaded when the view is requested from the server. It requests permission to use your device's camera, then begins checking every frame for... Dogs.

I used the Model-View-Controller framework to keep everything nice and tidy.

## Optimizations

At first, I was repeating myself a lot when handling the change of style and inner text of the header(ie, "DOG DETECTED!" or "NO DOG DETECTED."). I decided it would make more sense to put those in their own functions and call them when needed. Encapsulation, baby.

Currently, there's an issue that comes up when a dog is detected for one frame, then isn't the next. It causes the utterances to loop. This can be solved by making sure a dog was or was not detected for x amount of frames before it decides to speak. That will help make sure it's not causing many instances of talkDog and stopDog to be queued.

## Lessons Learned:

I learned that it's important to keep track of the scope of your functions. I got stuck for a while trying to get the stopDog function to trigger whenever no dog was detected or when there were no objects detected at all. It was because I was trying to implement it inside of my loop.

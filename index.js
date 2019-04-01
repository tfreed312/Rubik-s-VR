// Create an AudioContext
let audioContext = new AudioContext();

console.log(audioContext)

// Create a (first-order Ambisonic) Resonance Audio scene and pass it
// the AudioContext.
let resonanceAudioScene = new ResonanceAudio(audioContext);

// Connect the scene’s binaural output to stereo out.
resonanceAudioScene.output.connect(audioContext.destination);

// Define room dimensions.
// By default, room dimensions are undefined (0m x 0m x 0m).
let roomDimensions = {
  width: 0,
  height: 0,
  depth: 0,
};

// Define materials for each of the room’s six surfaces.
// Room materials have different acoustic reflectivity.
let roomMaterials = {
  // Room wall materials
  left: 'marble',
  right: 'marble',
  front: 'marble',
  back: 'marble',
  // Room floor
  down: 'grass',
  // Room ceiling
  up: 'transparent',
};

// Add the room definition to the scene.
resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);

// Create an AudioElement.
let audioElement = document.createElement('audio');


// Load an audio file into the AudioElement.
audioElement.crossOrigin = "anonymous";
audioElement.src = './bell-C2.mp3';



// Generate a MediaElementSource from the AudioElement.
let audioElementSource = audioContext.createMediaElementSource(audioElement);


// Add the MediaElementSource to the scene as an audio input source.
let source1 = resonanceAudioScene.createSource();
audioElementSource.connect(source1.input);


// Set sound source parameters.
source1.setRolloff('logarithmic');
source1.setGain(0.25);







function myFunction() {

// Make array to contain source coordinates.
var cellXpos = [-6, 0, 6, -6, 0, 6, -6, 0, 6];
var cellYpos = [0, 0, 0, 6, 6, 6, 0, 0, 0];
var cellZpos = [9, 9, 9, 0, 0, 0, -9, -9, -9];


// Set source coordinates.

var currentCell = 4
source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);



// Add listener coordinates
var listenX = 0;
var listenY = 0;
var listenZ = 0;





// Create object toggle function.
window.addEventListener('keypress', function (e) {
    // spacebar
  if (e.which == 32) {

      // Play the audio from source.
      audioElement.play();
  }

  // up arrow / 'w' key
  if (e.which == 119) {

    if (currentCell > 2) {
      currentCell -= 3;
      source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
      audioElement.src = './bell-C2.mp3';
      audioElement.play();
    }
  }
  // down arrow / 's' key
  if (e.which == 115) {
   
    if (currentCell < 6) {
      currentCell += 3;
      source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
      audioElement.src = './bell-C2.mp3';
      audioElement.play();
    }
  }

    // left arrow / 'a' key
  if (e.which == 97) {
       
    if (currentCell !== 0 && currentCell !== 3 && currentCell !== 6) {
      currentCell -= 1;
      source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
      audioElement.src = './bell-C2.mp3';
      audioElement.play();
    }
  }
  // right arrow / 'd' key
  if (e.which == 100) {
      
    if (currentCell !== 2 && currentCell !== 5 && currentCell !== 8) {
      currentCell += 1;
      source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
      audioElement.src = './bell-C2.mp3';
      audioElement.play();
    }
  }

  console.log(e.which);
  console.log(currentCell);

}, false);


}
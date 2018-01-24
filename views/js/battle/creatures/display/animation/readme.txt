/*
Each animation should define a function:
var g_AniXXXAttack =
function aniXXXAttack(canvasInfo, animationTime, callbackFunction) {
}

The global variable is needed so the attack can be passed as a reference.

 canvasInfo is defined in DisplayManager.js
 It currently contains the following properties
 canvasName - name of the canvas
 canvas - the canvas object
 context - the canvas 2d context
 flip - if the canvas is flipped
 creature - a CreatureDisplay object

 animationTime is the total time the animation should run (in ms)

 callbackFunction is a function that should be called when the animation completes
*/

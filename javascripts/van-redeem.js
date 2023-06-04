/**
 * Jasmine Moran
 * April 4th, 2023
 * Description: Javascript code which sets up the canvas of matterjs.
 */

/*
//const ACTION_ID = '60f644a4-e833-4cb5-b03a-2d854de40796';
const client = new StreamerbotClient({
  onConnect: onConnect,
  onDisconnect: onDisconnect,
});

async function onConnect(instance) {
  document.getElementById('status').innerHTML = "Connected!";
}

async function onDisconnect() {
  document.getElementById('status').innerHTML = 'Disconnected.';
} */

/*
 * Matterjs setup
 */

//Module aliases
var Engine = Matter.Engine, // Contains methods to create and manipulate engines
    Render = Matter.Render, // Simple canvas based renderer for visuals
    Bodies = Matter.Bodies, // Contains methods to create rigid body models
    Composite = Matter.Composite; // Complex objects made of multiple parts

var Body = Matter.Body,             //
    Constraint = Matter.Constraint; //

var Events = Matter.Events,
    Runner = Matter.Runner,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// Create an engine
var engine = Engine.create( { enableSleeping: true} );
    world = engine.world; // The instance that contains everything in the engine

// Create a renderer
var render = Render.create( {
    element: document.getElementById("canvas"), // Render world within #canvas
    engine: engine,
    options: {
      width: 1920,
      height: 1080,
      wireframes: false,
      background: '#000000', //'transparent',
      wireframeBackground: 'transparent'
    }
} );

// Create ground
var ground = Bodies.rectangle( 0, 1010, 3840, 10, {
  friction: 0,
  isStatic: true,
} );


//var testBox = Bodies.rectangle( 1200, 700, 100, 100, { friction: 0 } );
    ground.render.fillStyle = '#111111';

// Adds ground to the world, giving boxes a surface to land on
Composite.add( world, [ ground ] );

// Create runner
Matter.Runner.run( engine ); // Optional utility providing an updating game loop
Render.run( render );        // Continually updates the render canvas

// Fit to render viewport to scene
Render.lookAt( render,  {
  min: { x: 0, y: 0 },
  max: { x: 1920, y: 1080 }
} );

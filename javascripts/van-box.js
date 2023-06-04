/**
  * Jasmine Moran
  * April 4th, 2023
  * Description: Javascript code which contains the Box constructor which will
  * create, throw, and delete boxes within the canvas.
  */

class Box {
  constructor() {
    // Textures for box
    const boxTextures = [
      [ 50, "./img/DeadSeaDeliveriesLogo_1.png" ],
      [ 100, "./img/DeadSeaDeliveriesLogo_2.png" ],
      //[ 150, "./img/DeadSeaDeliveriesLogo_3.png", 250 ]
    ];

    // Assign the size of the box and add the texture with the correct size
    var x = Math.round( Math.random() * 1 );
    this.boxSize    = boxTextures[ x ][ 0 ]; // Set the size of the box
    this.boxTexture = boxTextures[ x ][ 1 ]; // Set the texture accordingly

    this.body = Bodies.rectangle( -100, 900, this.boxSize, this.boxSize, {
      friction: 100,
      render: {
        sprite: {
          texture: this.boxTexture
        }
      }
    } );

    // Add box to world
    Composite.add( world, this.body );
  }

  // Remove a box from world
  removeTHEBOX() {
    Matter.Composite.remove( world, this.body );
  }

  // Launch box
  launch( xVel, yVel, boxCount ) {
    Matter.Body.setVelocity( this.body, { x: xVel, y: yVel } )
  }
}

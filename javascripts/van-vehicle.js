/**
 * Jasmine Moran
 * April 4th, 2023
 * Description: Javascript code which contains the Van constructor which will
 * drive on-screen, sensor on, and count the number of packages it contains
 * within parameters until it needs to drive off-screen.
 */

/* THINGS TO look AT
https://github.com/liabru/matter-js/blob/master/examples/sensors.js
https://github.com/liabru/matter-js/blob/master/examples/collisionFiltering.js
https://github.com/liabru/matter-js/blob/master/examples/car.js
---
https://github.com/liabru/matter-js/blob/master/examples/events.js
https://github.com/liabru/matter-js/blob/master/examples/compositeManipulation.js
*/

//Test parameters
var scale = 0.9,
    width   = 200,
    height  = 150,
    wheelSize = 60 * scale,
    xx = 700,
    yy = 800;

var colorA = '#f55a3c',
    colorB = '#f5d259';

// define our categories (as bit fields, there are up to 32 available)
var defaultCategory = 0x0001,
    vanCategory     = 0x0002,
    sensorCategory  = 0x0004;

class Van {
  constructor() {
    var vertices = [ // Remember to treat the canvas like 4th quadrant on graph
      { x : 0   , y : 250 },
      { x : 550 , y : 250 },
      { x : 550 , y : 125 },
      { x : 375 , y : 0   },
      { x : 25  , y : 0   }, // Curve of rear of car
      { x : 0   , y : 25  },

      { x : 0   , y : 30  },
      { x : 375 , y : 30  },
      { x : 525 , y : 125 },
      { x : 525 , y : 225 },
      { x : 0   , y : 225 }

    ],
        sensorVertices = [
      { x : 0   , y : 250 },
      { x : 550 , y : 250 },
      { x : 550 , y : 125 },
      { x : 375 , y : 0   },
      { x : 25  , y : 0   }, // Curve of rear of car
      { x : 0   , y : 25  }
    ];

    var verticesFloor = [
      { x : 0 , y : 0 },
      { x : 0 , y : 5 },
      { x : 550 , y : 5 },
      { x : 550 , y : 0 }
    ]

    var group = Body.nextGroup( true ),
      wheelBase = 25,
      wheelAOffset = -width * 0.9 + wheelBase,
      wheelBOffset = width * 1.2 - wheelBase,
      wheelYOffset = 100;

      var van =  Composite.create( { label: 'Van' }),
      body = Bodies.fromVertices( xx, yy, vertices, {
        isStatic : false,
        collisionFilter: {
          group: group,
          mask: defaultCategory | vanCategory // This body will only collide with the walls and van
        },
        chamfer: { radius: height * 0.5 },
        density: 0.000003
      } );

      var collider = Bodies.fromVertices( xx, yy, sensorVertices, {
        isStatic: false,
        isSensor: true,
        collisionFilter: {
          group: group,
          category: defaultCategory | vanCategory // This body will only collide with the walls and van
        },
        chamfer: { radius: height * 0.5 },
        density: 0.000003,
        render: {
            strokeStyle: colorA,
            fillStyle: 'transparent',
            lineWidth: 3,
            //sprite: { texture: "./img/VanBody.png" }
        }
      } );

      //Create four points to constrain Van
      var vanConnect1 = Constraint.create({
        bodyA: body,
        pointB: { x: 175, y: 100 },
        bodyB: collider,
        pointA: { x: 175, y: 100 },
        stiffness: 1,
        length: 0,
        //render: { visible: false }
      } );

      var vanConnect2 = Constraint.create({
        bodyA: body,
        pointB: { x: -175, y: 100 },
        bodyB: collider,
        pointA: { x: -175, y: 100 },
        stiffness: 1,
        length: 0,
        //render: { visible: false }
      } );

      var vanConnect3 = Constraint.create({
        bodyA: body,
        pointB: { x: 170, y: -65 },
        bodyB: collider,
        pointA: { x: 170, y: -65 },
        stiffness: 1,
        length: 0,
        //render: { visible: false }
      } );

      var vanConnect4 = Constraint.create({
        bodyA: body,
        pointB: { x: -175, y: -100 },
        bodyB: collider,
        pointA: { x: -175, y: -100 },
        stiffness: 1,
        length: 0,
        //render: { visible: false }
      } );

      var wheelA = Bodies.circle( xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
        collisionFilter: {
          group: group,
          mask: defaultCategory | vanCategory // This body will only collide with the walls and van
        },
        friction: 0.8
      } );

      var wheelB = Bodies.circle( xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
        collisionFilter: {
          group: group,
          mask: defaultCategory | vanCategory // This body will only collide with the walls and van
        },
        friction: 0.8
      } );

      var axelA = Constraint.create({
        bodyB: body,
        pointB: { x: wheelAOffset, y: wheelYOffset },
        bodyA: wheelA,
        stiffness: 1,
        length: 0
      } );

    var axelB = Constraint.create({
        bodyB: body,
      pointB: { x: wheelBOffset, y: wheelYOffset },
        bodyA: wheelB,
        stiffness: 1,
        length: 0
      } );

    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;
      for( var i = 0, j = pairs.length; i != j; ++i ) {
          var pair = pairs[ i ];
          if( pair.bodyA === collider ) {
            //pair.bodyB.render.fillStyle   = '#FF0000';
            pair.bodyB.render.strokeStyle = colorA;
          } else if ( pair.bodyB === collider ) {
            //pair.bodyA.render.fillStyle   = '#FF0000';
            pair.bodyA.render.strokeStyle = colorA;
          }
        }
      } );

  Events.on(engine, 'collisionEnd', function(event) {
      var pairs = event.pairs;
      for ( var i = 0, j = pairs.length; i != j; ++i ) {
          var pair = pairs[ i ];
          if( pair.bodyA === collider ) {
            //pair.bodyB.render.fillStyle   = '#00FF00';
            pair.bodyB.render.strokeStyle = colorB;
          } else if ( pair.bodyB === collider ) {
            //pair.bodyA.render.fillStyle   = '#00FF00';
            pair.bodyA.render.strokeStyle = colorB;
          }
        }
      } );

    body.render.fillStyle   = '#E8E9E5';
    wheelA.render.fillStyle = wheelB.render.fillStyle = '#111111';
    axelA.render.fillStyle  = axelB.render.fillStyle  = '#000000';

    Composite.addBody( van, body );
    Composite.addBody( van, collider );
    Composite.addBody( van, wheelA );
    Composite.addBody( van, wheelB );
    Composite.addConstraint( van, axelA );
    Composite.addConstraint( van, axelB );
    Composite.addConstraint( van, vanConnect1 );
    Composite.addConstraint( van, vanConnect2 );
    Composite.addConstraint( van, vanConnect3 );
    Composite.addConstraint( van, vanConnect4 );

    Composite.add( world, [ van, mouseConstraint ] );
  }
}

// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 1,
        render: {
            visible: false
        }
    }
});

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

function fromConvexVerticesFixed(x: number, y: number, vertexSets: Vector[][], options?: IBodyDefinition, flagInternal?: boolean, removeCollinear?: number, minimumArea?: number): Body {
    const body = Bodies.fromVertices(0, 0, vertexSets, options, flagInternal, removeCollinear, minimumArea);

    // We only had one vertex set and it became exactly one body part - so we don't have any sub-parts. Properly move it.
    if ((body.parts.length === 1) && (vertexSets.length === 1)) {
        const centre = Vertices.centre(vertexSets[0]);
        x += centre.x;
        y += centre.y;
    } else {
        // The first part is always the parent body, so length - 1
        const subBodyPartsCount = body.parts.length - 1;

        if (subBodyPartsCount === vertexSets.length) {
            // Exactly as many sub body parts as vertex sets? Nice. Move them according to the centre of the input vertices.
            for (let i = 0; i < vertexSets.length; i++) {
                // body.parts[i + 1] since the first part is always the parent body
                Body.setPosition(body.parts[i + 1], Vertices.centre(vertexSets[i]));
            }
        } else if (subBodyPartsCount > vertexSets.length) {
            // If we have more sub body parts than vertices, this wasn't convex and Bodies.fromVertices hopefully has properly dealt with it.
            console.log("fromConvexVerticesFixed called with non-convex vertices", vertexSets);
        } else {
            console.log("fromConvexVerticesFixed has no idea what to do with this. Body parts", body.parts.length, "for", vertexSets.length, "vertexSets?");
        }

        // Manually recompute autohull after changing the body parts' positions
        // We can't call Body.setParts(body, body.parts.slice(1), true); because that would recenter everything for some reason
        recomputeAutohull(body);

        // Now we have to overwrite axes, area, mass and inertia again because Body.setVertices in recomputeAutohull() resets them
        Body.set(body, {
            axes: options.axes || body.axes,
            area: options.area || body.area,
            mass: options.mass || body.mass,
            inertia: options.inertia || body.inertia
        });
    }

    Body.setPosition(body, { x, y });
    return body;
}

// Taken from Body.setParts
function recomputeAutohull(body: Body) {
    let vertices: Vector[] = [];
    for (let i = 0; i < body.parts.length; i++) {
        vertices = vertices.concat(body.parts[i].vertices);
    }

    Vertices.clockwiseSort(vertices);

    const hull = Vertices.hull(vertices);
    const hullCentre = Vertices.centre(hull);

    Body.setVertices(body, hull);
    Vertices.translate(body.vertices, hullCentre, 1);
}
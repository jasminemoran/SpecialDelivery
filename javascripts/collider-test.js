    var colorA = '#f55a3c',
        colorB = '#f5d259';

        Events.on(engine, 'collisionStart', function(event) {
          var pairs = event.pairs;

          for (var i = 0, j = pairs.length; i != j; ++i) {
              var pair = pairs[i];

              if (pair.bodyA === collider) {
                  pair.bodyB.render.strokeStyle = colorA;
              } else if (pair.bodyB === collider) {
                  pair.bodyA.render.strokeStyle = colorA;
              }
          }
      });

      Events.on(engine, 'collisionEnd', function(event) {
          var pairs = event.pairs;

          for (var i = 0, j = pairs.length; i != j; ++i) {
              var pair = pairs[i];

              if (pair.bodyA === collider) {
                  pair.bodyB.render.strokeStyle = colorB;
              } else if (pair.bodyB === collider) {
                  pair.bodyA.render.strokeStyle = colorB;
              }
          }
      });

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint );

// keep the mouse in sync with rendering
render.mouse = mouse;

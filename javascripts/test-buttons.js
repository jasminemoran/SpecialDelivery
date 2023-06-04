/*
*   Jasmine Moran
*   April 4th, 2023
*   Description: Javascript code for the buttons used to test the redeem.
*/

var boxCount = []; // Array for boxes
var counter = 0;  // Count the number of boxes made

//Create a box and throw
$(".box-test").on('click', function(){
  boxCount[counter] = new Box(); //Create the box
  boxCount[counter].launch((Math.random() * 20) + 5, (Math.random() * - 5) - 10, boxCount); // Launch it
  counter++; //Count the box
  //console.log(boxCount, counter);
});

$(".van-test").on('click', function(){
  var newVan = new Van();
});

//Remove a random box from a canvas
$(".remove-box").on('click', function(){
  let removeTHISBox = (Math.floor(Math.random() * counter)); // Pick a number between 0 to counter
  //console.log('Before', boxCount, counter, removeTHISBox);

  let i = 0;
  while(i < counter){                     //Run through the array until desired box is found
      if(i === removeTHISBox){            //When we do reach that box
        boxCount[i].removeTHEBOX();         //Remove the object from canvas
        boxCount.splice(removeTHISBox, 1);  //Remove the object from the array by it's position
        counter--;                          //Total of boxes goes down by one
      //console.log('After', boxCount, counter, removeTHISBox);
      }
      i++;
  }
});

//Clear boxes from canvas
$(".reset").on('click', function(){
  while(boxCount.length > 0){             //Loop through array...
    boxCount.pop();                       //... To clear it...
  }
  counter = 0;                            //... Then set counter to 0.
  Matter.Composite.clear(world, keepStatic = true); //Clear the world
  console.log(boxCount);
});

//To make sure boxes can be added or removed
/*$(".remove-testbox").on('click', function(){
  Matter.Composite.remove(world, testBox);
  console.log(boxCount);
}); */

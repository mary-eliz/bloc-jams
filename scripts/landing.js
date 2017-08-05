var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(point) {
    point.style.opacity = .7;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
    point.style.transition= "all 1s ease-in-out";
};

  var animatePoints = function(points) {
    forEach(points, revealPoint);
  };


      // var revealPoint = function(index) {
        // points[index].style.opacity = .7;
         //points[index].style.transform = "scaleX(1) translateY(0)";
         //points[index].style.msTransform = "scaleX(1) translateY(0)";
         //points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
         //points[index].style.transition= "all 1s ease-in-out";
      //}
    //for (var i = 0; i < points.length; i++){
    //revealPoint(i);
    //}

    //}

window.onload = function() {
  if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
         window.addEventListener('scroll',function(event) {
           if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
                      animatePoints(pointsArray);
                  }
         });
     }

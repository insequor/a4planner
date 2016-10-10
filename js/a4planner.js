
var app = angular.module("App", []);
app.controller("Controller", function($scope, $log) {
    function onResize(){
      var a4size = {width:297, height:210};
      var marginX = 30;
      var marginY = 250;
      var pageSize = {width: $(window).width() - marginX,
                      height: $(window).height() - marginY};
                      
      var scaleX = pageSize.width / a4size.width;
      var scaleY = pageSize.height / a4size.height;
      if (scaleX > scaleY) 
          scaleX = scaleY;
      
      $('#a4').width(a4size.width * scaleX);
      $('#a4').height(a4size.height * scaleX);
      $('#a4').css('left', (pageSize.width - a4size.width * scaleX) / 2.0);
    }
    $( window ).resize(onResize);
    onResize();
    
    var duration = 1500;
    function updateLayout(min, row, col){
        var top = 0;
        for(r = 0; r < 2; r++){
            var height = (r == row ? (100 - min) : min);
            var left = 0;
            for(c = 0; c < 3; c++){
                var width = (c == col ? (100 - 2 * min) : min);
                $('#' + r + '_' + c).animate(
                   {top   : top + '%', 
                    left  : left + '%', 
                    width : width + '%',
                    height: height + '%'}, {duration: duration, queue: false});
                left += width;
            }
            top += height;
        }    
    };
    
    $scope.onMouseLeaveTable = function(){
        updateLayout(18, 1, 2);
        $('.title').show();
        $('.content').hide();
    };
    
    $scope.onMouseOverCell = function(row, col){
        $('.content').hide();
        $('.title').hide();
        updateLayout(3, row, col); 
        $('#' + row + '_' + col + '> .title').show();
        $('#' + row + '_' + col + '> .title > .content').show();
    };
    
    
    $scope.onMouseLeaveTable();
});
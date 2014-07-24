var App = angular.module("todo",[]);
App.controller("TodoCtrl",function  ($scope)
{
	
	$scope.nodes = [];
	
	 $scope.links = [];

	
$(function(){
  render();
});

	$scope.addTodo = function  () {
		var txt = $('#newTodoField');
		var txt2 = $('#newTodoField1');
		 var i=0,j=0;
		 var hasmatch=false;
			if (txt2.val() != '') {
				$scope.nodes.splice(0,0,{name : $scope.newTodoTask });
				
			}
			var len=$scope.nodes.length;
			console.log("length is "+len);
			
			for( i=0;i<len;i++)
			{
				if ( txt.val() == $scope.nodes[i].name )
				{
					hasmatch=true;
					j=i;
					console.log("j value is"+j);
					//$scope.nodes.splice(0,0,{name : $scope.newTodoTask });
					$scope.links.splice(0,0,{source:$scope.nodes[0],target:$scope.nodes[j]});
					break;
				}	
			}
			if (hasmatch==false && txt.val() != '' )
			{
				$scope.nodes.splice(0,0,{name : $scope.newTodo });
				
			}
			
			if ( hasmatch==false && txt2.val() != '') {
				
				$scope.links.splice(0,0,{source:$scope.nodes[0],target:$scope.nodes[1]});
			}
			
			
			$scope.newTodo = "";
			$scope.newTodoTask = "";

	
					
		 };
		
	$scope.render = function  () {
		clear("svgVisualize")
		var w = 800,
    h = 400;

var circleWidth = 25;

var fontFamily = 'Bree Serif',
    fontSizeHighlight = '1.5em',
    fontSizeNormal = '1em';

var palette = {
      "orange": "#BD3613",   
      "pink": "#C61C6F",
      "black": "#000000",
      "yellow": "#FFE30D",
      "yellowgreen": "#738A05"
  }
 
              

var vis = d3.select("#svgVisualize")
    .append("svg:svg")
      .attr("class", "stage")
      .attr("width", w)
      .attr("height", h);

var force = d3.layout.force()
    .nodes($scope.nodes)
       .links($scope.links)
    .gravity(0.1)
    .linkDistance(200)
    .charge(-1000)
    .size([w, h]);
 
var link = vis.selectAll(".link")
        .data($scope.links)
        .enter().insert("line", ".node")
          .attr("class", "link")
          .attr("stroke", "#000000")
	  .attr("stroke-width","4")
          .attr("fill", "none");
       
 var node = vis.selectAll("circle.node")
      .data($scope.nodes)
      .enter().append("g")
      .attr("class", "node")

      //MOUSEOVER
      .on("mouseover", function(d,i) {
        if (i>=0) {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .transition()
          .duration(250)
          .style("cursor", "none")     
          .attr("r", circleWidth+3)
          .attr("fill",palette.orange);

          //TEXT
          d3.select(this).select("text")
          .transition()
          .style("cursor", "none")     
          .duration(250)
          .style("cursor", "none")     
          .attr("font-size","1.5em")
          .attr("x", 15 )
          .attr("y", 5 )
        } else {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .style("cursor", "none")     

          //TEXT
          d3.select(this).select("text")
          .style("cursor", "none")     
        }
      })

      //MOUSEOUT
      .on("mouseout", function(d,i) {
        if (i>=0) {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .transition()
          .duration(250)
          .attr("r", circleWidth)
          .attr("fill",palette.pink);

          //TEXT
          d3.select(this).select("text")
          .transition()
          .duration(250)
          .attr("font-size","1.8em")
          .attr("x", 8 )
          .attr("y", 4 )
        }
      })

      .call(force.drag);


    //CIRCLE
    node.append("svg:circle")
      //.attr("cx", function(d) { return d.x; })
      //.attr("cy", function(d) { return d.y; })
      .attr("r", circleWidth)
      .attr("fill", function(d, i) { if (i>0) { return  palette.pink; } else { return palette.pink } } )

    //TEXT
    node.append("text")
      .text(function(d, i) { return d.name; })
      .attr("x",            function(d, i) { if (i>=0) { return 8;}   else { return 12 } })
      .attr("y",            function(d, i) { if (i>=0) { return 4; }    else { return 6 } })
      .attr("font-family",  "Bree Serif")
      .attr("fill",         function(d, i) { if (i>=0) { return  palette.black; }        else { return palette.yellowgreen } })
      .attr("font-size",    function(d, i) { if (i>=0) { return  "1.8em"; }            else { return "1.8em" } })
      .attr("text-anchor",  function(d, i) { if (i>=0) { return  "beginning"; }      else { return "end" } })

node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

force.on("tick", function(e) {
  node.attr("transform", function(d, i) {     
        return "translate(" + d.x + "," + d.y + ")"; 
    });
  


link.attr("x1", function(d)   { return d.source.x; })
       .attr("y1", function(d)   { return d.source.y; })
       .attr("x2", function(d)   { return d.target.x; })
       .attr("y2", function(d)   { return d.target.y; })
});
force.start();
	}
	
});



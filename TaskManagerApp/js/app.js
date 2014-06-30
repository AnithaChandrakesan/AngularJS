var App = angular.module("todo",[]);
App.controller("TodoCtrl",function  ($scope)
{

	$scope.todos = [
								{ taskName : "Understand BootStrap" ,info:"Create Sample Interface  ", status : false },
								{ taskName : "Understand Angular JS" ,info:"Demo the UseCase and understand the Framework ", status : false },
								{ taskName : "Understand D3" ,info:"Integrate D3 with AngularJS", status : false }
			];

	$scope.addTodo = function  () {
		var txt = $('#newTodoField');
		var txt2 = $('#newTodoField1');
		if (txt.val() != null && txt.val() != ''&& txt2.val() != '') {

			$scope.todos.splice(0,0,{taskName : $scope.newTodo ,info : $scope.newTodoTask , status : false });
			$scope.newTodo = "";
			$scope.newTodoTask = "";
		}
		else {
			alert('Please enter text......!')
			}		
		};
		
	$scope.clearCompleted = function () {
		
	   $scope.todos = _.filter($scope.todos, function(todo){
		return !todo.status;   
           });
	};
	 $scope.open = function  (todo) {
		 $scope.todo = todo;
	};
	$scope.go = function() {
		 $scope.todo = '';
	 };
	 
	 $scope.remaining = function() {
		 var count = 0;
		 angular.forEach($scope.todos, function(todo) {
		count += todo.status ? 0 : 1;
	    });
	 return count;
	 };
});



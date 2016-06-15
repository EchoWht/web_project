/**
 * Created by Administrator on 2016/5/11.
 */
angular.module("test1", []);
function BookListCtrl($scope){
    $scope.books=[
        {
            'name':'css 权威指南',
            'price':'$60'
        },
        {
            'name':'css揭秘',
            'price':'$99'
        },
        {
            'name':'php',
            'price':'$60'
        },
        {
            'name':'java',
            'price':'$88'
        }
    ];
}
//BookListCtrl($scope);

function ToDoListCtrl($scope,$http){
    $http.get('todo.php')
        .success(
        function(response){
            $scope.todo=response;
            console.log(response);
        }

    );
    //console.log($http.get('todo.php').success.response);
}


/*自定义指令*/
/*
function whtDirective(){
    return{
        template:'<h5>这是我自定义的指令，使用wht-directive调用</h5>'
    };
}*/
var app = angular.module("test1", []);
app.directive("whtDirective", function() {
    return {
        template : "<h5>这是我自定义的指令，使用wht-directive调用</h5>"
    };
});
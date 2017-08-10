var app = angular.module('calcApp');

app.controller('calcController', function ($scope) {
    $scope.valueOnScreen = 0;
    $scope.result = 0;
    $scope.allOperations = "";
    var flagNewNumber = false;
    var flagBrackets = false;
    var currentOperator = "";
    var operatorInMemory = "";

    $scope.pressedNumber =function(num) {
        if(flagNewNumber && currentOperator === "=" || flagNewNumber && ($scope.result === Infinity || $scope.result === -Infinity || isNaN($scope.result))) {
            $scope.clearValue();
        } else if(flagNewNumber){
            $scope.valueOnScreen = num;
            flagNewNumber = false;
        } else {
            if($scope.valueOnScreen == '0'){
                $scope.valueOnScreen = num;
            } else {
                if (String($scope.valueOnScreen).length < 14) {
                    $scope.valueOnScreen += num;
                }
            }
        }
    };

    $scope.operation = function(operator) {
        var number = $scope.valueOnScreen;
        if(flagNewNumber ){
            if ($scope.result === Infinity || $scope.result === -Infinity) {
                $scope.valueOnScreen = "Oops! Error!";
            } else {
                $scope.valueOnScreen = +$scope.result.toFixed(10);
                currentOperator = operator;
            }
        } else {
            if (currentOperator != '=' && !flagBrackets) {
                $scope.allOperations += currentOperator;
                $scope.allOperations += $scope.valueOnScreen;
            }
            flagNewNumber = true;
            if(currentOperator === '*'){
                $scope.result *= parseFloat(number);
            } else if (currentOperator === '/'){
                $scope.result /= parseFloat(number);
            } else if (currentOperator === '-'){
                $scope.result -= parseFloat(number);
            } else if (currentOperator === '+'){
                $scope.result += parseFloat(number);
            }  else {
                $scope.result = parseFloat(number);
            }

            if ($scope.result === Infinity || $scope.result === -Infinity || isNaN($scope.result)) {
                $scope.valueOnScreen = "Oops! Error!";
            } else {
                $scope.valueOnScreen = +$scope.result.toFixed(10);
                currentOperator = operator;
            }
        }
    };

    $scope.clearValue = function () {
        $scope.valueOnScreen = 0;
        $scope.result = 0;
        flagNewNumber = true;
        currentOperator = "";
        $scope.allOperations = "";
    };

    $scope.decimal = function () {
        var number = $scope.valueOnScreen;
        if (flagNewNumber) {
            number = "0.";
            flagNewNumber = false;
        }
        else {
            if (number.indexOf(".") == -1)
                number += ".";
        }
        $scope.valueOnScreen = number;
    };

    $scope.percent = function() {
        $scope.valueOnScreen = (parseFloat($scope.valueOnScreen) / 100) * $scope.result;
        $scope.valueOnScreen = +$scope.valueOnScreen.toFixed(10);
    };

    $scope.bracketStart = function () {
        if(flagNewNumber) {
            $scope.valueInMemory = +$scope.result.toFixed(10);
            operatorInMemory = currentOperator;
            $scope.allOperations = $scope.allOperations + "" + currentOperator + "(";
            $scope.valueOnScreen = 0;
            $scope.result = 0;
            currentOperator = "";
        }
    };

    $scope.bracketEnd = function () {
        if(!flagNewNumber) {
            $scope.operation(currentOperator);
            var a = $scope.result;
            $scope.result = $scope.valueInMemory;
            $scope.valueOnScreen = a;
            currentOperator = operatorInMemory;
            flagNewNumber = false;
            flagBrackets = true;
            $scope.operation("");
            flagBrackets = false;
            $scope.allOperations += ")";
        }
    };

    $scope.sqrt = function () {
        $scope.operation("");
        var number = $scope.valueOnScreen;
        if (number >= 0 ) {
            $scope.valueOnScreen = +Math.sqrt($scope.valueOnScreen).toFixed(10);
            $scope.result = $scope.valueOnScreen;
            currentOperator = '=';
            if ($scope.allOperations == ""){
                $scope.allOperations = "(" + number + ")" + "^1/2";
            } else {
                $scope.allOperations = "(" + $scope.allOperations + ")" + "^1/2";
            }
        } else {
            $scope.valueOnScreen = "Oops! Error!";
        }
    };

    $scope.factorial = function() {
        $scope.operation("");
        var n = $scope.valueOnScreen;
        if (n >= 0 && ((n^ 0) === n)) {
            var product = 1;
            for(var i = 2; i<=n; i++){
                product *=i;
            }
            $scope.valueOnScreen = product;
            $scope.result = $scope.valueOnScreen;
            currentOperator = '=';
            if ($scope.allOperations == ""){
                $scope.allOperations = n + "!";
            } else {
                $scope.allOperations = "(" + $scope.allOperations + ")" + "!";
            }
        } else {
            $scope.valueOnScreen = "Oops! Error!";
        }
    };

    $scope.sin = function () {
        $scope.operation("");
        $scope.allOperations = "Sin(" + $scope.valueOnScreen + ")";
        $scope.valueOnScreen=+Math.sin($scope.valueOnScreen).toFixed(10);
        $scope.result = $scope.valueOnScreen;
        currentOperator = '=';
    };

    $scope.cos = function () {
        $scope.operation("");
        $scope.allOperations = "Cos(" + $scope.valueOnScreen + ")";
        $scope.valueOnScreen=+Math.cos($scope.valueOnScreen).toFixed(10);
        $scope.result = $scope.valueOnScreen;
        currentOperator = '=';
    };

    $scope.tan = function () {
        $scope.operation("");
        $scope.allOperations = "Tan(" + $scope.valueOnScreen + ")";
        $scope.valueOnScreen=+Math.tan($scope.valueOnScreen).toFixed(10);
        $scope.result = $scope.valueOnScreen;
        currentOperator = '=';
    };

    $scope.moreOperations = false;
    $scope.showMoreOperations = function () {
        $scope.moreOperations = !$scope.moreOperations;
    };
});

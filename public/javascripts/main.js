(function(){
  "use strict";

  var socket = io('localhost:3001');
  var scope;
  socket.on('update_weight', function(data){
    scope.weight = data.weight;
    scope.$apply();
  });
  socket.on('update_height', function(data){
    scope.height = 184 - parseFloat(data.height);
    scope.$apply();
  });

  var wUnit = [
    ['นาโนกรัม', 'ng', 12],
    ['ไมโครกรัม', 'Mg', 7],
    ['มิลลิกรัม', 'mg', 6],
    ['กิโลกรัม', 'Kg', 0]
  ];
  var hUnit = [
    ['นาโนเมตร', 'nm', 7],
    ['ไมโครเมตร', 'Mm', 4],
    ['มิลลิเมตร', 'mm', 1],
    ['เซ็นติเมตร', 'Cm', 0]
  ];
  var mode = [
    ['นาโน', 'nm'],
    ['ไมโคร', 'Mm'],
    ['มิลลิ', 'mm'],
    ['เซ็นติ', 'Cm']
  ];
  var heightText = ['ส่วนสูง', 'HEIGHT'];
  var weightText = ['น้ำหนัก', 'WEIGHT'];

  var showWeight = function(){
    var value = scope.weight * Math.pow(10, wUnit[scope.unit][2]);
    return value.toFixed(2);
  };
  var showHeight = function(){
    var value = scope.height * Math.pow(10, hUnit[scope.unit][2]);
    return value.toFixed(2);
  };
  var showMode = function(){
    return mode[scope.unit][scope.lang];
  };
  var showHeightText = function(){
    return heightText[scope.lang];
  };
  var showWeightText = function(){
    return weightText[scope.lang];
  };
  var showWeightUnit = function(){
    return wUnit[scope.unit][scope.lang];
  };
  var showHeightUnit = function(){
    return hUnit[scope.unit][scope.lang];
  };

  var fnKey = {
    97: function(){
      scope.displayPage = 2;
    },
    115: function(){
      scope.lang = 0;
    },
    100: function(){
      scope.displayPage = 3;
      scope.unit = 0;
      scope.lang = 0;
    },
    102: function(){
      scope.displayPage = 3;
      scope.unit = 1;
      scope.lang = 0;
    },
    103: function(){
      scope.displayPage = 3;
      scope.unit = 2;
      scope.lang = 0;
    },
    104: function(){
      scope.displayPage = 3;
      scope.unit = 3;
      scope.lang = 0;
    },
    122: function(){
      if(scope.displayPage > 1 ) {
        scope.displayPage--;
      }
    },
    120: function(){
      scope.lang = 1;
    },
    99: function(){
      scope.displayPage = 3;
      scope.unit = 0;
      scope.lang = 1;
    },
    118: function(){
      scope.displayPage = 3;
      scope.unit = 1;
      scope.lang = 1;
    },
    98: function(){
      scope.displayPage = 3;
      scope.unit = 2;
      scope.lang = 1;
    },
    110: function(){
      scope.displayPage = 3;
      scope.unit = 3;
      scope.lang = 1;
    }
  };
  window.onkeypress = function(e){
    if(typeof fnKey[e.keyCode] == 'function') {
      fnKey[e.keyCode]();
      scope.$apply();
    }
  };

  var app = angular.module('main', []);
  app.controller('Main', ['$scope', function($scope){
    scope = $scope;
    scope.displayPage = 1;
    scope.lang = 0;
    scope.unit = 1;
    scope.weight = 0;
    scope.height = 0;
    scope.showWeight = showWeight;
    scope.showHeight = showHeight;
    scope.showMode = showMode;
    scope.showHeightText = showHeightText;
    scope.showWeightText = showWeightText;
    scope.showHeightUnit = showHeightUnit;
    scope.showWeightUnit = showWeightUnit;
  }]);
})();

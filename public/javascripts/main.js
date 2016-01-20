(function(){
  "use strict";

  var keyconfig;
  (function(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if(xmlhttp.status == 200){
               keyconfig = JSON.parse(xmlhttp.responseText);
               console.log('load keyconfig success', keyconfig);
           }
        }
    }

    xmlhttp.open("GET", "keyconfig.json", true);
    xmlhttp.send();
  })();

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
    0: function(){
      if(scope.displayPage != 1) return;
      scope.displayPage = 2;
    },
    1: function(){
      if(scope.displayPage != 3) return;
      scope.lang = 0;
    },
    2: function(){
      if(scope.displayPage != 2) return;
      scope.displayPage = 3;
      scope.unit = 0;
      scope.lang = 0;
    },
    3: function(){
      if(scope.displayPage != 2) return;
      scope.displayPage = 3;
      scope.unit = 1;
      scope.lang = 0;
    },
    4: function(){
      if(scope.displayPage != 2) return;
      scope.displayPage = 3;
      scope.unit = 2;
      scope.lang = 0;
    },
    5: function(){
      if(scope.displayPage != 2) return;
      scope.displayPage = 3;
      scope.unit = 3;
      scope.lang = 0;
    },
    6: function(){
      if(scope.displayPage > 1 ) {
        scope.displayPage--;
      }
    },
    7: function(){
      if(scope.displayPage != 3) return;
      scope.lang = 1;
    },
    8: function(){
      if(scope.displayPage != 2) return;
      scope.displayPage = 3;
      scope.unit = 0;
      scope.lang = 1;
    },
    9: function(){
      if(scope.displayPage != 2) return;
      scope.displayPage = 3;
      scope.unit = 1;
      scope.lang = 1;
    },
    10: function(){
      if(scope.displayPage != 2) return;
      scope.displayPage = 3;
      scope.unit = 2;
      scope.lang = 1;
    },
    11: function(){
      if(scope.displayPage != 2) return;
      scope.displayPage = 3;
      scope.unit = 3;
      scope.lang = 1;
    }
  };

  window.onkeypress = function(e){
    var indexFn = keyconfig.indexOf(String.fromCharCode(e.charCode));
    if(indexFn == -1) return;

    if(typeof fnKey[indexFn] == 'function') {
      fnKey[indexFn]();
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

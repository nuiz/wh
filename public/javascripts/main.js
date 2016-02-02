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
  var firstData = true;
  socket.on('update_weight', function(data){
    scope.weight = data.weight;

    if(scope.weight > 0 && firstData) gotoPageAuto();
    fetchInterval();
    scope.$apply();
  });
  socket.on('update_height', function(data){
    scope.height = 205 - parseFloat(data.height);
    if(scope.height < 70)
      scope.height = 0;

    if(scope.height > 0 && firstData) gotoPageAuto();
    fetchInterval();
    scope.$apply();
  });

  var wUnit = [
    ['เดซิกรัม', 'dg', 12],
    ['เซนติกรัม', 'cg', 0],
    ['มิลลิกรัม', 'mg', 6],
    ['ไมโครกรัม', 'µg', 7],
    ['นาโนกรัม', 'ng', 12],
    ['เดคากรัม', 'dag', 0],
    ['เฮกโตกรัม', 'hg', 7],
    ['กิโลกรัม', 'kg', 6],
    ['เมกะกรัม', 'Mg', 0],
    ['กิกะกรัม', 'Gg', 6]
  ];
  var hUnit = [
    ['เดซิเมตร', 'dm', 12],
    ['เซนติเมตร', 'cm', 0],
    ['มิลลิเมตร', 'mm', 6],
    ['ไมโครเมตร', 'µm', 7],
    ['นาโนเมตร', 'nm', 12],
    ['เดคาเมตร', 'dam', 0],
    ['เฮกโตเมตร', 'hm', 7],
    ['กิโลเมตร', 'km', 6],
    ['เมกะเมตร', 'Mm', 0],
    ['กิกะเมตร', 'mm', 6]
  ];
  var mode = [
    ['เดซิ', 'Deci'],
    ['เซนติ', 'Centi'],
    ['มิลลิ', 'Mili'],
    ['ไมโคร', 'Micro'],
    ['นาโน', 'Nano'],
    ['เดคา', 'Deca'],
    ['เฮกโต', 'Hecto'],
    ['กิโล', 'Kilo'],
    ['เมกะ', 'Mega'],
    ['กิกะ', 'Giga']
  ];
  var heightText = ['ส่วนสูง', 'HEIGHT'];
  var weightText = ['น้ำหนัก', 'WEIGHT'];

  var welcomeText = ['วัดส่วนสูง วัดน้ำหนัก', 'Height Weight'];

  var showWeight = function(){
    var value = scope.weight * Math.pow(10, wUnit[scope.unitWeight][2]);
    return value.toFixed(2);
  };
  var showHeight = function(){
    var value = scope.height * Math.pow(10, hUnit[scope.unitHeight][2]);
    return value.toFixed(2);
  };
  var showMode = function(){
    return mode[scope.unitWeight][scope.lang];
  };
  var showHeightText = function(){
    return heightText[scope.lang];
  };
  var showWeightText = function(){
    return weightText[scope.lang];
  };
  var showWeightUnit = function(){
    return wUnit[scope.unitWeight][scope.lang];
  };
  var showHeightUnit = function(){
    return hUnit[scope.unitHeight][scope.lang];
  };

  var gotoPageAuto = function(){
    scope.displayPage = 2;
    scope.unitWeight = 7;
    scope.unitHeight = 1;
    firstData = false;
  };

  var fnKey = {
    0: function(){
      scope.lang = 0;
    },
    1: function(){
      scope.displayPage = 2;
      scope.unitWeight = 0;
      scope.unitHeight = 0;
    },
    2: function(){
      scope.displayPage = 2;
      scope.unitWeight = 1;
      scope.unitHeight = 1;
    },
    3: function(){
      scope.displayPage = 2;
      scope.unitWeight = 2;
      scope.unitHeight = 2;
    },
    4: function(){
      scope.displayPage = 2;
      scope.unitWeight = 3;
      scope.unitHeight = 3;
    },
    5: function(){
      scope.displayPage = 2;
      scope.unitWeight = 4;
      scope.unitHeight = 4;
    },
    6: function(){
      scope.lang = 1;
    },
    7: function(){
      scope.displayPage = 2;
      scope.unitWeight = 5;
      scope.unitHeight = 5;
    },
    8: function(){
      scope.displayPage = 2;
      scope.unitWeight = 6;
      scope.unitHeight = 6;
    },
    9: function(){
      scope.displayPage = 2;
      scope.unitWeight = 7;
      scope.unitHeight = 7;
    },
    10: function(){
      scope.displayPage = 2;
      scope.unitWeight = 8;
      scope.unitHeight = 8;
    },
    11: function(){
      scope.displayPage = 2;
      scope.unitWeight = 9;
      scope.unitHeight = 9;
    }
  };

  var toBack;
  var fetchInterval = function(){
    clearInterval(toBack);
    toBack = setInterval(function(){
      if(scope.height <= 0 && scope.weight <= 0) {
        scope.displayPage = 1;
        scope.lang = 0;
        firstData = true;
        scope.$apply();
      }
    }, 5000);
  };

  window.onkeypress = function(e){
    fetchInterval();
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
    scope.unitWeight = 0;
    scope.unitHeight = 0;
    scope.weight = 0;
    scope.height = 0;
    scope.showWeight = showWeight;
    scope.showHeight = showHeight;
    scope.showMode = showMode;
    scope.showHeightText = showHeightText;
    scope.showWeightText = showWeightText;
    scope.showHeightUnit = showHeightUnit;
    scope.showWeightUnit = showWeightUnit;
    scope.welcomeText = welcomeText;
  }]);
})();

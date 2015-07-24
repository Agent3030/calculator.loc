;$(document).ready(function () {
    function Calculator(screenLength) {
       this.screenLength = screenLength;    
       this.screenResult = 0;
        var onScreen = [];
        var result = 0;
        var prevSign = "";
        var memBuffer = 0;
       var firstCalcFlag = true;
       var pointFlag = true;
          /* output pressed nums on screen and remember it */ 
       var screenOutput = function(key,screenLength) {             
              if(onScreen.length <= screenLength) {
                  if(key==="." && pointFlag ) {
                      pointFlag = false;
                      onScreen.push(key);
                      return onScreen.join('');
                     
                  } else {
                                       
                  if(onScreen[0] == ".") {
                        onScreen.unshift("0");
                        onScreen.push(key);
                      return onScreen.join('');
                    } else {
                         onScreen.push(key);
                        return onScreen.join('');
                    }
                }
                
              } else {
                   return onScreen.join('');
               }
              
            
        };
       var calculation = function (sign, prevScreen, currScreen) {
           
               switch(sign) {
                       case "÷":
                          return prevScreen / currScreen;
                       case "x":
                           return prevScreen * currScreen;
                       case "+":
                          return prevScreen + currScreen;
                       case "-":
                           return prevScreen - currScreen;
                       default: 
                          return currScreen;
               }
           };
        var clearScreen = function() {
            onScreen.splice(0, onScreen.length);
            pointFlag = true;
          };
        var clearAll = function (clearScreen) {
            var cls = clearScreen;
            cls();
            result = 0;
            firstCalcFlag = true;
            return 0;
        };
        
        var isInteger= function(num) {
            return (num ^ 0) === num;
        };
        
        var outputResult = function(result, screenLength){
            var point = result.toFixed(screenLength).indexOf('.');
            
            if(isInteger(result)) {
                if (result.toString().length <= screenLength) {
                    return result.toString();
                } else {
                    return "error";
                }
            } if (result.toString().length <= screenLength) {
                return result.toString();
            } else {
                if(result.toFixed(screenLength).length <= screenLength) {
                    return result.toFixed(screenLength);
                } else {
                    if(point <= screenLength) {
                        return result.toFixed(screenLength-point);
                    } else { 
                        return "error";
                    }
                    
                }
            }
        
        };
         
           
        
            
            
        this.calcMain = function (key){
            var screenLength = this.screenLength;
            var scrStrOutput = "";
                        
                
            if(!isNaN(key) || key === ".")  {
                scrStrOutput = screenOutput(key, screenLength);
                this.screenResult = parseFloat(scrStrOutput);
                
               return scrStrOutput;
                
            }
            else {
                if(firstCalcFlag) {
                 switch (key) {
                        case "÷":
                            result = this.screenResult;
                            clearScreen();
                            prevSign = "÷";
                            firstCalcFlag = false;
                            break;
                         case "x":
                            result = this.screenResult;
                            clearScreen();
                            prevSign = "x";
                            firstCalcFlag = false;
                            break;
                         case "+":
                            result = this.screenResult;
                            clearScreen();
                            prevSign = "+";
                            firstCalcFlag = false;
                            break;
                         case "-":
                            result = this.screenResult;
                            clearScreen();
                            prevSign = "-";
                            firstCalcFlag = false;
                            break;
                         case "C":
                             return this.screenResult = clearAll(clearScreen);
                            break;
                         case "=":
                             clearScreen();
                             return this.screenResult;
                             break;
                         case "m+":
                             memBuffer = this.screenResult;
                             clearScreen();
                             break;
                         case "m-":
                              this.screenResult = memBuffer;
                              clearScreen();
                              firstCalcFlag = false;
                              break;
                         case "mrc":
                              memBuffer = 0;
                              clearScreen();
                              break;
                         
                }
            } else {
                switch (key) {
                        case "÷":
                            result = calculation(prevSign, result, this.screenResult);
                            clearScreen();
                            prevSign = "÷";
                            return outputResult(result, screenLength);
                            break;
                         case "x":
                            result = calculation(prevSign, result, this.screenResult);
                            clearScreen();
                            prevSign = "x";
                            return outputResult(result, screenLength);
                            break;
                         case "+":
                            result = calculation(prevSign, result, this.screenResult);
                            clearScreen();
                            prevSign = "+";
                            return outputResult(result, screenLength);
                            break;
                         case "-":
                            result = calculation(prevSign, result, this.screenResult);
                            clearScreen();
                            prevSign = "-";
                            return outputResult(result, screenLength);
                            break;
                         case "C":
                             return this.screenResult = clearAll(clearScreen);
                            break;
                         case "=":
                             result = calculation(prevSign, result, this.screenResult);
                             clearScreen();
                             this.screenResult = outputResult(result, screenLength);
                             firstCalcFlag = true;
                             return this.screenResult;
                             break;
                        case "m+":
                             memBuffer = this.screenResult;
                             clearScreen();
                             break;
                         case "m-":
                              this.screenResult = outputResult(memBuffer, screenLength);
                              clearScreen();
                              return this.screenResult;
                              break;
                         case "mrc":
                              memBuffer = 0;
                              clearScreen();
                              break;
                         
                }
            }
        }
    };
        
               
           
  }
var calc = new Calculator(7, 0); 
var cssOutput = function() {
        var key = $(this).text();
        var output = calc.calcMain(key);
        $('.screen-digits').text(output);       
     };
var btnDown = function () {
           switch ($(this).attr('class')) {
                case 'btn btn-num':
                      $(this).toggleClass('btn-num-pressed');
                      break;
                case 'btn btn-math':
                      $(this).toggleClass('btn-math-pressed');                             
                      break;
                case 'btn btn-mem':
                      $(this).toggleClass('btn-mem-pressed');
                      break;
                case 'btn btn-equals':
                      $(this).toggleClass('btn-equals-pressed');
                      break;
        }
        
    };   
    
var btnUp = function () {
           switch ($(this).attr('class')) {
                case 'btn btn-num btn-num-pressed':
                      $(this).toggleClass('btn-num-pressed');
                      break;
                case 'btn btn-math btn-math-pressed':
                      $(this).toggleClass('btn-math-pressed');                          
                      break;
                case 'btn btn-mem btn-mem-pressed':
                      $(this).toggleClass('btn-mem-pressed');
                      break;
                case 'btn btn-equals btn-equals-pressed':
                      $(this).toggleClass('btn-equals-pressed');
                      break;
        }
};
var cssOutputKb = function(event) {
    var key ="";
    switch(event.which) {
        case 48: 
            key = "0";
            break;
        case 49:
            key = "1";
            break;
        case 50:
            key = "2";
            break;
        case 51:
            key = "3";
            break;
        case 52: 
            key = "4";
            break;
        case 53:
            key = "5";
            break;
        case 54:
            key = "6";
            break;
        case 55:
            key = "8";
            break;
        case 56: 
            key = "9";
            break;
        case 47:
            key = "÷";
            break;
        case 42:
            key = "x";
            break;
        case 45:
            key = "-";
            break;
        case 43:
            key = "+";
            break;
        case 13:
            key = "=";
            break;
        case 8:
            key = "C";
            break;
        case 190: 
            key = ".";
            break;
        default:
            key ="default"
            break
        }
        var output = calc.calcMain(key);
        $('.screen-digits').text(output);
    };
            
    $('.btn').on({
        click: cssOutput, 
        mousedown: btnDown,
        mouseup: btnUp,
    });
    $('body').on({
        keydown: cssOutputKb
    });
   
});
    
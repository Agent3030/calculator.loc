;$(document).ready(function () {
    function Calculator(screenLength) {
       this.screenLength = screenLength;    
       this.screenResult = 0;
      
    }

          /* output pressed nums on screen and remember it */ 
    Calculator.prototype.screenInput = function(key) {             
             var screenLength = this.screenLength;
             var scrResult = "";
             var scrArray=[ ];
             var pointFlag = true;
             return function (key) {
               if (key === undefined) {
                   
                        scrArray.splice(0, scrArray.length);
                        pointFlag = true;
               } else {
                 
                     if (!isNaN(key) || key === ".") {
                         if(scrArray.length <= screenLength) {
                            if (key === ".") {
                                if (pointFlag) {
                                    if (scrArray.join('').lastIndexOf(key) === -1) {
                                        pointFlag = false;
                                        scrArray.push(key);
                                        return scrArray.join('');
                                    } else {
                                        pointFlag = false;
                                        return scrArray.join("");
                                    } 
                                }   else {
                                        return scrArray.join("");
                                }
                            } else {
                                    if (scrArray[0] === ".") {
                                        scrArray.unshift("0");
                                        scrArray.push(key);
                                        return scrArray.join("");
                                    } else {
                                        scrArray.push(key);
                                        return scrArray.join('');
                                    }
                  
                                }
                         } else {
                             return scrArray.join('');
                         }
                     }
                    
               
            
            }
                
     }
    };
 
  
 Calculator.prototype.calculation = function (sign, prevScreen, currScreen) {
          return function(sign, prevScreen, currScreen) {
              if(currScreen ===0 || currScreen === undefined) {
                  return prevScreen;
              } else {
              if (prevScreen === 0|| prevScreen === undefined) {
                  return currScreen;
              } else {
                    switch(sign) {
                            case "÷":
                                return  prevScreen / currScreen;
                            case "x":
                                return prevScreen * currScreen;
                            case "+":
                                return prevScreen + currScreen;
                            case "-":
                                return prevScreen - currScreen;
                            default:
                                return currScreen;
                    }
               }
              }
           }
    };
        
        
Calculator.prototype.screenOutput = function(result){
            var screenLength = this.screenLength;
            
            return /*function (result) { return result;}*/function(result) {
               
                if((result ^ 0) === result) {
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
                        if(result.toFixed(screenLength).indexOf('.') <= screenLength) {
                            return result.toFixed(screenLength-result.toFixed(screenLength).indexOf('.'));
                        } else { 
                            return "error";
                        }
                    }
                    }
        
           }
};
         
           
        
            
Calculator.prototype.calcMain = function (key){
            var screenLength = this.screenLength;
            var screenResult = 0;
            var firstCalcFlag = true;
            var input = this.screenInput();
            var output = this.screenOutput();
            var calc = this.calculation();
            var result = 0;
            var prevSign = "";
            var scrStrOutput = "";
            var memBuffer = 0;
    
            return function(key) {
                   if(!isNaN(key) || key === ".")  {
                    scrStrOutput = input(key);
                    screenResult = parseFloat(scrStrOutput);
                    return scrStrOutput;
                
                }  else {
                if(firstCalcFlag) {
                    switch (key) {
                        case "÷":
                            result = screenResult;
                            input();
                            prevSign = "÷";
                            firstCalcFlag = false;
                            break;
                         case "x":
                            result = screenResult;
                            input();
                            prevSign = "x";
                            firstCalcFlag = false;
                            break;
                         case "+":
                            result = screenResult;
                            input();
                            prevSign = "+";
                            firstCalcFlag = false;
                            break;
                         case "-":
                            result = screenResult;
                            input();
                            prevSign = "-";
                            firstCalcFlag = false;
                            break;
                         case "C":
                            result = 0;
                            firstCalcFlag = true;
                            screenResult = 0;
                            input();
                            prevSign = "";
                            scrStrOutput = "";
                            return 0;
                            break;
                         case "=":
                             input();
                             return output(screenResult);
                             break;
                         case "m+":
                             memBuffer = screenResult;
                             input();
                             break;
                         case "m-":
                              screenResult = memBuffer;
                              firstCalcFlag = false;                           
                              input();
                              return output(screenResult);
                              break;
                         case "mrc":
                              memBuffer = 0;
                              input();
                              break;
                         
                    }
                } else {
                    switch (key) {
                        case "÷":
                            result = calc(prevSign, result, screenResult);
                            input();
                            prevSign = "÷";
                            return output(result);
                            break;
                         case "x":
                            result = calc(prevSign, result, screenResult);
                            input();
                            prevSign = "x";
                            return output(result);
                            break;
                         case "+":
                            result = calc(prevSign, result, screenResult);
                            input();
                            prevSign = "+";
                            return output(result);
                            break;
                         case "-":
                            result = calc(prevSign, result, screenResult);
                            input();
                            prevSign = "-";
                            return output(result);
                            break;
                         case "C":
                            result = 0;
                            firstCalcFlag = true;
                            screenResult = 0;
                            input();
                            prevSign = "";
                            scrStrOutput = "";
                            return 0;
                            break;
                         case "=":
                             result = calc(prevSign, result, screenResult);
                             input();
                             firstCalcFlag = true;
                             screenResult = result;
                             return output(screenResult);
                             break;
                        case "m+":
                             memBuffer = screenResult;
                             input();
                             break;
                         case "m-":
                              screenResult = memBuffer;
                              input();
                              return output(screenResult);
                              break;
                         case "mrc":
                              memBuffer = 0;
                              input();
                              break;
                         
                }
            }
        }
    }

};
           
  
var calculator = new Calculator(7);
var calc = calculator.calcMain();

    

var cssOutput = function() {
        var key = $(this).text();
        var output = calc(key);
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
    var classBtn ="";
    switch(event.which) {
        case 48: 
            key = "0";
            break;
        case 96: 
            key = "0";
            break;    
        case 49:
            key = "1";
            break;
        case 97: 
            key = "1";
            break;
        case 50:
            key = "2";
            break;
        case 98: 
            key = "2";
            break;
        case 51:
            key = "3";
            break;
        case 99: 
            key = "3";
            break;
        case 52: 
            key = "4";
            break;
        case 100: 
            key = "4";
            break;
        case 53:
            key = "5";
            break;
        case 101: 
            key = "5";
            break;    
        case 54:
            key = "6";
            break;
        case 102: 
            key = "6";
            break;
        case 55:
            key = "7";
            break;
        case 103: 
            key = "7";
            break;
        case 56: 
            key = "8";
            break;
        case 104: 
            key = "8";
            break;
        case 57: 
            key = "9";
            break;
        case 105: 
            key = "9";
            break;
        case 111:
            key = "÷";
            break;
        case 106:
            key = "x";
            break;
        case 109:
            key = "-";
            break;
        case 107:
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
        case 110: 
            key = ".";
            break;
        default:
            key ="default"
            break
        }

        
    switch (key) {
        case "0":
            $('.btn-num:contains("0")').toggleClass('btn-num-pressed');
            break
        case "1":
            $('.btn-num:contains("1")').toggleClass('btn-num-pressed');
            break
        case "2":
           $('.btn-num:contains("2")').toggleClass('btn-num-pressed');
            break
        case "3":
            $('.btn-num:contains("3")').toggleClass('btn-num-pressed');
            break
        case "4":
            $('.btn-num:contains("4")').toggleClass('btn-num-pressed');
            break
        case "5":
            $('.btn-num:contains("5")').toggleClass('btn-num-pressed');
            break
        case "6":
            $('.btn-num:contains("6")').toggleClass('btn-num-pressed');
            break
        case "7":
            $('.btn-num:contains("7")').toggleClass('btn-num-pressed');
            break
        case "8":
           $('.btn-num:contains("8")').toggleClass('btn-num-pressed');
            break
        case "9":
           $('.btn-num:contains("9")').toggleClass('btn-num-pressed');
            break
        case ".":
           $('.btn-num:contains(".")').toggleClass('btn-num-pressed');
            break
        case "C":
           $('.btn-num:contains("C")').toggleClass('btn-num-pressed');
            break    
        case "÷":
            $('.btn-math:contains("÷")').toggleClass('btn-math-pressed');
            break
        case "x":
            $('.btn-math:contains("x")').toggleClass('btn-math-pressed');
            break
        case "-":
            $('.btn-math:contains("-")').toggleClass('btn-math-pressed');
            break
        case "+":
            $('.btn-math:contains("+")').toggleClass('btn-math-pressed');
            break
        case "=":
            $('.btn-equals:contains("=")').toggleClass('btn-equals-pressed');
            break        
               
        }
   /* switch (classBtn) {
        case 'btn btn-num':
            $('.btn').attr("class",'btn btn-num btn-num-pressed');
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
        }*/
    var output = calc(key);
    $('.screen-digits').text(output);            
    
};
var cssOutputKbUp = function(event) {
    var key ="";
    var classBtn ="";
    switch(event.which) {
        case 48: 
            key = "0";
            break;
        case 96: 
            key = "0";
            break;    
        case 49:
            key = "1";
            break;
        case 97: 
            key = "1";
            break;
        case 50:
            key = "2";
            break;
        case 98: 
            key = "2";
            break;
        case 51:
            key = "3";
            break;
        case 99: 
            key = "3";
            break;
        case 52: 
            key = "4";
            break;
        case 100: 
            key = "4";
            break;
        case 53:
            key = "5";
            break;
        case 101: 
            key = "5";
            break;    
        case 54:
            key = "6";
            break;
        case 102: 
            key = "6";
            break;
        case 55:
            key = "7";
            break;
        case 103: 
            key = "7";
            break;
        case 56: 
            key = "8";
            break;
        case 104: 
            key = "8";
            break;
        case 57: 
            key = "9";
            break;
        case 105: 
            key = "9";
            break;
        case 111:
            key = "÷";
            break;
        case 106:
            key = "x";
            break;
        case 109:
            key = "-";
            break;
        case 107:
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
        case 110: 
            key = ".";
            break;
        default:
            key ="default"
            break
        }

        
    switch (key) {
        case "0":
            $('.btn-num:contains("0")').toggleClass('btn-num-pressed');
            break
        case "1":
            $('.btn-num:contains("1")').toggleClass('btn-num-pressed');
            break
        case "2":
           $('.btn-num:contains("2")').toggleClass('btn-num-pressed');
            break
        case "3":
            $('.btn-num:contains("3")').toggleClass('btn-num-pressed');
            break
        case "4":
            $('.btn-num:contains("4")').toggleClass('btn-num-pressed');
            break
        case "5":
            $('.btn-num:contains("5")').toggleClass('btn-num-pressed');
            break
        case "6":
            $('.btn-num:contains("6")').toggleClass('btn-num-pressed');
            break
        case "7":
            $('.btn-num:contains("7")').toggleClass('btn-num-pressed');
            break
        case "8":
           $('.btn-num:contains("8")').toggleClass('btn-num-pressed');
            break
        case "9":
           $('.btn-num:contains("9")').toggleClass('btn-num-pressed');
            break
        case ".":
           $('.btn-num:contains(".")').toggleClass('btn-num-pressed');
            break
        case "C":
           $('.btn-num:contains("C")').toggleClass('btn-num-pressed');
            break    
        case "÷":
            $('.btn-math:contains("÷")').toggleClass('btn-math-pressed');
            break
        case "x":
            $('.btn-math:contains("x")').toggleClass('btn-math-pressed');
            break
        case "-":
            $('.btn-math:contains("-")').toggleClass('btn-math-pressed');
            break
        case "+":
            $('.btn-math:contains("+")').toggleClass('btn-math-pressed');
            break
        case "=":
            $('.btn-equals:contains("=")').toggleClass('btn-equals-pressed');
            break        
               
        }
};
   /* switch (classBtn) {
        case 'btn btn-num':
            $('.btn').attr("class",'btn btn-num btn-num-pressed');
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
        } */   
            
    $('.btn').on({
        click:cssOutput, 
        mousedown: btnDown,
        mouseup: btnUp,
    });
    $('body').on({
        keydown: cssOutputKb,
        keyup: cssOutputKbUp
    });
   
});

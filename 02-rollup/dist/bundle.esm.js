var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        console.log('hello ts');
    };
    return Greeter;
}());

// import _ from "lodash";
var greeter = new Greeter();
greeter.greet();
var container = "<div class='container' style='color:red'>3</div>";
document.getElementById("container").innerHTML = container;
var arr = _.concat([1, 2, 3], 4, [5]);
// sayHello("hello world" + arr);

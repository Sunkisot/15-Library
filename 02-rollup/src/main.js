import sayHello from "@/packages/method";
import Greeter from "@/packages/tsMethod";
import '@/styles/index.css'
// import _ from "lodash";
const greeter = new Greeter();
greeter.greet();

const container = "<div class='container' style='color:red'>3</div>";
document.getElementById("container").innerHTML = container;

const arr = _.concat([1, 2, 3], 4, [5]);
// sayHello("hello world" + arr);

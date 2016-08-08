/**
 * global functions binded to window
 */



//This binding is needed to use log name inside then and catch Promise
//functions.
var log = console.log.bind(console);

//inside a then or catch, logs the msg and then the argument of the catch or then.
window.promiseLog = function(msg){
    log(msg);
    return console.log;
}

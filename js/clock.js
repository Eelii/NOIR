function clock(){
 
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  if (m.toString().length == 1){
      m = "0"+m.toString();
  }
  var s = date.getSeconds();
  if (s.toString().length == 1){
    s = "0"+s.toString();
    }
  var time = h + ":" + m + ":" + s + " ";
  //console.log(time);
  $('.clock').html(time); 
  setTimeout( clock, 1000 );
}
clock();

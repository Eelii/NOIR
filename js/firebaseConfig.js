const firebaseConfig = {
    apiKey: "XXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "noir-1fa27.firebaseapp.com",
    databaseURL: "https://noir-1fa27-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "noir-1fa27",
    storageBucket: "noir-1fa27.appspot.com",
    messagingSenderId: "75589738951",
    appId: "1:75589738951:web:2135ac464d316245ecf9e2",
    measurementId: "G-MRKFZ4BC4F"
  };

  firebase.initializeApp(firebaseConfig); 
  getMessages();

  $(document).ready(function() {
    setTimeout(scrollDownChatbox,2000);
    });

  var firePara = document.getElementById("para");
  var firebaseParaRef =
    firebase.database().ref().child("para");
    firebaseParaRef.on('value', function(datasnapshot){
    firePara.innerText=datasnapshot.val();
    });


  function scrollDownChatbox(){
    setTimeout(function(){ 
    $('#chatbox-right').animate({
      scrollTop: $('#chatbox-right').get(0).scrollHeight
      }, 2000);
    }, 2000);
  }

  function sendMessage(){
    var firebaseRef = firebase.database().ref();
    var sender = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    var date = new Date().toTimeString();
    document.getElementById("name").value = ""; 
    document.getElementById("message").value = ""; 

    
    firebaseRef.child("messages").push().set({
      sender:sender,
      message:message,
      date:date
    });
    scrollDownChatbox()
  }

  function getMessages(){
    var rootRef = firebase.database().ref().child("messages");
    rootRef.on('child_added', snap =>
    { var message = snap.child("message").val();
      var sender = snap.child("sender").val();
      var date = snap.child("date").val();
    $("#chatbox-right").append("<p class='chatbox-right-message'>"+message+"</p>"+"<p class='chatbox-right-sender'>"+sender+"</p><p class='chatbox-right-time'>Aika: "+date+"</p><br>");
    });
  }
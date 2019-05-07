
$('#signup_button').on('click', function(){
  // cargar los valores de password, email, name, age

  var mailVal = document.getElementById('email').value
  var passVal = document.getElementById('password').value
  var nameVal = document.getElementById('name').value
  var ageVal = document.getElementById('age').value

  json_to_send = {
    "password" : passVal,
    "email": mailVal,
    "name": nameVal,
    "age": ageVal
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://final-exam-andres.herokuapp.com/users',
    // url: 'https://tuapp.herokuapp.com/users',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      alert("Usuario creado con exito");
      console.log('success: '+ data);
      window.location = './index.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });

});
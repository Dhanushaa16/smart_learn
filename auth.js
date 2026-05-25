function registerUser() {

  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!username || !email || !password) {
    alert("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const attributeList = [];

  // Email attribute
  const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: "email",
    Value: email
  });

  // Name attribute (REQUIRED)
  const nameAttribute = new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: "name",
    Value: username
  });

  attributeList.push(emailAttribute);
  attributeList.push(nameAttribute);

  userPool.signUp(username, password, attributeList, null, function (err, result) {

    if (err) {
      alert(err.message);
      return;
    }

    alert("Registration successful. Check your email for verification.");

    window.location.href = "enroll.html";
  });

}
function loginUser() {
  

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Email & password required");
    return;
  }

  const authDetails =
    new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password
    });

  const userData = {
    Username: email,
    Pool: userPool
  };

  const cognitoUser =
    new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: function () {
      alert("LOGIN SUCCESS");
      window.location.href = "dashboard.html";
    },
    onFailure: function (err) {
      alert("LOGIN FAILED: " + err.message);
    }
  });
}

function getCurrentUser(callback){

  const user = userPool.getCurrentUser();

  if(!user){
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  user.getSession((err, session) => {

    if(err){
      console.error(err);
      return;
    }

    const userId = user.getUsername(); // 🔥 UNIQUE USER

    callback(userId);
  });
}
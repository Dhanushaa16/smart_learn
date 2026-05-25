// ✅ AWS CONFIG (WORKING VERSION)

AWS.config.region = "us-east-1";

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:a9c94711-ca0b-443e-9595-19fe708a1301" // 🔥 your ID
});

// 🔥 IMPORTANT: refresh credentials
AWS.config.credentials.get(function(err) {
  if (err) {
    console.error("AWS ERROR:", err);
  } else {
    console.log("AWS Connected ✅");
    console.log(AWS.config.credentials);
  }
});

// ✅ DynamoDB instance
const dynamodb = new AWS.DynamoDB.DocumentClient();
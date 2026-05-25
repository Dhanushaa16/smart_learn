const poolData = {
  UserPoolId: "us-east-1_caVHADuKx",
  ClientId: "7mtd1e005smlcf7qq91t8ibanm"
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

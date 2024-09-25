const AWS = require('aws-sdk');
const amplify = new AWS.Amplify();

exports.handler = async (event) => {
  try {
    // Criação do App no Amplify
    const appParams = {
      name: "amplify-minsait-prova-lambda",
      repository: "https://github.com/cmorikoshi/sam-minsait-prova-aws-fullstack",
      platform: "WEB"
    };
    const app = await amplify.createApp(appParams).promise();
    
    // Criação de uma branch
    const branchParams = {
      appId: app.appId,
      branchName: "main"
    };
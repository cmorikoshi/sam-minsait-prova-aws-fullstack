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
    const branch = await amplify.createBranch(branchParams).promise();
    
    // Start Deployment
    const deployParams = {
      appId: app.appId,
      branchName: branch.branchName,
      sourceUrl: 'https://github.com/cmorikoshi/sam-minsait-prova-aws-fullstack/index.html'  // URL do arquivo index.html
    };

    await amplify.startDeployment(deployParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Amplify App Created Successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating Amplify app', error }),
    };
  }
};
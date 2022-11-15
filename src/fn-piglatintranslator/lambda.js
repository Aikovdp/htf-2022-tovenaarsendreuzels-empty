const {
  EventBridgeClient,
  PutEventsCommand,
} = require("@aws-sdk/client-eventbridge");
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const {
  TranslateClient,
  TranslateTextCommand,
} = require("@aws-sdk/client-translate");
const {
  ComprehendClient,
  DetectDominantLanguageCommand,
} = require("@aws-sdk/client-comprehend");

/*
Documentation for AWS calls
EventBridge: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-eventbridge/index.html
SQS: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/index.html
Translate: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-translate/index.html
Comprehend: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-comprehend/index.html
*/

exports.handler = async (event) => {
  // Log the event so you can view it in CloudWatch
  console.log(event);

  // Step 3: Check what language the message is, translate to English if needed

  // Step 1: Translate the received message to PigLatin
  // Tip: Log the translated message so you can view it in CloudWatch


  // Step 2: Send the message to the correct Event Rule
};

/*
There is no need to use the functions given below, but remember to use clean code as it will be easier to explain :)
*/

async function sendToSQS(message) {
  // The message that is understood by the SQS
  let messageToSend = {
    translatedMessage: message,
    teamName: process.env.TeamName, // Team name is given as an environment variable
  };
}

async function sendToTeams(message) {
  // The message that is understood by the EventBridge rule
  let messageToSend = {
    translatedMessage: message,
    teamName: process.env.TeamName, // Team name is given as an environment variable
  };
}

async function sendToSendGrid(message) {
  // The format of the message can be found in cfn-students.yaml, you need 2 more attributes than in the "sendToTeams" function
}

function translateToPigLatin(message) {
    let translation = ""
    let textBuffer = ""
    message.split("").forEach(char => {
        if (char.match(/\W/)) {
            translation += translateWordToPigLatin(textBuffer) 
            textBuffer = ""
            translation += char
        } else {
            textBuffer += char
        }
    });

    if (textBuffer) {
        translation += translateWordToPigLatin(textBuffer)
    }

    return translation
}

function translateWordToPigLatin(word) {
    if (word.length <= 1) return word;
    translatedWord = word.substring(1) + word.charAt(0) + "ay"

    return translatedWord;
}

async function isMessageInEnglish(message) {
  // Check if the given message is in English or not using AWS Comprehend

  return true;
}

async function translateToEnglish(message, sourceLanguage) {
  // Translate the message to English using AWS Translate

  return message;
}

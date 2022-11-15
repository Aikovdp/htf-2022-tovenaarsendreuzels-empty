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
  let message = event.detail.message;
  // Step 3: Check what language the message is, translate to English if needed
  const language = await getLanguageCode(message);
  if (language !== "en") {
    message = await translateToEnglish(message, language);
  }

  // Step 1: Translate the received message to PigLatin
  // Tip: Log the translated message so you can view it in CloudWatch
  let translatedMessage = translateToPigLatin(message);
  console.log(translatedMessage);

  // Step 2: Send the message to the correct Event Rule
  let destination = event.detail.sendTo;
  console.log(destination);
  if (destination == "SQS") {
    // Send to SQS
    sendToSQS(translatedMessage);
  } else if (destination == "Teams") {
    // Send to Teams
    sendToTeams(translatedMessage);
  } else if (destination == "SendGrid") {
    // Send to SendGrid
    sendToSendGrid(translatedMessage);
  } else {
    console.log("Invalid destination");
  }
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

  const client = new SQSClient({ region: process.env.AWS_REGION });
  try {
    const data = await client.send(
      new SendMessageCommand({
        QueueUrl: process.env.SQSQueueUrl,
        MessageBody: JSON.stringify(messageToSend),
      })
    );
    console.log("Success", data.MessageId);
  } catch (error) {
    console.log("Error", error);
  }
}

async function sendToTeams(message) {
  // The message that is understood by the EventBridge rule
  let messageToSend = {
    translatedMessage: message,
    teamName: process.env.TeamName, // Team name is given as an environment variable
  };

  let eventBridgeParams = {
    Entries: [
      {
        Detail: JSON.stringify(messageToSend),
        DetailType: "SendToTeams",
        Resources: [process.env.TeamName],
        Source: "HTF22",
        EventBusName: process.env.EventBusName,
      },
    ],
  };
  let client = new EventBridgeClient();

  try {
    await client.send(new PutEventsCommand(eventBridgeParams));
  } catch (error) {
    console.error(error);
  }
}

async function sendToSendGrid(message) {
  // The format of the message can be found in cfn-students.yaml, you need 2 more attributes than in the "sendToTeams" function
}

function translateToPigLatin(message) {
  let translation = "";
  let textBuffer = "";
  message.split("").forEach((char) => {
    if (char.match(/\W/)) {
      translation += translateWordToPigLatin(textBuffer);
      textBuffer = "";
      translation += char;
    } else {
      textBuffer += char;
    }
  });

  if (textBuffer) {
    translation += translateWordToPigLatin(textBuffer);
  }

  return translation;
}

function translateWordToPigLatin(word) {
  if (word.length <= 1) return word;
  translatedWord = word.substring(1) + word.charAt(0) + "ay";

  return translatedWord;
}

async function getLanguageCode(message) {
  // Check if the given message is in English or not using AWS Comprehend
  const comprend = new ComprehendClient({
    region: process.env.AWS_REGION,
  });
  try {
    const data = await comprend.send(
      new DetectDominantLanguageCommand({
        Text: message,
      })
    );

    console.log(data);
    return data.Languages[0].LanguageCode;
  } catch (error) {
    console.log(error);
  }
}

async function translateToEnglish(message, sourceLanguage) {
  // Translate the message to English using AWS Translate
  const translate = new TranslateClient({ region: process.env.AWS_REGION });
  try {
    const { TranslatedText } = await translate.send(
      new TranslateTextCommand({
        Text: message,
        SourceLanguageCode: sourceLanguage,
        TargetLanguageCode: "en",
      })
    );
    return TranslatedText;
  } catch (error) {
    console.log(error);
  }
}

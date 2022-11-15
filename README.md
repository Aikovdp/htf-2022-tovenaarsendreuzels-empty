# HTF22 - Tovenaars en Dreuzels
## The Problem
The world is about to perish. We need help, but no human help is sufficient, so magicians had to step in. Using their magic they can save our world (hopefully), but they need to use Earthly spells otherwise it will have no effect in our world! We have already acquired the Earthly spells for you, but the magicians need them in an Ancient language called PigLatin. It is your job to translate them and make sure they arrive at the correct destination before it is too late...

## The Solution
![Full Solution Architecture](/HTF-2022.drawio.png)

The Earthly spells have been collected and get sent to you periodically using the SpellSenderLambda, find a way to route them to your TranslatorLambda using an EventBridge Rule. From there, start translating and sending!

But before all that, let's get prepared for battle by following the steps underneath.

## Requirements
### Install AWS CLI
In order to be able to communicate with the AWS cloud, you need to install its CLI.
The installation file can be found here:
- [Windows](https://awscli.amazonaws.com/AWSCLIV2.msi)
- [MacOS](https://awscli.amazonaws.com/AWSCLIV2.pkg)
- [Linux](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html#cliv2-linux-install)

#### Configure AWS CLI
You'll need to login using your credentials in order to be able to use the AWS CLI.
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html

**Note** Use "eu-west-1" as the region when configuring your CLI.

### Install AWS SAM
The AWS SAM (Serverless Application Model) makes it easier to create and manage serverless applications in the AWS cloud.
This is not a necessity, but can improve the speed and quality of building your applications.

The installation guide can be found here:
- [Windows](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-windows.html)
- [MacOS](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html)
- [Linux](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html)

### Install NodeJS and NPM
[NodeJS Download](https://nodejs.org/en/download/)  

### Create a SendGrid trial account
https://sendgrid.com/

Create an ApiKey and learn how to work with the API using the documentation.
https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authentication

### Teams Spell Sender Channel
Webhook: https://cronos.webhook.office.com/webhookb2/81bc4625-ee29-4195-9387-680f16db2ba6@49c3d703-3579-47bf-a888-7c913fbdced9/IncomingWebhook/cffdf2eedd7145899b39f8da5d96c614/d727bd18-2b6b-4030-97f3-25fd1a690250

## Getting started
### Initial Setup
In order to be able to deploy your project to AWS, you'll need to set a few parameters.

#### deployStudent.sh and deployStudent.ps1
Replace **[TEAMNAME]** with the name of your team excluding spaces.  
Example: "Digital Deities" becomes "DigitalDeities".

#### cfn-students.yaml
At the top of the files, there is a parameter called "TeamName", enter your team name in the *Default* attribute (excluding spaces).  
Example: "Digital Deities" becomes "DigitalDeities".

You will also need to have an API key for both SendGrid and Teams.

### PigLatin
For every word in a sentence, you take the first letter and append it to the end.  
Then you append "ay" to the newly created word.  

A word existing of only 1 letter (I) should not have *ay* appended, you can leave it as-is.  

Examples:
- eat -> ateay
- banana -> ananabay
- cucumber -> ucumbercay

### Goals
#### Level 1 - Set up first communications with the Magicians.
Successfully manage to send any message to the magicians, even if it is not yet translated. (Meaning a message has to go through your Lambda function, towards your EventBridge Rule).

#### Level 2 - Speak in their native language.
Translate a sentence to PigLatin and send this to Teams and/or SendGrid. 

Example sentence: "pig latin is used by strange pigs"  
Example translation: "igpay atinlay isay useday ybay trangesay igspay"

This level will be achieved once you succesfully translate a simple English sentence to PigLatin and send it to one of the Wizards over SendGrid and/or Teams.

#### Level 3 - Translate earthly spells to English before you translate to PigLatin.
Not everyone speaks the same language on our planet either.
As the wizard magic only works when translated from English to PigLatin, and not from another language, we will need to translate the spells to English first.  

The language a spell is written in can be determined by using the AWS Comprehend service.  
It can then be translated by the AWS Translate service to English.  

Example French: "tu es incroyable"
Translated to English: "you are amazing"
Translate to PigLatin: "ouyay areay amazingay"

This level will be achieved once you succesfully translate a spell from a foreign language to English and then to PigLatin.

#### Level 4 - Be patient with the ancient magicians!
Some of the ancient wizards are over a hundred years old.  
They have become slower than the younger ones, meaning they sometimes need a little more time to cast their spells.  
In order for them to cast the spells at their own pace, the spells need to be put on a queue where they can retrieve them when they are ready.  

This level will be gained when you successfully translate a Level 3 spell and put it on the SQS queue.

#### Level 5 - Make your spells more powerful!
Some of the most powerfull spells are powered by their punctuations and capitalizations.  
These can be a bit harder to translate, thus needing more logic in order to get the translation just right.  

**Tip**: It might be better to start using Regex in this case instead of doing the string manipulation yourselves, but definitely feel free to follow your own path!  
Just make sure you are able to tell what it does exactly during your presentation. :smile:

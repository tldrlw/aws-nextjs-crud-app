import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb"; // ES Modules import

export const lambdaHandler = async (event, context) => {
  // Extracting requestContext and context info
  const { domainName, http, time } = event.requestContext;
  const { functionName, memoryLimitInMB, logGroupName, invokedFunctionArn } =
    context;

  console.log("from `event.requestContext` and `context`", {
    domainName,
    method: http.method,
    sourceIp: http.sourceIp,
    userAgent: http.userAgent,
    time,
    // below from context
    functionName,
    memoryLimitInMB,
    logGroupName,
    invokedFunctionArn,
  });

  // Environment variables from Lambda configuration
  const tableName = process.env.DYDB_TABLE_NAME;
  const region = process.env.REGION;

  // Extract request body from event
  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch (err) {
    console.error("Error parsing request body:", err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid JSON in request body",
      }),
    };
  }

  const { messageId, newMessage } = requestBody; // Expecting `messageId` and `newMessage` in request

  console.log("`requestBody`", requestBody);

  // DynamoDB client configuration
  const client = new DynamoDBClient({ region });

  // Get current date-time in ISO format
  const currentDateTime = new Date().toISOString();

  // Define parameters for UpdateItemCommand
  const params = {
    TableName: tableName,
    Key: {
      PK: { S: messageId }, // Assuming PK is a string and messageId maps to it
    },
    UpdateExpression: "set #msg = :newMessage, #dt = :newDateTime",
    ExpressionAttributeNames: {
      "#msg": "Message",
      "#dt": "DateTime",
    },
    ExpressionAttributeValues: {
      ":newMessage": { S: newMessage }, // The updated message from the request
      ":newDateTime": { S: currentDateTime }, // The current time as the new DateTime
    },
    ReturnValues: "UPDATED_NEW", // Returns the updated attributes
  };

  try {
    const command = new UpdateItemCommand(params);
    const result = await client.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Update successful",
        updatedAttributes: result.Attributes,
      }),
    };
  } catch (error) {
    console.error("Error updating DynamoDB table:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to update the table",
        error: error.message,
      }),
    };
  }
};

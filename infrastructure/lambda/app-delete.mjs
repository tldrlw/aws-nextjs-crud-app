import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb"; // ES Modules import

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

  const { messageId } = requestBody; // Assuming only `messageId` is passed

  console.log("`requestBody`", requestBody);

  // DynamoDB client configuration
  const client = new DynamoDBClient({ region });
  // Define parameters for DeleteItemCommand
  const params = {
    TableName: tableName,
    Key: {
      PK: { S: messageId }, // Assuming PK is a string and messageId maps to it
    },
  };

  try {
    const command = new DeleteItemCommand(params);
    await client.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Delete successful",
      }),
    };
  } catch (error) {
    console.error("Error deleting from DynamoDB table:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to delete from table",
        error: error.message,
      }),
    };
  }
};

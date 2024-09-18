import {
  DynamoDBClient,
  BatchWriteItemCommand,
} from "@aws-sdk/client-dynamodb"; // ES Modules import

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

  const { message } = requestBody; // Assuming only `message` is passed

  console.log("`requestBody`", requestBody);

  // Function to generate a 10-character unique identifier
  function generateUniqueId() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueId = "";
    for (let i = 0; i < 10; i++) {
      uniqueId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return uniqueId;
  }

  // Function to generate ISO 8601 timestamp
  function getISO8601Timestamp(date = new Date()) {
    return date.toISOString();
  }

  // DynamoDB client configuration
  const client = new DynamoDBClient({ region });
  // DynamoDB params for BatchWriteItemCommand
  const params = {
    RequestItems: {
      [tableName]: [
        {
          PutRequest: {
            Item: {
              PK: {
                S: generateUniqueId(),
              },
              DateTime: {
                S: getISO8601Timestamp(),
              },
              Message: {
                S: message,
              },
            },
          },
        },
      ],
    },
  };

  try {
    const command = new BatchWriteItemCommand(params);
    const BatchWriteItemCommandReturnData = await client.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Write successful",
        unprocessedItems:
          BatchWriteItemCommandReturnData.UnprocessedItems || [],
      }),
    };
  } catch (error) {
    console.error("Error writing to DynamoDB table:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to write to table",
        error: error.message,
      }),
    };
  }
};

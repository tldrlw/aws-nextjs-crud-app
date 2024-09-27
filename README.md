# aws-nextjs-crud-app

## front-end

- basic form that makes API (most likely client-side because state-management for "processing request" logic) call to store a message
- https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file - just a nice to have during the development process...

## infrastructure

### Lambda source code (path: infrastructure/lambda)

- GET - reads (`ScanCommand`) items from DynamoDB
- POST - writes (`BatchWriteItemCommand`) a new item to DynamoDB
- PUT - updates (`UpdateItemCommand`) an existing item in DynamoDB
- DELETE - deletes (`DeleteItemCommand`) an existing item in DynamoDB

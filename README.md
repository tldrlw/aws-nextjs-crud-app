# aws-nextjs-crud-app

## front-end

- basic form that makes API (most likely client-side because state-management for "processing request" logic) call to store a message

## infrastructure

- POST lambda (with function URL) that writes to dydb table
- GET lambda (with function URL) that reads (scan operation) dydb table
- DELETE lambda (with function URL) that deletes (query operation) items from dydb table

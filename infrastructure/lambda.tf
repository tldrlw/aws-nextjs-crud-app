module "lambda_get" {
  source              = "git::https://github.com/tldrlw/terraform-modules.git//apig-lambda"
  source_dir          = var.LAMBDA_PATH
  handler_file_prefix = "app-get"
  REST_method         = "GET"
  function_name       = "${var.APP_NAME}-get"
  environment_variables = {
    DYDB_TABLE_NAME = aws_dynamodb_table.messages.id,
    REGION          = var.REGION
  }
  is_s3                  = false
  is_dydb                = true
  dydb_table_arn         = aws_dynamodb_table.messages.arn
  dydb_table_permissions = ["dynamodb:Scan", "dynamodb:DescribeTable"]
  function_url_public    = true
}
# rm -rf .terraform/modules
# run ^ after pushing up changes to modules

module "lambda_post" {
  source              = "git::https://github.com/tldrlw/terraform-modules.git//apig-lambda"
  source_dir          = var.LAMBDA_PATH
  handler_file_prefix = "app-post"
  REST_method         = "POST"
  function_name       = "${var.APP_NAME}-post"
  environment_variables = {
    DYDB_TABLE_NAME = aws_dynamodb_table.messages.id,
    REGION          = var.REGION
  }
  is_s3                  = false
  is_dydb                = true
  dydb_table_arn         = aws_dynamodb_table.messages.arn
  dydb_table_permissions = ["dynamodb:BatchWriteItem"]
  function_url_public    = true
}

module "lambda_delete" {
  source              = "git::https://github.com/tldrlw/terraform-modules.git//apig-lambda"
  source_dir          = var.LAMBDA_PATH
  handler_file_prefix = "app-delete"
  REST_method         = "DELETE"
  function_name       = "${var.APP_NAME}-delete"
  environment_variables = {
    DYDB_TABLE_NAME = aws_dynamodb_table.messages.id,
    REGION          = var.REGION
  }
  is_s3                  = false
  is_dydb                = true
  dydb_table_arn         = aws_dynamodb_table.messages.arn
  dydb_table_permissions = ["dynamodb:DeleteItem"]
  function_url_public    = true
}

module "lambda_put" {
  source              = "git::https://github.com/tldrlw/terraform-modules.git//apig-lambda"
  source_dir          = var.LAMBDA_PATH
  handler_file_prefix = "app-put"
  REST_method         = "PUT"
  function_name       = "${var.APP_NAME}-put"
  environment_variables = {
    DYDB_TABLE_NAME = aws_dynamodb_table.messages.id,
    REGION          = var.REGION
  }
  is_s3                  = false
  is_dydb                = true
  dydb_table_arn         = aws_dynamodb_table.messages.arn
  dydb_table_permissions = ["dynamodb:UpdateItem"]
  function_url_public    = true
}

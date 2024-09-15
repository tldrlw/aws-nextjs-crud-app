terraform {
  backend "s3" {
    bucket = "tfstate-aws-nextjs-crud-app"
    key    = "global/s3/terraform.tfstate"
    region = "us-east-1"
    # region         = var.REGION
    # ^ variables not allowed in backend configuration
    dynamodb_table = "tfstate-aws-nextjs-crud-app"
    encrypt        = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40.0"
    }
  }
  required_version = ">= 1.7.4"
}

provider "aws" {
  region = var.REGION
  default_tags {
    tags = {
      ManagedBy = "Terraform"
      Repo      = "https://github.com/tldrlw/aws-nextjs-crud-app/tree/dev"
    }
  }
}

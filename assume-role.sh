#!/bin/bash

output="/tmp/assume-role-output.json"

ACCOUNT_ID=$(aws sts get-caller-identity --profile pwrdrvr --query "Account" --output text)
aws sts assume-role --profile pwrdrvr --role-arn "arn:aws:iam::$ACCOUNT_ID:role/AdminAccess" --role-session-name secrets-cdk-session --output json > $output
AccessKeyId=$(cat $output | jq -r '.Credentials''.AccessKeyId')
SecretAccessKey=$(cat $output | jq -r '.Credentials''.SecretAccessKey')
SessionToken=$(cat $output | jq -r '.Credentials''.SessionToken')

export AWS_REGION=us-east-2
export AWS_ACCESS_KEY_ID=$AccessKeyId
export AWS_SECRET_ACCESS_KEY=$SecretAccessKey
export AWS_SESSION_TOKEN=$SessionToken

rm /tmp/assume-role-output.json

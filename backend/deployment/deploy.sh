#!/bin/bash -e
set -e
if [ -z $1 ]; then
    rm -rf bin
fi
if [ ! -d "./.aws-sam" ];
then
  mkdir ./.aws-sam
fi

aws cloudformation package --template-file ./template.yml --output-template-file ./.aws-sam/packaged-template.yml --s3-bucket triviaapp-dev-serverlessdeploymentbucket-1cuszpbeuol0z --region us-west-2 --profile triviaDev
aws cloudformation deploy --template-file ./.aws-sam/packaged-template.yml --stack-name trivia-app --region us-west-2 --profile triviaDev --capabilities CAPABILITY_NAMED_IAM
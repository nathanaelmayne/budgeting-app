'use strict';

import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();
const params: DynamoDB.ScanParam = {
  TableName: process.env.TRANSACTION_TABLE
};

module.exports.list = (event, context, callback) => {
  // fetch all transactions from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t list the transactions.'))
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

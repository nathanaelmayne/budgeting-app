'use strict';

import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
  const params: DynamoDB.DeleteParam = {
    TableName: process.env.TRANSACTION_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // delete the transaction from the database
  dynamoDb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t remove the transaction.'))
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({}),
    };
    callback(null, response);
  });
};

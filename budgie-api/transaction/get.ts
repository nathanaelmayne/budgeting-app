'use strict';

import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  const params: DynamoDB.GetParam = {
    TableName: process.env.TRANSACTION_TABLE,
    Key: {
      id: event.pathParameters.id
    },
  };

  // fetch transaction from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t retrieve the transaction.'))
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};

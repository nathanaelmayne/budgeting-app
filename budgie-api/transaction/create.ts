'use strict'

import { DynamoDB } from 'aws-sdk';
import * as uuid from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body)
  if (typeof data.description !== 'string') {
    console.error('Validation Failed')
    callback(new Error('Couldn\'t create the transaction.'))
    return
  }

  const params: DynamoDB.PutParam = {
    TableName: process.env.TRANSACTION_TABLE,
    Item: {
      id: uuid.v1(),
      type: data.type,
      categoryId: data.categoryId,
      amount: data.amount,
      description: data.description
    }
  }

  // write the transaction to the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
      callback(new Error('Couldn\'t create the transaction.'))
      return
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result.Item)
    }

    callback(null, response)
  })
}

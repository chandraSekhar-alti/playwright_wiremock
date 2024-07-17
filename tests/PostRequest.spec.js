const { test, expect } = require('@playwright/test');
const postData = require("../data/postData.json")
import {constructPayload} from "../utils/utils.js"
require("dotenv").config();


test('POST request to api end point', async({request}) => {
  /*
  Test case flow
  1. POST data into server
  2. GET response from server
  3. make some assertions to recived response
*/

  //POST data

  const postResponse = await request.post(process.env.API_POST_URL, {
    headers: {
        'Content-Type': 'application/json'
    },
    data: constructPayload(postData.REQUEST_DATA, postData.RESPONSE_DATA)
});

// Assert post response status
expect(postResponse.ok()).toBeTruthy();
expect(postResponse.status()).toBe(201);


// GET posted data response
const getResponse = await request.get(process.env.API_BASE_URL+"api/users/8");

expect(getResponse.ok()).toBeTruthy();
expect(getResponse.status()).toBe(200);

// Assert Get response
const finalResponse = await getResponse.json();
expect(finalResponse.name).toBe(postData.RESPONSE_DATA.jsonBody.name);
expect(finalResponse.email).toBe(postData.RESPONSE_DATA.jsonBody.email);
expect(finalResponse.age).toBe(postData.RESPONSE_DATA.jsonBody.age);
expect(finalResponse.address).toBe(postData.RESPONSE_DATA.jsonBody.address);

});

// test('save all response through util file ', async({request}) => {
//   saveEntireResponseHistoryToLocal(request);
// });


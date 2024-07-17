const { test, expect } = require("@playwright/test");
require("dotenv").config();
const putData = require("../data/putData.json");
import { constructPayload } from "../utils/utils";

/*
    Test case flow
    1. POST data into server
    2. using PUT method make some changes to the data
    3. GET response and validate
    4. assert server response
*/

test('PUT request to API endpoint', async ({ request }) => {
    // POST request
    const postResponse = await request.post(process.env.API_POST_URL, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: constructPayload(putData.REQUEST_DATA, putData.RESPONSE_DATA)
    });

    // Assert post response status
    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(201);

    const postResponseBody = await postResponse.json();
    const uuid = postResponseBody.uuid;

    // PUT request
    const putUrl = `${process.env.API_POST_URL}/${uuid}`;
    const putResponse = await request.put(putUrl, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: constructPayload(putData.REQUEST_DATA, putData.RESPONSE_DATA)
    });

    // Assert put response status
    expect(putResponse.ok()).toBeTruthy();
    expect(putResponse.status()).toBe(200);

    // GET request
    const getResponse = await request.get(putUrl);
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);

    // Validate GET response content
    const finalResponse = await getResponse.json();

    // Adjust assertions based on actual structure of finalResponse
    expect(finalResponse.response.jsonBody.name).toBe(putData.RESPONSE_DATA.jsonBody.name);
    expect(finalResponse.response.jsonBody.email).toBe(putData.RESPONSE_DATA.jsonBody.email);
    expect(finalResponse.response.jsonBody.age).toBe(putData.RESPONSE_DATA.jsonBody.age);
    expect(finalResponse.response.jsonBody.phone).toBe(putData.RESPONSE_DATA.jsonBody.phone);
});

const { test, expect } = require('@playwright/test');
const deleteData = require("../data/deleteData.json")
import { constructPayload } from "../utils/utils.js"
require("dotenv").config();

/*
    Test Process
    1. POST data in the server
    2. GET the post data ID and Assert
    3. Delete the data from the server
    4. again calling GET method and verify the 404 status code
*/

test('DELETE request', async ({ request }) => {
    let uuid;
    //POST data

    const postResponse = await request.post(process.env.API_POST_URL, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: constructPayload(deleteData.REQUEST_DATA, deleteData.RESPONSE_DATA)
    });

    const postResponseJsonFormate = await postResponse.json();

    uuid = postResponseJsonFormate.uuid;

    //GET response
    const getResponse = await request.get(process.env.API_POST_URL  + "/" +uuid);
    const getResponseJsonFormate = await getResponse.json();
    expect(getResponse.status()).toBe(200);
    expect(getResponse.ok()).toBeTruthy();
    //Asserting GET response from server
    expect(getResponseJsonFormate.response.jsonBody.name).toBe("deleteUser")
    expect(getResponseJsonFormate.response.jsonBody.email).toBe("DeleteUser@example.com")
    expect(getResponseJsonFormate.response.jsonBody.age).toBe(12);

    //Deleting data from the server
    const deleteResponse = await request.delete(process.env.API_POST_URL + "/"+ uuid, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // Assert delete response status
    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponse.status()).toBe(200);

    //GET method to verify 404 status code
    const verifyDeleteResponse = await request.get(process.env.API_POST_URL  +"/"+uuid)
    expect(verifyDeleteResponse.status()).toBe(404);

});
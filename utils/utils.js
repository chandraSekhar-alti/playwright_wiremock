const { test, expect } = require('@playwright/test');

export async function saveEntireResponseHistoryToLocal(request) {
    const response = await request.post("http://localhost:9999/__admin/mappings/save");
    console.log("ALl RESPONSES ARE SAVED SUCCESSFULLY !!!!")
}

// Helper function to construct the PUT request payload
export const constructPayload = (request, response) => ({
    request,
    response
});
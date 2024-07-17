const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("GET API Tests for WireMock Server", () => {
    test("GET all users data from wiremock server", async ({ request }) => {
        const response = await request.get(`${process.env.API_BASE_URL}api/users`);
        const finalResponse = await response.json();

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        expect(Array.isArray(finalResponse.users)).toBeTruthy();
        expect(finalResponse.users.length).toBeGreaterThan(0);

        const firstUser = finalResponse.users[0];
        expect(firstUser).toHaveProperty("id");
        expect(firstUser).toHaveProperty("name");
        expect(firstUser).toHaveProperty("email");
        expect(firstUser).toHaveProperty("age");
        expect(firstUser).toHaveProperty("address");
        expect(firstUser).toHaveProperty("phone");
    });

    test("GET specific user data based on their IDs from wiremock server", async ({
        request,
    }) => {
        let response = await request.get(
            `${process.env.API_BASE_URL}api/users/1`
        );
        let finalResponse = await response.json();

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        expect(finalResponse.id).toBe(1);
        expect(finalResponse.name).toBe("jhon");
        expect(finalResponse.email).toBe("jhon@example.com");
        expect(finalResponse.age).toBe(250);
        expect(finalResponse.address).toBe("123 india");
        expect(finalResponse.phone).toBe("1234567890");
    });

    test("GET user 3 data based on their IDs from wiremock server", async ({
        request,
    }) => {
        let response = await request.get(
            `${process.env.API_BASE_URL}api/users/3`
        );

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        let finalResponse = await response.json();
        expect(finalResponse.name).toBe("sai");
        expect(finalResponse.email).toBe("sai@gmail.com");
        expect(finalResponse.age).toBe(30);
        expect(finalResponse.address).toBe("India");
    });
});

# WireMock with Playwright

This project uses [WireMock](http://wiremock.org/) as a mock server and [Playwright](https://playwright.dev/) for end-to-end testing.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or newer)
- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) (for running WireMock standalone)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/chandraSekhar-alti/playwright_wiremock.git
    cd your-repo-name
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. The WireMock standalone JAR file is already placed in the root directory of the project. If you want to use the latest version, you can replace the existing file with the latest one:

    ```sh
    curl -o wiremock-standalone-3.8.0.jar https://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/3.8.0/wiremock-standalone-3.8.0.jar
    ```

### Usage


#### Start WireMock Server

To manually start the WireMock server, run:

```sh
npm run start-server
   ```

###  Running Tests

To run the tests, use:

```sh
npx playwright test
   ```
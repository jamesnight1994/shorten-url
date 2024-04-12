# URL Shortener Application Setup
[Live Demo](https://tiny-url-api.vercel.app/)
## Prerequisites

Before setting up the application, make sure you have the following installed:

- Docker
- Node.js

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/jamesnight1994/shorten-url.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd shorten-url
    ```

3. **Create a `.env` file at the root of the project folder with the following contents:**

    ```plaintext
    APP_DOMAIN=http://localhost:3000
    DATABASE_URL="postgresql://a24:password@postgres:5432/url_shortener?schema=public"
    POSTGRES_DB=url_shortener
    POSTGRES_USER=a24
    POSTGRES_PASSWORD=password
    ```

4. **Start the PostgreSQL server:**

    ```bash
    docker-compose up postgres
    ```

5. **Start the Node.js application:**

    ```bash
    docker-compose up app
    ```

6. **Once both containers are up and running, navigate to the URL [http://localhost:3000/](http://localhost:3000/) in your web browser.**

## Usage

- After setting up the application, you'll find a documented endpoint at `/url/shorten` which you can use to shorten URLs.
- Paste the resulting response on your browser

## Troubleshooting

- If the application does not start successfully, try restarting the containers using Docker Desktop Application.

# PART 2

## 1. **Code Review and Refactoring:**
- Use dependency injection to inject `MD5Utils generateRandomShortUrl(data.url);` rather than instantiating it within the method `shortenUrl()`.MD5 shortening algorithm class might be replaced with another algorithm class in the future.
    
- Create a `private function saveUrl(destination: string, shortUrl: string)` that stores the url if it was not found. In order to separate **"url shortening"**  and **"saving"**.
- Move url validation logic to the `class UrlDto` & utilize the `class-validator` class.
Centralize URL validation logic.
- Centralize error handling. Also Include error handling in the function `getDestination(shortUrl: string)`

- [link to the comments and code PR](https://github.com/jamesnight1994/shorten-url/pull/1)

## 2. **System Scalability Analysis:**

The current system architecture, as is, might face scalability challenges when handling a significant increase in traffic. Potential bottlenecks could include database performance and server load.
Here are some suggestion to mitigate the mentioned challenges
   - *Database Optimization*: indexing and caching frequently used URL's instead of contantly using database transactions to fetch them will improve performance. Introduce caching mechanisms like Redis to reduce database load. 
   - *Cluster deployment*: Use horizontal scaling by deploying the application across multiple servers or containers. A Kubernetes server or cloud managed clusters are able to help with this since the application has been containerized [Dockerfile](https://github.com/jamesnight1994/shorten-url/blob/feature/shorten-url/Dockerfile).
   - *Load balancing*: Utilize load balancers to distribute traffic, implement asynchronous processing for non-essential tasks, and monitor system performance regularly to identify scaling needs.

## 3. **Security and Data Integrity:**

Potential security vulnerabilities within the current implementation could be caused by the lack following:
- *Authentication  & authorization*: since this is an API that is not multitenant a *JWT token* implementation could be useful to ensure only an authorized client application/frontend is allowed to use the API.
- *Rate limiting*: Lack of rate limiting may lead to DoS attacks by overwhelming the application with excessive requests.
- *Error handling*: Though some error handling mechanisms have been put in place. Some unmitigated errors scenarios may lead to stack traces that reveal system information.


## 4. **New Feature Proposal:**

*Feature*: Implement analytics tracking to provide users with insights into their shortened URLs' performance, including click-through rates and geographic data. This data can also help us refine our caching mechanism for the URL's we should cache for immediate retrival as a bonus.
   - *Technical Implementation*:  Click data is collected when we redirect the user from the our "short url" domain to the "destination url". We will store the click data in a separate analytics database table linked to the shortened URLs. 
   - *User Experience*: Display analytics data in user-friendly charts and graphs within the user dashboard. Allow users to filter and export data for further analysis. 
   - *Integration and Impact*: Integrate analytics seamlessly into the existing application interface, enhancing user engagement and providing valuable insights into URL performance. This feature would enrich the service's functionality and empower users to optimize their shortened URLs for better outcomes. Other potential features could spawn from this feature e.g. _*descriptive shortened URL recommendations*_


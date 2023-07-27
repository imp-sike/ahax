# AHAX (Achronomous HTML and XML)

AHAX is a lightweight JavaScript library that provides a simple way to handle HTTP requests, supporting GET, POST, DELETE, and UPDATE operations. It allows you to make asynchronous HTTP calls and update your HTML content dynamically without reloading the page. AHAX simplifies the process of making AJAX requests and updating your views with the response data.

## Getting Started

To use AHAX in your project, follow these simple steps:

1. Download the `ahax.js` file and place it in your project directory.

2. Include the `ahax.js` script in your HTML file, just before the closing `</body>` tag:

   ```html
   <script src="./path/to/ahax.js"></script>
   ```
or use a cdn:
```html
<script src="https://cdn.jsdelivr.net/gh/imp-sike/ahax/dist/ahax.js"></script>
```

## How to Use

AHAX provides a function called `http(event)` that handles HTTP requests. It can be called from event handlers or form submissions to initiate the AJAX call. The function takes the event object as an argument, which can be obtained from event listeners.

### Basic Usage

#### Sending a GET request and displaying the response:

```html
<!-- Example: get_simple.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Test GET Simple</title>
</head>
<body>
    <div id="loader" style="display:none;">Loading...</div>
    <button 
        onclick="http(event)"
        hs-method="get"
        hs-path="https://jsonplaceholder.typicode.com/posts/1"
        hs-target="#output"
        hs-loader="#loader"
    >Send GET Request</button>
    <div id="output"></div>
</body>
<script src="./path/to/ahax.js"></script>
</html>
```

### Sending a POST request and displaying the response:

```html
<!-- Example: post_form.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Test POST Form</title>
</head>
<body>
    <div id="loader" style="display:none;">Loading...</div>

    <form 
        onsubmit="http(event)"
        hs-loader="#loader"
        hs-method="post" 
        hs-path="https://jsonplaceholder.typicode.com/posts"
        hs-target="#output"
        >
        <input type="text" name="name" value="John Doe">
        <input type="email" name="email" value="john.doe@example.com">
        <button type="submit">Send POST Request</button>
    </form>
    <div id="output"></div>
</body>
<script src="./path/to/ahax.js"></script>
</html>
```

### Custom View with Interceptor

You can customize the view by using an interceptor function. The interceptor will be called with the parsed JSON response, allowing you to update the view based on the data received.

```html
<!-- Example: custom_view.html -->
<body>
    <div id="loader" style="display:none;">Loading...</div>
    <button onclick="http(event)" hs-method="get" hs-path="https://jsonplaceholder.typicode.com/posts"
        hs-loader="#loader" hs-interceptor="addView">Send GET Request</button>
    <div id="output"></div>
</body>
<script>
    function addView(data) {
        const view = document.getElementById("output");
        for (var element in data) {
            view.innerHTML += "<br>" + data[element].id;
        }
    }
</script>
<script src="./path/to/ahax.js"></script>
```

### using `hs-headers`
```html
<button 
        onclick="http(event)"
        hs-method="get"
        hs-path="https://jsonplaceholder.typicode.com/posts/1"
        hs-target="#output"
        hs-loader="#loader"
        hs-headers='{"Authorization": "Bearer YOUR_ACCESS_TOKEN"}'
    >Send GET Request</button>
```

### Supported Attributes

- `hs-method`: Specifies the HTTP method (GET, POST, DELETE, PUT).
- `hs-path`: The URL for the HTTP request.
- `hs-target`: The HTML element where the response will be displayed.
- `hs-loader`: The HTML element used as a loader during the HTTP request.
- `hs-interceptor`: The name of the function to be used as an interceptor for custom view updates.
- `hs-headers`: Allow users to specify custom headers for their HTTP requests.  that takes a JSON object representing the headers to be sent with the request.

### TODO

1. **Request Headers (DONE)**: Allow users to specify custom headers for their HTTP requests. This can be achieved by introducing a new custom attribute like `hs-headers` that takes a JSON object representing the headers to be sent with the request.

2. **Request Timeout**: Allow users to set a timeout for their HTTP requests. You can introduce a new attribute like `hs-timeout` to specify the maximum time allowed for the request to complete before it times out.

3. **Success and Error Handling**: Implement custom attributes like `hs-success` and `hs-error` that take the names of functions to be executed on successful responses and error responses, respectively. This way, users can define custom handling logic based on the request outcome.

4. **Request Interceptors**: Create a custom attribute like `hs-request-interceptor` that points to a function to be executed before the HTTP request is made. This interceptor function can be used to modify the request data or headers dynamically.

5. **Response Interceptors**: Introduce a custom attribute like `hs-response-interceptor` that points to a function to be executed after the HTTP response is received. This interceptor function can handle the response data before it is passed to the view.

6. **Data Binding**: Enable data binding for input elements. Users can set a custom attribute like `hs-bind` on input elements and specify the key that corresponds to the data to be sent in the request payload.

7. **Response Validation**: Implement a custom attribute like `hs-validate` that takes a regular expression to validate the response data before updating the view. This can help ensure that the received data meets certain criteria before rendering it.

8. **Request Cancellation**: Allow users to cancel an ongoing request by introducing a custom attribute like `hs-cancelable`. This can be useful in scenarios where users want to prevent a request from completing if certain conditions are met.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributions

Contributions are welcome! If you find any issues or have suggestions, please open an issue or create a pull request.

## Disclaimer

AHAX is a lightweight library created for educational purposes and small-scale projects. While it can be used for simple HTTP requests, for more complex applications, consider using established AJAX libraries or frameworks like Axios, Fetch API, or jQuery.
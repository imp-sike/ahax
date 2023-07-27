# AHAX (Achronomous HTML and XML)

AHAX is a lightweight JavaScript library that provides a simple way to handle HTTP requests, supporting GET, POST, DELETE, and UPDATE operations. It allows you to make asynchronous HTTP calls and update your HTML content dynamically without reloading the page. AHAX simplifies the process of making AJAX requests and updating your views with the response data.

## Getting Started

To use AHAX in your project, follow these simple steps:

1. Download the `ahax.js` file and place it in your project directory.

2. Include the `ahax.js` script in your HTML file, just before the closing `</body>` tag:

   ```html
   <script src="./path/to/ahax.js"></script>
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

### Supported Attributes

- `hs-method`: Specifies the HTTP method (GET, POST, DELETE, PUT).
- `hs-path`: The URL for the HTTP request.
- `hs-target`: The HTML element where the response will be displayed.
- `hs-loader`: The HTML element used as a loader during the HTTP request.
- `hs-interceptor`: The name of the function to be used as an interceptor for custom view updates.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributions

Contributions are welcome! If you find any issues or have suggestions, please open an issue or create a pull request.

## Disclaimer

AHAX is a lightweight library created for educational purposes and small-scale projects. While it can be used for simple HTTP requests, for more complex applications, consider using established AJAX libraries or frameworks like Axios, Fetch API, or jQuery.
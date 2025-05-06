const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
const mongoUri =
  "mongodb+srv://emanuelawol2023:XZqR987lkOYSBXId@cluster0.cylq50p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/api", (req, res) => {
  res.json({
    message: "API is running successfully!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/db-status", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;

  res.json({
    status: isConnected ? "connected" : "disconnected",
    dbState: mongoose.connection.readyState,
    timestamp: new Date().toISOString(),
    message: isConnected
      ? "Successfully connected to MongoDB"
      : "Not connected to MongoDB",
  });
});

app.post("/api/echo", (req, res) => {
  res.json({
    received: req.body,
    timestamp: new Date().toISOString(),
    success: true,
  });
});

// Create a simple HTML test page
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f5f5f5;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }
        .result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 4px;
        }
        .success {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        .error {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        button {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 4px;
        }
        pre {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <h1>API Test Page</h1>
    <p>This page tests the connection to the backend API.</p>
    
    <div class="container">
        <h2>Test API Endpoint</h2>
        <button id="testApiButton">Test API</button>
        <div id="apiResult" class="result" style="display: none;"></div>
    </div>

    <div class="container">
        <h2>Test DB Status</h2>
        <button id="testDbButton">Test DB Connection</button>
        <div id="dbResult" class="result" style="display: none;"></div>
    </div>

    <div class="container">
        <h2>Test POST Request</h2>
        <form id="postForm">
            <div style="margin-bottom: 10px;">
                <label for="name">Name:</label>
                <input type="text" id="name" required style="width: 100%; padding: 8px; margin-top: 5px;">
            </div>
            <div style="margin-bottom: 10px;">
                <label for="value">Value:</label>
                <input type="text" id="value" required style="width: 100%; padding: 8px; margin-top: 5px;">
            </div>
            <button type="submit">Send POST Request</button>
        </form>
        <div id="postResult" class="result" style="display: none;"></div>
    </div>

    <script>
        // Test API
        document.getElementById('testApiButton').addEventListener('click', async () => {
            const resultDiv = document.getElementById('apiResult');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = 'Loading...';
            resultDiv.className = 'result';
            
            try {
                const response = await fetch('/api');
                
                if (!response.ok) {
                    throw new Error(\`HTTP error! Status: \${response.status}\`);
                }
                
                const data = await response.json();
                
                resultDiv.className = 'result success';
                resultDiv.innerHTML = \`
                    <h3>Success!</h3>
                    <p><strong>Message:</strong> \${data.message}</p>
                    <p><strong>Timestamp:</strong> \${new Date(data.timestamp).toLocaleString()}</p>
                    <h4>Raw Response:</h4>
                    <pre>\${JSON.stringify(data, null, 2)}</pre>
                \`;
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = \`
                    <h3>Error</h3>
                    <p>\${error.message}</p>
                    <p>Check the console for more details.</p>
                \`;
                console.error('API Error:', error);
            }
        });

        // Test DB Status
        document.getElementById('testDbButton').addEventListener('click', async () => {
            const resultDiv = document.getElementById('dbResult');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = 'Loading...';
            resultDiv.className = 'result';
            
            try {
                const response = await fetch('/api/db-status');
                
                if (!response.ok) {
                    throw new Error(\`HTTP error! Status: \${response.status}\`);
                }
                
                const data = await response.json();
                
                resultDiv.className = 'result success';
                resultDiv.innerHTML = \`
                    <h3>Success!</h3>
                    <p><strong>Status:</strong> \${data.status}</p>
                    <p><strong>Message:</strong> \${data.message}</p>
                    <p><strong>DB State:</strong> \${data.dbState}</p>
                    <p><strong>Timestamp:</strong> \${new Date(data.timestamp).toLocaleString()}</p>
                    <h4>Raw Response:</h4>
                    <pre>\${JSON.stringify(data, null, 2)}</pre>
                \`;
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = \`
                    <h3>Error</h3>
                    <p>\${error.message}</p>
                    <p>Check the console for more details.</p>
                \`;
                console.error('DB Error:', error);
            }
        });

        // Test POST Request
        document.getElementById('postForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const resultDiv = document.getElementById('postResult');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = 'Loading...';
            resultDiv.className = 'result';
            
            const name = document.getElementById('name').value;
            const value = document.getElementById('value').value;
            
            try {
                const response = await fetch('/api/echo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, value }),
                });
                
                if (!response.ok) {
                    throw new Error(\`HTTP error! Status: \${response.status}\`);
                }
                
                const data = await response.json();
                
                resultDiv.className = 'result success';
                resultDiv.innerHTML = \`
                    <h3>Success!</h3>
                    <p><strong>Received Data:</strong></p>
                    <pre>\${JSON.stringify(data, null, 2)}</pre>
                \`;
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = \`
                    <h3>Error</h3>
                    <p>\${error.message}</p>
                    <p>Check the console for more details.</p>
                \`;
                console.error('POST Error:', error);
            }
        });

        // Auto-test on page load
        window.addEventListener('load', () => {
            document.getElementById('testApiButton').click();
            document.getElementById('testDbButton').click();
        });
    </script>
</body>
</html>
`;

// Serve the HTML test page
app.get("/test", (req, res) => {
  res.send(html);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`API available at http://localhost:${port}/api`);
  console.log(`Test page available at http://localhost:${port}/test`);
});

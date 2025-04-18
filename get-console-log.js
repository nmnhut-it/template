const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');

// Configuration
const PORT = 3000;
const WAIT_TIME_MS = 3000; // Wait time in milliseconds

// Create a server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  
  // If path is '/', serve index.html if it exists, otherwise directory listing
  if (pathname === '/') {
    if (fs.existsSync(path.join(process.cwd(), 'index.html'))) {
      pathname = '/index.html';
    } else {
      // Simple directory listing
      const files = fs.readdirSync(process.cwd());
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <head><title>Directory Listing</title></head>
          <body>
            <h1>Directory Listing</h1>
            <ul>
              ${files.map(file => `<li><a href="/${file}">${file}</a></li>`).join('')}
            </ul>
            <script>
              console.log('Browser console log: Page loaded at', new Date().toISOString());
              console.log('Directory listing rendered with ${files.length} files');
            </script>
          </body>
        </html>
      `);
      return;
    }
  }

  // Resolve file path
  const filePath = path.join(process.cwd(), pathname);
  
  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    // If it's a directory, return directory listing
    if (stats.isDirectory()) {
      const files = fs.readdirSync(filePath);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <head><title>Directory Listing - ${pathname}</title></head>
          <body>
            <h1>Directory Listing - ${pathname}</h1>
            <ul>
              <li><a href="${pathname === '/' ? '' : pathname}/..">..</a></li>
              ${files.map(file => `<li><a href="${path.join(pathname, file)}">${file}</a></li>`).join('')}
            </ul>
            <script>
              console.log('Browser console log: Directory page loaded at', new Date().toISOString());
              console.log('Subdirectory listing rendered with ${files.length} files');
            </script>
          </body>
        </html>
      `);
      return;
    }

    // Read file and serve it
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      // Get file extension and set content type
      const ext = path.extname(filePath).toLowerCase();
      let contentType = 'text/plain';
      
      switch (ext) {
        case '.html':
          contentType = 'text/html';
          break;
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.gif':
          contentType = 'image/gif';
          break;
      }

      // If it's HTML, inject script tag with console.log
      if (contentType === 'text/html') {
        let htmlContent = data.toString();
        // Inject console.log before closing body tag if it exists
        if (htmlContent.includes('</body>')) {
          htmlContent = htmlContent.replace('</body>', `
            <script>
              console.log('Browser console log: Page "${pathname}" loaded at', new Date().toISOString());
              console.log('Content type: ${contentType}');
              console.log('File size: ${stats.size} bytes');
            </script>
            </body>
          `);
        } else {
          // Otherwise append to the end
          htmlContent += `
            <script>
              console.log('Browser console log: Page "${pathname}" loaded at', new Date().toISOString());
              console.log('Content type: ${contentType}');
              console.log('File size: ${stats.size} bytes');
            </script>
          `;
        }
        data = Buffer.from(htmlContent);
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

// Function to launch browser, visit page, and capture console logs
async function launchBrowserAndGetLogs() {
  console.log('Launching headless browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Collect console logs
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`${msg.type()}: ${msg.text()}`);
  });

  // Navigate to our server
  try {
    console.log('Navigating to http://localhost:' + PORT);
    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: 'networkidle0',
      timeout: 10000
    });
    
    // Wait for the specified time to collect any additional logs
    console.log(`Waiting for ${WAIT_TIME_MS / 1000} seconds to collect logs...`);
    await new Promise(resolve => setTimeout(resolve, WAIT_TIME_MS));
    
    // Return the collected logs
    console.log('\nBrowser Console Logs:');
    consoleLogs.forEach(log => console.log(log));
  } catch (error) {
    console.error('Error navigating with Puppeteer:', error);
  } finally {
    // Close the browser
    await browser.close();
    console.log('Browser closed');
    
    // Shutdown server
    server.close(() => {
      console.log('Server has been shut down');
    });
  }
}

// Start the server
server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  
  // Run the browser and get logs
  await launchBrowserAndGetLogs();
});
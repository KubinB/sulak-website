# Local Server Setup for Šulak Website

## Quick Start Options

### Option 1: Python HTTP Server (Easiest)
```bash
# Navigate to website directory
cd h:\Sulak\sulak-website

# Python 3 (recommended)
python -m http.server 8000

# Python 2 (if needed)
python -m SimpleHTTPServer 8000
```
Then open: **http://localhost:8000**

### Option 2: VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Automatically opens in browser with hot reload

### Option 3: Node.js http-server
```bash
# Install globally
npm install -g http-server

# Run in website directory
http-server -p 8000
```

### Option 4: PHP Built-in Server
```bash
php -S localhost:8000
```

## How It Works

1. **Start local server** (any option above)
2. **Open http://localhost:8000** in browser
3. **JavaScript automatically loads** each section from `sections/` folder
4. **Edit any section file** and refresh to see changes

# Save this as install.ps1
Write-Host "Starting installation process..." -ForegroundColor Green

# Install packages in current directory
Write-Host "Installing packages in current directory..." -ForegroundColor Cyan
npm install

# Change directory and install again
Write-Host "Changing directory to img-size-mcp..." -ForegroundColor Cyan
if (Test-Path -Path "./img-size-mcp") {
    Push-Location -Path "./img-size-mcp"
    npm install
    Pop-Location
} else {
    Write-Host "Error: img-size-mcp directory not found!" -ForegroundColor Red
}

Write-Host "Installation completed successfully!" -ForegroundColor Green
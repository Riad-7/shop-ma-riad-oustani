$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$backendRoot = Join-Path $root 'backend'
$frontendLogsDir = Join-Path $root 'logs'
$backendLogsDir = Join-Path $backendRoot 'logs'

New-Item -ItemType Directory -Force -Path $frontendLogsDir | Out-Null
New-Item -ItemType Directory -Force -Path $backendLogsDir | Out-Null

function Test-PortOpen {
  param(
    [int]$Port
  )

  $client = New-Object System.Net.Sockets.TcpClient
  try {
    $client.Connect('localhost', $Port)
    return $true
  } catch {
    return $false
  } finally {
    $client.Dispose()
  }
}

function Start-ServiceProcess {
  param(
    [string]$Name,
    [string]$WorkingDirectory,
    [string]$Command,
    [string]$LogPath,
    [int]$Port
  )

  if (Test-PortOpen -Port $Port) {
    Write-Host "[$Name] already running on port $Port"
    return
  }

  $escapedWorkingDirectory = $WorkingDirectory.Replace("'", "''")
  $escapedLogPath = $LogPath.Replace("'", "''")
  $wrappedCommand = "Set-Location '$escapedWorkingDirectory'; $Command *> '$escapedLogPath'"

  Start-Process -FilePath powershell `
    -ArgumentList '-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', $wrappedCommand `
    -WindowStyle Hidden

  Start-Sleep -Seconds 2

  if (Test-PortOpen -Port $Port) {
    Write-Host "[$Name] started on port $Port"
  } else {
    Write-Warning "[$Name] did not start correctly. Check $LogPath"
  }
}

if (-not (Test-PortOpen -Port 27017)) {
  Write-Warning 'MongoDB is not reachable on localhost:27017'
}

if (-not (Test-PortOpen -Port 5672)) {
  Write-Warning 'RabbitMQ is not reachable on localhost:5672'
}

Start-ServiceProcess `
  -Name 'auth-service' `
  -WorkingDirectory $backendRoot `
  -Command 'node services/auth-service/src/server.js' `
  -LogPath (Join-Path $backendLogsDir 'auth-service.log') `
  -Port 4001

Start-ServiceProcess `
  -Name 'catalog-service' `
  -WorkingDirectory $backendRoot `
  -Command 'node services/catalog-service/src/server.js' `
  -LogPath (Join-Path $backendLogsDir 'catalog-service.log') `
  -Port 4002

Start-ServiceProcess `
  -Name 'communication-service' `
  -WorkingDirectory $backendRoot `
  -Command 'node services/communication-service/src/server.js' `
  -LogPath (Join-Path $backendLogsDir 'communication-service.log') `
  -Port 4003

Start-ServiceProcess `
  -Name 'api-gateway' `
  -WorkingDirectory $root `
  -Command 'node backend/api-gateway/src/server.js' `
  -LogPath (Join-Path $backendLogsDir 'api-gateway.log') `
  -Port 8080

Start-ServiceProcess `
  -Name 'frontend' `
  -WorkingDirectory $root `
  -Command 'npm run dev -- --host 0.0.0.0' `
  -LogPath (Join-Path $frontendLogsDir 'frontend.log') `
  -Port 5173

Write-Host ''
Write-Host 'Project ready:'
Write-Host 'Frontend: http://localhost:5173'
Write-Host 'API Gateway: http://localhost:8080'
Write-Host 'Admin login: admin@shop.ma / 123456'
Write-Host ''
Write-Host "Frontend log: $($frontendLogsDir)\frontend.log"
Write-Host "Backend logs: $backendLogsDir"

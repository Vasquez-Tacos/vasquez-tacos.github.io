# Local preview server for the Vasquez Tacos site.
# Run:  powershell -ExecutionPolicy Bypass -File serve.ps1   then open http://localhost:8080
param([int]$Port = 8080)

$root = $PSScriptRoot
$types = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8"; ".js" = "text/javascript; charset=utf-8"
  ".png" = "image/png"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".webp" = "image/webp"
  ".svg" = "image/svg+xml"; ".gif" = "image/gif"; ".avif" = "image/avif"; ".mp4" = "video/mp4"; ".m4v" = "video/mp4"; ".mov" = "video/quicktime"; ".webm" = "video/webm"; ".ico" = "image/x-icon"; ".json" = "application/json"; ".md" = "text/plain; charset=utf-8"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Vasquez Tacos preview running at http://localhost:$Port  (Ctrl+C to stop)"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $res = $ctx.Response
    # One bad request (e.g. a browser cancelling a video download) must not stop the server
    try {
      $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart("/"))
      if ($path -eq "") { $path = "index.html" }
      $file = [IO.Path]::GetFullPath((Join-Path $root $path))
      if ($file.StartsWith($root) -and (Test-Path $file -PathType Leaf)) {
        $bytes = [IO.File]::ReadAllBytes($file)
        $ext = [IO.Path]::GetExtension($file).ToLower()
        $res.ContentType = if ($types[$ext]) { $types[$ext] } else { "application/octet-stream" }
        $res.Headers.Add("Cache-Control", "no-store")
        $res.Headers.Add("Accept-Ranges", "bytes")
        $start = 0; $end = $bytes.Length - 1
        # Videos are requested in pieces (byte ranges) so they can stream and seek
        $range = $ctx.Request.Headers["Range"]
        if ($range -match '^bytes=(\d*)-(\d*)$') {
          if ($Matches[1]) { $start = [long]$Matches[1] }
          if ($Matches[2]) { $end = [math]::Min([long]$Matches[2], $bytes.Length - 1) }
          if (-not $Matches[1] -and $Matches[2]) { $start = $bytes.Length - [long]$Matches[2]; $end = $bytes.Length - 1 }
          $res.StatusCode = 206
          $res.Headers.Add("Content-Range", "bytes $start-$end/$($bytes.Length)")
        }
        $res.ContentLength64 = $end - $start + 1
        $res.OutputStream.Write($bytes, [int]$start, [int]($end - $start + 1))
      } else {
        $res.StatusCode = 404
      }
    } catch {
      # client disconnected mid-transfer; keep serving
    } finally {
      try { $res.Close() } catch { }
    }
  }
} finally {
  $listener.Stop()
}

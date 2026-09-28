# Convert phone videos (e.g. from OneDrive) into small web videos for the site.
# Run:  powershell -ExecutionPolicy Bypass -File add-videos.ps1 "C:\path\to\folder\with\videos"
# Each video becomes media/<name>.mp4 plus a matching .jpg preview.
# Rename the output files to describe them (e.g. wedding-taco-bar.mp4) and the
# gallery uses that as the caption. Then push to GitHub and they appear on the site.
param([Parameter(Mandatory)][string]$Folder)

$ff = (Get-Command ffmpeg -ErrorAction SilentlyContinue).Source
if (-not $ff) {
  $ff = Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Recurse -Filter ffmpeg.exe -ErrorAction SilentlyContinue |
    Select-Object -First 1 -ExpandProperty FullName
}
if (-not $ff) { Write-Host "FFmpeg not found. Install it with: winget install Gyan.FFmpeg" -ForegroundColor Red; exit 1 }

$out = Join-Path $PSScriptRoot "media"
New-Item -ItemType Directory -Force $out | Out-Null

Get-ChildItem -LiteralPath $Folder -File | Where-Object { $_.Extension -match '^\.(mov|mp4|m4v|avi|webm)$' } | ForEach-Object {
  $name = ($_.BaseName -replace '[^\w\-]+', '-').ToLower()
  $dst = Join-Path $out "$name.mp4"
  if (Test-Path $dst) { Write-Host "skip  $name (already added)"; return }
  & $ff -v error -y -i $_.FullName `
    -vf "scale='min(720,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2" `
    -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k -ac 2 $dst
  & $ff -v error -y -ss 1 -i $dst -frames:v 1 -vf "scale='min(720,iw)':-2" -q:v 4 (Join-Path $out "$name.jpg")
  Write-Host ("added {0} ({1} MB)" -f "$name.mp4", [math]::Round((Get-Item $dst).Length / 1MB, 1))
}

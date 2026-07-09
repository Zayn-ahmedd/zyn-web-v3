Add-Type -AssemblyName System.Drawing
$srcPath = Join-Path $PSScriptRoot "src/assets/zynovax-logo.png"
$src = [System.Drawing.Image]::FromFile($srcPath)

function Resize-Image {
    param(
        [System.Drawing.Image]$srcImage,
        [int]$width,
        [int]$height,
        [string]$destPath
    )
    $dest = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($srcImage, 0, 0, $width, $height)
    $dest.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $dest.Dispose()
}

$publicDir = Join-Path $PSScriptRoot "public"
if (-not (Test-Path $publicDir)) {
    New-Item -ItemType Directory -Path $publicDir -Force | Out-Null
}

Resize-Image $src 32 32 (Join-Path $publicDir "favicon-32x32.png")
Resize-Image $src 192 192 (Join-Path $publicDir "favicon-192x192.png")
Resize-Image $src 180 180 (Join-Path $publicDir "apple-touch-icon.png")
Resize-Image $src 48 48 (Join-Path $publicDir "favicon.png")

$src.Dispose()
Write-Host "Favicons generated successfully!"

Add-Type -AssemblyName System.Drawing
$root = "C:\Users\Administrator\.cursor\projects\c-Users-Administrator-Documents-cassator\assets"
$out = "C:\Users\Administrator\Documents\cassator\assets"
# Source squares are 1024. Crop keeps every portrait full-bleed with a similar face width.
$items = @(
  @{ Name = "Tal Shahar.jpg"; File = "tal-shahar-team.jpg"; Left = 123; Top = 42; Size = 778 },
  @{ Name = "Maryna Shabelnykova.jpg"; File = "maryna-shabelnykova-team.jpg"; Left = 0; Top = 0; Size = 1024 },
  @{ Name = "Roman Kotyk.jpg"; File = "roman-kotyk-team.jpg"; Left = 142; Top = 88; Size = 740 },
  @{ Name = "Yaroslav Boichuk.jpg"; File = "yaroslav-boichuk-team.jpg"; Left = 123; Top = 34; Size = 778 }
)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
foreach ($item in $items) {
  $src = [System.Drawing.Image]::FromFile((Join-Path $root $item.File))
  $bmp = New-Object System.Drawing.Bitmap 1000, 1000
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $destRect = New-Object System.Drawing.Rectangle 0, 0, 1000, 1000
  $srcRect = New-Object System.Drawing.Rectangle $item.Left, $item.Top, $item.Size, $item.Size
  $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); $src.Dispose()
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]92)
  $bmp.Save((Join-Path $out $item.Name), $codec, $ep)
  $bmp.Dispose()
  Write-Output ("wrote " + $item.Name)
}

Add-Type -AssemblyName System.Drawing
$size = 64
$bmp = New-Object System.Drawing.Bitmap $size, $size
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::FromArgb(255, 7, 16, 24))
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 228, 208, 164)), 2
$scale = $size / 80.0
function P($x, $y) { return New-Object System.Drawing.PointF (($x * $scale), ($y * $scale)) }
$lines = @(
  @(16,42,34,18), @(34,18,54,38), @(54,38,40,56), @(40,56,20,52), @(20,52,16,42),
  @(34,18,60,12), @(54,38,68,34), @(40,56,62,64),
  @(60,12,68,34), @(68,34,62,64), @(62,64,46,70), @(20,52,46,70)
)
foreach ($ln in $lines) {
  $g.DrawLine($pen, (P $ln[0] $ln[1]), (P $ln[2] $ln[3]))
}
$brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 243, 230, 204))
foreach ($dot in @(
  @(16,42), @(34,18), @(54,38), @(40,56), @(20,52), @(60,12), @(68,34), @(62,64), @(46,70)
)) {
  $p = P $dot[0] $dot[1]
  $g.FillEllipse($brush, ($p.X - 2.2), ($p.Y - 2.2), 4.4, 4.4)
}
$g.Dispose()
$bmp.Save("C:\Users\Administrator\Documents\cassator\assets\erax-favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "favicon"

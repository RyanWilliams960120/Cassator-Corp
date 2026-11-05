Add-Type -AssemblyName System.Drawing
$srcPath = "C:\Users\Administrator\Documents\cassator\assets\erax-eagle.jpg"
$dstPath = "C:\Users\Administrator\Documents\cassator\assets\erax-eagle.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$out = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$outData = $out.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bytes = $srcData.Stride * $h
$buffer = New-Object byte[] $bytes
[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $buffer, 0, $bytes)
$bgB = $buffer[0]; $bgG = $buffer[1]; $bgR = $buffer[2]
for ($i = 0; $i -lt $bytes; $i += 4) {
  $b = $buffer[$i]
  $g = $buffer[$i + 1]
  $r = $buffer[$i + 2]
  $dist = [Math]::Abs($r - $bgR) + [Math]::Abs($g - $bgG) + [Math]::Abs($b - $bgB)
  $alpha = 255
  if ($dist -lt 36) { $alpha = 0 }
  elseif ($dist -lt 78) { $alpha = [int](($dist - 36) * 255 / 42) }
  $buffer[$i + 3] = [byte]$alpha
}
[System.Runtime.InteropServices.Marshal]::Copy($buffer, 0, $outData.Scan0, $bytes)
$src.UnlockBits($srcData)
$out.UnlockBits($outData)
$out.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose()
$out.Dispose()
Write-Output "wrote png"

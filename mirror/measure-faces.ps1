Add-Type -AssemblyName System.Drawing
function Measure-Face([string]$path) {
  $src = [System.Drawing.Image]::FromFile($path)
  $bmp = New-Object System.Drawing.Bitmap 1024, 1024
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.DrawImage($src, 0, 0, 1024, 1024)
  $g.Dispose(); $src.Dispose()
  $minX = 1024; $maxX = 0; $minY = 1024; $maxY = 0; $n = 0; $sx = 0; $sy = 0
  for ($y = 0; $y -lt 1024; $y += 2) {
    for ($x = 0; $x -lt 1024; $x += 2) {
      $c = $bmp.GetPixel($x, $y)
      $max = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
      $min = [Math]::Min($c.R, [Math]::Min($c.G, $c.B))
      $skin = ($c.R -gt 90 -and $c.G -gt 45 -and $c.B -gt 30 -and $c.R -gt $c.G -and $c.R -gt $c.B -and ($max - $min) -gt 18 -and $c.R -lt 230)
      if ($skin -and $y -lt 780 -and $x -gt 180 -and $x -lt 860) {
        if ($x -lt $minX) { $minX = $x }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($y -gt $maxY) { $maxY = $y }
        $n++; $sx += $x; $sy += $y
      }
    }
  }
  $bmp.Dispose()
  $name = Split-Path $path -Leaf
  if ($n -eq 0) { Write-Output "$name none"; return }
  $cx = [int]($sx / $n); $cy = [int]($sy / $n)
  Write-Output ("{0} n={1} box={2},{3} {4}x{5} center={6},{7}" -f $name, $n, $minX, $minY, ($maxX-$minX), ($maxY-$minY), $cx, $cy)
}
$root = "C:\Users\Administrator\.cursor\projects\c-Users-Administrator-Documents-cassator\assets"
Measure-Face "$root\tal-shahar-team.jpg"
Measure-Face "$root\maryna-shabelnykova-team.jpg"
Measure-Face "$root\roman-kotyk-team.jpg"
Measure-Face "$root\yaroslav-boichuk-team.jpg"

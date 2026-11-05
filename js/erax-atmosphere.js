/* Deep-space mesh, subtle pointer particles, and the hero eagle.
   One animation loop. Still when the tab is hidden or motion is reduced. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;
  var pointer = { x: 0.5, y: 0.42, active: false };
  var smooth = { x: 0.5, y: 0.42 };

  function onPointer(event) {
    pointer.x = event.clientX / Math.max(window.innerWidth, 1);
    pointer.y = event.clientY / Math.max(window.innerHeight, 1);
    pointer.active = true;
  }

  if (fine && !reduce) {
    window.addEventListener("pointermove", onPointer, { passive: true });
  }

  function mountSpace() {
    if (document.querySelector(".erax-space")) return null;
    var canvas = document.createElement("canvas");
    canvas.className = "erax-space";
    canvas.setAttribute("aria-hidden", "true");
    document.body.insertBefore(canvas, document.body.firstChild);
    var ctx = canvas.getContext("2d", { alpha: true });
    var width = 0;
    var height = 0;
    var dpr = 1;
    var nodes = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = width < 800 ? 18 : 32;
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.3 + 0.4
        });
      }
    }

    function draw(shiftX, shiftY) {
      ctx.clearRect(0, 0, width, height);
      var sky = ctx.createRadialGradient(width * 0.72, height * 0.28, 40, width * 0.5, height * 0.5, width * 0.75);
      sky.addColorStop(0, "#16243f");
      sky.addColorStop(0.45, "#0c1628");
      sky.addColorStop(1, "#071018");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(shiftX, shiftY);
      var reach = width < 800 ? 110 : 150;
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j];
          var dx = a.x - b.x;
          var dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < reach) {
            ctx.strokeStyle = "rgba(228,208,164," + ((1 - dist / reach) * 0.22).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(243,230,204,0.75)";
      for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (pointer.active && fine) {
        var px = pointer.x * width - shiftX;
        var py = pointer.y * height - shiftY;
        var glow = ctx.createRadialGradient(px, py, 0, px, py, 90);
        glow.addColorStop(0, "rgba(228,208,164,0.16)");
        glow.addColorStop(1, "rgba(228,208,164,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, 90, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function step() {
      if (!reduce) {
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }
      }
      smooth.x += (pointer.x - smooth.x) * 0.06;
      smooth.y += (pointer.y - smooth.y) * 0.06;
      var shiftX = reduce ? 0 : (smooth.x - 0.5) * 16;
      var shiftY = reduce ? 0 : (smooth.y - 0.5) * 10;
      draw(shiftX, shiftY);
    }

    resize();
    step();
    window.addEventListener("resize", function () {
      resize();
      step();
    });
    return { step: step };
  }

  function mountEagle() {
    var bird = document.querySelector(".hero_bird");
    if (!bird || bird.querySelector(".erax-eagle")) return null;
    var img = document.createElement("img");
    img.className = "erax-eagle";
    img.alt = "";
    img.src = "/assets/erax-eagle.png";
    img.width = 1024;
    img.height = 1024;
    bird.appendChild(img);

    var field = document.createElement("canvas");
    field.className = "erax-eagle-field";
    field.setAttribute("aria-hidden", "true");
    bird.appendChild(field);
    var ctx = field.getContext("2d");
    var sparks = [];

    function sizeField() {
      var rect = bird.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      field.width = Math.max(1, Math.floor(rect.width * dpr));
      field.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sparks = [];
      var count = rect.width < 480 ? 16 : 28;
      for (var i = 0; i < count; i++) {
        sparks.push({
          x: Math.random(),
          y: Math.random(),
          s: Math.random() * 1.4 + 0.4,
          p: Math.random() * Math.PI * 2
        });
      }
    }

    function drawEagle() {
      var rect = bird.getBoundingClientRect();
      if (!rect.width) return;
      ctx.clearRect(0, 0, rect.width, rect.height);
      var ox = reduce ? 0 : (smooth.x - 0.5) * 14;
      var oy = reduce ? 0 : (smooth.y - 0.5) * 10;
      img.style.transform = "translate3d(" + ox.toFixed(2) + "px," + oy.toFixed(2) + "px,0)";
      ctx.fillStyle = "rgba(243,230,204,0.8)";
      for (var i = 0; i < sparks.length; i++) {
        var spark = sparks[i];
        if (!reduce) spark.p += 0.008;
        var x = spark.x * rect.width + Math.cos(spark.p) * 6;
        var y = spark.y * rect.height + Math.sin(spark.p) * 5;
        ctx.globalAlpha = 0.35 + (Math.sin(spark.p) + 1) * 0.2;
        ctx.beginPath();
        ctx.arc(x, y, spark.s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    sizeField();
    window.addEventListener("resize", sizeField);
    return { draw: drawEagle };
  }

  function boot() {
    var space = mountSpace();
    var eagle = mountEagle();
    if (reduce) return;
    var running = true;
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) frame();
    });
    function frame() {
      if (!running) return;
      if (space) space.step();
      if (eagle) eagle.draw();
      window.requestAnimationFrame(frame);
    }
    frame();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

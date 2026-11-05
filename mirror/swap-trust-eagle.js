const fs = require("fs");
const path = "trust-center.html";
let html = fs.readFileSync(path, "utf8");

const start = html.indexOf('<img src="https://cdn.prod.website-files.com/6a05b20ea997c01d3bc68f2b/6a15f63808d5fc0425318eb7_Cassator.avif"');
const end = html.indexOf('class="principles_inner-img"/>', start);
if (start < 0 || end < 0) throw new Error("eagle image not found");
const tagEnd = end + 'class="principles_inner-img"/>'.length;
html = html.slice(0, start) + '<img src="/assets/erax-logo.svg" width="416" height="416" alt="" class="principles_inner-img"/>' + html.slice(tagEnd);

const motion = "img.style.transform = 'translate3d(' + transX + 'px,' + transY + 'px,0) rotateY(' + rotY + 'deg) rotateX(' + rotX + 'deg) rotateZ(' + rotZ + 'deg)';";
const spun = "var spin = (performance.now() % 42000) / 42000 * 360;\n      img.style.transform = 'translate3d(' + transX + 'px,' + transY + 'px,0) rotateY(' + rotY + 'deg) rotateX(' + rotX + 'deg) rotateZ(' + (rotZ + spin) + 'deg)';";
if (!html.includes(motion)) throw new Error("motion line missing");
html = html.replace(motion, spun);

const particle = '<script src="https://accipiter69.github.io/casator/ascii-particles.js" defer></script>';
const guard = `<script>(function(){function keep(){var cell=document.querySelector(".principles_inner-cell.sticky");if(!cell)return;cell.querySelectorAll("canvas").forEach(function(n){n.remove();});var img=cell.querySelector(".principles_inner-img");if(!img){img=document.createElement("img");img.className="principles_inner-img";img.width=416;img.height=416;img.alt="";cell.appendChild(img);}img.removeAttribute("srcset");img.removeAttribute("sizes");if(img.getAttribute("src")!=="/assets/erax-logo.svg")img.setAttribute("src","/assets/erax-logo.svg");}keep();var cell=document.querySelector(".principles_inner-cell.sticky");if(cell&&window.MutationObserver){var obs=new MutationObserver(keep);obs.observe(cell,{childList:true,subtree:true,attributes:true});setTimeout(function(){obs.disconnect();},6000);}})();</script>`;
if (!html.includes(particle)) throw new Error("particle script missing");
if (!html.includes("function keep()")) html = html.replace(particle, guard + particle);

html = html.replace("/css/erax-identity.css?v=10", "/css/erax-identity.css?v=11");
fs.writeFileSync(path, html);
console.log("patched", html.includes("/assets/erax-logo.svg"), html.includes("Cassator.avif"), html.includes("function keep()"));

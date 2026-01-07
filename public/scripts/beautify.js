// 初始化 particles.js 动态背景（轻量配置）
if (window.particlesJS) {
  particlesJS('particles-bg', {
    particles: {
      number: { value: 45 },
      color: { value: ["#7b61ff", "#00d4ff", "#ffd76b"] },
      shape: { type: "circle" },
      opacity: { value: 0.12 },
      size: { value: 3 },
      line_linked: { enable: false },
      move: { speed: 1, out_mode: "bounce" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
      modes: { grab: { distance: 150, line_linked: { opacity: .12 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
}

// 小屏幕禁用粒子以节省性能
function maybeDisableParticles() {
  const el = document.getElementById('particles-bg');
  if (!el) return;
  if (window.innerWidth <= 600) el.style.display = 'none';
  else el.style.display = 'block';
}
maybeDisableParticles();
window.addEventListener('resize', maybeDisableParticles);

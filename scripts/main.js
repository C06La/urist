document.addEventListener('DOMContentLoaded', () => {

  // 1. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('.theme-toggle__icon');
  const html = document.documentElement;

  // Проверка сохраненной темы
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    icon.textContent = '○'; // Пустой круг для темной темы
  } else {
    icon.textContent = '●'; // Закрашенный круг для светлой
  }

  themeToggle.addEventListener('click', () => {
    if (html.getAttribute('data-theme') === 'dark') {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      icon.textContent = '●';
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      icon.textContent = '○';
    }
  });

  // 2. АНИМАЦИЯ ПРИ СКРОЛЛЕ 
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Анимируем только один раз
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // 3. ОБРАБОТКА ФОРМЫ (Имитация)
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    
    // Имитация загрузки
    btn.textContent = 'Отправка...';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
      alert('Спасибо! Ваша заявка принята. Алексей свяжется с вами в ближайшее время.');
      form.reset();
      btn.textContent = originalText;
      btn.style.opacity = '1';
    }, 1500);
  });
});
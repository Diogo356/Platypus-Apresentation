/* script.js - Funcionalidades interativas para a landing page do Platypus */

document.addEventListener('DOMContentLoaded', () => {

    // Menu hambúrguer
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  
    // Rolagem suave e fechar menu mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        if(mobileMenu && !mobileMenu.classList.contains('hidden')){
          mobileMenu.classList.add('hidden');
        }
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Efeito Parallax na primeira seção
    const parallax = document.querySelector('.parallax-bg');
    if (parallax) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        // Desabilita o efeito em telas menores para melhor performance
        const isMobile = window.innerWidth <= 768;
        parallax.style.transform = `translateY(${isMobile ? 0 : scrollPosition * 0.4}px)`;
      });
    }
  
    // Animações de scroll
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    scrollElements.forEach(el => observer.observe(el));
  
    // Formulário com confetti e barra de progresso
    const signupButton = document.getElementById('signup-button');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
  
    signupButton.addEventListener('click', () => {
      const emailInput = document.getElementById('email-input');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (emailRegex.test(emailInput.value)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        const currentWidth = parseFloat(progressBar.style.width) || 70;
        const newWidth = Math.min(currentWidth + 5, 100);
        progressBar.style.width = `${newWidth}%`;
        progressText.textContent = newWidth < 100 ? `${newWidth}% do caminho para liberar a beta!` : 'Beta liberada! Bem-vindo(a)!';
  
        emailInput.value = '';
        emailInput.placeholder = 'Obrigado por se inscrever!';
      } else {
        emailInput.classList.remove('border-gray-700');
        emailInput.classList.add('border-red-500', 'animate-shake');
        emailInput.placeholder = 'Por favor, insira um e-mail válido.';
        
        setTimeout(() => {
          emailInput.classList.remove('border-red-500', 'animate-shake');
          emailInput.classList.add('border-gray-700');
          emailInput.placeholder = 'Seu e-mail';
        }, 3000);
      }
    });
  
    // FAQ interativa (Acordeão)
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('.faq-icon');
        
        const isHidden = content.classList.contains('hidden');
        
        if(isHidden) {
            content.classList.remove('hidden');
            icon.textContent = '-';
            icon.classList.add('rotate-180');
        } else {
            content.classList.add('hidden');
            icon.textContent = '+';
            icon.classList.remove('rotate-180');
        }
      });
    });
  });
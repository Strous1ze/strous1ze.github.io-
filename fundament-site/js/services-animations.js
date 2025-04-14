document.addEventListener('DOMContentLoaded', function() {
    // Анимация при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                const animation = element.getAttribute('data-animation');
                element.classList.add(animation);
            }
        });
    };

    // Запуск при загрузке и скролле
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Параллакс эффект для hero-секции
    const servicesHero = document.querySelector('.services-hero');
    if (servicesHero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            servicesHero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Интерактивные элементы
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.service-card__image img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.service-card__image img').style.transform = 'scale(1)';
        });
    });

    // Плавный скролл к услугам
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.services-list').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
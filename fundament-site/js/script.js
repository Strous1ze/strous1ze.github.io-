document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    if (window.innerWidth < 992) {
        header.prepend(mobileMenuBtn);
        nav.classList.add('mobile-menu');
    }
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
    
    // Callback modal
    const callbackBtns = document.querySelectorAll('.callback-btn');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__content">
            <button class="modal__close">&times;</button>
            <h3>Заказать звонок</h3>
            <form class="modal__form">
                <input type="text" placeholder="Ваше имя" required>
                <input type="tel" placeholder="Телефон" required>
                <button type="submit" class="btn btn--primary">Отправить</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    callbackBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modal.querySelector('.modal__close').addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here would be AJAX request to server
            const formData = new FormData(this);
            
            // Simulate successful submission
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            this.reset();
            
            // Close modal if it's open
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Add styles for mobile menu and modal
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            width: 30px;
            height: 20px;
            position: relative;
            cursor: pointer;
            margin-bottom: 15px;
        }
        
        .mobile-menu-btn span {
            display: block;
            position: absolute;
            height: 2px;
            width: 100%;
            background: var(--primary-color);
            left: 0;
            transition: all 0.3s;
        }
        
        .mobile-menu-btn span:nth-child(1) {
            top: 0;
        }
        
        .mobile-menu-btn span:nth-child(2) {
            top: 50%;
            transform: translateY(-50%);
        }
        
        .mobile-menu-btn span:nth-child(3) {
            bottom: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        .mobile-menu {
            display: none;
            width: 100%;
        }
        
        .mobile-menu.active {
            display: flex;
            flex-direction: column;
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 2000;
        }
        
        .modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal__content {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            position: relative;
            max-width: 500px;
            width: 90%;
        }
        
        .modal__close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            background: none;
            border: none;
            cursor: pointer;
        }
        
        .modal__form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .modal__form input {
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        @media (max-width: 992px) {
            .mobile-menu-btn {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
});
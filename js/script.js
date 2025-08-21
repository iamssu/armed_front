// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 네비게이션 스크롤 효과
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // 스크롤 시 네비게이션 바 스타일 변경
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark');
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });
    
    // 스무스 스크롤 및 액티브 링크 관리
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 드롭다운 토글 링크는 기본 동작 유지
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            e.preventDefault();
            
            // 모든 링크에서 active 클래스 제거
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 클릭된 링크에 active 클래스 추가
            this.classList.add('active');
            
            // 해당 섹션으로 스크롤
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // 네비게이션 바 높이만큼 조정
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 드롭다운 아이템 클릭 시 액티브 상태 관리
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            // 모든 드롭다운 아이템에서 active 클래스 제거
            dropdownItems.forEach(i => i.classList.remove('active'));
            
            // 클릭된 아이템에 active 클래스 추가
            this.classList.add('active');
        });
    });
    
    // 스크롤 위치에 따른 네비게이션 액티브 상태 업데이트
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
    
    // 폼 제출 처리
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 가져오기
            const formData = new FormData(this);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 간단한 유효성 검사
            if (!name || !email || !message) {
                showAlert('모든 필드를 입력해주세요.', 'danger');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('올바른 이메일 주소를 입력해주세요.', 'danger');
                return;
            }
            
            // 성공 메시지 표시 (실제로는 서버로 데이터를 보내야 함)
            showAlert('메시지가 성공적으로 전송되었습니다!', 'success');
            this.reset();
        });
    }
    
    // 이메일 유효성 검사 함수
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 알림 메시지 표시 함수
    function showAlert(message, type) {
        // 기존 알림 제거
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // 새 알림 생성
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // 5초 후 자동 제거
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    // 카드 애니메이션 효과
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // 버튼 클릭 효과
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 리플 효과 생성
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 리플 애니메이션 CSS 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 모바일 메뉴 토글 시 네비게이션 링크 클릭 시 메뉴 닫기
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992 && !this.classList.contains('dropdown-toggle')) { // 모바일에서만
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // 드롭다운 아이템 클릭 시 모바일 메뉴 닫기
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // 현재 페이지에 따른 네비게이션 액티브 상태 설정
    const currentPath = window.location.pathname;
    if (currentPath.includes('250821.html')) {
        const dropdownItem = document.querySelector('.dropdown-item[href*="250821.html"]');
        if (dropdownItem) {
            dropdownItem.classList.add('active');
        }
    } else if (currentPath.includes('250823.html')) {
        const dropdownItem = document.querySelector('.dropdown-item[href*="250823.html"]');
        if (dropdownItem) {
            dropdownItem.classList.add('active');
        }
    }
    
    // 페이지 로드 시 초기 설정
    console.log('Armed Front Picnic 웹사이트가 로드되었습니다!');
}); 
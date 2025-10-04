    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-dark/95', 'backdrop-blur-md', 'shadow-lg');
        navbar.classList.remove('bg-transparent');
        
        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100', 'visible');
      } else {
        navbar.classList.remove('bg-dark/95', 'backdrop-blur-md', 'shadow-lg');
        navbar.classList.add('bg-transparent');
        
        backToTop.classList.add('opacity-0', 'invisible');
        backToTop.classList.remove('opacity-100', 'visible');
      }
    });
    
    // 英雄轮播功能
    const heroCarousel = document.getElementById('heroCarousel');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const slides = document.querySelectorAll('.hero-slide');
    
    if (heroCarousel && prevSlide && nextSlide && indicators.length > 0 && slides.length > 0) {
      let currentSlide = 0;
      let autoSlideInterval;
      
      function updateSlide() {
        // 更新幻灯片显示
        slides.forEach((slide, index) => {
          if (index === currentSlide) {
            slide.classList.remove('hidden');
          } else {
            slide.classList.add('hidden');
          }
        });
        
        // 更新指示器
        indicators.forEach((indicator, index) => {
          if (index === currentSlide) {
            indicator.classList.remove('bg-white/30');
            indicator.classList.add('bg-white/60');
          } else {
            indicator.classList.remove('bg-white/60');
            indicator.classList.add('bg-white/30');
          }
        });
      }
      
      function nextSlideHandler() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
      }
      
      function prevSlideHandler() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
      }
      
      // 事件监听器
      prevSlide.addEventListener('click', prevSlideHandler);
      nextSlide.addEventListener('click', nextSlideHandler);
      
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
          currentSlide = index;
          updateSlide();
        });
      });
      
      // 自动轮播
      function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlideHandler, 5000);
      }
      
      function stopAutoSlide() {
        clearInterval(autoSlideInterval);
      }
      
      // 鼠标悬停时暂停自动轮播
      heroCarousel.addEventListener('mouseenter', stopAutoSlide);
      heroCarousel.addEventListener('mouseleave', startAutoSlide);
      
      // 触摸设备支持
      let touchStartX = 0;
      let touchEndX = 0;
      
      heroCarousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      });
      
      heroCarousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
      
      function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            nextSlideHandler(); // 向左滑动
          } else {
            prevSlideHandler(); // 向右滑动
          }
        }
      }
      
      // 初始化
      updateSlide();
      startAutoSlide();
    }
    
    // 移动端菜单
    const menuBtn = document.getElementById('menuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && closeMenu && mobileMenu) {
      const mobileMenuLinks = mobileMenu.querySelectorAll('a');
      
      menuBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('translate-x-full');
        document.body.classList.add('mobile-menu-open');
      });
      
      function closeMenuHandler() {
        mobileMenu.classList.add('translate-x-full');
        document.body.classList.remove('mobile-menu-open');
      }
      
      closeMenu.addEventListener('click', closeMenuHandler);
      
      mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenuHandler);
      });
      
      // 点击菜单外部关闭菜单
      mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
          closeMenuHandler();
        }
      });
    }
    
    // 返回顶部
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // 名言轮播功能已移除，因为HTML结构已改为网格布局
    // 检查是否存在轮播元素，避免错误
    const quoteCarousel = document.getElementById('quoteCarousel');
    if (quoteCarousel) {
        const prevQuote = document.getElementById('prevQuote');
        const nextQuote = document.getElementById('nextQuote');
        const indicators = document.querySelectorAll('[data-index]');
        let currentSlide = 0;
        const totalSlides = 4;
        
        function updateSlide() {
          quoteCarousel.querySelector('div').style.transform = `translateX(-${currentSlide * 100}%)`;
          
          // 更新指示器
          indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
              indicator.classList.add('bg-primary');
              indicator.classList.remove('bg-gray-300');
            } else {
              indicator.classList.remove('bg-primary');
              indicator.classList.add('bg-gray-300');
            }
          });
        }
        
        if (prevQuote && nextQuote) {
          prevQuote.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlide();
          });
          
          nextQuote.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlide();
          });
        }
        
        indicators.forEach((indicator, index) => {
          indicator.addEventListener('click', function() {
            currentSlide = index;
            updateSlide();
          });
        });
        
        // 自动轮播
        setInterval(function() {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateSlide();
        }, 5000);
    }
    
    // 数字计数动画 - 已移至data.js中实现，这里移除重复代码
    // 当元素进入视口时触发动画
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // 观察需要动画的元素
    document.querySelectorAll('.scroll-reveal, .counter').forEach(element => {
      observer.observe(element);
    });
    
    
    // 表单提交 - 检查是否存在联系表单
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 这里可以添加表单验证和提交逻辑
        alert('感谢您的留言！我们会尽快回复您。');
        contactForm.reset();
      });
    }
    
    // 历史时间线滚动动画
    function checkScroll() {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight - 100) {
          element.classList.add('active');
        }
      });
    }
    
    // 初始检查
    checkScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', checkScroll);
    
    // 历史时期筛选
    const periodFilters = document.querySelectorAll('.period-filter');
    const periodSections = document.querySelectorAll('[data-period]');
    const periodTitle = document.getElementById('period-title');
    
    if (periodFilters.length > 0 && periodSections.length > 0 && periodTitle) {
      periodFilters.forEach(filter => {
        filter.addEventListener('click', function() {
          // 移除所有激活状态
          periodFilters.forEach(f => {
            f.classList.remove('active');
          });
          
          // 添加当前激活状态
          this.classList.add('active');
          
          const period = this.getAttribute('data-period');
          
          // 更新标题
          if (period === 'all') {
            periodTitle.textContent = '全部历史时期';
          } else if (period === 'ancient') {
            periodTitle.textContent = '古代史 (约公元前2070年-公元581年)';
          } else if (period === 'medieval') {
            periodTitle.textContent = '中古史 (581年-1840年)';
          } else if (period === 'modern') {
            periodTitle.textContent = '近代史 (1840年-1949年)';
          } else if (period === 'contemporary') {
            periodTitle.textContent = '现代史 (1949年至今)';
          }
          
          // 显示/隐藏对应时期
          periodSections.forEach(section => {
            if (period === 'all' || section.getAttribute('data-period') === period) {
              section.style.display = 'block';
            } else {
              section.style.display = 'none';
            }
          });
        });
      });
    }
    
    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const eventCards = document.querySelectorAll('.event-card');
    
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      eventCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const year = card.getAttribute('data-year');
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || year.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
    
    // 时间线滑块导航
    const timelineSlider = document.getElementById('timeline-slider');
    
    timelineSlider.addEventListener('input', function() {
      const value = parseInt(this.value);
      let period;
      
      if (value < 25) {
        period = 'ancient';
      } else if (value < 50) {
        period = 'medieval';
      } else if (value < 75) {
        period = 'modern';
      } else {
        period = 'contemporary';
      }
      
      // 触发对应时期的点击事件
      document.querySelector(`.period-filter[data-period="${period}"]`).click();
      
      // 滚动到历史时间线部分
      document.getElementById('chinese-history').scrollIntoView({
        behavior: 'smooth'
      });
    });

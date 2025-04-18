document.addEventListener('DOMContentLoaded', () => {
    // 导航菜单切换 (移动端)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // 点击导航链接后关闭移动菜单
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    // 导航链接激活状态 & 平滑滚动
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;

    function setActiveLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Add some offset
            if (pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        // Handle home link separately if no section is active (top of page)
        if (currentSection === '' && pageYOffset < sections[0].offsetTop - headerHeight - 50) {
             const homeLink = document.querySelector('nav ul li a[href="#home"]');
             if(homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Initial check

    // 平滑滚动实现
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute.startsWith('#')) {
                e.preventDefault();
                const targetId = hrefAttribute.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // 游戏作品筛选
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameItems = document.querySelectorAll('.game-item');

    if (filterButtons.length > 0 && gameItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 更新按钮激活状态
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // 筛选游戏项目
                gameItems.forEach(item => {
                    const categories = item.getAttribute('data-category').split(' ');
                    if (filter === 'all' || categories.includes(filter)) {
                        item.style.display = 'block'; // 或者 'grid', 'flex' 等，取决于你的布局
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 联系表单提交处理 (简单示例)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // 阻止表单默认提交行为
            // 在这里可以添加发送表单数据的逻辑 (例如使用 fetch API)
            alert('感谢您的留言，我们会尽快与您联系！');
            contactForm.reset(); // 清空表单
        });
    }

    // 订阅表单提交处理 (简单示例)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            alert(`感谢订阅！邮件已发送至 ${emailInput.value}`);
            newsletterForm.reset();
        });
    }

});
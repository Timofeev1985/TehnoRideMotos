document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.toggle('open');
        this.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 448 && !navMenu.contains(e.target)) {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('active');
        }
    });

    navMenu.querySelectorAll('li:not(.menu-icon) a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 448) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 448) {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('active');
        }
    });
});
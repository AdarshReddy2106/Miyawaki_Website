const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');
const dropdownParents = document.querySelectorAll('.dropdown-parent');

// Toggle mobile menu with smooth animation
if (toggleBtn) {
    toggleBtn.onclick = function () {
        dropDownMenu.classList.toggle('open');
        const isOpen = dropDownMenu.classList.contains('open');

        // Change icon and prevent body scrolling when menu is open
        toggleBtnIcon.classList = isOpen 
            ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
}

// Handle dropdown submenu toggles on mobile
dropdownParents.forEach(parent => {
    const parentLink = parent.querySelector('a');
    if (parentLink) {
        parentLink.addEventListener('click', function(e) {
            // Only handle click for mobile view
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle the clicked dropdown
                parent.classList.toggle('open');
                
                // Optional: close other open dropdowns
                dropdownParents.forEach(item => {
                    if (item !== parent && item.classList.contains('open')) {
                        item.classList.remove('open');
                    }
                });
            }
        });
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    // Close mobile menu when clicking outside
    if (dropDownMenu && dropDownMenu.classList.contains('open')) {
        if (!e.target.closest('.dropdown_menu') && !e.target.closest('.toggle_btn')) {
            dropDownMenu.classList.remove('open');
            toggleBtnIcon.classList = 'fa-solid fa-bars';
            document.body.style.overflow = '';
        }
    }
});

// Close menu when a non-dropdown link is clicked
document.querySelectorAll('.dropdown_menu li:not(.dropdown-parent) a').forEach(link => {
    link.addEventListener('click', () => {
        if (dropDownMenu.classList.contains('open')) {
            dropDownMenu.classList.remove('open');
            toggleBtnIcon.classList = 'fa-solid fa-bars';
            document.body.style.overflow = '';
        }
    });
});
import { useNavigate } from 'react-router-dom';

export const scrollToSection = (sectionId, targetPage) => {
    const navigate = useNavigate();

    if (window.location.pathname !== targetPage) {
        // Navigate to the target page
        navigate(targetPage);
        // Wait for the page to load before scrolling
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            } else {
                console.warn(`Section with ID "${sectionId}" not found.`);
            }
        }, 100); // Adjust timeout as necessary
    } else {
        // If already on the target page, scroll to the section
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        } else {
            console.warn(`Section with ID "${sectionId}" not found.`);
        }
    }
}; 
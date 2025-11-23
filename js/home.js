
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            });




       
        }

        let count = 0;

        function addOne() {
            count += 1;
            updateCounter();
        }

        function removeOne() {
            if (count > 0) {
                count -= 1;
            }
            updateCounter();
        }

        function updateCounter() {
            document.getElementById('counter').textContent = count;
        }
        
//================================About Odisha==============================
document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.content-box');

    const checkBoxes = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        boxes.forEach((box, index) => {
            const boxTop = box.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                box.classList.add('visible');
            } else {
                box.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', checkBoxes);
    checkBoxes(); // Initial check
});
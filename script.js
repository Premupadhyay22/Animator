document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('lightCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let lightRays = [];
    let isMouseMoving = false;

    document.addEventListener('mousemove', (event) => {
        isMouseMoving = true;
        const { clientX: mouseX, clientY: mouseY } = event;

        for (let i = 0; i < 5; i++) {
            const lightRay = {
                x: mouseX,
                y: mouseY,
                radius: 0,
                alpha: 0.5, // Slightly darker
                speed: Math.random() * 2 + 1
            };

            lightRays.push(lightRay);
        }
    });

    function drawLightRays() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < lightRays.length; i++) {
            const ray = lightRays[i];

            ctx.beginPath();
            ctx.arc(ray.x, ray.y, ray.radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = `rgba(255, 255, 255, ${ray.alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            ray.radius += ray.speed;
            ray.alpha -= 0.01;

            if (ray.alpha <= 0) {
                lightRays.splice(i, 1);
                i--;
            }
        }

        if (isMouseMoving) {
            requestAnimationFrame(drawLightRays);
            isMouseMoving = false;
        } else {
            requestAnimationFrame(drawLightRays);
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    drawLightRays();
});
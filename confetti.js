// High Performance Particle & Confetti Engine for Forgiveness Celebration

class CuteConfetti {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.ambientParticles = [];
        this.ambientAnimationId = null;
        this.initCanvas();
    }

    initCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'cute-confetti-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
    }

    // Explode celebration confetti with hearts, ribbons, stars
    celebrate(x = window.innerWidth / 2, y = window.innerHeight / 2) {
        const colors = ['#FF4B72', '#FF8DA1', '#FFB6C1', '#FFD166', '#06D6A0', '#118AB2', '#FF70A6', '#FF9770'];
        const shapes = ['heart', 'circle', 'ribbon', 'star'];
        const count = 160;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 4 + Math.random() * 12;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - (Math.random() * 4 + 2),
                size: 8 + Math.random() * 14,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 12,
                opacity: 1,
                decay: 0.007 + Math.random() * 0.008,
                gravity: 0.28
            });
        }

        if (!this.animationId) {
            this.animate();
        }
    }

    // Shower flowers / petals
    showerPetals(x = window.innerWidth / 2, y = 100) {
        const petalColors = ['#FF9EAA', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7'];
        for (let i = 0; i < 40; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 200,
                y: y + (Math.random() - 0.5) * 50,
                vx: (Math.random() - 0.5) * 4,
                vy: 2 + Math.random() * 4,
                size: 10 + Math.random() * 12,
                color: petalColors[Math.floor(Math.random() * petalColors.length)],
                shape: 'petal',
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 6,
                opacity: 1,
                decay: 0.006 + Math.random() * 0.006,
                gravity: 0.08
            });
        }
        if (!this.animationId) {
            this.animate();
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;

            if (p.opacity <= 0 || p.y > window.innerHeight + 50) {
                this.particles.splice(i, 1);
                continue;
            }

            this.drawParticle(p);
        }

        if (this.particles.length > 0) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else {
            this.animationId = null;
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }

    drawParticle(p) {
        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.shape === 'heart') {
            this.drawHeart(0, 0, p.size, p.color);
        } else if (p.shape === 'petal') {
            this.drawPetal(0, 0, p.size, p.color);
        } else if (p.shape === 'star') {
            this.drawStar(0, 0, p.size, p.color);
        } else if (p.shape === 'ribbon') {
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    drawHeart(x, y, size, color) {
        const s = size / 2;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + s / 4);
        this.ctx.bezierCurveTo(x, y, x - s, y - s, x - s, y + s / 3);
        this.ctx.bezierCurveTo(x - s, y + s * 0.9, x, y + s * 1.3, x, y + s * 1.6);
        this.ctx.bezierCurveTo(x, y + s * 1.3, x + s, y + s * 0.9, x + s, y + s / 3);
        this.ctx.bezierCurveTo(x + s, y - s, x, y, x, y + s / 4);
        this.ctx.fill();
    }

    drawPetal(x, y, size, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, size * 0.6, size * 0.35, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawStar(x, y, size, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        const spikes = 5;
        const outer = size / 2;
        const inner = size / 4;
        let rot = (Math.PI / 2) * 3;
        let step = Math.PI / spikes;

        this.ctx.moveTo(x, y - outer);
        for (let i = 0; i < spikes; i++) {
            this.ctx.lineTo(x + Math.cos(rot) * outer, y + Math.sin(rot) * outer);
            rot += step;
            this.ctx.lineTo(x + Math.cos(rot) * inner, y + Math.sin(rot) * inner);
            rot += step;
        }
        this.ctx.lineTo(x, y - outer);
        this.ctx.closePath();
        this.ctx.fill();
    }

    // Ambient floating hearts in the background
    startAmbient() {
        const bgCanvas = document.getElementById('ambient-canvas');
        if (!bgCanvas) return;
        const bgCtx = bgCanvas.getContext('2d');

        const resizeBg = () => {
            const dpr = window.devicePixelRatio || 1;
            bgCanvas.width = window.innerWidth * dpr;
            bgCanvas.height = window.innerHeight * dpr;
            bgCtx.setTransform(1, 0, 0, 1, 0, 0);
            bgCtx.scale(dpr, dpr);
        };
        resizeBg();
        window.addEventListener('resize', resizeBg);

        const hearts = [];
        const count = 28;
        for (let i = 0; i < count; i++) {
            hearts.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: 8 + Math.random() * 14,
                speedY: 0.4 + Math.random() * 0.7,
                speedX: (Math.random() - 0.5) * 0.5,
                opacity: 0.2 + Math.random() * 0.35,
                color: ['#FF9EAA', '#FFB7B2', '#FFC8DD', '#FFAFCC'][Math.floor(Math.random() * 4)],
                swing: Math.random() * Math.PI * 2,
                swingSpeed: 0.02 + Math.random() * 0.02
            });
        }

        const renderAmbient = () => {
            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            for (let h of hearts) {
                h.y -= h.speedY;
                h.swing += h.swingSpeed;
                h.x += Math.sin(h.swing) * 0.6 + h.speedX;

                if (h.y < -30) {
                    h.y = bgCanvas.height + 20;
                    h.x = Math.random() * bgCanvas.width;
                }

                bgCtx.save();
                bgCtx.globalAlpha = h.opacity;
                this.drawHeartOnCtx(bgCtx, h.x, h.y, h.size, h.color);
                bgCtx.restore();
            }
            requestAnimationFrame(renderAmbient);
        };
        renderAmbient();
    }

    drawHeartOnCtx(ctx, x, y, size, color) {
        const s = size / 2;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x, y - s / 2, x - s, y - s / 2, x - s, y);
        ctx.bezierCurveTo(x - s, y + s / 2, x, y + s, x, y + s * 1.4);
        ctx.bezierCurveTo(x, y + s, x + s, y + s / 2, x + s, y);
        ctx.bezierCurveTo(x + s, y - s / 2, x, y - s / 2, x, y);
        ctx.fill();
    }
}

window.cuteConfetti = new CuteConfetti();

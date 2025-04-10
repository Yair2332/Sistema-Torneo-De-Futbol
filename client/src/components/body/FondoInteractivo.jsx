import { useEffect, useRef } from "react";

const FondoInteractivo = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouse = { x: width / 2, y: height / 2 };
    const density = 10; // menos partículas
    const radius = 50; // círculos más grandes
    const points = [];

    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.closest = [];
        this.circle = new Circle(this);
        this.opacity = 0;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      distanceTo(point) {
        return (this.x - point.x) ** 2 + (this.y - point.y) ** 2;
      }

      shift() {
        const duration = 5 + Math.random() * 5;
        const deltaX = (Math.random() - 0.5) * 100;
        const deltaY = (Math.random() - 0.5) * 100;

        const animate = () => {
          const startTime = performance.now();
          const startX = this.x;
          const startY = this.y;

          const step = (timestamp) => {
            const elapsed = (timestamp - startTime) / 1000;
            const t = Math.min(elapsed / duration, 1);
            this.x = startX + deltaX * t;
            this.y = startY + deltaY * t;

            if (t < 1) requestAnimationFrame(step);
            else this.shift();
          };

          requestAnimationFrame(step);
        };

        animate();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      drawLines() {
        for (let i = 0; i < this.closest.length; i++) {
          const other = this.closest[i];
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(80, 80, 80, ${this.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    class Circle {
      constructor(point) {
        this.point = point;
        this.opacity = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(80, 80, 80, ${this.opacity})`;
        ctx.fill();
      }
    }

    const createPoints = () => {
      for (let x = 0; x < width; x += width / density) {
        for (let y = 0; y < height; y += height / density) {
          const px = x + Math.random() * width / density;
          const py = y + Math.random() * height / density;
          points.push(new Point(px, py));
        }
      }

      points.forEach((p1) => {
        const closest = [];
        points.forEach((p2) => {
          if (p1 !== p2) {
            if (closest.length < 5) closest.push(p2);
            else {
              let maxDist = 0;
              let index = 0;
              for (let i = 0; i < closest.length; i++) {
                const dist = p1.distanceTo(closest[i]);
                if (dist > maxDist) {
                  maxDist = dist;
                  index = i;
                }
              }
              if (p1.distanceTo(p2) < maxDist) closest[index] = p2;
            }
          }
        });
        p1.closest = closest;
      });

      points.forEach((p) => p.shift());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      points.forEach((p) => {
        p.update();
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = dx * dx + dy * dy;
        const maxDist = 30000;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 5;
          p.y += Math.sin(angle) * force * 5;
          p.opacity = 0.6;
          p.circle.opacity = 0.8;
        } else {
          p.opacity = 0.2;
          p.circle.opacity = 0.3;
        }

        p.drawLines();
        p.circle.draw();
      });
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    createPoints();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        display: "block",
        background: "#aaaaaa",
      }}
    ></canvas>
  );
};

export default FondoInteractivo;

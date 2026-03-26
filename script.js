// ===== Three.js Scene Setup =====
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ===== Create Women/Figure Shapes =====
function createWomenFigure() {
    const group = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffb6c1,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.5;
    group.add(head);
    
    // Hair (flowing)
    const hairGeometry = new THREE.TorusGeometry(0.6, 0.15, 16, 50, Math.PI);
    const hairMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8b4513,
        shininess: 80
    });
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.y = 2.7;
    hair.rotation.x = Math.PI;
    group.add(hair);
    
    // Body/Torso
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.5, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff69b4,
        shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1;
    group.add(body);
    
    // Dress/Skirt
    const skirtGeometry = new THREE.ConeGeometry(0.8, 1.2, 32);
    const skirtMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xdb7093,
        shininess: 80
    });
    const skirt = new THREE.Mesh(skirtGeometry, skirtMaterial);
    skirt.position.y = 0.2;
    group.add(skirt);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1, 16);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffb6c1 });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.5, 1.3, 0);
    leftArm.rotation.z = 0.4;
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.5, 1.3, 0);
    rightArm.rotation.z = -0.4;
    group.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.2, 16);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0xffb6c1 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -0.4, 0);
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -0.4, 0);
    group.add(rightLeg);
    
    return group;
}

// ===== Create Butterfly =====
function createButterfly() {
    const group = new THREE.Group();
    
    // Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.quadraticCurveTo(0.5, 0.5, 0.3, 1);
    wingShape.quadraticCurveTo(0, 1.2, -0.3, 1);
    wingShape.quadraticCurveTo(-0.5, 0.5, 0, 0);
    
    const wingGeometry = new THREE.ShapeGeometry(wingShape);
    const wingMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff69b4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    
    // Left wing
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.scale.set(0.5, 0.5, 0.5);
    group.add(leftWing);
    
    // Right wing
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.scale.set(-0.5, 0.5, 0.5);
    group.add(rightWing);
    
    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.05, 0.3, 8, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x2d2d2d });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    group.add(body);
    
    // Antennae
    const antennaGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.2, 8);
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x2d2d2d });
    
    const leftAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    leftAntenna.position.set(-0.05, 0.2, 0);
    leftAntenna.rotation.z = -0.3;
    group.add(leftAntenna);
    
    const rightAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    rightAntenna.position.set(0.05, 0.2, 0);
    rightAntenna.rotation.z = 0.3;
    group.add(rightAntenna);
    
    return group;
}

// ===== Create Floating Particles =====
function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const pinkColors = [
        new THREE.Color(0xff69b4),
        new THREE.Color(0xffb6c1),
        new THREE.Color(0xdb7093),
        new THREE.Color(0xe6e6fa),
        new THREE.Color(0xc71585)
    ];
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        
        const color = pinkColors[Math.floor(Math.random() * pinkColors.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    return new THREE.Points(particlesGeometry, particlesMaterial);
}

// ===== Add Objects to Scene =====
const womenFigures = [];
const butterflies = [];

// Add multiple women figures
for (let i = 0; i < 3; i++) {
    const figure = createWomenFigure();
    figure.position.x = (i - 1) * 4;
    figure.position.y = -1;
    figure.position.z = -3;
    figure.scale.set(0.8, 0.8, 0.8);
    womenFigures.push(figure);
    scene.add(figure);
}

// Add butterflies
for (let i = 0; i < 15; i++) {
    const butterfly = createButterfly();
    butterfly.position.x = (Math.random() - 0.5) * 15;
    butterfly.position.y = (Math.random() - 0.5) * 10;
    butterfly.position.z = (Math.random() - 0.5) * 5;
    butterfly.userData = {
        speed: Math.random() * 0.02 + 0.01,
        amplitude: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2
    };
    butterflies.push(butterfly);
    scene.add(butterfly);
}

// Add particles
const particles = createParticles();
scene.add(particles);

// ===== Lighting =====
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff69b4, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xdb7093, 0.8, 100);
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 10, 5);
scene.add(directionalLight);

// ===== Camera Position =====
camera.position.z = 8;
camera.position.y = 1;

// ===== Animation Loop =====
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Animate women figures
    womenFigures.forEach((figure, index) => {
        figure.rotation.y = Math.sin(time * 0.5 + index) * 0.3;
        figure.position.y = -1 + Math.sin(time + index) * 0.2;
    });
    
    // Animate butterflies
    butterflies.forEach((butterfly, index) => {
        butterfly.position.x += Math.sin(time * 2 + butterfly.userData.phase) * 0.01;
        butterfly.position.y += Math.cos(time * 2 + butterfly.userData.phase) * 0.005;
        
        // Wing flapping
        const wingScale = 0.5 + Math.sin(time * 10 + index) * 0.1;
        butterfly.children[0].scale.y = wingScale;
        butterfly.children[1].scale.y = wingScale;
        
        // Rotate butterfly
        butterfly.rotation.y = Math.sin(time + butterfly.userData.phase) * 0.5;
    });
    
    // Animate particles
    particles.rotation.y = time * 0.05;
    particles.rotation.x = time * 0.02;
    
    // Move particles
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.002;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    
    renderer.render(scene, camera);
}

animate();

// ===== Handle Window Resize =====
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '';
    spans[2].style.transform = navLinks.classList.contains('active') 
        ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu
            navLinks.classList.remove('active');
        }
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    section.animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Skill Bar Animation =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-grid').forEach(grid => {
    skillObserver.observe(grid);
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(255, 105, 180, 0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 105, 180, 0.1)';
    }
});

// ===== Form Submission =====
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Show success message (in a real app, you'd send to a server)
    alert(`Thank you, ${name}! Your message has been sent. I'll get back to you at ${email} soon.`);
    
    // Reset form
    contactForm.reset();
});

// ===== Add Parallax Effect to Hero =====
document.addEventListener('mousemove', (e) => {
    const heroContent = document.querySelector('.hero-content');
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;
    
    heroContent.style.transform = `translate(${x}px, ${y}px)`;
});

// ===== Profile Icon (no external image) =====
const profileInner = document.querySelector('.profile-inner');
if (profileInner) {
    profileInner.innerHTML = '<i class="fas fa-user"></i>';
    const icon = profileInner.querySelector('i');
    if (icon) {
        icon.style.fontSize = '150px';
        icon.style.color = '#c71585';
    }
}

import ecommercePreview from '../assets/EZHome/EZ-Home.png';
import ecommerceVideo from '../assets/EZHome/Ez-Home.mp4';
import ecommerceProduct from '../assets/EZHome/product.png';
import ecommerceWishlist from '../assets/EZHome/fev.png';
import ecommerceCart from '../assets/EZHome/cart.png';
import ecommerceCart1 from '../assets/EZHome/cart1.png';
import ecommerceCart2 from '../assets/EZHome/cart2.png';
import ecommerceCart3 from '../assets/EZHome/cart3.png';
import ecommerceLogin from '../assets/EZHome/login.png';
import ecommerceSignup from '../assets/EZHome/sign-up.png';
import ecommerceDashboard1 from '../assets/EZHome/dashpord1.png';
import ecommerceDashboard2 from '../assets/EZHome/dashpord2.png';
import ecommerceDashboard3 from '../assets/EZHome/dashpord3.png';
import ecommerceDashboard4 from '../assets/EZHome/dashpord4.png';
import ecommerceDashboard5 from '../assets/EZHome/dashpord5.png';
import ecommerceFooter from '../assets/EZHome/foter.png';
import companyPreview from '../assets/Jodran.png';
import restaurantPreview from '../assets/restaurant.png';
import amjadPreview from '../assets/amjad.png';

export const data = {
  navigation: ['About', 'Skills', 'Experience', 'Projects', 'Contact'],
  branding: {
    navbar: '< AF5 />',
    footer: '⟨ AF5 /⟩',
    copyright: 'Abdalah Faheem Amlih · Amman, Jordan',
  },
  sections: {
    about: { label: '01 / ABOUT', title: 'Engineering profile' },
    skills: { label: '// 02. skill_set', title: 'What I Build With' },
    experience: { label: '// 03. experience', title: 'Journey So Far' },
    projects: { label: '// 04. projects', title: "Things I've Built" },
    contact: { label: 'CONTACT', title: "Let's Build Something" },
  },
  hero: {
    name: 'Abdalah Faheem',
    eyebrow: 'Software engineer / Full stack',
    headline: ['Building digital', 'systems with', 'code & purpose.'],
    description: 'From React interfaces to Node.js APIs and databases. I build practical web systems with clear structure and thoughtful details.',
    roles: ['Full-Stack Developer', ' Bacend Developer', 'Frontend Developer', 'Database Developer'],
    availability: 'Available for opportunities',
    workLabel: 'View Work',
    contactLabel: 'Contact Me',
    cvLabel: 'Download CV',
  },
  about: {
    heading: 'Problem solving.',
    accent: 'System building.',
    paragraphs: [
      'I’m a Software Engineering student at Al-Zaytoonah University of Jordan, focused on full-stack and backend development.',
      'At Dot Jordan, I worked on React interfaces and Node.js APIs with MongoDB. I’m building on that experience through practical web projects, from the interface to the database.',
    ],
    details: [
      { label: 'Education', value: 'Software Engineering student' },
      { label: 'Direction', value: 'Full Stack / Backend' },
    ],
    approachLabel: 'How I approach the work',
    approach: [
      { title: 'Break the problem down.', description: 'JCPC and AmmanCPC taught me to work through complex problems systematically, one decision at a time.' },
      { title: 'Connect the whole system.', description: 'I focus on clear APIs, considered database structure, and code that stays understandable as a project grows.' },
    ],
    focusLabel: 'Current focus',
    focus: 'Node.js APIs · SQL & NoSQL · Clean architecture',
  },
  skillQuote: ['The best code is', 'invisible to the user.'],
  contactIntro: "Got a project? Looking for a developer? I'm open.",
  contactMethods: [
    { field: 'email', icon: 'EMAIL', label: 'Email' },
    { field: 'phone', icon: 'PHONE', label: 'Phone' },
    { field: 'linkedin', icon: 'LINKEDIN', label: 'LinkedIn', value: 'LinkedIn Profile' },
    { field: 'github', icon: 'GITHUB', label: 'GitHub', value: 'GitHub Portfolio' },
  ],
  personal: {
    name: 'Abdallah Faheem',
    title: 'Full-Stack Software Engineer',
    subtitle: 'Building scalable web applications from pixel to API.',
    desc: 'React, Node.js, and a relentless eye for clean architecture.',
    email: 'abdallah.amleh5@gmail.com',
    phone: '+962 788 688 925',
    location: 'Amman, Jordan',
    linkedin: 'https://www.linkedin.com/in/abdallah-faheem-169ab5296/',
    github: 'https://github.com/Abdaallah-Faheem5',
    cv: 'https://1drv.ms/b/c/5ee76b87d9221053/IQDRJ55blxDwSazBZTq5SZmpAQEGYCKVIpfevQTHk-1ZcB4?e=k2PFaK',
    status: 'open_to_work',
  },

  stats: [

  ],

  skills: [

    {
      icon: 'BE',
      name: 'Backend',
      desc: 'Node.js - Express - REST APIs',
      level: 95,
      span: '2x1',
      tags: ['Node.Js', 'Express.Js'],
    },
    {
      icon: 'FE',
      name: 'Frontend',
      desc: 'React.js - Bootstrap - HTML/CSS',
      level: 90,
      span: '1x1',
      tags: ['React.js', 'HTML/CSS', 'Bootstrap'],
    },
    {
      icon: 'DB',
      name: 'Databases',
      desc: 'MySQL - PostgreSQL - MongoDB',
      level: 80,
      span: '1x1',
      tags: ['MySQL', 'PostgreSQL', 'MongoDB'],
    },

    {
      icon: 'TL',
      name: 'Dev Tools',
      desc: 'Git - GitHub - VS Code - Postman - NPM',
      level: 88,
      span: '1x1',
      tags: [], 
    },
    {
      icon: 'JV',
      name: 'language programming ',
      desc: 'Java - Javascript - Typescript',
      level: 85,
      span: '1x1',
      tags: ['JAVA', 'JS', 'TS'],
    },

  ],

  experience: [
    {
      icon: 'W',
      date: 'Dec 2025 - Feb 2026',
      title: 'Full-Stack Developer Intern',
      kind: 'Internship',
      focus: ['React', 'Node.js', 'MongoDB'],
      company: 'Dot Jordan - Amman, Jordan',
      desc: 'Built frontend UI components and backend API endpoints for full-stack projects using React, Node.js, and MongoDB.',
    },
    {
      icon: 'E',
      date: '2023 - Present',
      title: 'BSc Software Engineering',
      kind: 'Education',
      focus: ['Software architecture', 'Databases', 'Systems design'],
      company: 'Al-Zaytoonah University of Jordan - Expected Jan 2027',
      desc: 'Studying software architecture, databases, and systems design. Active participant in competitive programming contests.',
    },
    {
      icon: 'C',
      date: '2023 - 2024',
      title: 'Competitive Programmer',
      kind: 'Programming competitions',
      focus: ['Problem solving', 'Algorithms', 'Data structures'],
      company: 'JCPC - AmmanCPC',
      desc: 'Competed in Jordan Collegiate Programming Contest and AmmanCPC. Developed problem-solving skills under pressure with algorithms and data structures.',
    },
  ],

  projects: [
    {
      icon: '02',
      title: 'E-Commerce "EZ-Home"',
      slug: 'ez-home',
      shortDescription: 'An e-commerce backend for products, orders, and customer accounts.',
      purpose: 'Support the core shopping flow, from product browsing to cart and order management.',
      role: 'Backend development',
      features: ['Authentication', 'Product management', 'Cart and orders', 'Wishlist'],
      images: [
        { src: ecommercePreview, group: 'Storefront', width: 1882, height: 873, alt: 'EZ-Home e-commerce website preview' },
        { src: ecommerceProduct, group: 'Storefront', width: 1867, height: 870, alt: 'EZ-Home product page' },
        { src: ecommerceWishlist, group: 'Storefront', width: 1887, height: 875, alt: 'EZ-Home wishlist' },
        { src: ecommerceCart, group: 'Cart & checkout', width: 1896, height: 882, alt: 'EZ-Home shopping cart' },
        { src: ecommerceCart1, group: 'Cart & checkout', width: 890, height: 761, alt: 'EZ-Home cart flow, view 1' },
        { src: ecommerceCart2, group: 'Cart & checkout', width: 797, height: 666, alt: 'EZ-Home cart flow, view 2' },
        { src: ecommerceCart3, group: 'Cart & checkout', width: 687, height: 576, alt: 'EZ-Home cart flow, view 3' },
        { src: ecommerceLogin, group: 'Account', width: 920, height: 795, alt: 'EZ-Home login page' },
        { src: ecommerceSignup, group: 'Account', width: 737, height: 831, alt: 'EZ-Home sign-up page' },
        { src: ecommerceDashboard1, group: 'Dashboard', width: 1891, height: 873, alt: 'EZ-Home dashboard, view 1' },
        { src: ecommerceDashboard2, group: 'Dashboard', width: 1902, height: 880, alt: 'EZ-Home dashboard, view 2' },
        { src: ecommerceDashboard3, group: 'Dashboard', width: 1902, height: 867, alt: 'EZ-Home dashboard, view 3' },
        { src: ecommerceDashboard4, group: 'Dashboard', width: 1912, height: 881, alt: 'EZ-Home dashboard, view 4' },
        { src: ecommerceDashboard5, group: 'Dashboard', width: 1907, height: 865, alt: 'EZ-Home dashboard, view 5' },
        { src: ecommerceFooter, group: 'Storefront', width: 1897, height: 877, alt: 'EZ-Home footer' },
      ],
      video: { src: ecommerceVideo, type: 'video/mp4' },
      image: ecommercePreview,
      desc: 'Backend ECommerce covering auth, products, cart, orders, and wishlist with security-first architecture.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Redis', 'JWT'],
      demo: 'https://ez-homejo.onrender.com/',
      github: null,
    },
    {
      icon: '03',
      title: 'Company Portfolio "JODRAN AL KHALEEJ"',
      slug: 'jodran-al-khaleej',
      shortDescription: 'A corporate portfolio with interactive service showcases.',
      purpose: 'Present company services and documents through a responsive corporate portfolio.',
      features: ['Interactive 3D experiences', 'Animated service showcases', 'Document management sections', 'Responsive design'],
      images: [{ src: companyPreview, width: 1887, height: 867, alt: 'JODRAN AL KHALEEJ company portfolio preview' }],
      image: companyPreview,
      desc: 'High-end corporate portfolio built with React and Three.js, featuring interactive 3D experiences, animated service showcases, document management sections, and responsive modern design.',
      tech: ['React', 'Three.js', 'CSS'],
      demo: 'https://jodran-alkhaleej.onrender.com/',
      github: 'https://github.com/Abdaallah-Faheem5/JODRAN_AL_KHALEEJ.git',
    },
    {
      icon: '01',
      title: 'Restaurant Web Application',
      slug: 'restaurant',
      shortDescription: 'Menu browsing, reservations, and restaurant administration in one platform.',
      purpose: 'Connect a customer-facing restaurant website with tools to manage its menu.',
      role: 'Full-stack development',
      features: ['Dynamic menu browsing', 'Reservation forms', 'Admin dashboard', 'Menu management'],
      images: [{ src: restaurantPreview, width: 1882, height: 853, alt: 'Restaurant website menu and landing page preview' }],
      image: restaurantPreview,
      desc: 'Full-stack restaurant platform with dynamic menu browsing, reservation forms, and a complete admin dashboard for menu management.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      demo: null,
      github: 'https://github.com/Abdaallah-Faheem5/Restaurant.git',
    },
    {
      icon: '03',
      title: 'Personal Portfolio',
      slug: 'personal-portfolio',
      shortDescription: 'A responsive personal portfolio for projects, skills, and experience.',
      purpose: 'Bring projects, skills, and experience together in a personal website.',
      features: ['Project showcase', 'Skills and experience sections', 'Responsive design'],
      images: [{ src: amjadPreview, width: 1886, height: 872, alt: 'Personal portfolio website preview' }],
      image: amjadPreview,
      desc: 'A sleek personal portfolio website showcasing projects, skills, and experience with a modern responsive design.',
      tech: ['React', 'CSS'],
      demo: 'https://amjad-hisham-yousuf.onrender.com/',
      github: null,
    },
  ],

};

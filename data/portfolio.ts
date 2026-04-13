export const personal = {
  name: "Muhammad Umer",
  title: "Full-Stack Developer & Roboticist",
  tagline: "I build robots that pull weeds\nand apps that close deals.",
  bio: "Final-year CS student at FAST NUCES, Islamabad. I ship real products for real clients — from autonomous farming robots to full-stack web platforms.",
  email: "iamumersani@gmail.com",
  location: "Islamabad, Pakistan",
  github: "https://github.com/umersanii",
  linkedin: "https://www.linkedin.com/in/muhammad-umer-3551ba247/",
  available: true,
};

export const about = {
  story: {
    title: "The Crossover",
    body: "Started with web. Wandered into robotics. Never left either. Most developers build apps — I also build the hardware those apps talk to, and that gap between the two is the most interesting part.",
  },
  numbers: {
    title: "Things I've Shipped",
    stats: [
      { value: "3", label: "Client projects delivered" },
      { value: "1",  label: "Robot in active development" },
      { value: "10+", label: "Apps built across platforms" },
    ],
    footnote: "From meal-planning platforms to weed-killing robots.",
  },
  seeking: {
    title: "What I'm After",
    body: "An internship or part-time role where I can build something that actually ships. I work best with a clear problem and room to own the solution.",
  },
};

export type ProjectTier = "featured" | "standard";
export type ProjectCategory = "Web" | "Mobile" | "Robotics";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tier: ProjectTier;
  tags: string[];
  github?: string;
  live?: string;
  image?: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "weedx-robot",
    title: "WeedX Robot",
    subtitle: "Precision Farming · Final Year Project",
    description: "Autonomous robot that detects and destroys weeds using computer vision and precision actuation.",
    longDescription:
      "A modular robotics platform with ROS2 nodes for navigation and detection, a Qt6 desktop Digital Twin for monitoring, and ESP32 firmware for actuator control. Uses LiDAR-based SLAM for mapping and a custom-trained YOLO model for weed classification.",
    category: "Robotics",
    tier: "featured",
    tags: ["ROS2", "SLAM", "LiDAR", "Qt6", "ESP32", "YOLO", "Python", "C++"],
    image: "/projects/weedx-robot.png",
    github: "https://github.com/umersanii",
    highlights: [
      "ROS2 navigation stack with LiDAR SLAM",
      "Qt6 Digital Twin desktop dashboard",
      "ESP32 firmware for precision actuation",
      "Custom YOLO model for weed detection",
    ],
  },
  {
    id: "nourish-doha",
    title: "Nourish Doha",
    subtitle: "Client Project · BuildItUp",
    description: "Full-stack meal-planning platform for a Qatar-based client with role-based access and admin dashboard.",
    longDescription:
      "Led a 4-person dev team to architect and deliver a production meal-planning platform. Built on Next.js with a PostgreSQL backend (17+ tables), JWT authentication, role-based access control, admin dashboard, and a fully responsive UI.",
    category: "Web",
    tier: "featured",
    image: "/projects/nourish-doha.png",
    tags: ["Next.js", "Node.js", "PostgreSQL", "JWT", "TypeScript", "Tailwind"],
    highlights: [
      "Led 4-person development team",
      "17+ table PostgreSQL schema",
      "JWT auth + role-based access control",
      "Admin dashboard with full CRUD",
    ],
  },
  {
    id: "ayahs-kaftan",
    title: "Ayahs Kaftan",
    subtitle: "Client Project · Ongoing",
    description: "Luxury fashion e-commerce site with cart, checkout flow, and automated transactional emails.",
    longDescription:
      "Lead developer for a Qatar-based luxury fashion e-commerce platform. Implemented full cart and checkout flow, product categorization, automated email system, and a responsive UI optimized for mobile-first browsing.",
    category: "Web",
    tier: "standard",
    image: "/projects/ayahs-kaftan.png",
    tags: ["Next.js", "TypeScript", "Tailwind", "Stripe", "SendGrid"],
    highlights: [
      "Cart, categories, and checkout flow",
      "Automated transactional emails",
      "Mobile-first responsive design",
    ],
  },
  {
    id: "weedx-mobile",
    title: "WeedX Mobile App",
    subtitle: "Android · Kotlin",
    description: "Real-time Android dashboard for monitoring the WeedX autonomous robot over MQTT.",
    longDescription:
      "Built a secure real-time monitoring app using Kotlin with MVVM architecture. Integrates an MQTT-based data pipeline with REST backend APIs and push notifications for robot telemetry alerts.",
    category: "Mobile",
    tier: "standard",
    image: "/projects/weedx-mobile.png",
    tags: ["Kotlin", "MVVM", "MQTT", "REST API", "Jetpack Compose"],
    github: "https://github.com/umersanii",
    highlights: [
      "MQTT real-time telemetry pipeline",
      "MVVM architecture with Kotlin",
      "Push notifications for robot alerts",
    ],
  },
  {
    id: "sangi",
    title: "Sangi Pet Robot",
    subtitle: "Personal Project · Hardware",
    description: "A small ESP32 robot with OLED facial expressions and AWS IoT cloud connectivity.",
    longDescription:
      "Built a personality-driven desktop robot with an OLED display for expressions. Uses MQTT over TLS via AWS IoT Core with a Raspberry Pi backend for cloud-connected behavior triggers. Designed custom 3D-printed chassis.",
    category: "Robotics",
    tier: "standard",
    image: "/projects/sangi.jpeg",
    tags: ["ESP32", "MQTT", "AWS IoT", "Raspberry Pi", "C++", "OLED"],
    github: "https://github.com/umersanii",
    highlights: [
      "OLED expression system",
      "MQTT with TLS via AWS IoT Core",
      "Raspberry Pi backend",
    ],
  },
];

export interface SkillGroup {
  id: string;
  label: string;
  icon: string;
  color: "primary" | "secondary" | "tertiary";
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "web",
    label: "Web & Backend",
    icon: "⚙",
    color: "primary",
    skills: ["Next.js", "React", "Node.js", "TypeScript", "JavaScript", "PostgreSQL", "MongoDB", "Tailwind CSS"],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: "📱",
    color: "secondary",
    skills: ["Kotlin", "Flutter", "MVVM", "Jetpack Compose", "Android SDK"],
  },
  {
    id: "robotics",
    label: "Robotics & Embedded",
    icon: "🤖",
    color: "tertiary",
    skills: ["ROS2", "SLAM", "LiDAR", "ESP32", "Raspberry Pi", "Qt6 (C++/Python)", "C++", "Python"],
  },
  {
    id: "tools",
    label: "Tools & Infra",
    icon: "🛠",
    color: "primary",
    skills: ["Git", "AWS IoT Core", "Vercel", "Docker (basics)", "Rust (learning)"],
  },
];

export interface Experience {
  id: string;
  type: "work" | "education" | "project";
  title: string;
  org: string;
  period: string;
  current: boolean;
  description: string;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    id: "freelance",
    type: "work",
    title: "Web Developer",
    org: "Freelance",
    period: "Jun 2025 – Present",
    current: true,
    description:
      "Building full-stack web applications for international clients. Delivered 3 end-to-end projects including UI, backend integrations, and deployment.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind"],
  },
  {
    id: "weedx-fyp",
    type: "project",
    title: "Final Year Project — WeedX",
    org: "FAST NUCES",
    period: "Sep 2025 – Jun 2026",
    current: true,
    description:
      "Developing an autonomous weed-detection and precision-farming robot as FYP. Full robotics stack: ROS2, LiDAR SLAM, computer vision, embedded firmware.",
    tags: ["ROS2", "LiDAR", "Qt6", "ESP32", "YOLO"],
  },
  {
    id: "nuces",
    type: "education",
    title: "BS Computer Science",
    org: "FAST NUCES Islamabad",
    period: "Sep 2022 – Jun 2026",
    current: true,
    description:
      "Specialization in Robotics. Relevant coursework: AI, Algorithms, Software Engineering, Software Development Analysis.",
    tags: ["Robotics", "AI", "Algorithms"],
  },
];

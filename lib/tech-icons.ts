import {
  SiNextdotjs, SiNodedotjs, SiPostgresql, SiTypescript, SiTailwindcss,
  SiStripe, SiSendgrid, SiKotlin, SiMqtt,
  SiRaspberrypi, SiPython, SiCplusplus, SiEspressif, SiQt,
  SiAndroid, SiJetpackcompose, SiReact, SiDocker, SiGit,
  SiVercel, SiRust, SiMongodb, SiJavascript, SiFlutter,
  SiRos,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { ComponentType } from "react";

export const TECH_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  // Web
  "Next.js":         SiNextdotjs,
  "Node.js":         SiNodedotjs,
  "PostgreSQL":      SiPostgresql,
  "TypeScript":      SiTypescript,
  "Tailwind":        SiTailwindcss,
  "Tailwind CSS":    SiTailwindcss,
  "Stripe":          SiStripe,
  "SendGrid":        SiSendgrid,
  "React":           SiReact,
  "JavaScript":      SiJavascript,
  "MongoDB":         SiMongodb,
  "Docker":          SiDocker,
  "Docker (basics)": SiDocker,
  "Git":             SiGit,
  "Vercel":          SiVercel,
  "Rust":            SiRust,
  "Rust (learning)": SiRust,
  // Mobile
  "Kotlin":          SiKotlin,
  "Flutter":         SiFlutter,
  "Jetpack Compose": SiJetpackcompose,
  "Android SDK":     SiAndroid,
  "MQTT":            SiMqtt,
  // Robotics / Embedded
  "Python":          SiPython,
  "C++":             SiCplusplus,
  "ESP32":           SiEspressif,
  "Qt6":             SiQt,
  "Qt6 (C++/Python)":SiQt,
  "Raspberry Pi":    SiRaspberrypi,
  "ROS2":            SiRos,
  "AWS IoT Core":    FaAws,
};

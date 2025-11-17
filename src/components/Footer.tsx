import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaTelegram,
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      href: "https://github.com/LONGCELOT",
      color: "white",
    },
    // {
    //   name: 'LinkedIn',
    //   icon: FaLinkedin,
    //   href: 'https://linkedin.com/in/vannseavlong',
    //   color: '#0077B5'
    // },
    // {
    //   name: 'Twitter',
    //   icon: FaTwitter,
    //   href: 'https://twitter.com/vannseavlong',
    //   color: '#1DA1F2'
    // },
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "https://facebook.com/vannseavlong",
      color: "#4267B2",
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      href: "https://t.me/SNLRLONG",
      color: "#0088cc",
    },
    {
      name: "Email",
      icon: FaEnvelope,
      href: "mailto:vannseavlong55@gmail.com",
      color: "#EA4335",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Awards", href: "#awards" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-gradient">VANN</span> Seavlong
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Passionate Software Engineer and Full Stack Developer dedicated to
              creating innovative solutions and building meaningful digital
              experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                >
                  <social.icon
                    className="w-5 h-5"
                    style={{ color: social.color }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold mb-6">Get In Touch</h4>
            <div className="space-y-3">
              <p className="text-gray-300">
                <strong>Email:</strong>
                <br />
                vannseavlong55@gmail.com
              </p>
              <p className="text-gray-300">
                <strong>Phone:</strong>
                <br />
                +855 95 229 726 / +855 97 497 6736
              </p>
              <p className="text-gray-300">
                <strong>Location:</strong>
                <br />
                Phnom Penh, Cambodia
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © 2025 VANN Seavlong. All rights reserved.
            </motion.p>
            {/* <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-6"
            >
              <button
                onClick={() => scrollToSection("#home")}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => scrollToSection("#about")}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Terms of Service
              </button>
            </motion.div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

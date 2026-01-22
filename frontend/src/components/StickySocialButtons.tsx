import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Facebook, Twitter } from 'lucide-react';

const StickySocialButtons: React.FC = () => {
  const socialButtons = [
    {
      icon: Instagram,
      color: 'hover:text-pink-400',
      bg: 'hover:bg-pink-400/10',
      href: 'https://instagram.com/arravaliessence'
    },
    {
      icon: Youtube,
      color: 'hover:text-red-400',
      bg: 'hover:bg-red-400/10',
      href: 'https://youtube.com/@arravaliessence'
    },
    {
      icon: Facebook,
      color: 'hover:text-blue-400',
      bg: 'hover:bg-blue-400/10',
      href: 'https://facebook.com/arravaliessence'
    },
    {
      icon: Twitter,
      color: 'hover:text-gray-400',
      bg: 'hover:bg-gray-400/10',
      href: 'https://twitter.com/arravaliessence'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-8 right-8 z-50 flex flex-col gap-3"
    >
      {socialButtons.map(({ icon: Icon, color, bg, href }, index) => (
        <motion.a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className={`p-3 rounded-full bg-gray-900 text-gray-400 ${color} ${bg} transition-all duration-300 shadow-lg`}
        >
          <Icon className="w-5 h-5" />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default StickySocialButtons;

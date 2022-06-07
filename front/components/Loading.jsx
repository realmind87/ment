import React from 'react';
import Modal from './Modal';
import { motion } from "framer-motion";

const Loading = () => {
    return (
        <Modal>
            <div className='loading-wrap'>
                <motion.div
                    animate={{
                        scale: [0.5, 1, 0.5],
                        rotate: [0, 360, 0],
                        borderRadius: ["0%", "50%", "0%"]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.2, 0.2, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                />
            </div>
        </Modal>
    );
  };
  
  export default Loading;
import { motion } from "framer-motion";

type scrollSectionProp = {
    title : string,
    description : string,
    imageColor : string,
    reverse? : boolean
}

// Reusable Section Component
export const ScrollSection = ({ title , description, imageColor, reverse = false } : scrollSectionProp) => {
  return (
   <section className="h-screen w-full snap-start snap-always flex items-center justify-center px-6 md:px-20 overflow-hidden">
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between w-full max-w-7xl gap-12`}>
        
        {/* Animated Text Block */}
        <motion.div 
          initial={{ opacity: 0, filter: "blur(20px)", x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
          viewport={{ margin: "-10% 0px -10% 0px" }} // Triggers when mostly in view
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full md:w-1/2 space-y-6 z-10"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-md">
            {description}
          </p>
        </motion.div>

        {/* Animated Image Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className={`w-full md:w-[500px] h-[300px] md:h-[600px] rounded-[40px] ${imageColor} shadow-[0_0_100px_rgba(0,0,0,0.1)]`}
        />
      </div>
    </section>
  );
};
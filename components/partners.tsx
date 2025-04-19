import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedHeading, AnimatedSection } from "./animated-section"

export function Partners() {
  // Partner data with image paths and names
  const partners = [
    { id: 1, name: "UBE", image: "/images/partners/ube.jpg" },
    { id: 2, name: "Sponsor 1", image: "/images/partners/sponsors1.jpeg" },
    { id: 3, name: "Sponsor 2", image: "/images/partners/sponsors2.jpeg" },
    { id: 4, name: "Sponsor 3", image: "/images/partners/sponsors3.jpeg" },
    { id: 5, name: "Sponsor 4", image: "/images/partners/sponsors4.jpeg" },
    { id: 6, name: "Sponsor 5", image: "/images/partners/sponsors5.jpeg" },
    { id: 7, name: "Sponsor 6", image: "/images/partners/sponsors6.jpeg" },
    { id: 8, name: "Sponsor 7", image: "/images/partners/sponsors7.jpeg" },
    { id: 9, name: "Sponsor 8", image: "/images/partners/sponsors8.jpeg" },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
        <AnimatedSection>

        <AnimatedHeading
            className=" text-center text-3xl font-bold text-navy-500 md:text-4xl"
            animationType="flip"
          >
            Our Partners
         
          </AnimatedHeading>
        </AnimatedSection>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            NIBF is proudly supported by these organizations committed to promoting literacy and education
          </p>
          <div className="elegant-divider mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              className="flex items-center justify-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="relative h-24 w-full overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                <Image 
                  src={partner.image} 
                  alt={partner.name} 
                  fill 
                  className="object-contain p-2 transition-all duration-300 hover:opacity-80" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}


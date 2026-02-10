import bannerImg from "../../assets/banner.png";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:w-1/2 w-full flex items-center md:justify-end"
      >
        <img src={bannerImg} alt="" />
      </motion.div>

      <div className="md:w-1/2 w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:text-5xl text-2xl font-medium mb-7 font-primary"
        >
          New Releases This Week
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 text-gray-600 transition-colors"
        >
          It&apos;s time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week&apos;s new releases offer something for
          everyone
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
        >
          Subscribe
        </motion.button>
      </div>
    </div>
  );
};

export default Banner;

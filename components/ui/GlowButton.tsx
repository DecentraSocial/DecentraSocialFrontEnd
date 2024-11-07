import { motion } from "framer-motion";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
}

const GlowButton: React.FC<ButtonProps> = ({ label, onClick, className }) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{
                boxShadow: "0 0 10px 0 rgba(0, 112, 243, 0.75) inset, 0 0 10px 4px rgba(0, 112, 243, 0.75)",
            }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className={`border-2 border-blue-500 text-white rounded-xl py-1 md:py-2 px-3 md:px-4 font-semibold tracking-wider transition-all duration-150 ease-in-out shadow-[0_0_40px_40px_rgba(0,112,243,1)_inset,0_0_0_0_rgba(0,112,243,1)] hover:shadow-[0_0_10px_0_rgba(0,112,243,0.75)_inset,0_0_10px_4px_rgba(0,112,243,0.75)] ${className}`}
        >
            {label}
        </motion.button>
    )
}

export default GlowButton

import { motion } from "framer-motion";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean
}

const GlowButton: React.FC<ButtonProps> = ({ label, onClick, className, disabled }) => {
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            whileHover={{
                boxShadow: "0 0 10px 0 rgba(0, 112, 243, 0.75) inset, 0 0 10px 4px rgba(0, 112, 243, 0.75)",
            }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className={`border-2 text-white rounded-xl py-1 px-3 font-semibold tracking-wider transition-all duration-150 ease-in-out hover:bg-transparent hover:shadow-[0_0_10px_0_rgba(0,112,243,0.75)_inset,0_0_10px_4px_rgba(0,112,243,0.75)] 
                ${disabled ?
                    "bg-blue-400 border-blue-400" :
                    "bg-blue-500 border-blue-500"} 
                ${className}`}
        >
            {label}
        </motion.button>
    )
}

export default GlowButton

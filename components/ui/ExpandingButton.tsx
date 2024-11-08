import { motion } from "framer-motion";

interface ExpandingButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
    [key: string]: any;
}

const ExpandingButton: React.FC<ExpandingButtonProps> = ({ label, onClick, className, ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors duration-150 ${className}`}
            onClick={onClick}
            {...props}
        >
            {label}
        </motion.button>
    );
};

export default ExpandingButton;

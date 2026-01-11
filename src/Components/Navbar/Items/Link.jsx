import { motion } from "framer-motion";

const Link = ({ text, hash, selected, setSelected, isOpen }) => {

    return (
        <button
            onClick={() => setSelected(hash)}
            className={`${
                selected
                    ? "text-white"
                    : "text-slate-300 hover:text-slate-200 hover:bg-[#333]"
            } text-base transition-colors px-2.5 py-0.5 rounded-md relative whitespace-nowrap ${(!isOpen && selected) ? "max-md:block" : (isOpen ? "max-md:block max-md:p-3 border border-gray-500" : "max-md:hidden")}`}
        >
            <span className="relative z-10">{text}</span>
            {selected && (
                <motion.span
                    layoutId="pill-tab"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="absolute inset-0 z-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-md"
                />
            )}
        </button>
    );
};

export default Link;
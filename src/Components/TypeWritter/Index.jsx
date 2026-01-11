import { useState, useEffect } from "react";

const useTypewriter = (text, speed = 100) => {
	const [displayText, setDisplayText] = useState("");
	const [index, setIndex] = useState(0);

	useEffect(() => {
		// Eğer tüm metin yazıldıysa, setInterval'i durdur
		if (index < text.length) {
			const typingInterval = setInterval(() => {
				setDisplayText((prevText) => prevText + text.charAt(index));
				setIndex((prevIndex) => prevIndex + 1);
			}, speed);

			return () => clearInterval(typingInterval);
		}
	}, [index, text, speed]);

	return displayText;
};

export default useTypewriter;

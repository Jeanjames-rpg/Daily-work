import { useEffect,useRef,useState } from "react";
import { motion, useInView } from "framer-motion";


function CountUp({ end, duration=2, suffix = ""}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;

            const progress = Math.min(
                (currentTime - startTime) / (duration * 1000),
                1
            );

            const currentCount = Math.floor(progress * end);

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    },[isInView, end , duration]);

    return (
        <motion.span ref={ref}>
            {count}{suffix}
        </motion.span>
    );
}

export default CountUp;
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				playing: {
					"0%": { transform: "scaleY(0.1)" },
					"33%": { transform: "scaleY(0.6)" },
					"66%": { transform: "scaleY(0.9)" },
					"100%": { transform: "scaleY(0.1)" },
				},
				fadeInUp: {
					"0%": { opacity: 0, transform: "translateY(30px)" },
					"100%": { opacity: 1, transform: "translateY(0)" },
				},
				"slide-up": {
					// Add this new keyframe
					"0%": {
						opacity: 0,
						transform: "translateY(100%)",
					},
					"100%": {
						opacity: 1,
						transform: "translateY(0)",
					},
				},
			},
			animation: {
				playing: "playing 1s ease-in-out infinite",
				fadeInUp: "fadeInUp 0.4s ease-out",
				"slide-up": "slide-up 0.3s ease-out forwards", // Add this animation
			},
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};

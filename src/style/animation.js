const animations = `
@keyframes fade_in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`
    .split("\n")
    .map((line) => line.trim())
    .join(" ");

const animation_style = [
    [
        "#icon",
        {
            opacity: 0,
        },
    ],
    [
        "#username",
        {
            opacity: 0,
        },
    ],
    [
        "#rank",
        {
            opacity: 0,
        },
    ],
    [
        ".circle_bg",
        {
            opacity: 0,
        },
    ],
    [
        "#tried_circle",
        {
            opacity: 0,
        },
    ],
    [
        "#solved_circle",
        {
            opacity: 0,
        },
    ],
    [
        "#total_solved",
        {
            opacity: 0,
        },
    ],
    [
        "#submission_0",
        {
            opacity: 0,
        },
    ],
    [
        "#submission_1",
        {
            opacity: 0,
        },
    ],
    [
        "#submission_2",
        {
            opacity: 0,
        },
    ],
    [
        "#submission_3",
        {
            opacity: 0,
        },
    ],
    [
        "#submission_4",
        {
            opacity: 0,
        },
    ],
    [
        "#submission_5",
        {
            opacity: 0,
        },
    ],
];

for (let i = 0; i < animation_style.length; i++) {
    animation_style[i][1].animation = `fade_in 0.3s ease ${(0.1 * i).toFixed(2)}s 1 forwards`;
}

function circle_animation(elm, len = 0, delay = 0) {
    const R = Math.floor(Math.random() * 1000);
    const animation = `@keyframes circle_${R} { 0% { opacity: 0; stroke-dasharray: 0 1000; } 50% { opacity: 1; } 100% { opacity: 1; stroke-dasharray: ${len} 1000; } }`;
    const style = `${elm} { animation: circle_${R} 1.2s ease ${delay}s 1 forwards }`;
    return animation + style;
}

export { animations, animation_style, circle_animation };

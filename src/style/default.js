const default_style = [
    [
        ".tioj_stats_card *",
        {
            "font-family": `"Segoe UI", "PingFang SC", Ubuntu, Sans-Serif`,
            "transform-box": "fill-box",
        },
    ],
    [
        ".tioj_stats_card text, .tioj_stats_card .text",
        {
            "font-weight": "bold",
            fill: "rgb(38, 38, 38)",
            color: "rgb(38, 38, 38)",
        },
    ],
    [
        ".tioj_stats_card text.sub, .tioj_stats_card .sub_text",
        {
            fill: "rgb(128, 128, 128)",
            color: "rgb(128, 128, 128)",
        },
    ],
    [
        ".tioj_stats_card rect#background, .tioj_stats_card .theme_background",
        {
            fill: "#ffffff",
            background: "#ffffff",
        },
    ],
    [
        ".tioj_stats_card #head",
        {
            transform: "translate(0px, 0px)",
        },
    ],
    [
        ".tioj_stats_card #body",
        {
            transform: "translate(0px, 80px)",
        },
    ],
    [
        "#total_solved_circle .circle_bg",
        {
            stroke: "rgb(229, 229, 229)",
        },
    ],
    [
        "#total_solved_circle #tried_circle, #total_solved_circle #solved_circle",
        {
            "transform-box": "fill-box",
            transform: "rotate(-90deg)",
        },
    ],
    [
        ".submission > .status",
        {
            transform: "translate(88px, 0px)",
        },
    ],
    [
        ".submission > .status.AC",
        {
            fill: "#2ecc71",
        },
    ],
    [
        ".submission > .status.WA",
        {
            fill: "#e74c3c",
        },
    ],
    [
        ".submission > .status.TLE",
        {
            fill: "#3498db",
        },
    ],
    [
        ".submission > .status.MLE",
        {
            fill: "#f1c40f",
        },
    ],
    [
        ".submission > .status.RE",
        {
            fill: "#f1c40f",
        },
    ],
    [
        ".submission > .lang",
        {
            transform: "translate(128px, 0px)",
        },
    ],
    [
        ".submission > .time",
        {
            transform: "translate(320px, 0px)",
            "text-anchor": "end",
        },
    ],
];

export { default_style };

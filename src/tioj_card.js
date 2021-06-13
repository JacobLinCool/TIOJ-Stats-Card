import { svg_tag } from "./tag.js";
import { tioj_icon } from "./img.js";
import { style } from "./style.js";

function tioj_card(data, parameters) {
    const [svg_start_tag, svg_close_tag] = svg_tag(parameters.width, parameters.height, 500, 200);
    let svg_data = `${svg_start_tag}<title>${data.username} | TIOJ Stats Card</title><style>${style(parameters, data)}</style>
<g class="tioj_stats_card theme_${parameters.style}">
    <rect id="background" stroke="lightgray" stroke-width="${parameters.border}" width="${500 - parameters.border}" height="${200 - parameters.border}" x="${
        parameters.border / 2
    }" y="${parameters.border / 2}" rx="${parameters.border_radius}" />
    <g id="head">
        <g id="icon" transform="translate(20, 17)">${tioj_icon(30, 30)}</g>
        <text id="username" transform="translate(65, 40)" style="font-size: 24px;">${data.username}</text>
        <text id="rank" class="sub" text-anchor="end" transform="translate(480, 40)" style="font-size: 18px;">#${data.profile.ranking}</text>
    </g>
    <g id="body">
        <g id="total_solved_circle" transform="translate(25, -5)">
            <defs>
                <rect id="image-round-rect" x="0" y="0" width="100" height="100" rx="50"/>
                <clipPath id="round-clip">
                    <use xlink:href="#image-round-rect"/>
                </clipPath>
            </defs>
            <image href="${data.profile.avatar}" height="100" width="100" clip-path="url(#round-clip)" style="opacity: 0.4; display: none;" />
            <circle class="circle_bg" cx="50" cy="50" r="50" stroke-width="6" />
            <circle id="tried_circle" cx="50" cy="50" r="50" stroke="#f1c40f" stroke-width="6" stroke-linecap="round" stroke-dasharray="0 1000" transform-origin="50px 50px" />
            <circle id="solved_circle" cx="50" cy="50" r="50" stroke="#2ecc71" stroke-width="6" stroke-linecap="round" stroke-dasharray="0 1000" transform-origin="50px 50px" />
            <g>
                <text id="total_solved" x="50" y="50" style="font-size: 28px;" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${
                    data.problem.solved
                }</text>
            </g>
        </g>
        <g id="activity" transform="translate(160, 0)">
            ${data.activity.slice(0, 5).reduce((text, submission, i) => {
                return (
                    text +
                    `
                    <g id="submission_${i}" class="submission" transform="translate(0, ${25 * i})">
                    <text>Prob. ${submission.problem}</text>
                    <text class="status ${submission.status}">${submission.status}</text>
                    <text class="lang ${submission.lang}">${submission.lang}</text>
                    <text class="sub time">${
                        (submission.time.getFullYear() % 100) +
                        "." +
                        (submission.time.getMonth() + 1) +
                        "." +
                        submission.time.getDate() +
                        " " +
                        String(submission.time.getHours()).padStart(2, 0) +
                        ":" +
                        String(submission.time.getMinutes()).padStart(2, 0) +
                        ":" +
                        String(submission.time.getSeconds()).padStart(2, 0)
                    }</text>
                    </g>
                    `
                );
            }, "")}
        </g>
    </g>
</g>
${svg_close_tag}`;

    return svg_data
        .split("\n")
        .map((line) => line.trim())
        .join(" ");
}

export { tioj_card };

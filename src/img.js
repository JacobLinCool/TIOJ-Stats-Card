function tioj_icon(width = 25, height = 25) {
    return `
    <svg id="tioj_icon" width="${width}" height="${height}" viewBox="0 0 100 100" version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <polygon points="25,5 75,5 95,25 95,75 75,95 25,95 5,75 5,25" style="fill: #0048ad; stroke: #000000; stroke-width: 0.5;" />
        <g style="transform: translate(25px, 30px);">
          <rect x="0" y="0" width="60" height="10" style="fill: #4285e3;" />
          <rect x="25" y="0" width="10" height="50" style="fill: #4285e3;" />
        </g>
        <g style="transform: translate(20px, 25px);">
          <rect x="0" y="0" width="60" height="10" style="fill: #ffffff;" />
          <rect x="25" y="0" width="10" height="50" style="fill: #ffffff;" />
        </g>
    </svg>
    `;
}

export { tioj_icon };

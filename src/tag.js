function svg_tag(width = 500, height = 200, v_width = 500, v_height = 200) {
    return [
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${v_width} ${v_height}" fill="none">`,
        `</svg>`,
    ];
}

export { svg_tag };

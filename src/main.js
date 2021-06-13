import { html } from "./demo_html.js";
import { parameters } from "./parameter.js";
import { tioj_data } from "./tioj.js";
import { cors_header } from "./header.js";
import { tioj_card } from "./tioj_card.js";
import { not_found_card } from "./404.js";

async function main() {
    addEventListener("fetch", (event) => {
        let handler = handle_request(event);
        event.respondWith(handler);
    });
}

async function handle_request(event) {
    const request = event.request;
    if (request.method !== "GET") {
        return new Response("Allowed Method: GET");
    }

    // for favicon
    if (request.url == "https://tioj-card.jacob.workers.dev/favicon.ico") {
        return Response.redirect("https://raw.githubusercontent.com/JacobLinCool/tioj-stats-card/main/favicon/tioj.ico", 301);
    }

    const final_parameters = parameters(new URL(request.url).searchParams);
    console.log("Final Parameters", final_parameters);

    if (final_parameters.username) {
        // contruct cache key
        const cache_key = new Request(request.url, request);
        const cache = caches.default;

        // check cache
        let response = await cache.match(cache_key);

        // if no cache
        if (!response) {
            try {
                const data = await tioj_data(final_parameters.username);
                console.log("TIOJ Data", data);

                response = new Response(tioj_card(data, final_parameters), {
                    headers: {
                        "Content-Type": "image/svg+xml; charset=utf-8",
                        "Cache-Control": "s-maxage=60, maxage=60",
                        "Content-Disposition": `inline; filename=${data.username}.stats.svg`
                    },
                });
                cors_header(response.headers);
            } catch (err) {
                return new Response(not_found_card(final_parameters), {
                    headers: {
                        "Content-Type": "image/svg+xml; charset=utf-8",
                    },
                    status: 404,
                    statusText: "Not Found",
                });
            }

            // async update cache
            event.waitUntil(cache.put(cache_key, response.clone()));
        }
        return response;
    } else
        return new Response(html, {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
        });
}

export { main };

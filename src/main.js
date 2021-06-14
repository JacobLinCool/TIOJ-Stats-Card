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
    console.time("Handle Request");
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
        const cache_key = new Request(request.url);
        const cache = caches.default;

        // check cache
        let response = await cache.match(cache_key);

        // if no cache
        if (!response) {
            try {
                let USING_DATA_CACHE = true;
                let data_cache_key = new Request("https://data.tioj.stats.card/" + final_parameters.username);
                let data_response = await cache.match(data_cache_key);
                if (!data_response) {
                    USING_DATA_CACHE = false;
                    data_response = new Response(JSON.stringify(await tioj_data(final_parameters.username)), {
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "Cache-Control": "s-maxage=300, maxage=300",
                        },
                    });
                    event.waitUntil(cache.put(data_cache_key, data_response.clone()));
                }
                const data = await data_response.json();

                console.log("TIOJ Data", data);

                response = new Response(tioj_card(data, final_parameters), {
                    headers: {
                        "Content-Type": "image/svg+xml; charset=utf-8",
                        "Cache-Control": "s-maxage=120, maxage=120",
                        "Content-Disposition": `inline; filename=${data.username}.stats.svg`,
                        "X-TIOJSC-Debug": JSON.stringify(data._DEBUG),
                        "X-TIOJSC-Cache-Layer-D": USING_DATA_CACHE,
                    },
                });
                cors_header(response.headers);
            } catch (err) {
                console.error(err);
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
        console.timeEnd("Handle Request");
        return response;
    } else
        return new Response(html, {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
        });
}

export { main };

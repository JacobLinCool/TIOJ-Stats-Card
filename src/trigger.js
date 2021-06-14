import { user_data, user_activity, rank_page } from "./tioj.js";

async function handle_scheduled(event) {
    await cache_ranks();
}

async function cache_ranks() {
    const first_page = 1,
        last_page = 10,
        pages_per_time = 5;
    let list = {};
    for (let i = first_page; i <= last_page; i += pages_per_time) {
        let pre = [];
        for (let j = 0; j < pages_per_time; j++) pre.push(rank_page(i + j));

        list = Object.assign(
            list,
            (await Promise.all(pre)).reduce((a, b) => Object.assign(a, b), {})
        );
    }
    let ranks = [];
    Object.entries(list).forEach((x) => {
        ranks[x[1]] = x[0];
    });
    await CACHE.put("RANKS", JSON.stringify(list));
    await CACHE.put("RANKS_REVERSE", JSON.stringify(ranks));

    let cache_users = [];
    for (let i = 1; i <= 10; i++) {
        cache_users.push(cache_user(ranks[i]));
    }

    await Promise.all(cache_users);
}

async function cache_user(username) {
    let result = await user_data(username);
    result.activity = await user_activity(result.user_id);
    await CACHE.put("USER_" + username, JSON.stringify(result), { expirationTtl: 60 * 60 });
}

export { handle_scheduled, cache_ranks };

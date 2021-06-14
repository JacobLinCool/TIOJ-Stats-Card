const baseurl = "https://tioj.ck.tp.edu.tw";
let DEBUG = {
    user_data: null,
    user_activity: null,
    rank_page: {},
};

async function user_data(username) {
    let debug = Date.now();
    let cache_key = new Request(`${baseurl}/users/${username}`);
    let cache = caches.default;

    let user_raw = await cache.match(cache_key);

    if (!user_raw) {
        user_raw = await fetch(`${baseurl}/users/${username}`, {
            headers: {
                origin: baseurl,
                referer: `${baseurl}/users/${username}`,
                "user-agent": "Mozilla/5.0 TIOJ Stats Card",
            },
        });

        user_raw = new Response(user_raw.body, user_raw);
        user_raw.headers.append("Cache-Control", "s-maxage=300");

        await cache.put(cache_key, user_raw.clone());
    }

    const user_data_raw = await user_raw.text();

    let _name,
        _username,
        _about = "",
        _avatar,
        _user_id = null;

    try {
        [_name, _username] = [...user_data_raw.matchAll(/<h5>([^]+?)<\/h5>\s+?<h6>([^]+?)<\/h6>/g)][0].slice(1);
    } catch (e) {
        console.log("Not Found: Name, Username");
    }

    try {
        [_about] = [...user_data_raw.matchAll(/<dfn>([^]+?)<\/dfn>/g)][0].slice(1);
    } catch (e) {
        console.log("Not Found: About");
    }

    try {
        [_avatar] = [...user_data_raw.matchAll(/<img class="img-rounded img-responsive" src="([^]+?)"/g)][0].slice(1);
    } catch (e) {
        console.log("Not Found: Avatar");
    }

    let problems = {
        success: [],
        warning: [],
        muted: [],
    };

    [...user_data_raw.matchAll(/<a class="text-([^]+?)" href="\/problems\/(\d{4})\/submissions\?filter_user_id=(\d{1,6})">\d{4}<\/a>/g)].forEach((problem) => {
        problems[problem[1]].push(problem[2]);
        _user_id = problem[3];
    });

    DEBUG.user_data = Date.now() - debug;

    return {
        name: _name,
        username: _username,
        about: _about,
        avatar: _avatar,
        user_id: _user_id,
        problems: problems,
    };
}

async function user_activity(user_id) {
    let debug = Date.now();
    let cache_key = new Request(`${baseurl}/submissions?filter_user_id=${user_id}`);
    let cache = caches.default;

    let activity_raw = await cache.match(cache_key);

    if (!activity_raw) {
        activity_raw = await fetch(`${baseurl}/submissions?filter_user_id=${user_id}`, {
            headers: {
                origin: baseurl,
                referer: `${baseurl}/submissions?filter_user_id=${user_id}`,
                "user-agent": "Mozilla/5.0 TIOJ Stats Card",
            },
        });

        activity_raw = new Response(activity_raw.body, activity_raw);
        activity_raw.headers.append("Cache-Control", "s-maxage=300");

        await cache.put(cache_key, activity_raw.clone());
    }

    const user_activity_raw = await activity_raw.text();

    let submissions = [];

    [
        ...user_activity_raw.matchAll(
            /<tr>\s+?<td><a href="\/submissions\/\d+?">(\d+?)<\/a><\/td>\s+?<td><a href="\/problems\/\d+?">(\d+?)<\/a><\/td>\s+?<td>([^]+?)<\/td>\s+?<td>(\d+?)<\/td>\s+?<td>(\d+?)<\/td>\s+?<td[^]*?>([^]+?)<\/td>\s+?<td>([^]+?)<\/td>\s+?<td>([^]+?)<\/td>\s+?<td>(\d+?)<\/td>\s+?<td>([^]+?)<\/td>\s+?<\/tr>/g
        ),
    ].forEach((submission) => {
        submissions.push({
            id: submission[1],
            problem: submission[2],
            lang: language(submission[7]),
            status: submission[6],
            time: new Date(submission[10]),
        });
    });

    DEBUG.user_activity = Date.now() - debug;

    return submissions.slice(0, 6);
}

async function rank_page(n = 1) {
    let debug = Date.now();
    let cache_key = new Request(`${baseurl}/users?page=${n}`);
    let cache = caches.default;

    let page_raw = await cache.match(cache_key);

    if (!page_raw) {
        page_raw = await fetch(`${baseurl}/users?page=${n}`, {
            headers: {
                origin: baseurl,
                referer: `${baseurl}/users?page=${n}`,
                "user-agent": "Mozilla/5.0 TIOJ Stats Card",
            },
        });

        page_raw = new Response(page_raw.body, page_raw);
        page_raw.headers.append("Cache-Control", "s-maxage=600");

        await cache.put(cache_key, page_raw.clone());
    }

    const page = await page_raw.text();

    let map = {};
    [
        ...page.matchAll(
            /<tr>\s*?<td>(\d+?)<\/td>\s*?<td><a href="\/users\/([^]+?)"><img class="img-rounded" src="[^]*?" alt="[^]*?" \/><\/a><\/td>\s*?<td><a href="\/users\/[^]*?">[^]*?<\/a><\/td>/g
        ),
    ].forEach((row) => {
        map[row[2]] = Number(row[1]);
    });

    DEBUG.rank_page[n] = Date.now() - debug;

    return map;
}

function language(raw) {
    if (raw.includes("c++")) {
        return "C++";
    }
    if (raw.includes("c")) {
        return "C";
    }
    if (raw.includes("python")) {
        return raw.replace("p", "P");
    }
    return raw;
}

async function tioj_data(username) {
    DEBUG.GENERATOR_START_TIME = new Date();
    const pages = Promise.all([rank_page(1), rank_page(2), rank_page(3), rank_page(4)]);
    const user = await user_data(username);
    const activity = await user_activity(user.user_id);

    const rank = (await pages).reduce((a, b) => Object.assign({}, a, b), {});

    DEBUG.GENERATOR_END_TIME = new Date();
    return {
        username: user.username || null,
        profile: {
            user_id: Number(user.user_id),
            name: user.name || null,
            avatar: baseurl + user.avatar || null,
            about: user.about,
            ranking: rank[user.username] ? rank[user.username] : "100+",
        },
        problem: {
            total: user.problems.success.length + user.problems.warning.length + user.problems.muted.length,
            solved: user.problems.success.length,
            tried: user.problems.success.length + user.problems.warning.length,
        },
        activity: activity,
        _DEBUG: DEBUG,
    };
}

export { tioj_data };

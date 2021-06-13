const baseurl = "https://tioj.ck.tp.edu.tw";

async function user_data(username) {
    let user_raw = await fetch(`${baseurl}/users/${username}`, {
        headers: {
            origin: baseurl,
            referer: `${baseurl}/users/${username}`,
            "user-agent": "Mozilla/5.0 TIOJ Stats Card",
        },
    });

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
    let activity_raw = await fetch(`${baseurl}/submissions?filter_user_id=${user_id}`, {
        headers: {
            origin: baseurl,
            referer: `${baseurl}/submissions?filter_user_id=${user_id}`,
            "user-agent": "Mozilla/5.0 TIOJ Stats Card",
        },
    });

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

    return submissions;
}

async function rank_page(n = 1) {
    let page_raw = await fetch(`${baseurl}/users?page=${n}`, {
        headers: {
            origin: baseurl,
            referer: `${baseurl}/users?page=${n}`,
            "user-agent": "Mozilla/5.0 TIOJ Stats Card",
        },
    });

    const page = await page_raw.text();

    let map = {};
    [
        ...page.matchAll(
            /<tr>\s*?<td>(\d+?)<\/td>\s*?<td><a href="\/users\/([^]+?)"><img class="img-rounded" src="[^]*?" alt="[^]*?" \/><\/a><\/td>\s*?<td><a href="\/users\/[^]*?">[^]*?<\/a><\/td>/g
        ),
    ].forEach((row) => {
        map[row[2]] = Number(row[1]);
    });

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
    const pages = Promise.all([rank_page(1), rank_page(2), rank_page(3), rank_page(4)]);
    const user = await user_data(username);
    const activity = await user_activity(user.user_id);

    const rank = (await pages).reduce((a, b) => Object.assign({}, a, b), {});
    rank;

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
    };
}

export { tioj_data };

# TIOJ Stats Card
Inspired By [LeetCode Stats Card](https://github.com/Stats-Card/leetcode-stats-card). :)

A simple tool for every TIOJ Coder.

Show your TIOJ stats on your GitHub profile or your website!

[Try It Now](https://tioj.card.workers.dev/)

[![TIOJ Stats](https://tioj.card.workers.dev/?username=casperwang&r=5550944)](https://tioj.card.workers.dev/)

## Usage
Just copy the code below, paste it into your readme.md, and change the value of `username`.

```md
![TIOJ Stats](https://tioj.card.workers.dev/?username=casperwang)
```

Congratulation! You are now showing your TIOJ stats on your profile!

Want hyperlink? Try this:

```md
[![TIOJ Stats](https://tioj.card.workers.dev/?username=casperwang)](https://tioj.ck.tp.edu.tw/users/casperwang)
```

### Endpoint
The endpoint of this awesome tool is: 

[https://tioj.card.workers.dev/](https://tioj.card.workers.dev/)

### Parameters

Key              |Description                              |Default Value    |Required
---              |---                                      |---              |---
`username`       |Your TIOJ Username: `String`         |`null`           | YES
`style`          |Card [Style](#styles): `String`          |`default`        | NO
`width`          |Card Width: `Number`                     |`500`            | NO
`height`         |Card Height: `Number`                    |`200`            | NO
`animation`      |Enable Animation: `Boolean`              |`true`           | NO
`border`         |Border Width: `Number`                   |`1`              | NO
`border_radius`  |Border Radius: `Number`                  |`4`              | NO

### Styles
Now we only have 2 styles (and 1 beta style). If you have any great idea, please let me know. Also, any PR or Issue with cool features or styles are welcome!

#### Default
![TIOJ Stats](https://tioj.card.workers.dev/?username=casperwang&style=default&r=5550944)

#### Dark
![TIOJ Stats](https://tioj.card.workers.dev/?username=casperwang&style=dark&r=5550944)

#### Auto (Beta)
![TIOJ Stats](https://tioj.card.workers.dev/?username=casperwang&style=auto&r=5550944)

const html = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="https://raw.githubusercontent.com/Stats-Card/tioj-stats-card/main/favicon/tioj.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TIOJ Stats Card</title>
        <meta property="og:title" content="TIOJ Stats Card" />
        <meta property="og:description" content="A simple tool for every TIOJ coder. Show your TIOJ stats on your GitHub profile or your website!" />
    </head>
    <body>
        <h1>TIOJ Stats Card</h1>
        <input id="username" placeholder="Your TIOJ Username">
        <select id="style">
            <option value="default" selected>Default</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (Beta)</option>
        </select>
        <div>
            <button onclick="preview()">Preview</button>
            <button onclick="go()">Go</button>
            <button onclick="md()">Markdwon</button>
        </div>
        <div>
            <img id="preview" src="https://tioj.card.workers.dev/?username=casperwang"></img>
        </div>
        <div style="height: 20px;"></div>
        <div>
            <a href="https://github.com/Stats-Card/tioj-stats-card">View on GitHub</a>
        </div>
        <style>
            html, body {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                font-family: sans-serif;
            }
            h1 {
                margin: 8px 0;
            }
            input, select {
                width: 320px;
                margin: 8px 0;
                padding: 2px;
            }
            button {
                width: 100px;
                margin: 8px;
            }
            div {
                width: 320px;
                margin: 8px 0;

                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
            img {
                width: 100%;
                min-height: 128px;
            }
        </style>
        <script>
            function url() {
                if(!document.querySelector("#username").value.trim()) document.querySelector("#username").value = "casperwang";
                return location.origin + "/?username=" + document.querySelector("#username").value.trim() + "&style=" + document.querySelector("#style").value;
            }
            function preview() {
                document.querySelector("#preview").src = url();
            }
            function go() {
                let win = window.open();
                win.location = url()
            }
            function md() {
                let code = "![TIOJ Stats](" + url() + ")";
                prompt("Markdown Code: ", code);
            }
        </script>
    </body>
</html>
`;

export { html };


import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const rglr = readFileSync(`${__dirname}/../_fonts/lmroman10-regular.woff2`).toString('base64');
const italic = readFileSync(`${__dirname}/../_fonts/lmroman10-italic.woff2`).toString('base64');


function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';


    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';

    }
    return `
    @font-face {
        font-family: 'Latin Modern';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Latin Modern';
        font-style:  italic;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${italic}) format('woff2');
    }

   

    body {
        background: ${background};
        background-color: #f9f8f6;
        height: 100vh;
        
    }
    article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{font-size:100%;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}html,button,input,select,textarea{font-family:sans-serif}body{margin:0}a:focus{outline:0}a:active,a:hover{outline:0}h1{font-size:1em;margin:0}h2{font-size:1em;margin:0}h3{font-size:1em;margin:0}h4{font-size:1em;margin:0}h5{font-size:1em;margin:0}h6{font-size:1em;margin:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}blockquote{margin:1em 40px}dfn{font-style:italic}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}mark{background:#ff0;color:#000}p,pre{margin:1em 0}code,kbd,pre,samp{font-family:monospace,serif;_font-family:'courier new',monospace;font-size:1em}pre{white-space:pre;white-space:pre-wrap;word-wrap:break-word}q{quotes:none}q:before,q:after{content:'';content:none}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}dl,menu,ol,ul{margin:1em 0}dd{margin:0 0 0 40px}menu,ol,ul{padding:0 0 0 40px}nav ul,nav ol{list-style:none;list-style-image:none}img{border:0;-ms-interpolation-mode:bicubic}svg:not(:root){overflow:hidden}figure{margin:0}form{margin:0}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0;white-space:normal;*margin-left:-7px}button,input,select,textarea{font-size:100%;margin:0;vertical-align:baseline;*vertical-align:middle}button,input{line-height:normal}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;*overflow:visible}button[disabled],html input[disabled]{cursor:default}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0;*height:13px;*width:13px}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}textarea{overflow:auto;vertical-align:top}table{border-collapse:collapse;border-spacing:0}
    body, html {height: 100%;}
    *, *:before, *:after {-moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;}

    .image {
        width: 1200px;
        height: 630px;
        padding: 40px;
        background-color: #f9f8f6;
    }
    
    
    .text {
        width: 1120px;
        height: 500px;
        line-height: 1.16;
        font-style: normal;
        font-size: ${sanitizeHtml(fontSize)};
        
    }
    
    .headline {
        font-family: 'Latin Modern', sans-serif;
        font-size: 1em;
        line-height: 1.16;
        color: ${foreground};
    }
    
    .subheadline {
        font-family: 'Latin Modern', sans-serif;
        font-style: italic;
        font-size: 0.75em;
        line-height: 1.16;
        color: grey;
        line-height: 1.8;
    }
    
    
    
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, author, theme, fontSize } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>OA.mg OG Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/textFit.js"></script>
    
    <body>
        <div class="image">
        <div class="text">
            <div class="headline">${text}
            </div>
            
            <div class="subheadline">${author}
            </div>
        </div>
            
        </div>
        <script>
        textFit(document.querySelector(".text"));
        </script>
    </body>
</html>`;
}

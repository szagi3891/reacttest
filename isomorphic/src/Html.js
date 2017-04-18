import React from 'react';
import App from './App';

import favicon from './favicon.ico';

const Html = () => (
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="shortcut icon" href={favicon} />
            <title>React App</title>
        </head>
        <body>
            <div id='root'>
                <App />
            </div>
            <script type='text/javascript' src='/index.js' />
        </body>
    </html>
);

export default Html;

/*
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <!--
      Notice the use of %PUBLIC_URL% in the tag above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start`.
      To create a production bundle, use `npm run build`.
    -->
  </body>
</html>

export default function Html(props) {
  return (<html>
    <head></head>
    <body>
      <div id='content'><App {...props} /></div>
      <script type='text/javascript' dangerouslySetInnerHTML={{__html: 'var APP_PROPS = ' + JSON.stringify(props) + ';'}} />
      <script type='text/javascript' src='/js/bundle.js' />
    </body>
  </html>);
}
*/
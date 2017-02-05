$('source').get(0) - dostajemy element z video

((() => {
    const source = $('source');

    if (source.length === 1) {
        window.open($('source').get(0).getAttribute('src'));
    } else {
        console.error('brak video', $('source'));
    }
})());




download("sdadsa", "test.txt");



$.get(file).then((resp) => {
    download(resp, 'kurs.mp4');
    });




((() => {

    function download(content, filename) {
        var a = document.createElement('a');
        var blob = new Blob([content], {'type':'application/octet-stream'});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
    }

    var file = $('source').get(0).getAttribute('src');

    $.ajax({
            url: file
        })
        .then((resp) => {
            download(resp, 'kurs.mp4');
        });
})());


//application/octet-stream

var oReq = new XMLHttpRequest();
oReq.open("GET", "/myfile.png", true);
oReq.responseType = "arraybuffer";

oReq.onload = function(oEvent) {
    var arrayBuffer = oReq.response;

    // if you want to access the bytes:
    var byteArray = new Uint8Array(arrayBuffer);
    // ...

    // If you want to use the image in your DOM:
    var blob = new Blob(arrayBuffer, {type: "image/png"});
    var url = URL.createObjectURL(blob);
    someImageElement.src = url;

    // whatever...
};

oReq.send();
        //var blob = new Blob([content], {'type':'application/octet-stream'});



((() => {
    const downloadBlob = (blob, fileName) => {
        console.info(`3/3: downloadBlob -> ${fileName}`);
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
    };

    const downloadFile = (url, fileName) => {
        console.info(`1/3: downloadFile -> ${url} -> ${fileName}`);
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function(oEvent) {
            console.info(`2/3: downloadFile (onLoad) -> ${url} -> ${fileName}`);
            var arrayBuffer = oReq.response;
            //var byteArray = new Uint8Array(arrayBuffer);
            var blob = new Blob([arrayBuffer], {type: "image/png"});
            downloadBlob(blob, fileName);
        };

        oReq.send();
    };

    const formatNumber = (num, max) => {
        const maxLen = max.toString().length;
        let out = num.toString();
        while (out.length < maxLen) {
            out = '0' + out;
        }
        return out;
    };

    const getCurrentTime = () => {
        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        return `${formatNumber(year, 3000)}-${formatNumber(month, 12)}-${formatNumber(day, 31)}`;
    };

    const getFileName = (ext) => {
        const course = $('.series-title').text().trim();
        const title = $('.title').text().trim();
        const currentTime = getCurrentTime();

        if (course.length > 0) {
            const listItems = jQuery('.playlist-lessons-list > div');
            const max = listItems.length;

            const getCurrent = () => {
                for (const [key,value] of listItems.get().entries()) {
                    if (jQuery(value).find('.icon-play').length > 0) {
                        return key + 1;
                    }
                }

                throw Error('nieprawidłowy stan przy pobieraniu obecnego elementu');
            };

            const current = formatNumber(getCurrent(), max);
            return `${course} - [${currentTime}] - [${current} of ${max}] - ${title}.${ext}`;
        } else {
            return `[Independent] - [${currentTime}] - ${title}.${ext}`;
        }
    };

    const getUrl = () => $('source').get(0).getAttribute('src');

    const getExt = (url) => {
        var re = /(?:\.([^.]+))?$/;
        return re.exec(url)[1];
    };

    const url = getUrl();
    const ext = getExt(url);
    downloadFile(url, getFileName(ext));
})());


https://javascript-minifier.com/
https://babeljs.io/repl/

do zakładek
javascrit:papka

"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_slicedToArray=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(l){o=!0,i=l}finally{try{!r&&u["return"]&&u["return"]()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();!function(){var t=function(t,e){console.info("3/3: downloadBlob -> "+e);var n=document.createElement("a");n.href=window.URL.createObjectURL(t),n.download=e,n.click()},e=function(e,n){console.info("1/3: downloadFile -> "+e+" -> "+n);var r=new XMLHttpRequest;r.open("GET",e,!0),r.responseType="arraybuffer",r.onload=function(o){console.info("2/3: downloadFile (onLoad) -> "+e+" -> "+n);var i=r.response,a=new Blob([i],{type:"image/png"});t(a,n)},r.send()},n=function(t,e){for(var n=e.toString().length,r=t.toString();r.length<n;)r="0"+r;return r},r=function(){var t=new Date,e=t.getFullYear(),r=t.getMonth()+1,o=t.getDate();return n(e,3e3)+"-"+n(r,12)+"-"+n(o,31)},o=function(t){var e=$(".series-title").text().trim(),o=$(".title").text().trim(),i=r();if(!(e.length>0))return"[Independent] - ["+i+"] - "+o+"."+t;var a=function(){var r=jQuery(".playlist-lessons-list > div"),a=r.length,u=function(){var t=!0,e=!1,n=void 0;try{for(var o,i=r.get().entries()[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=_slicedToArray(o.value,2),u=a[0],l=a[1];if(jQuery(l).find(".icon-play").length>0)return u+1}}catch(f){e=!0,n=f}finally{try{!t&&i["return"]&&i["return"]()}finally{if(e)throw n}}throw Error("nieprawidłowy stan przy pobieraniu obecnego elementu")},l=n(u(),a);return{v:e+" - ["+i+"] - ["+l+" of "+a+"] - "+o+"."+t}}();return"object"===("undefined"==typeof a?"undefined":_typeof(a))?a.v:void 0},i=function(){return $("source").get(0).getAttribute("src")},a=function(t){var e=/(?:\.([^.]+))?$/;return e.exec(t)[1]},u=i(),l=a(u);e(u,o(l))}();

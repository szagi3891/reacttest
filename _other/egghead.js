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

export const LoadFileToText = async (filepath) => {
    const csstext = await fetch(filepath).then((data) => data.text());
    return csstext;
};


    // // create new link tag
    // var link = document.createElement('link');

    // // set properties of link tag
    // link.href = `${ filename }`;
    // link.rel = 'stylesheet';
    // link.type = 'text/css';

    // // Loaded successfully
    // link.onload = function () {
    //     console.log('success');
    // };

    // // Loading failed
    // link.onerror = function () {
    //     console.log('error');
    // };

    // // append link element to html
    // return document.body.appendChild(link);

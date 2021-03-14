function importDynamicCssToSVG(svgId, cb) {
    const obj = document.getElementById(svgId);
    const objDoc = obj.contentDocument;
    const objStyle = objDoc.createElementNS(
        "http://www.w3.org/2000/svg",
        "style"
    );

    objStyle.textContent = '@import url("../../../sass/main.css");';
    const objSvg = objDoc.querySelector("svg");
    objSvg.insertBefore(objStyle, objSvg.firstChild);
    if (cb) {
        cb(objSvg);
    }
}

function toggleLed(obj, ledId, classExtend, duration, delay = 0) {
    const ledEl = obj.getElementById(ledId);
    ledEl.classList.add(classExtend);
    setInterval(() => {
        ledEl.classList.toggle(classExtend);
    }, duration);
}

window.onload = function () {
    const cbToggleLed = function (obj) {
        toggleLed(obj, "green-led", "green-led-off", 2000);
        setTimeout(() => {
            toggleLed(obj, "red-led", "red-led-off", 2000);
        }, 2000);
    };

    importDynamicCssToSVG("explore-svg", cbToggleLed);
    importDynamicCssToSVG("about-svg");
    importDynamicCssToSVG("market-svg");

    const progressBar = document.querySelector(".progressBar");
    console.log(progressBar);
    let totalPageHeight = document.body.scrollHeight - window.innerHeight;
    window.onscroll = () => {
        let newProgressHeight = (window.pageYOffset / totalPageHeight) * 100;
        progressBar.style.height = `${newProgressHeight}%`;
    };
};

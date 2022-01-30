window.addEventListener("DOMContentLoaded", () => {
    const arrows = document.querySelectorAll(".mobile-aside i");
    const span = document.querySelector(".mobile-aside span");
    const content = document.querySelector("#content");

    const toggleState = () => {
        arrows.forEach((el) => {
            el.classList.toggle("fa-arrow-up");
            el.classList.toggle("fa-arrow-down");
        });
        span.classList.toggle("active");
        content.style.display = content.style.display === "block" ? "none" : "block";
    };

    document.querySelector(".mobile-aside").addEventListener("click", function () {
        toggleState();
    });
    document.querySelector("#close").addEventListener("click", function () {
        toggleState();
    });

    document.querySelectorAll("#order, #price, #services").forEach(function (el) {
        el.querySelector("h3").addEventListener("click", () => {
            el.classList.toggle("active");
        });
    });

    (function () {
        var parent = document.querySelector("#range-slider");
        
        if (!parent) return;

        var rangeS = parent.querySelectorAll("input[type=range]"),
            numberS = parent.querySelectorAll("input[type=number]");

        rangeS.forEach(function (el) {
            el.oninput = function () {
                var slide1 = parseFloat(rangeS[0].value),
                    slide2 = parseFloat(rangeS[1].value);

                if (slide1 > slide2) {
                    [slide1, slide2] = [slide2, slide1];
                }

                numberS[0].value = slide1;
                numberS[1].value = slide2;
            };
        });

        numberS.forEach(function (el) {
            el.oninput = function () {
                var number1 = parseFloat(numberS[0].value),
                    number2 = parseFloat(numberS[1].value);

                if (number1 > number2) {
                    var tmp = number1;
                    numberS[0].value = number2;
                    numberS[1].value = tmp;
                }

                rangeS[0].value = number1;
                rangeS[1].value = number2;
            };
        });
    })();

});

let mapped = $('#map-container');
let list = $('.filter-options');
let air = $('area');
let print = $('.gmnoprint > img');
let imgs = $('img');

$(window).scroll(() => {
    mapped.addClass("small");
    list.addClass("small-filter");
});

function setAttr() {
    $('iframe')[0].title = "map";

    for (let i = 0; i < $('area').length; i++) {
        $('area')[i].alt = $('area')[i].title;
        $('.gmnoprint > img')[i].alt = "marker";
    }


    for (let j = 0; j <= $('img').length; j++) {
        if (j <= 9) {
            $('img')[j].alt = "marker";
        } else if (j <= 21 && j > 9) {
            $('img')[j].alt = "map";
        } else if (j == 32) {
            $('img')[j].alt = "google logo";
        } else if (j > 32 && j <= 41 || j == 30 || j == 31) {
            $('img')[j].alt = "accessibility icons";
        }
    }
}

setTimeout(() => {
    setAttr();
}, 1000);
let mapped = $('#map-container');
let list = $('.filter-options');
let air = $('area');

$(window).scroll(function() {
    mapped.addClass("small");
    list.addClass("small-filter");
});

function setAttr() {
    for (let i = 0; i < $('area').length; i++) {
    $('area')[i].alt = $('area')[i].title;
    }
}

setTimeout(() => {
    setAttr();    
}, 1000);
/* $('area')["0"].alt = $('area')["0"].title; */
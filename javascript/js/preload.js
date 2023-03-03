function preloader() {
    if (document.images) {
        var img1 = new Image();
        var img2 = new Image();
        var img3 = new Image();
        var img4 = new Image();
        var img5 = new Image();
        var img6 = new Image();
        var img7 = new Image();
        var img8 = new Image();
        var img9 = new Image();
        var img10 = new Image();
        var img11 = new Image();
        var img12 = new Image();
        var img13 = new Image();
        var img14 = new Image();
        var img15 = new Image();
        img1.src = "/base/newbf/group_icons/color/common_sense.png";
        img2.src = "/base/newbf/group_icons/color/city.png";
        img3.src = "/base/newbf/group_icons/color/finance.png";
        img4.src = "/base/newbf/group_icons/color/agriculture.png";
        img5.src = "/base/newbf/group_icons/color/geography.png";
        img6.src = "/base/newbf/group_icons/color/meteorology.png";
        img7.src = "/base/newbf/group_icons/color/social_contact.png";
        img8.src = "/base/newbf/group_icons/color/Internet_thing.png";
        img9.src = "/base/newbf/group_icons/color/medicine.png";
        img10.src = "/base/newbf/group_icons/color/entertainment.png";
        img11.src = "/base/newbf/group_icons/color/life.png";
        img12.src = "/base/newbf/group_icons/color/commerce.png";
        img13.src = "/base/newbf/group_icons/color/travel.png";
        img14.src = "/base/newbf/group_icons/color/education.png";
        img15.src = "/base/newbf/group_icons/color/else.png";

    }
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);

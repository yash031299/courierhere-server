globalStopper = true
/*if (globalStopper === false)
    return true; //proceed with click if stopper is NOT set
else {
    globalStopper = false; //release the breaks

    $.ajax({
        //blahblah
        complete: function (xhr, status,) {
            $(elem).click(); //when ajax request done - "rerun" the click
        }
    });
    return false; //DO NOT let browser process the click
}*/

const loginSignUp = () => {

    if (globalStopper === false)
        return true;
    else {
        globalStopper = false;
        var settings = {
            url: "http://localhost:3001/login",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            data: {
                "email": "vishwakaarmayash24@gmail.com",
                "password": "golu5467"
            }
        };
        $.ajax(settings).done(function (response) {
            globalStopper = true
            loginSignup()
        });

        return false; //DO NOT let browser process the click
    }
    /*var settings = {
        url: "http://localhost:3001/login",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        data: {
            "email": "vishwakaarmayash24@gmail.com",
            "password": "golu5467"
        }
    };
    $.ajax(settings).done(function (response) {
        console.log(response)
    });
    */
}

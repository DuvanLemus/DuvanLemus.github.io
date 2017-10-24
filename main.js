$(function () {
    var app_id = '88e305a1c1ca03c1d9cfd3f73eae4b04';
    var scopes = 'email, user_friends, user_online_presence';

    var btn_login = '<a href="#" id="Login" class="btn btn-primary">Iniciar Sesion con Facebook</a>';

    var div_session = "<div id='facebook-session'>" +
        "<strong></strong>" +
        "<img>" +
        "<a href='#' id='Logout'class='btn btn-danger'>Cerrar Sesion con Facebook</a>" +
        "</div>";

    window.fbAsyncInit = function () {
        FB.init({
            appId: app_id,
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.8'
        });

        FB.getLoginStatus(function (response) {
            statusChangeCallback(response, function () {

            });
        });
    };

    var statusChangeCallback = function (response, callback) {
        console.log(response);
        if (response.status === 'connected') {
            getFacebookData();
        } else {
            callback(false);
        }
    }

    var checkLoginState = function (callback) {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response, function (data) {
                callback(data);
            });
        });
    }

    var getFacebookData = function () {
        FB.api('/me', function (response) {
            $('#Login').after(div_session);
            $('#Login').remove();
            $('#facebook-session strong').text("Bienvenido: " + response.name);
            $('#facebook-session img').attr('src', 'htttp:graph.facebook.com/' + response.id + '/picture?type=large');
        })
    }

    var facebookLogin = function () {
        checkLoginState(function (response) {
            if (!response) {
                FB.login(function (response) {
                    if (response.status === 'connected')
                        getFacebookData();
                }, { scope: scopes });
            }
        })
    }

    var facebookLogout = function () {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                FB.logout(function (response) {
                    $('#facebook-session').before(btn_login);
                    $('#facebook-session').remove();
                })
            }
        })
    }

    $(document).on('click', '#Login', function (e) {
        e.preventDefault();

        facebookLogin();
    })

    $(document).on('click', '#Logout', function (e) {
        e.preventDefault();

        if (confirm("¿Esta seguro?"))
            facebookLogout();
        else
            return false;

    })

})

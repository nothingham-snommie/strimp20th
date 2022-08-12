document.addEventListener("DOMContentLoaded", function() {
    console.log("loaded DOM");
    updateHUD();
});

function updateHUD() {
    hud = document.getElementById("strimpCounter");
    hud.innerHTML = totalStrimps;
}
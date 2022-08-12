document.addEventListener("DOMContentLoaded", function() {
    console.log("loaded DOM");
    updateCounter();
});

function updateCounter() {
    let counter = document.getElementById("strimpCounter");
    counter.innerHTML = totalStrimps;
}
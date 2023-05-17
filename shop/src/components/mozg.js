//міні галерея запускає велику галерею   https://youtu.be/5bM0J4KCBeI
document.querySelectorAll('.img-container img').forEach(img =>{
    img.onclick = () => {
        document.querySelector('.pop-up').style.display = 'block';
        document.querySelector('.pop-up img').src = img.getAttribute('src');
    }
});

document.querySelector('.pop-up span').onclick = () => {
    document.querySelector('.pop-up').style.display = 'none'; 
}

//скрол від кнопки до блока з інфою    https://youtu.be/4uRfBzLc85A
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const blockid = anchor.getAttribute('href')
        document.querySelector('' + blockid).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}

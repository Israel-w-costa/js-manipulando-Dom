const musicaDoInput = document.querySelector ('#alternar-musica')
const musica = new Audio ('../sons/luna-rise-part-one.mp3')
musica.loop = true

musicaDoInput.addEventListener ('change', ()=> {
    if (musica.paused){
        musica.play ()
    } else (
        musica.pause ()
    )
})

import gsap from "gsap";
export function sendMessage(value = "", delay = 1000) {
    document.querySelector(".Message p").innerHTML = value;
    gsap.to(".Message", {
        right: 0,
        duration: 2,
        ease: "power2",
        overwrite: true,
        onComplete: () => {
            setTimeout(() => {
                gsap.to(".Message", {
                    right: "-100%",
                    duration: 2,
                    ease: "sine"
                })
            }, delay)
        }
    })
}

export function playSound() {
    const audio = new Audio("https://zh.minecraft.wiki/images/transcoded/Click.ogg/Click.ogg.mp3");
    audio.play();
}

import gsap from "gsap";
export function sendMessage(value = "",delay = 1000){
    document.querySelector(".Message p").innerHTML = value;
    gsap.fromTo(".Message",{
        right: "-100%",
    },{
        right: 0,
        duration: 2,
        ease: "power2",
        onComplete:()=>{
            setTimeout(()=>{
                gsap.to(".Message",{
                    right: "-100%",
                    duration: 2,
                    ease:"power2"
                })
            },delay)
        }
    })
}
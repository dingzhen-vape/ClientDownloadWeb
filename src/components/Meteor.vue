<script>
import { gsap } from 'gsap';
export default {
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        Reset() {
            gsap.to(".WurstBase", {
                width: "49.5%",
                duration: 1,
                ease: "power2"
            })
            gsap.to(".MeteorBase", {
                width: "49.5%",
                duration: 1,
                ease: "power2"
            })
            gsap.to(
                ".Meteor-icon", {
                top: "50%",
                left: "50%",
                duration: 1,
                ease: "power2",
            })
            gsap.to(".Refresh", {
                opacity: "1",
                visibility:"visible",
                duration: 0.3
            })
            gsap.to(".Wurst-icon", {
                opacity: 1,
                duration: 1,
                ease: "power2"
            })
            gsap.fromTo(".MeteorBack", {
                right: "2%",
                opacity: 1
            }, {
                right: "-10%",
                opacity: 0,
                duration: 1,
                ease: "power2",
                onComplete:()=>{
                    this.isShow = false;
                }
            })
            document.querySelector(".Wurst-icon").style.pointerEvents = "auto";

        },
        Onclick() {
            this.isShow = true;
            gsap.to(".WurstBase", {
                width: "5%",
                duration: 1,
                ease: "power2"
            })
            gsap.to(".MeteorBase", {
                width: "95%",
                duration: 1,
                ease: "power2"
            })
            gsap.to(
                ".Meteor-icon", {
                top: "10%",
                left: "50%",
                duration: 1,
                ease: "power2",
                clearProps: "transform",
            })
            gsap.to(".Refresh", {
                opacity: "0",
                visibility:"hidden",
                duration: 0.3
            })
            gsap.to(".Wurst-icon", {
                opacity: 0,
                duration: 1,
                ease: "power2"
            })
            gsap.fromTo(".MeteorBack", {
                visibility: "visible",
                right: "-10%",
                opacity: 0
            }, {
                right: "2%",
                opacity: 1,
                duration: 1,
                ease: "power2"
            })
            document.querySelector(".Wurst-icon").style.pointerEvents = "none";

            // document.getElementsByClassName("Refresh")[0].style.visibility = "hidden";
            // document.querySelector(".Wurst-icon").style.opacity = 0;
            // document.querySelector(".Refresh").style.opacity = 0;

        }
    }
}
</script>
<template>
    <div class="MeteorBase">
        <div class="Meteor">
            <div class="Meteor-icon icon" @click="Onclick">
                <img src="../assets/MeteorIcon.png" alt="">
            </div>
        </div>
    </div>
    <div class="Button MeteorBack" v-show="isShow" @click="Reset" style="visibility: hidden; opacity: 0;">
        <div class="title">
            <h1>返回</h1>
        </div>
    </div>
</template>
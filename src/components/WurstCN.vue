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
                ".Wurst-icon", {
                top: "50%",
                left: "50%",
                duration: 1,
                ease: "power2",
            })
            gsap.to(".Refresh", {
                opacity: "1",
                duration: 0.3,
                ease: "power2"

            })
            gsap.to(".Meteor-icon", {
                opacity: 1,
                duration: 1,
                ease: "power2"
            })
            gsap.fromTo(".WurstBack", {
                visibility: "visible",
                left: "10%",
                opacity: 1
            }, {
                left: "-10%",
                opacity: -1,
                duration: 1,
                ease: "power2",
                onComplete: () => {
                    this.isShow = false;
                }
            })
            document.querySelector(".Meteor-icon").style.pointerEvents = "auto";
            document.querySelector(".Refresh").style.pointerEvents = "auto";

        },
        Onclick() {
            this.isShow = true;
            gsap.to(".MeteorBase", {
                width: "5%",
                duration: 1,
                ease: "power2"
            })
            gsap.to(".WurstBase", {
                width: "95%",
                duration: 1,
                ease: "power2"
            })
            gsap.to(
                ".Wurst-icon", {
                top: "10%",
                left: "50%",
                duration: 1,
                ease: "power2",
            })
            gsap.to(".Refresh", {
                opacity: "0",
                duration: 0.3,
                ease: "power2"
            })
            gsap.to(".Meteor-icon", {
                opacity: 0,
                duration: 1,
                ease: "power2"
            })
            gsap.fromTo(".WurstBack", {
                visibility: "visible",
                left: "-10%",
                opacity: 0
            }, {
                left: "10%",
                opacity: 1,
                duration: 1,
                ease: "power2"
            })
            document.querySelector(".Meteor-icon").style.pointerEvents = "none";
            document.querySelector(".Refresh").style.pointerEvents = "none";

        }
    }
}
</script>
<template>
    <div class="WurstBase">
        <div class="Wurst">
            <div class="Wurst-icon icon" @click="Onclick">
                <img src="../assets/Wurst.png" alt="">
            </div>
        </div>
    </div>
    <div class="Button WurstBack" @click="Reset" style="visibility: hidden; opacity: 0;">
        <div class="title">
            <h1>返回</h1>
        </div>
    </div>
</template>
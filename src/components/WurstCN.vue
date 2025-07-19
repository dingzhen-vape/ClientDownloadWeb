<script>
import { playSound } from '@/assets/Message';
import { gsap } from 'gsap';
export default {
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        Reset() {
            playSound()
            this.outAnimations();
            document.querySelector(".Meteor-icon").style.pointerEvents = "auto";
            document.querySelector(".Refresh").style.pointerEvents = "auto";

        },
        Onclick() {
            playSound()
            this.isShow = true;
            this.inAnimations();
            document.querySelector(".Meteor-icon").style.pointerEvents = "none";
            document.querySelector(".Refresh").style.pointerEvents = "none";
        },
        inAnimations() {
            // 移动Wurst和Meteor的背景板
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
            // 移动icon
            gsap.to(
                ".Wurst-icon", {
                pointerEvents: "none",
                top: "10%",
                left: "50%",
                duration: 1,
                ease: "power2",
            })
            //隐藏刷新按钮
            gsap.to(".Refresh", {
                opacity: "0",
                duration: 0.3,
                ease: "power2"
            })
            //隐藏Meteoricon
            gsap.to(".Meteor-icon", {
                opacity: 0,
                duration: 1,
                ease: "power2"
            })
            //显示返回按钮
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
            //显示列表
            gsap.fromTo(".WurstVerList", {
                opacity: 0,
                right: "-100%",
                height: "100%",
                duration: 1,
                ease: "power2"
            }, {
                opacity: 1,
                height: "80%",
                right: "0%",
                duration: 1,
                ease: "power2"
            })
        },
        outAnimations() {
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
                pointerEvents: "auto",
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
            gsap.fromTo(".WurstVerList", {
                opacity: 1,
                right: "0%",
                height: "80%",
                duration: 1,
                ease: "power2"
            }, {
                opacity: 0,
                height: "100%",
                right: "-100%",
                duration: 1,
                ease: "sine"
            })
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
            <slot></slot>
        </div>
    </div>
    <div class="Button WurstBack" @click="Reset" style="visibility: hidden; opacity: 0;">
        <div class="title">
            <h1>返回</h1>
        </div>
    </div>
</template>
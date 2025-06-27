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
            this.outAnimations();
            document.querySelector(".Wurst-icon").style.pointerEvents = "auto";
            document.querySelector(".Refresh").style.pointerEvents = "auto";

        },
        Onclick() {
            this.isShow = true;
            this.inAnimations();
            document.querySelector(".Wurst-icon").style.pointerEvents = "none";
            document.querySelector(".Refresh").style.pointerEvents = "none";
        },
        inAnimations() {
            // 将Wurst和Meteor的背景版往右移动
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
            // 移动Meteor的icon
            gsap.to(
                ".Meteor-icon", {
                pointerEvents: "none",
                top: "10%",
                left: "50%",
                duration: 1,
                ease: "power2",
            })
            // 隐藏刷新按钮
            gsap.to(".Refresh", {
                opacity: "0",
                duration: 0.3,
                ease: "power2"
            })
            // 隐藏Wurst的icon
            gsap.to(".Wurst-icon", {
                opacity: 0,
                duration: 1,
                ease: "power2"
            })
            // 显示返回按钮
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
            // 显示版本列表
            gsap.fromTo(".MeteorVerList", {
                opacity: 0,
                left: "-100%",
                height: "100%",
                duration: 1,
                ease: "power2"
            }, {
                opacity: 1,
                height: "80%",
                left: "0%",
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
                ".Meteor-icon", {
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
                onComplete: () => {
                    this.isShow = false;
                }
            })
            gsap.fromTo(".MeteorVerList", {
                opacity: 1,
                left: "0%",
                height: "80%",
                duration: 1,
                ease: "power2"
            }, {
                opacity: 0,
                height: "100%",
                left: "-100%",
                duration: 1,
                ease: "sine"
            })
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
            <slot></slot>
        </div>
    </div>
    <div class="Button MeteorBack" v-show="isShow" @click="Reset" style="visibility: hidden; opacity: 0;">
        <div class="title">
            <h1>返回</h1>
        </div>
    </div>
</template>
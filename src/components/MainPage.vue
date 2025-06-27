<script>
import { sendMessage } from '@/assets/Message';
import Meteor from './Meteor.vue';
import Wurst from './WurstCN.vue';
import axios from 'axios';
import { gsap } from 'gsap';
export default {
    data() {
        return {
            MeteorVerList: [],
            WurstVerList: [],
            LastTime:0
        }
    },
    components: {
        Meteor,
        Wurst,
    },
    methods: {
        InitList() {
            //初始化
            var loaclVer = localStorage.getItem("Versions")
            if (loaclVer !== null) {
                const LastTime = JSON.parse(loaclVer).LastTime
                const MeteorList = JSON.parse(loaclVer).Meteor
                const WurstList = JSON.parse(loaclVer).Wurst
                this.MeteorVerList = MeteorList
                this.WurstVerList = WurstList
                this.LastTime = LastTime
            } else {
                sendMessage("未在本地查找到已经存储的数据，正在获取...")
                setTimeout(this.refresh,1000)
            }
        },

        async refresh() {
            this.inAnimations()
        },

        async getMultipleVersions() {
            try {
                // 获取版本资源列表
                this.MeteorVerList = (await this.getVersion("MeteorCN")).data.assets;
                this.WurstVerList = (await this.getVersion("WurstCN")).data.assets;
                // console.log(MeteorVerList);

                //存储版本资源列表到本地缓存
                var Versions = {
                    LastTime: new Date().toLocaleString(),
                    Meteor: this.MeteorVerList,
                    Wurst: this.WurstVerList
                }
                localStorage.setItem("Versions", JSON.stringify(Versions))
                

                gsap.fromTo(".MeteorVerList", {
                    opacity: 0,
                    left: "-100%",
                    duration: 1,
                    ease: "power2"
                }, {
                    opacity: 1,
                    left: "0%",
                    duration: 1,
                    ease: "power2",
                })
                gsap.fromTo(".WurstVerList", {
                    opacity: 0,
                    right: "-100%",
                    duration: 1,
                    ease: "power2"
                }, {
                    opacity: 1,
                    right: "0%",
                    duration: 1,
                    ease: "power2",
                    onComplete: () => {
                        setTimeout(this.outAnimations(), 1000)
                    }
                })
                sendMessage("获取资源成功✌️")

            } catch (error) {
                sendMessage(`获取失败了QAQ,报错信息:${error}`,1000)
                this.outAnimations()

            }
        },

        async getVersion(name) {
            return await axios.get(`https://api.github.com/repos/dingzhen-vape/${name}/releases/tags/ATV`)
        },

        inAnimations() {
            document.querySelector(".Refresh h1").innerHTML = "刷新中...";
            gsap.to(".Refresh", {
                pointerEvents: "none",
                top: "5vw",
                width: "40%",
                duration: 1,
                ease: "power2",
                onComplete: () => {
                    this.getMultipleVersions()
                }
            })
            gsap.to(".MeteorBase", {
                translateY: "10vw",
                duration: 1,
                ease: "power2"
            })
            gsap.to(".WurstBase", {
                translateY: "10vw",
                duration: 1,
                ease: "power2"
            })
            gsap.to(".icon", {
                opacity: 0,
                duration: 1,
                ease: "power2",
                onComplete: () => {
                    gsap.to(".icon", { visibility: "hidden" })
                }
            })
        },
        outAnimations() {
            document.querySelector(".Refresh h1").innerHTML = "刷新";
            gsap.to(".Refresh", {
                pointerEvents: "auto",
                top: "50%",
                width: "7vw",
                duration: 1,
                ease: "power2",
                onComplete: () => {
                }
            })
            gsap.to(".MeteorBase", {
                translateY: "0",
                duration: 1,
                ease: "power2"
            })
            gsap.to(".WurstBase", {
                translateY: "0",
                duration: 1,
                ease: "power2"
            })
            gsap.to(".icon", {
                visibility: "visible",
                opacity: 1,
                duration: 1,
                ease: "power2",
            })
            gsap.fromTo(".WurstVerList", {
                opacity: 1,
                right: "0%",
                duration: 1,
                ease: "power2"
            }, {
                opacity: 0,
                right: "-100%",
                duration: 1,
                ease: "sine"
            })
            gsap.fromTo(".MeteorVerList", {
                opacity: 1,
                left: "0%",
                duration: 1,
                ease: "power2"
            }, {
                opacity: 0,
                left: "-100%",
                duration: 1,
                ease: "sine"
            })
        }
    },
    mounted() {
        this.InitList()
    }
}
</script>
<template>
    <div class="Message">
        <p>你好我的朋友</p>
    </div>
    <!-- 中间 -->
    <div class="base">

        <div class="main">
            <Meteor>
                <ul class="VerList MeteorVerList">
                    <li class="li1" v-for="(version, index) in MeteorVerList" :key="index">
                        <a :href="version.browser_download_url" target="_blank">{{ version.name }}</a>
                    </li>
                </ul>
            </Meteor>
            <Wurst>
                <ul class="VerList WurstVerList">
                    <li class="li2" v-for="(version, index) in WurstVerList" :key="index">
                        <a :href="version.browser_download_url" target="_blank">{{ version.name }}</a>
                    </li>
                </ul>
            </Wurst>
            <div class="Button Refresh" @click="refresh">
                <div class="title">
                    <h1>刷新</h1>
                </div>
            </div>
        </div>
    </div>
</template>
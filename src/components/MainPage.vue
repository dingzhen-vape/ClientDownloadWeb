<script>
import { playSound, sendMessage } from '@/assets/Message';
import Meteor from './Meteor.vue';
import Wurst from './WurstCN.vue';
import axios from 'axios';
import { gsap } from 'gsap';
export default {
    data() {
        return {
            MeteorVerList: [],
            WurstVerList: [],
            LastTime: 0,
            AutoUpdate: false,
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
            const AutoUpdate = localStorage.getItem("AutoUpdate")
            this.AutoUpdate = (AutoUpdate=="true") ? true : false;
            

            if (loaclVer !== null) {
                const LastTime = JSON.parse(loaclVer).LastTime
                const MeteorList = JSON.parse(loaclVer).Meteor
                const WurstList = JSON.parse(loaclVer).Wurst

                this.MeteorVerList = MeteorList
                this.WurstVerList = WurstList
                this.LastTime = LastTime
            } else {
                sendMessage("未在本地查找到已经存储的数据，正在获取...")
                setTimeout(this.refresh, 1000)
            }
        },

        async refresh() {
            playSound()
            this.inAnimations()
        },

        async getMultipleVersions() {
            try {
                // 获取版本资源列表
                this.MeteorVerList = (await this.getVersion("MeteorCN")).data.assets;
                this.WurstVerList = (await this.getVersion("WurstCN")).data.assets;
                this.LastTime = new Date().toLocaleString()
                // console.log(MeteorVerList);
                var loaclVer = localStorage.getItem("Versions")
                if (loaclVer !== null) {
                    loaclVer = JSON.parse(loaclVer)//转换成JSON格式方便读取
                    // console.log(loaclVer.Wurst.length);
                    // console.log(this.MeteorVerList.length);
                    
                    // console.log(this.WurstVerList.length);
                    
                    
                    if (loaclVer.Wurst.length !== this.WurstVerList.length) {
                        sendMessage("资源更新成功! Wurst有新的汉化更新")
                    }
                    if (loaclVer.Meteor.length !== this.MeteorVerList.length) {
                        sendMessage("资源更新成功! Meteor有新的汉化更新")
                    }
                    if (loaclVer.Wurst.length !== this.WurstVerList.length && loaclVer.Meteor.length !== this.MeteorVerList.length) {
                        sendMessage("资源更新成功! Wurst和Meteor有新的汉化更新")
                    }
                    if (loaclVer.Wurst.length == this.WurstVerList.length && loaclVer.Meteor.length == this.MeteorVerList.length) {
                        sendMessage("好像目前没有任何更新...")
                    }
                }
                //存储版本资源列表到本地缓存
                var Versions = {
                    LastTime: new Date().toLocaleString(),
                    Meteor: this.MeteorVerList,
                    Wurst: this.WurstVerList
                }
                localStorage.setItem("Versions", JSON.stringify(Versions))
                this.listOutAnimation()

            } catch (error) {
                sendMessage(`获取最新版本失败(´Ａ｀。),报错信息:${error}`, 1000)
                this.outAnimations()

            }
        },

        async getVersion(name) {
            return await axios.get(`https://api.github.com/repos/dingzhen-vape/${name}/releases/tags/ATV`)
        },

        listOutAnimation() {
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
            gsap.to(".WurstVerList", {
                opacity: 0,
                right: "-100%",
                duration: 1,
                ease: "sine"
            })
            gsap.to(".MeteorVerList", {
                opacity: 0,
                left: "-100%",
                duration: 1,
                ease: "sine"
            })
        },
        showInfo() {
            playSound()
            sendMessage("本网站仅供学习使用，网站代码与客户端均已开源!" +
                "因为所有链接都是github直连所以速度有点慢", 5000)
        },
        ToggleAutoUpdate() {
            playSound()
            this.AutoUpdate = !this.AutoUpdate;
            localStorage.setItem("AutoUpdate", this.AutoUpdate)
        }
    },
    mounted() {
        this.InitList()
        if (this.AutoUpdate) {
            this.refresh()
        }

    }
}
</script>
<template>
    <div class="Message">
        <p></p>
    </div>
    <!-- 中间 -->
    <div class="base">
        <div class="main">
            <Meteor>
                <ul class="VerList MeteorVerList">
                    <li v-for="(version, index) in MeteorVerList" :key="index">
                        <div class="detail">
                            <a :href="version.browser_download_url" target="_blank">{{ version.name }}</a>
                            <p>大小:{{ (version.size / (1024 * 1024)).toFixed(2) }}MB 最近更新时间:{{ version.updated_at }}
                                下载次数:{{ version.download_count }}</p>
                        </div>

                    </li>
                </ul>
            </Meteor>
            <Wurst>
                <ul class="VerList WurstVerList">
                    <li v-for="(version, index) in WurstVerList" :key="index">
                        <div class="detail">
                            <a :href="version.browser_download_url" target="_blank">{{ version.name }}</a>
                            <p>大小:{{ (version.size / (1024 * 1024)).toFixed(2) }}MB 最近更新时间:{{ version.updated_at }}
                                下载次数:{{
                                    version.download_count }}</p>
                        </div>

                    </li>
                </ul>
            </Wurst>
            <div class="Button Refresh" @click="refresh">
                <div class="title">
                    <h1>刷新</h1>
                </div>
            </div>
            <div class="info">
                <ul class="infoList">
                    <li>
                        <img title="Info" @click="showInfo" src="../assets/感叹号02.svg">
                    </li>
                    <li>
                        <a title="当前网站Github仓库" href="https://github.com/dingzhen-vape/ClientDownloadWeb">
                            <img src="../assets/Github.svg" alt="">
                        </a>
                    </li>
                    <li>
                        <a title="b站主页" href="https://space.bilibili.com/432060575?spm_id_from=333.1007.0.0">
                            <img src="../assets/-bilibili.svg" alt="">
                        </a>
                    </li>
                    <li>
                        <a title="爱发电" href="https://afdian.com/a/WurstCN-client?tab=home">
                            <img style="opacity: 1;" src="../assets/aifadian.svg" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="https://meteorclient.com/" title="Meteor客户端官网">
                            <img src="../assets/MeteorIcon.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="https://www.wurstclient.net/download/" title="Wurst客户端官网">
                            <img src="../assets/Wurst.png" alt="">
                        </a>
                    </li>
                    <li>
                        <h1 style="font-size: 20px">上次更新时间:{{ LastTime }}</h1>
                    </li>
                </ul>
            </div>
            <div @click="ToggleAutoUpdate" title="每次打开网页都会自动刷新" class="Button AutoUpdate">
                <h1>自动更新 {{ AutoUpdate ? "开" : "关" }}</h1>
            </div>
        </div>
    </div>
</template>
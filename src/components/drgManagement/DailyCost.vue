<template>
    <div class="patientDRG" id="patientDRG">
    </div>
</template>

<script>
import { getPatientInfo, getDailyCost, getCostManage, getMedicineCost, getCost } from './../../api/drg-management'
import * as echarts from 'echarts'

export default {
    data() {
        return {
            dailyCost: [],
            //左下角折线图参数
            echartsPatientDRG: {},
            optionDataPatient: [],
            optionDataPatientDRG: [],
            optionDate: [],
        }
    },
    watch: {
        dailyCost: {
            handler() {
                this.putDailyCost()
                this.drawLine("patientDRG")



            }
        },
    },
    created() {
        getDailyCost().then(res => {
            this.dailyCost = res
        })
    },
    mounted() {
        this.drawLine("patientDRG")

    },
    methods: {
        drawLine(id) {
            // console.log(this.optionDataPatient,this.optionDataPatientDRG,this.optionDate)
            this.echartsPatientDRG = echarts.init(document.getElementById(id));
            this.echartsPatientDRG.setOption({
                tooltip: {
                    trigger: "axis",
                },
                title: {
                    // text: this.echartsPatientName,
                    text: '患者每日花费'
                },
                legend: {
                    data: ["每日花费", "DRG每日花费"],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                // toolbox: {
                //   feature: {
                //     saveAsImage: {},
                //   },
                // },
                xAxis: {
                    type: "category",
                    // boundaryGap: false,
                    data: this.optionDate,
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        formatter: '{value} 元'
                    },
                },

                series: [
                    {
                        name: "每日花费",
                        type: "line",
                        smooth: true,
                        // stack: "总量",
                        data: this.optionDataPatient,
                    },
                    {
                        name: "DRG每日花费",
                        type: "line",
                        smooth: true,
                        // stack: "总量",
                        data: this.optionDataPatientDRG,
                    },
                ],
            });
        },
        putDailyCost() {
            for (let i = 0; i < this.dailyCost.length; i++) {
                this.optionDate.push(this.dailyCost[i].date)
                this.optionDataPatient.push(this.dailyCost[i].patientCost)
                this.optionDataPatientDRG.push(this.dailyCost[i].drgCost)
            }
        },
    },
}


</script>

<style lang="scss" scoped>

.patientDRG {
    height: 37%;
    width: 100%;
    margin-top: 1%;
  }
</style>

var mapData = [
    {name: '北京', value: 3},
    {name: '天津', value: 3},
    {name: '上海', value: 3},
    {name: '重庆', value: 3},
    {name: '河北', value: 3},
    {name: '河南', value: 3},
    {name: '云南', value: 3},
    {name: '辽宁', value: 3},
    {name: '黑龙江', value: 3},
    {name: '湖南', value: 300},
    {name: '安徽', value: 3},
    {name: '山东', value: 3},
    {name: '新疆', value: 3},
    {name: '江苏', value: 300},
    {name: '浙江', value: 3},
    {name: '江西', value: 3},
    {name: '湖北', value: 3},
    {name: '广西', value: 3},
    {name: '甘肃', value: 3},
    {name: '山西', value: 3},
    {name: '内蒙古', value: 3},
    {name: '陕西', value: 3},
    {name: '吉林', value: 3},
    {name: '福建', value: 3},
    {name: '贵州', value: 3},
    {name: '广东', value: 300},
    {name: '青海', value: 3},
    {name: '西藏', value: 3},
    {name: '四川', value: 3},
    {name: '宁夏', value: 3},
    {name: '海南', value: 3},
    {name: '台湾', value: 3},
    {name: '香港', value: 3},
    {name: '澳门', value: 3}
]
getMap(300, mapData);

function getMap(max, seriesData) {
    var dom = document.getElementById('china'),
        myChart = echarts.init(dom),
        option = {
            visualMap: {
                min: 0,
                show: false,
                max: max,
                left: 'center',
                bottom: '0',
                color: ['#96DAF5', '#F5FBFE'],
                calculable: true,
                orient: "horizontal",
                itemHeight: 200,
            },
            series: [
                {
                    type: 'map',
                    mapType: 'china',
                    zoom: 1.2,
                    y: 100,
                    label: {
                        show: true,
                        position: "top",
                        margin: 8,
                        formatter: function (params) {
                            return params.name;
                        },
                        textStyle: {
                            fontSize: 12,
                            color: '#45B4E0'
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1,//边际线大小
                            borderColor: '#97C9DE',//边界线颜色
                        },
                        emphasis: {
                            show: true,
                            areaColor: '#96DAF5',//鼠标滑过区域颜色
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                    },
                    data: seriesData
                }
            ]
        };
    myChart.setOption(option);
}

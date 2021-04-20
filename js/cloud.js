var myChart = echarts3.init(document.getElementById('wordcloud_echarts'));
var keywords = [
    {"name":"高新技术企业","value":10.64},
    {"name":"小巨人","value":1.03},
    {"name":"专精特新","value":24.95},
    {"name":"科技企业孵化器备案","value":13.04},
    {"name":"小额贷款公司奖补","value":5.27},
    {"name":"科技计划项目奖励","value":7.80},
]
var option = {
    series: [{
        type: 'wordCloud',
        sizeRange: [10, 40],
        rotationRange: [0, 0],
        rotationStep: 45,
        gridSize: 8,
        shape: 'pentagon',
        width: '100%',
        height: '100%',
        textStyle: {
            normal: {
                color: function () {
                    return 'rgba(214, 82, 82,'+Math.random().toFixed(2)+')'
                }
            }
        },
        data: keywords
    }]
};
myChart.setOption(option);
window.addEventListener("resize", function() {
    myChart.resize();
})

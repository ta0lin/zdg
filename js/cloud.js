var myChart = echarts3.init(document.getElementById('wordcloud_echarts'));
var keywords = [
    {"name":"起臂机待保养","value":2.64},
    {"name":"起臂机待保养","value":1.03},
    {"name":"起臂机待保养","value":24.95},
    {"name":"起臂机待保养","value":4.04},
    {"name":"起臂机待保养","value":5.27},
    {"name":"起臂机待保养","value":7.80},
    {"name":"起臂机待保养","value":3.09},
    {"name":"起臂机待保养","value":24.71},
    {"name":"起臂机待保养","value":6.33},
    {"name":"起臂机待保养","value":2.55},
    {"name":"起臂机待保养","value":8.88},
    {"name":"起臂机待保养","value":0.04},
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

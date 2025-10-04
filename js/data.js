document.addEventListener('DOMContentLoaded', function() {
    // 统一色彩体系：与设计文档保持一致
    const colorPrimary = '#2563eb';      // 经济 - 主色调
    const colorTech = '#10b981';         // 科技 - 绿色
    const colorLivelihood = '#f59e0b';   // 民生 - 橙色
    const colorEcology = '#06b6d4';      // 生态 - 青色
    const colorInfrastructure = '#8b5cf6'; // 基建 - 紫色
    const colorGray = '#6b7280';
    const colorLightBlue = 'rgba(37, 99, 235, 0.1)';

    // 保存图表实例
    let gdpTrendChart, industryStructureChart, techAchievementChart, livelihoodChart, environmentTrendChart, transportInfraChart;

    // 初始化所有图表
    function initializeCharts() {
        // 1. GDP增长趋势图 - 面积图
        const gdpTrendCtx = document.getElementById('gdp-trend-chart').getContext('2d');
        gdpTrendChart = new Chart(gdpTrendCtx, {
            type: 'line',
            data: {
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: 'GDP (万亿元)',
                    data: [68.9, 74.6, 83.2, 91.9, 99.1, 101.6, 114.4, 121.0, 127.4, 134.0, 140.0],
                    backgroundColor: colorLightBlue,
                    borderColor: colorPrimary,
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: colorPrimary,
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#0f172a',
                        bodyColor: '#0f172a',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '万亿';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // 2. 产业结构分布图 - 嵌套环形图
        const industryStructureCtx = document.getElementById('industry-structure-chart').getContext('2d');
        industryStructureChart = new Chart(industryStructureCtx, {
            type: 'doughnut',
            data: {
                labels: ['第三产业', '第二产业', '第一产业'],
                datasets: [{
                    data: [54, 39, 7],
                    backgroundColor: [
                        colorPrimary,
                        `${colorPrimary}80`,
                        `${colorPrimary}60`
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });

        // 3. 重点科技领域成就评分图 - 雷达图
        const techAchievementCtx = document.getElementById('tech-achievement-chart').getContext('2d');
        techAchievementChart = new Chart(techAchievementCtx, {
            type: 'radar',
            data: {
                labels: ['人工智能', '量子计算', '航天科技', '生物医药', '新能源', '5G通信'],
                datasets: [{
                    label: '科技成就评分',
                    data: [92, 88, 95, 85, 90, 94],
                    backgroundColor: colorTech + '20',
                    borderColor: colorTech,
                    borderWidth: 2,
                    pointBackgroundColor: colorTech,
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            backdropColor: 'transparent'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // 4. 民生保障核心指标对比图 - 分组柱状图
        const livelihoodCtx = document.getElementById('livelihood-chart').getContext('2d');
        livelihoodChart = new Chart(livelihoodCtx, {
            type: 'bar',
            data: {
                labels: ['养老保险参保率', '医疗保险覆盖率', '义务教育巩固率', '城镇就业率'],
                datasets: [
                    {
                        label: '2020年',
                        data: [91, 95, 94, 96],
                        backgroundColor: colorLivelihood + '60',
                        borderColor: colorLivelihood,
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: '2025年',
                        data: [95, 98, 97, 98],
                        backgroundColor: colorLivelihood,
                        borderColor: colorLivelihood,
                        borderWidth: 1,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // 5. 生态环境改善趋势图 - 双轴折线图
        const environmentTrendCtx = document.getElementById('environment-trend-chart').getContext('2d');
        environmentTrendChart = new Chart(environmentTrendCtx, {
            type: 'line',
            data: {
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    {
                        label: '森林覆盖率(%)',
                        data: [21.66, 21.88, 22.08, 22.28, 22.50, 22.96, 23.04, 23.30, 23.57, 23.84, 24.02],
                        borderColor: colorEcology,
                        backgroundColor: colorEcology + '10',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: '单位GDP能耗下降(%)',
                        data: [13, 17, 20, 23, 26, 28, 30, 32, 34, 36, 38],
                        borderColor: colorPrimary,
                        backgroundColor: colorPrimary + '10',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: '森林覆盖率(%)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: '能耗下降(%)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // 6. 交通基建里程排名图 - 横向条形图
        const transportInfraCtx = document.getElementById('transport-infra-chart').getContext('2d');
        transportInfraChart = new Chart(transportInfraCtx, {
            type: 'bar',
            data: {
                labels: ['高铁运营里程', '高速公路里程', '城市轨道交通', '港口吞吐能力'],
                datasets: [{
                    label: '里程(万公里)',
                    data: [4.5, 18.5, 1.2, 175],
                    backgroundColor: [
                        colorInfrastructure,
                        colorInfrastructure + '80',
                        colorInfrastructure + '60',
                        colorInfrastructure + '40'
                    ],
                    borderColor: colorInfrastructure,
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.x !== null) {
                                    if (context.dataIndex === 3) {
                                        label += context.parsed.x + '亿吨';
                                    } else {
                                        label += context.parsed.x + '万公里';
                                    }
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // 数字增长动画 - 支持小数
    function initializeCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // 动画持续时间
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCount = () => {
                current += step;
                if (current < target) {
                    // 处理小数显示，最多保留2位小数
                    if (target % 1 !== 0) {
                        counter.innerText = current.toFixed(2);
                    } else {
                        counter.innerText = Math.ceil(current);
                    }
                    requestAnimationFrame(updateCount);
                } else {
                    // 最终值也确保最多2位小数
                    if (target % 1 !== 0) {
                        counter.innerText = target.toFixed(2);
                    } else {
                        counter.innerText = target;
                    }
                }
            };

            // 延迟启动动画，让页面加载完成
            setTimeout(updateCount, 500);
        });
    }

    // 时间筛选器交互
    function initializeTimeFilter() {
        const timeFilter = document.getElementById('time-filter');
        timeFilter.addEventListener('change', function() {
            const selectedValue = this.value;
            console.log('时间范围筛选:', selectedValue);
            
            // 显示加载状态
            const dashboard = document.getElementById('achievement-dashboard');
            dashboard.style.opacity = '0.7';
            
            // 根据选择的时间范围更新数据
            setTimeout(() => {
                updateChartData(selectedValue);
                dashboard.style.opacity = '1';
            }, 500);
        });
    }

    // 根据时间范围更新图表数据
    function updateChartData(timeRange) {
        // 更新GDP趋势图数据
        updateGdpTrendChart(timeRange);
        
        // 更新其他图表数据
        updateIndustryStructureChart(timeRange);
        updateTechAchievementChart(timeRange);
        updateLivelihoodChart(timeRange);
        updateEnvironmentTrendChart(timeRange);
        updateTransportInfraChart(timeRange);
        
        // 更新KPI卡片数据
        updateKpiCards(timeRange);
    }

    // 更新GDP趋势图数据
    function updateGdpTrendChart(timeRange) {
        let labels, data;
        
        switch(timeRange) {
            case '2025':
                labels = ['2025'];
                data = [140.0];
                break;
            case '2020-2025':
                labels = ['2020', '2021', '2022', '2023', '2024', '2025'];
                data = [101.6, 114.4, 121.0, 127.4, 134.0, 140.0];
                break;
            case '2015-2025':
            default:
                labels = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
                data = [68.9, 74.6, 83.2, 91.9, 99.1, 101.6, 114.4, 121.0, 127.4, 134.0, 140.0];
                break;
        }
        
        gdpTrendChart.data.labels = labels;
        gdpTrendChart.data.datasets[0].data = data;
        gdpTrendChart.update();
    }

    // 更新产业结构图数据
    function updateIndustryStructureChart(timeRange) {
        let data;
        
        switch(timeRange) {
            case '2025':
                data = [54, 39, 7];
                break;
            case '2020-2025':
                data = [52, 40, 8];
                break;
            case '2015-2025':
            default:
                data = [50, 41, 9];
                break;
        }
        
        industryStructureChart.data.datasets[0].data = data;
        industryStructureChart.update();
    }

    // 更新科技成就图数据
    function updateTechAchievementChart(timeRange) {
        let data;
        
        switch(timeRange) {
            case '2025':
                data = [92, 88, 95, 85, 90, 94];
                break;
            case '2020-2025':
                data = [85, 80, 90, 78, 85, 88];
                break;
            case '2015-2025':
            default:
                data = [75, 70, 85, 70, 80, 82];
                break;
        }
        
        techAchievementChart.data.datasets[0].data = data;
        techAchievementChart.update();
    }

    // 更新民生保障图数据
    function updateLivelihoodChart(timeRange) {
        let data2020, data2025;
        
        switch(timeRange) {
            case '2025':
                data2020 = [95, 98, 97, 98];
                data2025 = [95, 98, 97, 98];
                break;
            case '2020-2025':
                data2020 = [91, 95, 94, 96];
                data2025 = [95, 98, 97, 98];
                break;
            case '2015-2025':
            default:
                data2020 = [88, 92, 92, 94];
                data2025 = [95, 98, 97, 98];
                break;
        }
        
        livelihoodChart.data.datasets[0].data = data2020;
        livelihoodChart.data.datasets[1].data = data2025;
        livelihoodChart.update();
    }

    // 更新生态环境趋势图数据
    function updateEnvironmentTrendChart(timeRange) {
        let labels, forestData, energyData;
        
        switch(timeRange) {
            case '2025':
                labels = ['2025'];
                forestData = [24.02];
                energyData = [38];
                break;
            case '2020-2025':
                labels = ['2020', '2021', '2022', '2023', '2024', '2025'];
                forestData = [22.96, 23.04, 23.30, 23.57, 23.84, 24.02];
                energyData = [28, 30, 32, 34, 36, 38];
                break;
            case '2015-2025':
            default:
                labels = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
                forestData = [21.66, 21.88, 22.08, 22.28, 22.50, 22.96, 23.04, 23.30, 23.57, 23.84, 24.02];
                energyData = [13, 17, 20, 23, 26, 28, 30, 32, 34, 36, 38];
                break;
        }
        
        environmentTrendChart.data.labels = labels;
        environmentTrendChart.data.datasets[0].data = forestData;
        environmentTrendChart.data.datasets[1].data = energyData;
        environmentTrendChart.update();
    }

    // 更新交通基建图数据
    function updateTransportInfraChart(timeRange) {
        let data;
        
        switch(timeRange) {
            case '2025':
                data = [4.5, 18.5, 1.2, 175];
                break;
            case '2020-2025':
                data = [3.8, 16.1, 0.9, 155];
                break;
            case '2015-2025':
            default:
                data = [1.9, 12.4, 0.6, 125];
                break;
        }
        
        transportInfraChart.data.datasets[0].data = data;
        transportInfraChart.update();
    }

    // 更新KPI卡片数据
    function updateKpiCards(timeRange) {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const originalTarget = parseFloat(counter.getAttribute('data-original-target') || counter.getAttribute('data-target'));
            let newTarget = originalTarget;
            
            // 根据时间范围调整目标值
            switch(timeRange) {
                case '2020-2025':
                    newTarget = originalTarget * 0.95; // 显示95%的数据
                    break;
                case '2015-2025':
                    newTarget = originalTarget * 0.9; // 显示90%的数据
                    break;
                case '2025':
                default:
                    newTarget = originalTarget;
                    break;
            }
            
            // 保存原始目标值
            counter.setAttribute('data-original-target', originalTarget);
            counter.setAttribute('data-target', newTarget);
            
            // 重新启动动画
            const duration = 1500;
            const step = newTarget / (duration / 16);
            let current = 0;
            
            const updateCount = () => {
                current += step;
                if (current < newTarget) {
                    if (newTarget % 1 !== 0) {
                        counter.innerText = current.toFixed(2);
                    } else {
                        counter.innerText = Math.ceil(current);
                    }
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = newTarget;
                }
            };
            
            updateCount();
        });
    }

    // 初始化所有功能
    initializeCharts();
    initializeCounters();
    initializeTimeFilter();
});

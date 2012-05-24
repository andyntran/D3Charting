(function ($) {

	var options = {
			width: 0,
			height: 0,
			palette: ['#4572A7', '#AA4643', '#89A54E', '#80699B'],
			title: {
				text: 'Main Title',
				verticalAlign: 'top',
				horizontalAlign: 'center',
				x: 0,
				y: 0
			},
			subTitle: {
				text: 'Sub Title',
				verticalAlign: 'top',
				horizontalAlign: 'center',
				x: 0,
				y: 0
			},
			legend: {
				layout: 'vertical', // vertical/horizontal
				verticalAlign: 'top', // top/middle/bottom
				horizontalAlign: 'right', // right/center/left
				x: 0,
				y: 0
			},
			// series: [{
			// 	name: 'Demo Series 1',
			// 	dataUrl: null, 
			// 	collectionDataKey: "collectionDataKey1",
			// 	xDataKey: "xDataKey1", 
			// 	yDataKey: "yDataKey1", 
			// 	data: null,
			// 	color: null
			// }, {
			// 	name: 'Demo Series 2',
			// 	dataUrl: null, 
			// 	collectionDataKey: "collectionDataKey2",
			// 	xDataKey: "xDataKey2", 
			// 	yDataKey: "yDataKey2", 
			// 	data: null,
			// 	color: null
			// }],
			chart: {
				margin: {
					top: 8,
					right: 16,
					bottom: 8,
					left: 16
				},
				xAxis: {
					title: 'X-Axis Title',
					interval: 5,
					gridStartAt: null,
					min: null,
					max: null,
					unit: ''
				},
				yAxis: {
					title: 'Y-Axis Title',
					interval: 5,
					gridStartAt: null,
					min: null,
					max: null,
					unit: ''
				}
			}
		},

		objects = {
			container: null,
			svg: null,
			graph: null,
			title: null,
			subTitle: null,
			legend: null,
			seriesLegends: [],
			xAxis: null,
			yAxis: null,
			chart: null,
			xGrid: null,
			yGrid: null,
			dataLinesBorder: null,
			dataLines: []
		},

		settings = {
			chart: {}
		},

		publicMethods = {			
			options: function (key, value) {
				if (key) {
					var keys = key.split('.');
					var lastKeyIndex = keys.length - 1;
					var opts = options;
					for (var i = 0; i < lastKeyIndex && opts; i++)
						opts = opts[keys[i]];

					if (opts) {
						if (value) {
							opts[keys[lastKeyIndex]] = value;
						}
						return opts[keys[lastKeyIndex]];
					}
				}

				return null;
			},

			graph: function (width, height) {
				if (width) options.width = width;
				if (height) options.height = height;

				if (!objects.svg) {
					objects.svg = objects.container
						.append("svg:svg")
						.attr("class", "chart");
				}

				if (!objects.graph) {
					objects.graph = objects.svg.append('svg:g');
				}

				objects.svg.attr("width", options.width);
				objects.svg.attr("height", options.height);

				objects.graph.text(null);
				objects.title	  =
				objects.subTitle  =
				objects.legend	  = 
				objects.xAxis 	  = 
				objects.yAxis 	  = 
				objects.chart 	  = null;

				publicMethods.title();
				publicMethods.chartArea();
				//publicMethods.series();

				return objects.graph;
			},

			title: function (text, verticalAlign, horizontalAlign, x, y) {
				if (text) options.title.text = text;
				if (verticalAlign) options.title.verticalAlign = verticalAlign;
				if (horizontalAlign) options.title.horizontalAlign = horizontalAlign;
				if (typeof x === 'number' && x >= 0) options.title.x = x;
				if (typeof y === 'number' && y >= 0) options.title.y = y;

				if (!objects.title) {
					objects.title = objects.graph
						.append("svg:text")
						.attr("class", "chart-title");
				}

				objects.title.text(options.title.text);

				// sets title position
				var x = 0,
					y = 0,
					width = objects.title[0][0].clientWidth,
					height = objects.title[0][0].clientHeight,
					textAnchor = '';
				switch (options.title.horizontalAlign) {
					case 'left': 
						x = options.title.x; 
						textAnchor = 'text-anchor: start';
						break;
					case 'center': 
						x = options.width / 2;
						textAnchor = 'text-anchor: middle';
						break;
					case 'right': 
						x = options.width - options.title.x; 
						textAnchor = 'text-anchor: end';
						break;
				}
				switch (options.title.verticalAlign) {
					case 'top': 
						y = options.title.y; 
						break;
					case 'middle': 
						y = options.height / 2;
						break;
					case 'bottom': 
						y = options.height - height - options.title.y; 
						break;
				}
				objects.title.attr("x", x).attr("y", y).attr('style', textAnchor);

				// Re-positions the sub title
				publicMethods.subTitle();

				return objects.title;
			},

			subTitle: function (text, verticalAlign, horizontalAlign, x, y) {
				if (text) options.subTitle.text = text;
				if (verticalAlign) options.subTitle.verticalAlign = verticalAlign;
				if (horizontalAlign) options.subTitle.horizontalAlign = horizontalAlign;				
				if (typeof x === 'number' && x >= 0) options.subTitle.x = x;
				if (typeof y === 'number' && y >= 0) options.subTitle.y = y;

				if (!objects.subTitle) {
					objects.subTitle = objects.graph
						.append("svg:text")
						.attr("class", "chart-subtitle");
				}


				objects.subTitle.text(options.subTitle.text);

				// sets title position
				var x = 0,
					y = 0,
					width = objects.subTitle[0][0].clientWidth,
					height = objects.subTitle[0][0].clientHeight,
					titleY = parseInt(objects.title.attr('y')),
					titleHeight = objects.title[0][0].clientHeight,
					textAnchor = '';
				switch (options.subTitle.horizontalAlign) {
					case 'left': 
						x = options.subTitle.x; 
						textAnchor = 'text-anchor: start';
						break;
					case 'center': 
						x = options.width / 2;
						textAnchor = 'text-anchor: middle';
						break;
					case 'right': 
						x = options.width - options.subTitle.x; 
						textAnchor = 'text-anchor: end';
						break;
				}
				switch (options.subTitle.verticalAlign) {
					case 'top':
						y = (options.title.verticalAlign === 'top' 
								? (titleY + titleHeight)
								: 0) 
						  + options.subTitle.y; 
						break;
					case 'middle': 
						y = options.height / 2;
						break;
					case 'bottom': 
						y = options.height 
						  - (options.title.verticalAlign === 'bottom' 
								? titleHeight
								: 0) 
						  - height - options.subTitle.y; 
						break;
				}
				objects.subTitle.attr("x", x).attr("y", y).attr('style', textAnchor);

				return objects.subTitle;
			},
			
			legend: function (layout, verticalAlign, horizontalAlign, x, y) {
				if (layout && (layout === 'vertical' || layout === 'horizontal')) options.legend.layout = layout;
				if (verticalAlign && (verticalAlign === 'top' || verticalAlign === 'middle' || verticalAlign === 'bottom')) options.legend.verticalAlign = verticalAlign;
				if (horizontalAlign && (horizontalAlign === 'left' || horizontalAlign === 'center' || horizontalAlign === 'right')) options.legend.horizontalAlign = horizontalAlign;
				if (typeof x === 'number' && x >= 0) options.legend.x = x;
				if (typeof y === 'number' && y >= 0) options.legend.y = y;

				if (!objects.legend) {
					objects.legend = objects.graph
						.append("svg:g")
						.attr("class", "chart-legend");
				}

				objects.legend.text(null);

				var seriesLegendX = 8,
					seriesLegendY = 8,
					seriesLegendSymbolMargin = 6,
					seriesLegendSymbolWidth = 20;
				objects.seriesLegends = [];
				for (var i = 0; i < options.series.length; i++) {
					if (!options.series[i].color)
						options.series[i].color = options.palette[i % options.palette.length];

					var seriesLegend = objects.seriesLegends[i] = objects.legend
						.append('svg:text')
						.attr('class', 'chart-legend-series')
						.attr('x', seriesLegendX + seriesLegendSymbolWidth + 2 * seriesLegendSymbolMargin)
						.attr('y', seriesLegendY)
						.text(options.series[i].name);

					// draws the symbol and color of the series
					objects.legend
						.append('svg:rect')
						.attr('stroke-width', 0)
						.attr('fill', options.series[i].color)
						.attr('x', seriesLegendX)
						.attr('y', seriesLegendY + seriesLegend[0][0].clientHeight / 2 - 5)
						.attr('width', seriesLegendSymbolWidth)
						.attr('height', 2);
					objects.legend
						.append('svg:circle')
						.attr('stroke', options.series[i].color)
						.attr('stroke-width', 2)
						.attr('fill', options.series[i].color)
						.attr('r', 3)
						.attr('cx', seriesLegendX + seriesLegendSymbolWidth / 2)
						.attr('cy', seriesLegendY + seriesLegend[0][0].clientHeight / 2 - 4);

					// sets the cursor to draw the next series's legend
					switch (options.legend.layout) {
						case 'vertical':
							seriesLegendY += seriesLegend[0][0].clientHeight;
							break;
						case 'horizontal':
							seriesLegendX += seriesLegend[0][0].clientWidth + seriesLegendSymbolWidth + 2 * seriesLegendSymbolMargin;
							break;
					}
				}

				// draws legend border
				var legendWidth = 16,
					legendHeight = 10;
				switch (options.legend.layout) {
					case 'vertical':
						legendWidth += d3.max($.map(objects.seriesLegends, function (seriesLegend) { return seriesLegend[0][0].clientWidth + seriesLegendSymbolWidth + 2 * seriesLegendSymbolMargin; }));
						legendHeight += d3.sum($.map(objects.seriesLegends, function (seriesLegend) { return seriesLegend[0][0].clientHeight; }));
						break;
					case 'horizontal':
						legendWidth += d3.sum($.map(objects.seriesLegends, function (seriesLegend) { return seriesLegend[0][0].clientWidth + seriesLegendSymbolWidth + 2 * seriesLegendSymbolMargin; }));
						legendHeight += d3.max($.map(objects.seriesLegends, function (seriesLegend) { return seriesLegend[0][0].clientHeight; }));
						break;
				}
				objects.legend
					.insert('svg:rect', 'text')
					.attr('x', 0)
					.attr('y', 0)
					.attr('width', legendWidth)
					.attr('height', legendHeight)
					.attr('rx', 4)
					.attr('ry', 4)
					.attr('class', 'chart-legend-border');

				// sets legend position
				var legendX = 0;
				var legendY = 0;
				switch (options.legend.horizontalAlign) {
					case 'left': 
						legendX = options.legend.x; 
						break;
					case 'center': 
						legendX = options.width / 2 - legendWidth / 2; 
						break;
					case 'right': 
						legendX = options.width - legendWidth - options.legend.x; 
						break;
				}
				switch (options.legend.verticalAlign) {
					case 'top': 
						legendY = options.legend.y; 
						break;
					case 'middle': 
						legendY = options.height / 2 - legendHeight / 2; 
						break;
					case 'bottom': 
						legendY = options.height - legendHeight - options.legend.y; 
						break;
				}
				objects.legend
					.attr('transform', 'translate(' + legendX + ', ' + legendY + ')');
			},

			series: function (series) {
				if (series && series.length) options.series = series;
				
				publicMethods.legend();
				publicMethods.refresh();

				return options.series;
			},

			chartArea: function (margin, xAxis, yAxis) {
				if (margin) $.extend(true, options.chart.margin, margin);
				if (xAxis) $.extend(true, options.chart.xAxis, xAxis);
				if (yAxis) $.extend(true, options.chart.yAxis, yAxis);

				if (!objects.xAxis) {
					objects.xAxis = objects.graph
						.append('svg:text')
						.attr('class', 'chart-axis-title x');
				}

				objects.xAxis
					.text(options.chart.xAxis.title)
					.attr('x', options.chart.margin.left + (options.width - options.chart.margin.left - options.chart.margin.right) / 2)
					.attr('y', options.height - options.chart.margin.bottom + 2 * objects.xAxis[0][0].clientHeight);


				if (!objects.yAxis) {
					objects.yAxis = objects.graph
						.append('svg:text')
						.attr('class', 'chart-axis-title y');						
				}

				objects.yAxis
					.text(options.chart.yAxis.title)
					.attr('x', options.chart.margin.left - 2 * objects.xAxis[0][0].clientHeight)
					.attr('y', options.chart.margin.top + (options.height - options.chart.margin.top - options.chart.margin.bottom) / 2)
					.attr('transform', 'rotate(270 ' + objects.yAxis.attr('x') + ' ' + objects.yAxis.attr('y') + ')');

				publicMethods.series();

				return {					
					xAxis: objects.xAxis,
					yAxis: objects.yAxis
				}
			},

			refresh: function () {
				var count = 0;

				$.each(options.series, function (i, series) {
					if ((series.data && series.data.length) || series.dataUrl) {
						$.ajax({
							method: "GET",
							url: series.dataUrl,
							dataType: series.dataType,
							success: function (d) {
								series.data = d ?
									series.collectionDataKey ?
										d[series.collectionDataKey] :
										d :
									null;

								if (series.data && options.chart.xAxis.isDate) {									
									for (var i = 0; i < series.data.length; i++) {
										series.data[i][series.xDataKey] = new Date(series.data[i][series.xDataKey]);
									}
								}
							},
							error: function (e) {
								series.data = null;
							},
							complete: function () {
								++count;
								if (count == options.series.length) {
									methods.plotChart();
								}
							}
						});
					} else {
						++count;
						if (count == options.series.length) {
							methods.plotChart();
						}
					}
				});

				return this;
			}
		},

		methods = {
			init: function (opts) {
				$.extend(true, options, opts);
				if (options.dataUrl) {
					$.each(options.axis.y.series, function (i, series) {
						series.dataUrl = options.dataUrl;
					});
				}

				methods.initSettings($(this));
			},

			initSettings: function ($container) {
				$container.html('');

				objects.container = d3.select($container.selector);
				objects.svg 	  =
				objects.graph	  = null;

				publicMethods.graph();
			},

			getChartDataLimits: function () {
				var xData = [];
				var yData = [];


				if ((typeof options.chart.xAxis.gridStartAt === 'number' && 
					!isNaN(options.chart.xAxis.gridStartAt) ) || 
					(options.chart.xAxis.isDate)) {
					xData.push(options.chart.xAxis.gridStartAt);
				}

				if ((typeof options.chart.xAxis.min === 'number' &&
					!isNaN(options.chart.xAxis.min) ) ||
					(options.chart.xAxis.isDate))  {
					xData.push(options.chart.xAxis.min);
				}

				if ((typeof options.chart.xAxis.max === 'number' &&
					!isNaN(options.chart.xAxis.max)) ||
					(options.chart.xAxis.isDate))  {
					xData.push(options.chart.xAxis.max);
				}


				if (typeof options.chart.yAxis.gridStartAt === 'number' && 
					!isNaN(options.chart.yAxis.gridStartAt)) {
					yData.push(options.chart.yAxis.gridStartAt);
				}

				if (typeof options.chart.yAxis.min === 'number' &&
					!isNaN(options.chart.yAxis.min)) {
					yData.push(options.chart.yAxis.min);
				}

				if (typeof options.chart.yAxis.max === 'number' &&
					!isNaN(options.chart.yAxis.max)) {
					yData.push(options.chart.yAxis.max);
				}

				$.each(options.series, function (i, series) {					
					if (series.data) {						
						$.merge(xData, $.map(series.data, function (dataItem) { 
							return dataItem[series.xDataKey]; 
						}));
						$.merge(yData, $.map(series.data, function (dataItem) { 
							return dataItem[series.yDataKey]; 
						}));
					}
				});


				settings.chart.x = {
					min: d3.min(xData),
					max: d3.max(xData),
				};

				settings.chart.x.gridStartAt = 
					typeof options.chart.xAxis.gridStartAt === 'number' && !isNaN(options.chart.xAxis.gridStartAt)
						? options.chart.xAxis.gridStartAt 
						: settings.chart.x.min;


				settings.chart.y = {
					min: d3.min(yData),
					max: d3.max(yData)				
				};

				settings.chart.y.gridStartAt = 
					typeof options.chart.yAxis.gridStartAt === 'number' && !isNaN(options.chart.yAxis.gridStartAt)
						? options.chart.yAxis.gridStartAt 
						: settings.chart.y.min;

				settings.chart.x.func = d3.time.scale()
					.domain([settings.chart.x.min, settings.chart.x.max])
					.range([options.chart.margin.left, options.width - options.chart.margin.right]);

				settings.chart.y.func = d3.scale.linear()
					.domain([settings.chart.y.min, settings.chart.y.max])
					.range([options.height - options.chart.margin.bottom, options.chart.margin.top]);
			},

			setChartProperties: function () {
				settings.chart.width = options.width - options.chart.margin.left - options.chart.margin.right;
				settings.chart.height = options.height - options.chart.margin.top - options.chart.margin.bottom;
				settings.chart.x.step = Math.floor(settings.chart.width / (settings.chart.x.max - settings.chart.x.min) * 10) / 10; // More accurated with an extra decimal point
				settings.chart.y.step = Math.floor(settings.chart.height / (settings.chart.y.max - settings.chart.y.min) * 10) / 10; // More accurated with an extra decimal point
			},

			plotXGrid: function () {
				if (!objects.xGrid) {
					objects.xGrid = objects.chart
						.append('svg:g');
				}

				var value = options.chart.xAxis.isDate ? new Date( settings.chart.x.gridStartAt ) : settings.chart.x.gridStartAt,
					x1 = settings.chart.x.func(value); //options.chart.margin.left + (value - settings.chart.x.min) * settings.chart.x.step,
					y1 = options.chart.margin.top,
					x2 = x1,
					y2 = y1 + settings.chart.height + 4,
					yText = y2 + 4;

				while (value <= settings.chart.x.max) {
					objects.xGrid
						.append("svg:line")
						.attr("class", "chart-axis-grid x")
						.attr("x1", x1)
						.attr("y1", y1)
						.attr("x2", x2)
						.attr("y2", y2);

					objects.xGrid
						.append("svg:text")
						.attr("class", "chart-axis-grid-text x")
						.text(value.toDateString().slice(4))
						//.text(value.getMonth() + "/" + value.getDate() + "/" + value.getFullYear() )
						.attr("x", x1)
						.attr("y", yText);

					if (options.chart.xAxis.isDate){
						value.setDate( value.getDate() + options.chart.xAxis.interval);
					}else{
						value += options.chart.xAxis.interval;	
					}
					
					//x1 = x2 += options.chart.xAxis.interval * settings.chart.x.step;
					x1 = x2 = settings.chart.x.func(value);
				}
			},

			plotYGrid: function () {
				if (!objects.yGrid) {
					objects.yGrid = objects.chart
						.append('svg:g');
				}

				var value = settings.chart.y.gridStartAt,
					x1 = options.chart.margin.left - 4,
					y1 = options.chart.margin.top + settings.chart.height - (value - settings.chart.y.min) * settings.chart.y.step,
					x2 = options.chart.margin.left + settings.chart.width,
					y2 = y1,
					xText = x1 - 4;

				while (value <= settings.chart.y.max) {
					objects.yGrid
						.append("svg:line")
						.attr("class", "chart-axis-grid y")
						.attr("x1", x1)
						.attr("y1", y1)
						.attr("x2", x2)
						.attr("y2", y2);

					objects.yGrid
						.append("svg:text")
						.attr("class", "chart-axis-grid-text y")
						.text(value)
						.attr("x", xText)
						.attr("y", y1);

					value += options.chart.yAxis.interval;
					y1 = y2 -= options.chart.yAxis.interval * settings.chart.y.step;
				}
			},

			plotDataLines: function () {
				// draws datalines' border
				if (!objects.dataLinesBorder) {
					objects.dataLinesBorder = objects.chart
						.append('svg:rect')
						.attr('x', options.chart.margin.left)
						.attr('y', options.chart.margin.top)
						.attr('width', settings.chart.width)
						.attr('height', settings.chart.height)
						.attr('class', 'chart-data-border');
				}

				$.each(options.series, function (i, series) {
					if (series.data) {
						var line = objects.chart
							.append("svg:g");

						var dataPoints = line.data(series.data);

						dataPoints
							.append('svg:path')
							.attr('stroke', series.color)
							.attr('class', 'chart-data-line')						
							.attr('d', d3.svg.line()
								.x(function (d) { return settings.chart.x.func(d[series.xDataKey]); })
								.y(function (d) { return settings.chart.y.func(d[series.yDataKey]); })
								.interpolate('linear')
								.tension(.6)(series.data));

						if ( options.chart.displayPoints){
								dataPoints.enter()
								.append('svg:circle')
								.attr('stroke', series.color)
								.attr('fill', series.color)
								.attr('class', 'chart-data-point')
								.on('mouseover', function (d, i) {
									var me = d3.select(this);
									me.attr('fill', 'none').attr('class', me.attr('class') + ' mouseover');
								})
								.on('mouseout', function (d, i) {
									var me = d3.select(this);
									me.attr('fill', me.attr('stroke')).attr('class', me.attr('class').replace(' mouseover', ''));
								})
								.attr('r', 4)
								.attr('cx', function (d) { return settings.chart.x.func(d[series.xDataKey]); })
								.attr('cy', function (d) { return settings.chart.y.func(d[series.yDataKey]); })
								.append('title')
								.text(function (d) { return d[series.xDataKey] + options.chart.xAxis.unit + ', ' + d[series.yDataKey] + options.chart.yAxis.unit; });
						}
						
					}
				});
			},

			plotChart: function () {
				if (!objects.chart) {
					objects.chart = objects.graph
						.append('svg:g');
				}

				objects.chart.text(null);
				objects.xGrid	  = 
				objects.yGrid 	  = 
				objects.dataLinesBorder = null;


				methods.getChartDataLimits();
				methods.setChartProperties();
				methods.plotXGrid();
				methods.plotYGrid();
				methods.plotDataLines();
			}
		};

    $.fn.linechart = function (method) {
        if (publicMethods[method]) {
            return publicMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
        	methods.init.apply(this, arguments);
        	return this;
        } else {
            $.error('Invalid method' + method);
        }
    };

})(jQuery);
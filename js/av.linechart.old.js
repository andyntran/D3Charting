(function ($) {

	var options = {
			width: 0,
			height: 0,
			title: {
				text: null,
				x: 0,
				y: 0
			},
			subTitle: {
				text: null,
				x: 0,
				y: 0
			},
			chart: {
				margin: {
					top: 8,
					right: 8,
					bottom: 8,
					left: 8
				},
				x: 0,
				y: 0
			},
			legend: {
				layout: 'vertical',
				x: 0,
				y: 0
			},
			axis: {
				x: {
					title: "xTitle",
					titlePadding: 5,
					dataKey: "xDataKey",
					isAxisVisible: true,
					ticks: {
						isVisible: true,
						interval: 5,
						textPadding: 5
					},
					isDataGridVisible: true,
					isDataPointVisible: true,
					startingDataGridAt: null,
					max: null,
					min: null
				},
				y: {
					title: "yTitle",
					titlePadding: 5,
					series: [
						{ 
							dataUrl: null, 
							dataKey: "yDataKey1", 
							dataCollectionKey: "collectionDataKey1",
							xDataKey: "xDataKey1", 
							yDataKey: "yDataKey1", 
							color: "blue",
							data: null
						},
						{
							dataUrl: null, 
							dataKey: "yDataKey2", 
							dataCollectionKey: "collectionDataKey2",
							xDataKey: "xDataKey2", 
							yDataKey: "yDataKey2", 
							color: "red",
							data: null
						}
					],
					isAxisVisible: true,
					ticks: {
						isVisible: true,
						interval: 5,
						textPadding: 5
					},
					isDataGridVisible: true,
					isDataPointVisible: true,
					startingDataGridAt: null,
					max: null,
					min: null
				}
			}
		},

		objects = {
			container: null,
			graph: null,
			title: null,
			subTitle: null,
			legend: null
		},

		settings = {
			graph: null,
			title: null,
			subTitle: null,
			chart: {
				margin: {
					top: 8,
					right: 8,
					left: 8,
					bottom: 8
				},
				x : {
					max: null,
					min: null
				},
				y: {
					max: null,
					min: null
				}
			}
		},

		publicMethods = {
			options: function (key, value) {
				if (value) {
					options[key] = value;
				}
				return options[key];
			},

			graph: function (width, height) {
				if (width) options.width = width;
				if (height) options.height = height;

				if (!objects.graph) {
					objects.graph = objects.container
						.append("svg:svg")
						.attr("class", "chart")
						.attr("width", options.width)
						.attr("height", options.height)
						.append('svg:g');
				}
				return objects.graph;
			},

			title: function (text, x, y) {
				if (text) options.title.text = text;
				if (x) options.title.x = x;
				if (y) options.title.y = y;

				if (!objects.title) {
					objects.title = objects.graph
						.append("svg:text")
						.attr("class", "chart-title");
				}

				objects.title
					.text(options.title.text)
					.attr("x", options.title.x)
					.attr("y", options.title.y);

				return objects.title;
			},

			subTitle: function (text, x, y) {
				if (text) options.subTitle.text = text;
				if (x) options.subTitle.x = x;
				if (y) options.subTitle.y = y;

				if (!objects.subTitle) {
					objects.subTitle = objects.graph
						.append("svg:text")
						.attr("class", "chart-subtitle");
				}

				objects.subTitle
					.text(options.subTitle.text)
					.attr("x", options.subTitle.x)
					.attr("y", options.subTitle.y);

				return objects.subTitle;
			},
			
			legend: function (layout, x, y) {
				if (layout) options.legend.layout = layout;
				if (x) options.legend.x = x;
				if (y) options.legend.y = y;

				if (!objects.legend) {
					objects.legend = objects.graph
						.append("svg:g")
						.attr("class", "chart-legend");
				}
				
				objects.legend
					.attr("x", options.legend.x)
					.attr("y", options.legend.y);
			},

			refreshData: function () {
				var count = 0;

				$.each(options.axis.y.series, function (i, series) {
					$.ajax({
						method: "GET",
						url: series.dataUrl,
						dataType: "jsonp",
						success: function (d) {
							series.data = d ?
								series.dataCollectionKey ?
									d[series.dataCollectionKey] :
									d :
								null;
						},
						error: function (e) {
							series.data = null;
						},
						complete: function () {
							++count;
							if (count == options.axis.y.series.length) {
								publicMethods.chart();
							}
						}
					});
				});

				return this;
			},
			
			chart: function () {
				$.extend(settings.chart.margin, options.margin);

				$.extend(settings.chart, methods.getChartDataLimits(options.axis.y.series));

				if (false) {

					// var minX = typeof options.axis.x.min === "number" ? 
					// 		options.axis.x.min : 
					// 		d3.min($.map(data, function (item) { return item[options.axis.x.dataKey]; })),
					// 	maxX = typeof options.axis.x.max === "number" ? 
					// 		options.axis.x.max : 
					// 		d3.max($.map(data, function (item) { return item[options.axis.x.dataKey]; })),

					// 	minY = typeof options.axis.y.min === "number" ? 
					// 		options.axis.y.min : 
					// 		d3.min($.map(data, function (item) {
					// 			var values = [];
					// 			for (var i = 0; i < options.axis.y.series.length; i++) {
					// 				values.push(item[options.axis.y.series[i].dataKey]);
					// 			}
					// 			return d3.min(values);
					// 		})),
					// 	maxY = typeof options.axis.y.max === "number" ? 
					// 		options.axis.y.max : 
					// 		d3.max($.map(data, function (item) {
					// 			var values = [];
					// 			for (var i = 0; i < options.axis.y.series.length; i++) {
					// 				values.push(item[options.axis.y.series[i].dataKey]);
					// 			}
					// 			return d3.max(values);
					// 		}));

					var vis = settings.graph,
						xAxisTitle = vis
							.append("svg:text")
							.attr("class", "chart-axis-title chart-x-axis-title")
							.attr("x", options.width / 2)
							.attr("y", options.height - options.margin.bottom)
							.text(options.axis.x.title),
						yAxisTitle = vis
							.append("svg:text")
							.attr("class", "chart-axis-title chart-y-axis-title")
							.attr("transform", "rotate(270 " + options.margin.left + " " + options.height / 2 + ")")
							.attr("x", options.margin.left)
							.attr("y", options.height / 2)
							.text(options.axis.y.title),

						xAxisTitleHeight = xAxisTitle[0][0].clientHeight,
						yAxisTitleHeight = yAxisTitle[0][0].clientHeight,


						testxTickTextObj = vis
							.append("svg:text")
							.attr("class", "chart-data-mark-text chart-x-data-mark-text")
							.text(maxX),
						testyTickTextObj = vis
							.append("svg:text")
							.attr("class", "chart-data-mark-text chart-y-data-mark-text")
							.text(maxY),

						xTickTextHeight = testxTickTextObj[0][0].clientHeight,
						xTickTextWidth = testxTickTextObj[0][0].clientWidth,
						yTickTextHeight = testyTickTextObj[0][0].clientHeight,
						yTickTextWidth = testyTickTextObj[0][0].clientWidth,

						xTickHalfTextWidth = xTickTextWidth / 2,
						yTickHalfTextHeight = yTickTextHeight / 2;


					testxTickTextObj.remove();
					testyTickTextObj.remove();

					if (xAxisTitleHeight)
						options.margin.bottom += xAxisTitleHeight + options.axis.x.titlePadding;
					if (yAxisTitleHeight)
						options.margin.left += yAxisTitleHeight + options.axis.y.titlePadding;

					if (options.axis.x.ticks.isVisible) {
						options.margin.left += xTickHalfTextWidth;
						options.margin.right += xTickHalfTextWidth;
						options.margin.bottom += 2 * options.axis.x.ticks.textPadding + xTickTextHeight;
					}
					if (options.axis.y.ticks.isVisible) {
						options.margin.left += 2 * options.axis.y.ticks.textPadding + yTickTextWidth;
						options.margin.top += yTickHalfTextHeight;
						options.margin.bottom += yTickHalfTextHeight;
					}

					var	graphWidth = options.width - options.margin.left - options.margin.right,
						graphHeight = options.height - options.margin.top - options.margin.bottom,

						stepX = Math.floor(graphWidth / (maxX - minX) * 10) / 10, // More accurated with an extra decimal point
						stepY = Math.floor(graphHeight / (maxY - minY) * 10) / 10, // More accurated with an extra decimal point

						halfStepX = stepX / 2,
						halfStepY = stepY / 2,

						startingDataGridXAt = options.axis.x.startingDataGridAt || minX,
						startingDataGridYAt = options.axis.y.startingDataGridAt || minY;


					// Draws x-axis data grids and ticks
					if (options.axis.x.ticks.isVisible || options.axis.x.isDataGridVisible) {
						var value = startingDataGridXAt,
							x1 = options.margin.left + (value - minX) * stepX,
							y1 = options.margin.top + !options.axis.x.isDataGridVisible * graphHeight,
							x2 = x1,
							y2 = options.margin.top + graphHeight + options.axis.x.ticks.isVisible * options.axis.x.ticks.textPadding,
							yText = y2 + options.axis.x.ticks.textPadding;

						while (value <= maxX) {
							vis.append("svg:line")
							   .attr("class", "chart-data-grid chart-x-data-grid")
							   .attr("x1", x1)
							   .attr("y1", y1)
							   .attr("x2", x2)
							   .attr("y2", y2);

							if (options.axis.x.ticks.isVisible) {
								vis.append("svg:text")
								   .attr("class", "chart-tick-text chart-x-tick-text")
								   .text(value)
								   .attr("x", x1)
								   .attr("y", yText);
							}

							value += options.axis.x.ticks.interval;
							x1 = x2 += options.axis.x.ticks.interval * stepX;
						}
					}

					// Draws y-axis data grids and ticks
					if (options.axis.y.ticks.isVisible || options.axis.y.isDataGridVisible) {
						var value = startingDataGridYAt,
							x1 = options.margin.left - options.axis.y.ticks.isVisible * options.axis.y.ticks.textPadding,
							y1 = options.margin.top + graphHeight - (value - minY) * stepY,
							x2 = options.margin.left + options.axis.y.isDataGridVisible * graphWidth,
							y2 = y1,
							xText = options.margin.left - 2 * options.axis.y.ticks.textPadding;

						while (value <= maxY) {
							vis.append("svg:line")
							   .attr("class", "chart-data-grid chart-y-data-grid")
							   .attr("x1", x1)
							   .attr("y1", y1)
							   .attr("x2", x2)
							   .attr("y2", y2);

							if (options.axis.y.ticks.isVisible) {
								vis.append("svg:text")
								   .attr("class", "chart-tick-text chart-y-tick-text")
								   .text(value)
								   .attr("x", xText)
								   .attr("y", y1);
							}

							value += options.axis.y.ticks.interval;
							y1 = y2 -= options.axis.y.ticks.interval * stepY;
						}
					}					


					// NOTE: HAVE TO draw the axises after drawing the grids
					// Draws x-axis
					if (options.axis.x.isAxisVisible) {
						vis.append("svg:line")
						   .attr("class", "chart-axis chart-x-axis")
						   .attr("x1", options.margin.left - options.axis.y.ticks.isVisible * options.axis.y.ticks.textPadding)
						   .attr("y1", options.margin.top + graphHeight)
						   .attr("x2", options.margin.left + graphWidth)
						   .attr("y2", options.margin.top + graphHeight);
					}

					// Draws y-axis
					if (options.axis.y.isAxisVisible) {
						vis.append("svg:line")
						   .attr("class", "chart-axis chart-y-axis")
						   .attr("x1", options.margin.left)
						   .attr("y1", options.margin.top)
						   .attr("x2", options.margin.left)
						   .attr("y2", options.margin.top + graphHeight + options.axis.x.ticks.isVisible * options.axis.x.ticks.textPadding);
					}


					var lines = vis.selectAll("path.line")
								   .data(options.axis.y.series)
								   .enter()
								   .append("svg:g");

					$.each(options.axis.y.series, function (i, series) {
						var dataPoints = lines.data(data).enter();
						
						dataPoints.append("svg:path")							 
							 .attr("class", "chart-data-line " + series.cssClass)
							 .attr("d", d3.svg.line()							 	
							 	.x(function (d) { 
	                		 		return options.margin.left + (d[options.axis.x.dataKey] - minX) * stepX; })
							 	.y(function (d) { 
	                		 		return options.margin.top + graphHeight - (d[series.dataKey] - minY) * stepY; })
							 	.interpolate('linear')
							 	.tension(.6)(data));

						dataPoints.append("circle")
							.attr("class", "chart-data-point " + series.cssClass)
							.on("mouseover", function (d, i) { 
								var me = d3.select(this);
								me.attr("class", me.attr("class") + " mouseover");
							})
							.on("mouseout", function (d, i) { 
								var me = d3.select(this);
								me.attr("class", me.attr("class").replace(" mouseover", ""));
							})
							.attr("r", 3)
							.attr("cx", function (d) { return options.margin.left + (d[options.axis.x.dataKey] - minX) * stepX; })
							.attr("cy", function (d) { return options.margin.top + graphHeight - (d[series.dataKey] - minY) * stepY; })
							.append("title")
							.text(function (d) {return d[options.axis.x.dataKey] + ", " + d[series.dataKey] + "%"; });

					});

					return true;
				}
				return false;
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

				publicMethods.refreshData();
			},

			initSettings: function ($container) {
				$container.html('');

				objects.container = d3.select($container.selector);
				objects.graph	  =
				objects.title	  =
				objects.subTitle  =
				objects.legend	  = null;

				publicMethods.graph();
				publicMethods.title();
				publicMethods.subTitle();
			},

			getChartDataLimits: function (seriesList) {
				var xData = [];
				var yData = [];
				$.each(seriesList, function (i, series) {
					if (series.data) {
						$.merge(xData, $.map(series.data, function (dataItem) { return dataItem[series.xDataKey]; }));
						$.merge(yData, $.map(series.data, function (dataItem) { return dataItem[series.yDataKey]; }));
					}
				});

				return {
					x: {
						min: d3.min(xData),
						max: d3.max(xData)
					},
					y: {
						min: d3.min(yData),
						max: d3.max(yData)
					}
				};
			}
		};


    $.fn.linechart = function (method) {
        if (publicMethods[method]) {
            return publicMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
        	var me = this;
            setTimeout(function () { 
            	methods.init.call(me, method);
            	me = null;
            	method = null;
            }, 100);
        	return this;
        } else {
            $.error('Invalid method' + method);
        }
    };

})(jQuery);
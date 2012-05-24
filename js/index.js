$(function (){
	var $chart = $('#chart');

	$chart.linechart({
		width: 900,
		height: 600,
		palette: ['#4572A7', '#AA4643', '#89A54E', '#80699B'],
		title: {
			text: 'Main Title',
			verticalAlign: 'top',
			horizontalAlign: 'center',
			x: 0,
			y: 10
		},
		subTitle: {
			text: "Sub Title",
			verticalAlign: 'top',
			horizontalAlign: 'center',
			x: 0,
			y: 0
		},
		legend: {
			layout: 'vertical', // vertical/horizontal
			verticalAlign: 'middle', // top/middle/bottom
			horizontalAlign: 'right', // right/center/left
			x: 10,
			y: 100
		},
		series: [
		{
			name: 'test',
			//dataUrl: 'http://localhost:401/series/weight?measureGuid=4fb5b5bbdfd8eb1034074e5f',
			dataUrl: 'http://50.57.112.150:401/series/weight?measureGuid=4fb3ed343da2bc153050ec17&roll=4',
			dataType: 'jsonp',
			xDataKey: 'date',			
			yDataKey: 'value',			
		}
		// {
		// 	name: '99%',
		// 	dataUrl: 'data/p99.json',
		// 	collectionDataKey: 'results',
		//  dataType: 'json',
		// 	xDataKey: 'year',
		// 	yDataKey: 'p99'
		// }, {
		// 	name: '95%',
		// 	dataUrl: 'data/p95.json',
		// 	collectionDataKey: 'results',
		//  dataType: 'json',
		// 	xDataKey: 'year',
		// 	yDataKey: 'p95'
		// }
		],
		chart: {
			margin: {
				top: 64,
				right: 100,
				bottom: 64,
				left: 64
			},
			xAxis: {
				title: 'Years',
				interval: 2,
				gridStartAt: null,
				isDate: true,
				min: null,
				max: null,
				unit: ''
			},
			yAxis: {
				title: 'Percentage (%)',
				interval: 1,
				gridStartAt: null,
				min: 35,
				max: null,
				unit: '%'
			},
			displayPoints: false
		}
	});



	$('#graphWidth').val($chart.linechart('options', 'width'));
	$('#graphHeight').val($chart.linechart('options', 'height'));

	$('#graphWidth, #graphHeight').change(function () {
		var width = parseInt($('#graphWidth').val(), 10);
		var height = parseInt($('#graphHeight').val(), 10);
		$chart.linechart('graph', width, height);
	});

	$('#graphStyle').val($chart.attr('class'));
	$('#graphStyle').change(function () {
		if ($chart.attr('old-class'))
			$chart.removeClass($chart.attr('old-class'));

		$chart
			.addClass($('#graphStyle').val())
			.attr('old-class', $('#graphStyle').val());
	});

	$('#titleText').val($chart.linechart('options', 'title.text'));
	$('#titleVerticalAlign').val($chart.linechart('options', 'title.verticalAlign'));
	$('#titleHorizontalAlign').val($chart.linechart('options', 'title.horizontalAlign'));
	$('#titleX').val($chart.linechart('options', 'title.x'));
	$('#titleY').val($chart.linechart('options', 'title.y'));

	$('#titleText, #titleVerticalAlign, #titleHorizontalAlign, #titleX, #titleY').change(function () {
		var text = $('#titleText').val();
		var verticalAlign = $('#titleVerticalAlign').val();
		var horizontalAlign = $('#titleHorizontalAlign').val();
		var x = parseInt($('#titleX').val(), 10);
		var y = parseInt($('#titleY').val(), 10);
		$chart.linechart('title', text, verticalAlign, horizontalAlign, x, y);
	});



	$('#subTitleText').val($chart.linechart('options', 'subTitle.text'));
	$('#subTitleVerticalAlign').val($chart.linechart('options', 'subTitle.verticalAlign'));
	$('#subTitleHorizontalAlign').val($chart.linechart('options', 'subTitle.horizontalAlign'));
	$('#subTitleX').val($chart.linechart('options', 'subTitle.x'));
	$('#subTitleY').val($chart.linechart('options', 'subTitle.y'));

	$('#subTitleText, #subTitleVerticalAlign, #subTitleHorizontalAlign, #subTitleX, #subTitleY').change(function () {
		var text = $('#subTitleText').val();
		var verticalAlign = $('#subTitleVerticalAlign').val();
		var horizontalAlign = $('#subTitleHorizontalAlign').val();
		var x = parseInt($('#subTitleX').val(), 10);
		var y = parseInt($('#subTitleY').val(), 10);
		$chart.linechart('subTitle', text, verticalAlign, horizontalAlign, x, y);
	});



	$('#legendLayout').val($chart.linechart('options', 'legend.layout'));
	$('#legendVerticalAlign').val($chart.linechart('options', 'legend.verticalAlign'));
	$('#legendHorizontalAlign').val($chart.linechart('options', 'legend.horizontalAlign'));
	$('#legendX').val($chart.linechart('options', 'legend.x'));
	$('#legendY').val($chart.linechart('options', 'legend.y'));

	$('#legendLayout, #legendVerticalAlign, #legendHorizontalAlign, #legendX, #legendY').change(function () {
		var layout = $('#legendLayout').val();
		var verticalAlign = $('#legendVerticalAlign').val();
		var horizontalAlign = $('#legendHorizontalAlign').val();
		var x = parseInt($('#legendX').val(), 10);
		var y = parseInt($('#legendY').val(), 10);
		$chart.linechart('legend', layout, verticalAlign, horizontalAlign, x, y);
	});



	$('#chartMarginLeft').val($chart.linechart('options', 'chart.margin.left'));
	$('#chartMarginTop').val($chart.linechart('options', 'chart.margin.top'));
	$('#chartMarginRight').val($chart.linechart('options', 'chart.margin.right'));
	$('#chartMarginBottom').val($chart.linechart('options', 'chart.margin.bottom'));
	$('#chartXAxisTitle').val($chart.linechart('options', 'chart.xAxis.title'));
	$('#chartXAxisInterval').val($chart.linechart('options', 'chart.xAxis.interval'));
	$('#chartXAxisGridStartAt').val($chart.linechart('options', 'chart.xAxis.gridStartAt'));
	$('#chartXAxisMin').val($chart.linechart('options', 'chart.xAxis.min'));
	$('#chartXAxisMax').val($chart.linechart('options', 'chart.xAxis.max'));
	$('#chartYAxisTitle').val($chart.linechart('options', 'chart.yAxis.title'));
	$('#chartYAxisInterval').val($chart.linechart('options', 'chart.yAxis.interval'));
	$('#chartYAxisGridStartAt').val($chart.linechart('options', 'chart.yAxis.gridStartAt'));
	$('#chartYAxisMin').val($chart.linechart('options', 'chart.yAxis.min'));
	$('#chartYAxisMax').val($chart.linechart('options', 'chart.yAxis.max'));
	$('#chartAreaUpdateButton').click(function() {
		var margin = {left: null, top: null, bottom: null, right: null};
		if ($('#chartMarginLeft').val()) {
			var marginLeft = parseInt($('#chartMarginLeft').val(), 10);
			if (!isNaN(marginLeft)) {
				margin.left = marginLeft;
			}
		}

		if ($('#chartMarginTop').val()) {
			var marginTop = parseInt($('#chartMarginTop').val(), 10);
			if (!isNaN(marginTop)) {
				margin.top = marginTop;
			}
		}

		if ($('#chartMarginRight').val()) {
			var marginRight = parseInt($('#chartMarginRight').val(), 10);
			if (!isNaN(marginRight)) {
				margin.right = marginRight;
			}
		}

		if ($('#chartMarginBottom').val()) {
			var marginBottom = parseInt($('#chartMarginBottom').val(), 10);
			if (!isNaN(marginBottom)) {
				margin.bottom = marginBottom;
			}
		}


		var xAxis = {title: null, interval: null, gridStartAt: null, min: null, max: null};
		if ($('#chartXAxisTitle').val()) {
			xAxis.title = $('#chartXAxisTitle').val();
		}

		if ($('#chartXAxisInterval').val()) {
			var interval =  parseInt($('#chartXAxisInterval').val(), 10);
			if (!isNaN(interval) && interval > 0) {
				xAxis.interval = interval;
			}
		}

		if ($('#chartXAxisGridStartAt').val()) {
			var gridStartAt = parseInt($('#chartXAxisGridStartAt').val(), 10);
			if (!isNaN(gridStartAt)) {
				xAxis.gridStartAt = gridStartAt;
			}
		}

		if ($('#chartXAxisMin').val()) {
			var min = parseInt($('#chartXAxisMin').val(), 10);
			if (!isNaN(min)) {
				xAxis.min = min;
			}
		}

		if ($('#chartXAxisMax').val()) {
			var max = parseInt($('#chartXAxisMax').val(), 10);
			if (!isNaN(max)) {
				xAxis.max = max;
			}
		}


		var yAxis = {title: null, interval: null, gridStartAt: null, min: null, max: null};
		if ($('#chartYAxisTitle').val()) {
			yAxis.title = $('#chartYAxisTitle').val();
		}

		if ($('#chartYAxisInterval').val()) {
			var interval =  parseInt($('#chartYAxisInterval').val(), 10);
			if (!isNaN(interval) && interval > 0) {
				yAxis.interval = interval;
			}
		}

		if ($('#chartYAxisGridStartAt').val()) {
			var gridStartAt = parseInt($('#chartYAxisGridStartAt').val(), 10);
			if (!isNaN(gridStartAt)) {
				yAxis.gridStartAt = gridStartAt;
			}
		}

		if ($('#chartYAxisMin').val()) {
			var min = parseInt($('#chartYAxisMin').val(), 10);
			if (!isNaN(min)) {
				yAxis.min = min;
			}
		}

		if ($('#chartYAxisMax').val()) {
			var max = parseInt($('#chartYAxisMax').val(), 10);
			if (!isNaN(max)) {
				yAxis.max = max;
			}
		}

		$chart.linechart('chartArea', margin, xAxis, yAxis);

		return false;
	});

	var addSeries = function (series) {
		var $list = $('#series fieldset');

		var $seriesControl = $('\
			<div class="series">\
				<div class="title">Series <button class="series-delete-button">Delete</button></div>\
				<span class="name url">Data Url</span><input type="text" value="" class="data-url" />\
				<span class="name">Data Type</span><input type="text" value="" class="data-type key" /><br/>\
				<span class="name series-name">Name</span><input type="text" class="series-name" value="" />\
				<span class="name">Collection Data Key</span><input type="text" value="" class="collection-data-key key" />\
				<span class="name">X Data Key</span><input type="text" value="" class="x-data-key key" />\
				<span class="name">Y Data Key</span><input type="text" value="" class="y-data-key key" />\
				<span class="name">Color</span><span class="series-color"></span>\
			</div>').insertBefore($('#seriesListAddButton'));

		$seriesControl.find('input.data-url').val(series.dataUrl);
		$seriesControl.find('input.data-type').val(series.dataType);
		$seriesControl.find('input.series-name').val(series.name);
		$seriesControl.find('input.collection-data-key').val(series.collectionDataKey);
		$seriesControl.find('input.x-data-key').val(series.xDataKey);
		$seriesControl.find('input.y-data-key').val(series.yDataKey);
		$seriesControl.find('span.series-color')
			.ColorPicker({
				onSubmit: function (hsb, hex, rgb, el) {
					var $me = $(el);
					$me.css({backgroundColor: '#' + hex});
					$me.attr('current-color', '#' + hex);
					$me.ColorPickerHide();
				},
				onBeforeShow: function () {
					$(this).ColorPickerSetColor($(this).attr('current-color'));
				}
			})
			.css({ backgroundColor: series.color });
		$seriesControl.find('span.series-color').attr('current-color', series.color);

		$seriesControl.find('.series-delete-button').click(function () {
			var $parent = $(this).parents('.series');
			if (confirm('Are you sure you want to remove series ' + $parent.find('input.series-name').val() + '?')) {
				$parent.remove();
			}
			return false;
		});

		return $seriesControl;
	};

	$('#seriesListAddButton').click(function () {
		var palette = $chart.linechart('options', 'palette');
		addSeries({
			name: 'New Series',
			color: palette[($("#series").find('div.series').length) % palette.length]
		}).find('input:first').focus();

		return false;
	});

	var seriesList = $("#chart").linechart('options', 'series');
	$.each(seriesList, function (i, series) {
		addSeries(series);
	});

	$('#seriesListUpdateButton').click(function () {
		seriesList = [];
		$.each ($("#series").find('div.series'), function (i, elem) {
			var $me = $(elem);
			var seriesItem = {
				name: $me.find('input.series-name').val(),
				dataUrl: $me.find('input.data-url').val(),
				dataType: $me.find('input.data-type').val(),
				collectionDataKey: $me.find('input.collection-data-key').val(),
				xDataKey: $me.find('input.x-data-key').val(),
				yDataKey: $me.find('input.y-data-key').val(),
				color: $me.find('.series-color').attr('current-color')
			};

			if (seriesItem.name && seriesItem.dataUrl &&
				seriesItem.xDataKey && seriesItem.yDataKey && seriesItem.color) {
				seriesList.push(seriesItem);
			}
		});

		$chart.linechart('series', seriesList);

		return false;
	});
});
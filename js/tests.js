var options = null,
	$chart  = null;

function setUpPage() {
	options = {
		width: 1024,
		height: 640,
		title: {
			text: 'Main Title',
			x: 512,
			y: 0
		},
		chart: {
			margin: {
				top: 8,
				right: 16,
				bottom: 8,
				left: 16
			},
			x: 0,
			y: 0
		}
	};
	$chart = $('#chart').linechart(options);

	setTimeout(function () {
		setUpPageStatus = "complete";
	}, 500);
}

function testInitLineChart() {
	assertNotNull($chart);
	assertNotUndefined($chart.linechart);

	assertEquals(options.width, $chart.linechart("options", "width"));
	assertEquals(options.height, $chart.linechart("options", "height"));

	var title = $chart.linechart("options", "title");
	assertEquals(options.title.text, title.text);
	assertEquals(options.title.x, title.x);
	assertEquals(options.title.y, title.y);

	var chart = $chart.linechart("options", "chart");
	assertNotUndefined(chart);
	assertNotNull(chart);
	assertEquals(options.chart.margin.top, chart.margin.top);
	assertEquals(options.chart.margin.right, chart.margin.right);
	assertEquals(options.chart.margin.bottom, chart.margin.bottom);
	assertEquals(options.chart.margin.left, chart.margin.left);
}

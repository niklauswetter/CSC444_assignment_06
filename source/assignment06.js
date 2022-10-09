// create spec
var spec = {
    width: 1000,
    height: 500,
    padding: 50,
    data: [
        {
            name: "reputation",
            url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/reputation.csv",
            format: { type: "csv"},
            transform: [
                {
                    type: "collect",
                    sort: {field: "score", order: "descending"}
                },
                {
                    type: "filter",
                    expr: "datum.name == 'TRUST'"
                },
                {
                    type: "filter",
                    expr: "datum.rank <= 10 "
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "band",
            domain: {data: "reputation", field: "company"},
            range: "width",
            padding: .5
        },
        {
            name:"yScale",
            type: "linear",
            domain: {data: "reputation", field: "score"},
            range: "height"
        }
    ],
    axes: [
        {
            scale: "xScale",
            orient: "bottom",
            title: "Company name"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "Score"
        }
    ],
    title: {
        text: "Top Ten Most Trusted Companies",
        fontSize: 20,
        subtitle: "Ranked In Order",
        subtitleFontSize: 16
    },
    marks: [
        {
            type: "rect",
            from: {data: "reputation"},
            encode: {
                enter: {
                    x: {field: "company", scale: "xScale"},
                    y: {field: "score", scale: "yScale"},
                    y2: {value: 0, scale: "yScale"},
                    width: {value: 50}
                },
                update: {
                    fill: {value: "lightBlue"}
                },
                hover: {
                    fill: {value: "LightGray"},
                    strokeWidth: {value: 2},
                    stroke: {value: "lightBlue"}
                }
            }
        },
        {
            type: "text",
            from: {data: "reputation"},
            encode: {
                enter: {
                    x: {field: "company", scale: "xScale"},
                    y: {field: "score", scale: "yScale"},
                    text: {field: "rank"},
                    dx: {value: 25},
                    dy: {value: 20},
                    fill: {value: "black"},
                    align: {value: "center"},
                    fontSize: {value: 20}
                }
            }
        }
    ]
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
    .renderer("svg")
    .initialize("#view")
    .hover();

// run it
view.run();

console.log(view.data("trust"));
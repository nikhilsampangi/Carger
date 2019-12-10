import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Sector,
} from 'recharts';

// Backend : send data in below format
const revenue_data = [
  {
    name: 'Apr \'19', Revenue: 62000, Expenditure: 40000,
  },
  {
    name: 'May \'19', Revenue: 72000, Expenditure: 47000,
  },
  {
    name: 'Jun \'19', Revenue: 69000, Expenditure: 40000,
  },
  {
    name: 'Jul \'19', Revenue: 73000, Expenditure: 41000,
  },
  {
    name: 'Aug \'19', Revenue: 54000, Expenditure: 45000,
  },
  {
    name: 'Sept \'19', Revenue: 65000, Expenditure: 48000,
  },
  {
    name: 'Oct \'19', Revenue: 40000, Expenditure: 42000,
  },
  {
    name: 'Nov \'19', Revenue: 51000, Expenditure: 38000,
  },
  {
    name: 'Dec \'19', Revenue: 57000, Expenditure: 46000,
  },
];

const visitor_data = [
  {
    name: 'Apr \'19', Visitors: 32000,
  },
  {
    name: 'May \'19', Visitors: 22000,
  },
  {
    name: 'Jun \'19', Visitors: 39000,
  },
  {
    name: 'Jul \'19', Visitors: 23000,
  },
  {
    name: 'Aug \'19', Visitors: 34000,
  },
  {
    name: 'Sept \'19', Visitors: 35000,
  },
  {
    name: 'Oct \'19', Visitors: 20000,
  },
  {
    name: 'Nov \'19', Visitors: 31000,
  },
  {
    name: 'Dec \'19', Visitors: 37000,
  },
];

const feedback_data = [
  { name: '5 Stars', val: 360, },
  { name: '4 Stars', val: 420, },
  { name: '3 Stars', val: 460, },
  { name: '2 Stars', val: 250, },
  { name: '1 Stars', val: 200, },
];

const fuel_intake_data = [
  { name: 'Diesel', percent: 40 },
  { name: 'Petrol', percent: 35 },
  { name: 'CNG', percent: 25 },
]

const COLORS = ['#0088FE', '#28b779', '#FF9A44'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class RevenueStatistics extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-9" style={{ "height": "80vh", "borderRadius": "20px", "backgroundColor": "white" }}>
            <br /><br />
            <div className="row">
              <div className="col-1"></div>
              <div className="col" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
                <h2>Revenue vs Expenditure Graph</h2>
                <br />
                <br />
                <BarChart
                  width={800}
                  height={400}
                  data={revenue_data}
                  margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  {/* <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" /> */}
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* < Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" /> */}
                  < Bar dataKey="Expenditure" fill="#27a9e3" />
                  <Bar dataKey="Revenue" fill="#da542e" />
                </BarChart>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <br /><br /><br /><br />
        <div className="row">
          <div className="col-1"></div>
          <div className="col-5" style={{ "height": "65vh", "borderRadius": "20px", "backgroundColor": "white" }}>
            <br /><br />
            <div className="row">
              <div className="col-1"></div>
              <div className="col" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
                <center><h2>Visitor Count</h2></center>
                <br />
                <br />
                <LineChart
                  width={500}
                  height={300}
                  data={visitor_data}
                  margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" type="category" />
                  <YAxis type="number" />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="Visitors" stroke="#28b779" name="Number of Visitors" />
                </LineChart>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
          <div className="col-1"></div>
          <div className="col-3" style={{ "height": "65vh", "borderRadius": "20px", "backgroundColor": "white" }}>
            <br /><br />
            <div className="row">
              <div className="col-1"></div>
              <div className="col" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
                <center><h2>Feedbacks</h2></center>
                <br />
                <br />
                <BarChart
                  layout="vertical"
                  width={250}
                  height={300}
                  data={feedback_data}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="val" fill="#FF9A44" name="# of Customers" />
                </BarChart>
              </div>

              <div className="col-1"></div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <br /><br /><br /><br />
        <div className="row">
          <div className="col-1"></div>
          <div className="col" style={{ "height": "70vh", "borderRadius": "20px", "backgroundColor": "white" }}>
            <br /><br />
            <div className="row">
              <div className="col-1"></div>
              <div className="col" style={{ "fontFamily": "Josefin Sans, sans-serif" }}>
                <h2>Type-wise Fuel Intake Percentage Chart</h2>
                <br />

                <center>
                  <PieChart width={500} height={500}>
                    <Pie dataKey="percent" data={fuel_intake_data} cx={200} cy={200} outerRadius={160} fill="#8884d8" label>
                      {
                        fuel_intake_data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                      }
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </center>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    )
  }
}

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from 'react-plotly.js';

type SurfacePlotProps = {
  data: Plotly.Data[];
  layout: Partial<Plotly.Layout>;
  handleClickProp?: (event: Readonly<Plotly.PlotMouseEvent>) => void;
};

export const SurfacePlot = (props: SurfacePlotProps) => {
  const { data, layout } = props;
  data.forEach((item) => {
    if (item.type !== 'scatter3d') {
      item.type = 'surface';
    }
  });
  
  const handleClick = (e: Readonly<Plotly.PlotMouseEvent>) => {
    if (props.handleClickProp) {
      props.handleClickProp(e);
    }
  };
  return (
      <Plot
          data={data}
          layout={layout}
          config={{ modeBarButtons: false }}
          onClick={handleClick}
          // debug
      />
  );
};

function App() {
 
 
 let z1 = [
    [8.83,8.89,8.81,8.87,8.9,8.87],
    [8.89,8.94,8.85,8.94,8.96,8.92],
    [8.84,8.9,8.82,8.92,8.93,8.91],
    [8.79,8.85,8.79,8.9,8.94,8.92],
    [8.79,8.88,8.81,8.9,8.95,8.92],
    [8.8,8.82,8.78,8.91,8.94,8.92],
    [8.75,8.78,8.77,8.91,8.95,8.92],
    [8.8,8.8,8.77,8.91,8.95,8.94],
    [8.74,8.81,8.76,8.93,8.98,8.99],
    [8.89,8.99,8.92,9.1,9.13,9.11],
    [8.97,8.97,8.91,9.09,9.11,9.11],
    [9.04,9.08,9.05,9.25,9.28,9.27],
    [9,9.01,9,9.2,9.23,9.2],
    [8.99,8.99,8.98,9.18,9.2,9.19],
    [8.93,8.97,8.97,9.18,9.2,9.18]
  ];
  
  
  let data_z1 = {z: z1, type: 'surface'};
  
  let trace1 = {
    x: [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    y: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    z: [8.87,8.94,8.92,8.9,8.91,8.91,8.91,8.91,8.93,9.1,9.09,9.25,9.2,9.18,9.18],
    mode: 'lines',
    marker: {
      color: 'red',
      size: 12,
      symbol: 'circle',
      line: {
        color: 'rgb(0,0,0)',
        width: 0
      }},
    line: {
      color: 'red',
      width: 5
    },
    type: 'scatter3d'
  };
  
  let trace2 = {
    x: [0,1,2,3,4,5],
    y: [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    z: [8.79,8.88,8.81,8.9,8.95,8.92],
    mode: 'lines',
    marker: {
      color: 'green',
      size: 12,
      symbol: 'circle',
      line: {
        color: 'rgb(0,0,0)',
        width: 0
      }},
    line: {
      color: 'green',
      width: 5
    },
    type: 'scatter3d'
  };
  
  //Plotly.newPlot('graph', [data_z1,trace1,trace2]);
  
  const data: any = [data_z1,trace1,trace2];
  const layout: Partial<Plotly.Layout> = {};
  
  return (
    <div className="App">
      <Plot
          data={data}
          layout={layout}
          // debug
      />
    </div>
  );
}

export default App;

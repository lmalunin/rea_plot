import React, { useState } from 'react';
import './App.css';
import Plot from 'react-plotly.js';
import { useDebounce } from '@uidotdev/usehooks';

let getTrace = (dataSrc: number[][], index: number) => {
    return {
        x: Array(14).fill(null).map((_, i) => index),
        y: Array(14).fill(null).map((_, i) => i),
        z: Array(14).fill(null).map((_, i) => dataSrc[i][index]),
        mode: 'lines',
        marker: {
            color: 'red',
            size: 12,
            symbol: 'circle',
            line: {
                color: 'rgb(0,0,0)',
                width: 0
            }
        },
        line: {
            color: 'red',
            width: 5
        },
        type: 'scatter3d'
    }
}

function App() {
    
    
    let zSurf = [
        [8.83, 8.89, 8.81, 8.87, 8.9, 8.87],
        [8.89, 8.94, 8.85, 8.94, 8.96, 8.92],
        [8.84, 8.9, 8.82, 8.92, 8.93, 8.91],
        [8.79, 8.85, 8.79, 8.9, 8.94, 8.92],
        [8.79, 8.88, 8.81, 8.9, 8.95, 8.92],
        [8.8, 8.82, 8.78, 8.91, 8.94, 8.92],
        [8.75, 8.78, 8.77, 8.91, 8.95, 8.92],
        [8.8, 8.8, 8.77, 8.91, 8.95, 8.94],
        [8.74, 8.81, 8.76, 8.93, 8.98, 8.99],
        [8.89, 8.99, 8.92, 9.1, 9.13, 9.11],
        [8.97, 8.97, 8.91, 9.09, 9.11, 9.11],
        [9.04, 9.08, 9.05, 9.25, 9.28, 9.27],
        [9, 9.01, 9, 9.2, 9.23, 9.2],
        [8.99, 8.99, 8.98, 9.18, 9.2, 9.19],
        [8.93, 8.97, 8.97, 9.18, 9.2, 9.18]
    ];
    
    
    let data_z1 = { z: zSurf, type: 'surface' };
    
    let graphIndex = 4;
    
    const x1 = Array(14).fill(null).map((_, i) => graphIndex);
    const y1 = Array(14).fill(null).map((_, i) => i);
    const z1 = Array(14).fill(null).map((_, i) => zSurf[i][graphIndex]);
    ;
    
    // console.log(x1)
    // console.log(y1)
    
    let trace1 = getTrace(zSurf, graphIndex)
    
    let trace2 = {
        x: [0, 1, 2, 3, 4, 5],
        y: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        z: [8.79, 8.88, 8.81, 8.9, 8.95, 8.92],
        mode: 'lines',
        marker: {
            color: 'green',
            size: 12,
            symbol: 'circle',
            line: {
                color: 'rgb(0,0,0)',
                width: 0
            }
        },
        line: {
            color: 'green',
            width: 5
        },
        type: 'scatter3d'
    };
    
    //Plotly.newPlot('graph', [data_z1,trace1,trace2]);
    
    const graphOnClickHandler = ({ points }: any) => {
        
        let newTrace = getTrace(zSurf, points[0].x)
        
        let newData = [...data, newTrace];
        
        setData(newData);
    }
    
    const [data, setData] = useState<any>([data_z1, trace2])
    
    
    const layout: Partial<Plotly.Layout> = {};
    //==================================
    
    const traceLine1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter',
        hoverinfo: 'none',
        line: { color: '#7348ED', shape: 'spline' }
    };
    
    const traceLine2 = {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter',
        hoverinfo: 'none'
    };
    
    const [styleLines, setStyleLines] = useState<any>({});
    
    const dataLines: any = [traceLine1, traceLine2];
    const layoutLines: Partial<Plotly.Layout> = {};
    const linesOnHoverHandler = (e: any) => {
        console.log('linesOnHoverHandler', e);
        
        const newStyle = setCoordinates(e.event.clientX, e.event.clientY, 'block');
        
        setStyleLines(newStyle)
    }
    
    const debouncedSearchTerm = useDebounce(styleLines, 200);
    
    const linesOnUnHoverHandler = (e: any) => {
        console.log('linesOnUnHoverHandler', e);
        const newStyle = setCoordinates(e.event.clientX, e.event.clientY, 'none');
        setStyleLines(newStyle)
    }
    
    
    const setCoordinates = (x: number, y: number, display: string) => {
        return {
            position: 'absolute',
            display: display,
            left: `${x}px`,
            top: `${y}px`,
        }
    }
    
    return (
        <div className="App">
            <Plot
                data={data}
                layout={layout}
                onClick={graphOnClickHandler}
                // debug
            />
            
            <Plot
                data={dataLines}
                layout={layoutLines}
                onHover={(e) => linesOnHoverHandler(e)}
                onUnhover={(e) => linesOnUnHoverHandler(e)}
                // debug
            />
            
            <div style={debouncedSearchTerm}>
                <img src="cat.jpg" alt="cat" width={50} height={50} style={{ objectFit: 'cover' }}/>
                <div style={{ backgroundColor: 'red', color: 'white' }}>111</div>
                <div style={{ backgroundColor: 'green', color: 'pink' }}>222</div>
                <div style={{ backgroundColor: 'black', color: 'aqua' }}>333</div>
            </div>
        </div>
    );
}


export default App;

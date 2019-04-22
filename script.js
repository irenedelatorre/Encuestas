// Encuestas
const t_campaign = 20;
const marginEncuestas = {t_campaign: t_campaign, t: t_campaign + 20, r: 15, b: 40, l: 30}; 

const l_relacion = 40;
const marginResultados = {t_campaign: t_campaign, t: t_campaign + 20, r: 25, b: 40, l: 0}; 

const rectWidth = 5;
const heightChart = 400;

Promise.all(
    [
        d3.csv('data/elecciones_andaluzas_2.csv', parseAndalucia),
        d3.csv('data/elecciones_americanas.csv', parseUS),
        d3.csv('data/brexit.csv', parseBrexit), 
        d3.csv('data/elecciones_colombianas.csv', parseColombia)
    ])
    .then(draw)
    .catch(function(error) {
        console.log(error);
    });

    function draw (data) {
        const andalucia = data[0];
        const us = data[1];
        const brexit = data[2];
        const colombia = data[3];

        // filtrar solo encuestas
        const encuestasAndalucia = andalucia.filter(d => d.tipo === 'Encuesta' && d.fecha > new Date('1 Septiembre 2018'));
        const encuestasUs = us.filter(d => d.tipo === 'Encuesta');
        const encuestasBrexit = brexit.filter(d => d.tipo === 'Encuesta');
        const encuestasColombia = colombia.filter(d => d.tipo === 'Encuesta');

        // ENCUESTAS puntos por cada resultado 
        // ANDALUCIA
        const resultadosEncuestasAndalucia = [];
        
        for (let i=0; i< encuestasAndalucia.length; i++){
            resultadosEncuestasAndalucia.push({
                elecciones: encuestasAndalucia[i].elecciones,
                fuente: encuestasAndalucia[i].fuente,
                fecha: encuestasAndalucia[i].fecha, 
                elaboracion: encuestasAndalucia[i].fecha_elaboracion,
                partido: 'PSOE', 
                resultado: encuestasAndalucia[i].resultado_PSOE,
                margen: encuestasAndalucia[i].margen,
                min: 'PSOE'
            });
            
            resultadosEncuestasAndalucia.push({
                elecciones: encuestasAndalucia[i].elecciones,
                fuente: encuestasAndalucia[i].fuente,
                fecha: encuestasAndalucia[i].fecha, 
                elaboracion: encuestasAndalucia[i].fecha_elaboracion,
                partido: 'PP', 
                resultado: encuestasAndalucia[i].resultado_PP,
                margen: encuestasAndalucia[i].margen,
                min: 'PP'
            });
            
            resultadosEncuestasAndalucia.push({
                elecciones: encuestasAndalucia[i].elecciones,
                fuente: encuestasAndalucia[i].fuente,
                fecha: encuestasAndalucia[i].fecha, 
                elaboracion: encuestasAndalucia[i].fecha_elaboracion,
                partido: 'Adelante Andalucia (Podemos e IU)', 
                resultado: encuestasAndalucia[i].resultado_Adelante_Andalucia,
                margen: encuestasAndalucia[i].margen, 
                min: 'AA'
            });

            resultadosEncuestasAndalucia.push({
                elecciones: encuestasAndalucia[i].elecciones,
                fuente: encuestasAndalucia[i].fuente,
                fecha: encuestasAndalucia[i].fecha, 
                elaboracion: encuestasAndalucia[i].fecha_elaboracion,
                partido: 'Ciudadanos', 
                resultado: encuestasAndalucia[i].resultado_Ciudadanos,
                margen: encuestasAndalucia[i].margen, 
                min: 'Ciudadanos'
            });
            
            resultadosEncuestasAndalucia.push({
                fuente: encuestasAndalucia[i].fuente,
                fecha: encuestasAndalucia[i].fecha, 
                elaboracion: encuestasAndalucia[i].fecha_elaboracion,
                partido: 'PA', 
                resultado: encuestasAndalucia[i].resultado_PA,
                margen: encuestasAndalucia[i].margen, 
                min: 'PA'
            });
            
            resultadosEncuestasAndalucia.push({
                elecciones: encuestasAndalucia[i].elecciones,
                fuente: encuestasAndalucia[i].fuente,
                fecha: encuestasAndalucia[i].fecha, 
                elaboracion: encuestasAndalucia[i].fecha_elaboracion,
                partido: 'PACMA', 
                resultado: encuestasAndalucia[i].resultado_PACMA,
                margen: encuestasAndalucia[i].margen,
                min: 'PACMA'
            });
            
            resultadosEncuestasAndalucia.push({
                elecciones: encuestasAndalucia[i].elecciones,
                fuente: encuestasAndalucia[i].fuente,
                fecha: encuestasAndalucia[i].fecha, 
                elaboracion: encuestasAndalucia[i].fecha_elaboracion,
                partido: 'VOX', 
                resultado: encuestasAndalucia[i].resultado_VOX,
                margen: encuestasAndalucia[i].margen,
                min: 'VOX'
            });
            
            resultadosEncuestasAndalucia.push({
                elecciones: encuestasAndalucia[i].elecciones,
                fuente: encuestasAndalucia[i].fuente,
                fecha: encuestasAndalucia[i].fecha, 
                elaboracion: encuestasAndalucia[i].fecha_elaboracion,
                partido: 'AxSi', 
                resultado: encuestasAndalucia[i].resultado_AxSi,
                margen: encuestasAndalucia[i].margen,
                min: 'AxSi'
            })
        }

        // USA
        const resultadosEncuestasUS = [];

        for (let i=0; i< encuestasUs.length; i++){
            resultadosEncuestasUS.push({
                elecciones: encuestasUs[i].elecciones,
                fuente: encuestasUs[i].fuente,
                fecha: encuestasUs[i].fecha, 
                elaboracion: encuestasUs[i].fecha_elaboracion,
                partido: 'Hillary Clinton', 
                resultado: encuestasUs[i].resultado_Hillary_Clinton,
                margen: encuestasUs[i].margen,
                min: 'HC'
            });

            resultadosEncuestasUS.push({
                elecciones: encuestasUs[i].elecciones,
                fuente: encuestasUs[i].fuente,
                fecha: encuestasUs[i].fecha, 
                elaboracion: encuestasUs[i].fecha_elaboracion,
                partido: 'Donald Trump', 
                resultado: encuestasUs[i].resultado_Donald_Trump,
                margen: encuestasUs[i].margen,
                min: 'DT'
            })
        }

        // BREXIT
        const resultadosEncuestasBrexit = [];

        for (let i=0; i< encuestasBrexit.length; i++){
            resultadosEncuestasBrexit.push({
                elecciones: encuestasBrexit[i].elecciones,
                fuente: encuestasBrexit[i].fuente,
                fecha: encuestasBrexit[i].fecha, 
                elaboracion: encuestasBrexit[i].fecha_elaboracion,
                partido: 'Remain', 
                resultado: encuestasBrexit[i].resultado_Remain,
                margen: encuestasBrexit[i].margen,
                min: 'Remain'
            });

            resultadosEncuestasBrexit.push({
                elecciones: encuestasBrexit[i].elecciones,
                fuente: encuestasBrexit[i].fuente,
                fecha: encuestasBrexit[i].fecha, 
                elaboracion: encuestasBrexit[i].fecha_elaboracion,
                partido: 'Leave', 
                resultado: encuestasBrexit[i].resultado_Leave,
                margen: encuestasBrexit[i].margen,
                min: 'Leave'
            });

            resultadosEncuestasBrexit.push({
                elecciones: encuestasBrexit[i].elecciones,
                fuente: encuestasBrexit[i].fuente,
                fecha: encuestasBrexit[i].fecha, 
                elaboracion: encuestasBrexit[i].fecha_elaboracion,
                partido: 'Indecisos', 
                resultado: encuestasBrexit[i].resultado_indecisos,
                margen: encuestasBrexit[i].margen,
                min: 'Indecisos'
            })
        }

        const resultadosEncuestasColombia = [];

        for (let i=0; i< encuestasColombia.length; i++){
            resultadosEncuestasColombia.push({
                elecciones: encuestasColombia[i].elecciones,
                fuente: encuestasColombia[i].fuente,
                fecha: encuestasColombia[i].fecha, 
                elaboracion: encuestasColombia[i].fecha_elaboracion,
                partido: 'Si', 
                resultado: encuestasColombia[i].resultado_si,
                margen: encuestasColombia[i].margen,
                min: 'Si'
            });

            resultadosEncuestasColombia.push({
                elecciones: encuestasColombia[i].elecciones,
                fuente: encuestasColombia[i].fuente,
                fecha: encuestasColombia[i].fecha, 
                elaboracion: encuestasColombia[i].fecha_elaboracion,
                partido: 'No', 
                resultado: encuestasColombia[i].resultado_no,
                margen: encuestasColombia[i].margen,
                min: 'No'
            });

            resultadosEncuestasColombia.push({
                elecciones: encuestasColombia[i].elecciones,
                fuente: encuestasColombia[i].fuente,
                fecha: encuestasColombia[i].fecha, 
                elaboracion: encuestasColombia[i].fecha_elaboracion,
                partido: 'Indecisos', 
                resultado: encuestasColombia[i].resultado_indecisos,
                margen: encuestasColombia[i].margen,
                min: 'Indecisos'
            })
        }

        // todas las encuestas juntas
        const resultadosEncuestas = [resultadosEncuestasAndalucia, resultadosEncuestasUS, resultadosEncuestasBrexit, resultadosEncuestasColombia];
   
        // ELECCIONES
        // filtrar solo resultados electorales
        const resultadosAndalucia = andalucia.filter(d => d.tipo === 'Elecciones');
        const resultadosUs = us.filter(d => d.tipo === 'Elecciones');
        const resultadosBrexit = brexit.filter(d => d.tipo === 'Elecciones');
        const resultadosColombia = colombia.filter(d => d.tipo === 'Elecciones');
        
        // ANDALUCIA
        const resultadosEleccionesAndalucia = [];
        
        for (let i=0; i< resultadosAndalucia.length; i++){
            resultadosEleccionesAndalucia.push({
                elecciones: resultadosAndalucia[i].elecciones,
                fecha: resultadosAndalucia[i].fecha, 
                partido: 'PSOE', 
                resultado: resultadosAndalucia[i].resultado_PSOE,
                participacion: resultadosAndalucia[i].participacion,
                min: 'PSOE'
            });
            
            resultadosEleccionesAndalucia.push({
                elecciones: resultadosAndalucia[i].elecciones,
                fecha: resultadosAndalucia[i].fecha, 
                partido: 'PP', 
                resultado: resultadosAndalucia[i].resultado_PP,
                participacion: resultadosAndalucia[i].participacion,
                min: 'PP'
            });
            
            resultadosEleccionesAndalucia.push({
                elecciones: resultadosAndalucia[i].elecciones,
                fecha: resultadosAndalucia[i].fecha, 
                partido: 'Adelante Andalucia (Podemos e IU)', 
                resultado: resultadosAndalucia[i].resultado_Adelante_Andalucia,
                participacion: resultadosAndalucia[i].participacion,
                min: 'AA'
            });

            resultadosEleccionesAndalucia.push({
                elecciones: resultadosAndalucia[i].elecciones,
                fecha: resultadosAndalucia[i].fecha, 
                partido: 'Ciudadanos', 
                resultado: resultadosAndalucia[i].resultado_Ciudadanos,
                participacion: resultadosAndalucia[i].participacion,
                min: 'Ciudadanos'
            });
            
            resultadosEleccionesAndalucia.push({
                elecciones: resultadosAndalucia[i].elecciones,
                fecha: resultadosAndalucia[i].fecha, 
                partido: 'PA', 
                resultado: resultadosAndalucia[i].resultado_PA,
                participacion: resultadosAndalucia[i].participacion,
                min: 'PA'
            });
            
            resultadosEleccionesAndalucia.push({
                elecciones: resultadosAndalucia[i].elecciones,
                fecha: resultadosAndalucia[i].fecha, 
                partido: 'PACMA', 
                resultado: resultadosAndalucia[i].resultado_PACMA,
                participacion: resultadosAndalucia[i].participacion,
                min: 'PACMA'
            });
            
            resultadosEleccionesAndalucia.push({
                elecciones: resultadosAndalucia[i].elecciones,
                fecha: resultadosAndalucia[i].fecha, 
                partido: 'VOX', 
                resultado: resultadosAndalucia[i].resultado_VOX,
                participacion: resultadosAndalucia[i].participacion,
                min: 'VOX'
            });
            
            resultadosEleccionesAndalucia.push({
                elecciones: resultadosAndalucia[i].elecciones,
                fecha: resultadosAndalucia[i].fecha, 
                partido: 'AxSi', 
                resultado: resultadosAndalucia[i].resultado_AxSi,
                participacion: resultadosAndalucia[i].participacion,
                min: 'AxSi'
            })
        }

        // US
        const resultadosEleccionesUS = [];

        for (let i=0; i< resultadosUs.length; i++){
            resultadosEleccionesUS.push({
                elecciones: resultadosUs[i].elecciones,
                fecha: resultadosUs[i].fecha, 
                partido: 'Hillary Clinton', 
                resultado: resultadosUs[i].resultado_Hillary_Clinton,
                participacion: resultadosUs[i].participacion,
                min: 'HC'
            });
            
            resultadosEleccionesUS.push({
                elecciones: resultadosUs[i].elecciones,
                fecha: resultadosUs[i].fecha, 
                partido: 'Donald Trump', 
                resultado: resultadosUs[i].resultado_Donald_Trump,
                participacion: resultadosUs[i].participacion,
                min: 'DT'
            });  
        }
        
        // BREXIT
        const resultadosEleccionesBrexit = [];

        for (let i=0; i< resultadosBrexit.length; i++){
            resultadosEleccionesBrexit.push({
                elecciones: resultadosBrexit[i].elecciones,
                fecha: resultadosBrexit[i].fecha, 
                partido: 'Remain', 
                resultado: resultadosBrexit[i].resultado_Remain,
                participacion: resultadosBrexit[i].participacion,
                min: 'Remain'
            });
            
            resultadosEleccionesBrexit.push({
                elecciones: resultadosBrexit[i].elecciones,
                fecha: resultadosBrexit[i].fecha, 
                partido: 'Leave', 
                resultado: resultadosBrexit[i].resultado_Leave,
                participacion: resultadosBrexit[i].participacion,
                min: 'Leave'
            });  
        }

        // COLOMBIA
        const resultadosEleccionesColombia = [];

        for (let i=0; i< resultadosColombia.length; i++){
            resultadosEleccionesColombia.push({
                elecciones: resultadosColombia[i].elecciones,
                fecha: resultadosColombia[i].fecha, 
                partido: 'Si', 
                resultado: resultadosColombia[i].resultado_si,
                participacion: resultadosColombia[i].participacion,
                min: 'Si'
            });
            
            resultadosEleccionesColombia.push({
                elecciones: resultadosColombia[i].elecciones,
                fecha: resultadosColombia[i].fecha, 
                partido: 'No', 
                resultado: resultadosColombia[i].resultado_no,
                participacion: 100 - resultadosColombia[i].abstencion,
                min: 'No'
            });  
        }

        const resultados = [resultadosEleccionesAndalucia, resultadosEleccionesUS, resultadosEleccionesBrexit, resultadosEleccionesColombia];

        // fechas
        const fechasBrexit = brexit.filter(d => d.tipo === 'Campaign')[0];
        const fechasAndalucia = andalucia.filter(d => d.tipo === 'Campaign')[0];
        const fechas = {
            Brexit: fechasBrexit,
            Andalucia: fechasAndalucia
        }

        const colourPSOE = '#e10000';
        const colourPP = '#1b67ea';
        const colourCiudadanos = '#ff8b00';
        const colourPA = 'darkgreen';
        const colourPACMA = '#8bc34a';
        const colourVox = 'green';
        const colourAA = '#73057d'; 
        const colourAxSi = 'grey';

        const colourTrump = '#e10000';
        const colourClinton = '#1b67ea';

        const colourRemain = '#f6ba07';
        const colourLeave ='#047fbc';
        const colourIndecisos = '#999999';

        const colourSi = '#8bc34a';
        const colourNo = '#ff8b00';

        const scaleColour = d3.scaleOrdinal()
            .domain(['PSOE', 'PP', 'Ciudadanos', 'PA', 'PACMA', 'VOX', 'Adelante Andalucia (Podemos e IU)', 'AxSi',
                    'Hillary Clinton', 'Donald Trump',
                    'Leave', 'Remain', 'Indecisos', 
                    'Si', 'No', 'Indecisos'])
            .range([colourPSOE, colourPP, colourCiudadanos, colourPA, colourPACMA, colourVox, colourAA, colourAxSi,
                    colourClinton, colourTrump, 
                    colourLeave, colourRemain, colourIndecisos,
                    colourSi, colourNo, colourIndecisos]);
        
        const scaleMaxY = d3.scaleOrdinal().domain(['Andalucia', 'US', 'Brexit', 'Colombia']).range([50, 60, 60, 80]);
        const scaleMaxTicks = d3.scaleOrdinal().domain(['Andalucia', 'US', 'Brexit', 'Colombia']).range([6, 5, 6, 5]);
        const avgEncuestaPartidos = [];

        resultadosEncuestas.forEach(dataEncuestas => {
            const thisData = dataEncuestas.filter(d => d.resultado >= 0);
            thisData.sort((a,b) => a.fecha - b.fecha);

            const dataPorPartido = d3.nest()
                .key(d => `${d.partido}_${d.min}`)
                .key(d => d.fecha)
                .rollup(d => d3.mean(d, e => e.resultado))
                .entries(thisData);

            avgEncuestaPartidos.push([ thisData[0].elecciones, dataPorPartido]);

            d3.select(`.btn_${thisData[0].elecciones}`)
                .selectAll('.btn')
                .data(dataPorPartido)
                .enter()
                .append('p')
                .html(d => d.key.split('_')[0])
                .attr('class', d => `btn btn_partido btn_${d.key.split('_')[1]}`)
                .style('color', d => scaleColour(d.key.split('_')[0]))
                .on('click', d => {
                    const key = d.key.split('_')[1];
                    const party = d.key.split('_')[0];

                    d3.select(`.btn_${thisData[0].elecciones}`)
                        .selectAll('.btn_partido')
                        .style('color', e => scaleColour(e.key.split('_')[0]))
                        .style('background-color', 'white');
                    
                    d3.select(`.btn_${thisData[0].elecciones}`)
                        .select('.reset')
                        .style('color', 'black')
                        .style('background-color', 'white');

                    d3.select(`.btn_${thisData[0].elecciones}`)
                        .select(`.btn_${key}`)
                        .style('color', 'white')
                        .style('background-color', d => scaleColour(party));
                    
                    thisPlot
                        .selectAll('.dots')
                        .selectAll('.dot')
                        .style('opacity', 0.1);

                    thisPlot
                        .selectAll('.dots')
                        .selectAll(`.${key}`)
                        .style('opacity', 1);
                    
                    thisPlot
                        .selectAll('.errorMargin')
                        .selectAll('.error')
                        .style('opacity', 0.02);

                    thisPlot
                        .selectAll('.errorMargin')
                        .selectAll(`.${key}`)
                        .style('opacity', 0.2);
                    
                    thisPlot
                        .selectAll('.lines')
                        .selectAll('.line')
                        .style('opacity', 0.5);
                    
                    thisPlot
                        .selectAll('.lines')
                        .selectAll(`.${key}`)
                        .style('opacity', 1);
                });

            d3.select(`.btn_${thisData[0].elecciones}`)
                .append('p')
                .html('Todos los partidos')
                .attr('class', 'reset btn')
                .style('background-color', 'black')
                .style('color', 'white')
                .on('click', d => {
                    d3.select(`.btn_${thisData[0].elecciones}`)
                        .select('.reset')
                        .style('background-color', 'black')
                        .style('color', 'white');

                    d3.select(`.btn_${thisData[0].elecciones}`)
                        .selectAll('.btn_partido')
                        .style('color', e => scaleColour(e.key.split('_')[0]))
                        .style('background-color', 'white');

                    thisPlot
                        .selectAll('.dots')
                        .selectAll('.dot')
                        .style('opacity', 0.4);
                    
                    thisPlot
                        .selectAll('.errorMargin')
                        .selectAll('.error')
                        .style('opacity', 0.05);

                    thisPlot
                        .selectAll('.lines')
                        .selectAll('.line')
                        .style('opacity', 1);
                })

            const thisId = `.elecciones_${thisData[0].elecciones}_encuestas`;
            const widthEncuestas = d3.select(thisId).node().clientWidth - marginEncuestas.r - marginEncuestas.l;
            const maxY = scaleMaxY(thisData[0].elecciones);
            
            const thisPlot = d3.select(thisId)    
                .append('svg')
                .attr('width', widthEncuestas + marginEncuestas.r + marginEncuestas.l)
                .attr('height', heightChart + marginEncuestas.t + marginEncuestas.b);
            
            // scales
            // scale X by time
            const timeExtent = d3.extent(dataEncuestas, d => d.fecha);
            const scaleX = d3.scaleTime().domain(timeExtent).range([0, widthEncuestas]);
            
            // scaleY by 0 - 100
            const scaleY = d3.scaleLinear().domain([0, maxY]).range([heightChart, 0]);
    
            // axis
            const axisX = d3.axisBottom()
                .scale(scaleX)
                .ticks(scaleMaxTicks(thisData[0].elecciones))
                .tickPadding([5]);

            const axisY = d3.axisLeft()
                .scale(scaleY)
                .tickSizeInner(-widthEncuestas)
                .tickPadding([8])
                .ticks(5);

            // grupos
            thisPlot.append('g')
                .attr('transform', `translate(${marginEncuestas.l}, ${marginEncuestas.t})`)
                .attr('class', 'axis axis-y');

            thisPlot.append('g')
                .attr('transform', `translate(${marginEncuestas.l}, ${marginEncuestas.t+heightChart})`)
                .attr('class', 'axis axis-x');

            const thisPlotCampaign = thisPlot.append('g')
                .attr('transform', `translate(${marginEncuestas.l}, ${marginEncuestas.t})`)
                .attr('class', 'campaign');

            const thisMarginPlot = thisPlot.append('g')
                .attr('transform', `translate(${marginEncuestas.l}, ${marginEncuestas.t})`)
                .attr('class', 'errorMargin');

            const thisPlotLines = thisPlot.append('g')
                .attr('transform', `translate(${marginEncuestas.l}, ${marginEncuestas.t})`)
                .attr('class', 'lines');

            const thisPlotDots = thisPlot.append('g')
                .attr('transform', `translate(${marginEncuestas.l}, ${marginEncuestas.t})`)
                .attr('class', 'dots');

            thisPlot.select(".axis-x").call(axisX);
            thisPlot.select(".axis-y").call(axisY);

            // ENCUESTA MARGENES DE ERROR
            thisMarginPlot
                .selectAll('.error')
                .data(thisData.filter(d => d.margen >= 0))
                .enter()
                .append('rect')
                .attr('class', d => `error ${d.min}`)
                .attr('x', d => scaleX(d.fecha) - rectWidth/2)
                .attr('y', d => scaleY(d.resultado) - (heightChart - scaleY(d.margen)))
                .attr('width', rectWidth)
                .attr('height', d => 2 * (heightChart - scaleY(d.margen)))
                .style('opacity', 0.05)
                .style('fill', d => scaleColour(d.partido));

            // ENCUESTA AVG.
            thisPlotDots
                .selectAll('.dot')
                .data(thisData)
                .enter()
                .append('rect')
                .attr('class', d => `dot ${d.min}`)
                .attr('x', d => scaleX(d.fecha) - rectWidth / 2)
                .attr('y', d => scaleY(d.resultado) - rectWidth / 2)
                .attr('width', rectWidth)
                .attr('height', rectWidth)
                .style('opacity', 0.4)
                .style('fill', d => scaleColour(d.partido));

            const linePartidos = d3.line()
                .x(d => scaleX(new Date(d.key)))
                .y(d => scaleY(d.value))
                .curve(d3.curveCatmullRom);

            thisPlotLines
                .selectAll('.line')
                .data(dataPorPartido)
                .enter()
                .append('path')
                .attr('class', d => `line ${d.key.split('_')[1]}`)
                .attr('d', d => linePartidos(d.values))
                .style('stroke', d => scaleColour(d.key.split('_')[0]));

            if (fechas[thisData[0].elecciones] !== undefined) {
                const plotAnnotation = thisPlotCampaign
                .selectAll('.info')
                .data([fechas[thisData[0].elecciones]]);

                plotAnnotation
                    .enter()
                    .append('line')
                    .attr('x1', d => scaleX(d.fecha))
                    .attr('x2', d => scaleX(d.fecha))
                    .attr('y1', scaleY(0))
                    .attr('y2', - marginEncuestas.t_campaign / 2)
                    .attr('class', 'info');

                plotAnnotation
                    .enter()
                    .append('text')
                    .text('Inicio oficial de campaña')
                    .attr('class', 'info')
                    .attr('x', d => scaleX(d.fecha))
                    .attr('y', - marginEncuestas.t_campaign);
            }

            thisPlotCampaign
                .append('text')
                .text('Encuestas')
                .attr('class', 'anotacion_titulo')
                .style('text-anchor', 'start')
                .attr('x', 0)
                .attr('y', - marginEncuestas.t_campaign);
        
        })
        
        resultados.forEach(resultadosData => {
            thisData = resultadosData.filter(d => d.resultado >= 0);
            const thisId = `.elecciones_${thisData[0].elecciones}_resultados`;
            const widthElecciones = d3.select(thisId).node().clientWidth - marginResultados.r - marginResultados.l;
            const maxY = scaleMaxY(thisData[0].elecciones);

            const ultimasEncuestasAvg = [];

            for (let i = 0; i < avgEncuestaPartidos.length; i++) {
                if (avgEncuestaPartidos[i][0] === thisData[0].elecciones) {
                    const thisPartidos = avgEncuestaPartidos[i][1];

                    for (let p = 0; p < thisPartidos.length; p++) {
                        const resultado = thisData.filter(e => e.partido === thisPartidos[p].key.split('_')[0])[0];
                        if (resultado !== undefined) {
                            ultimasEncuestasAvg.push({
                                partido: thisPartidos[p].key.split('_')[0],
                                min: thisPartidos[p].key.split('_')[1],
                                ult_encuesta: thisPartidos[p].values[thisPartidos[p].values.length - 1].value,
                                elecciones: resultado.resultado,
                                fecha: resultado.fecha
                            })
                        }
                    }
                }
            }

            const thisPlot = d3.select(thisId)    
                .append('svg')
                .attr('width', widthElecciones + marginResultados.r + marginResultados.l)
                .attr('height', heightChart + marginResultados.t + marginResultados.b);

            // scales
            // scale X by time
            const timeExtent = d3.extent(thisData, d => d.fecha);
            const scaleX = d3.scaleTime().domain(timeExtent).range([0, widthElecciones]);

            // scaleY by 0 - 100
            const scaleY = d3.scaleLinear().domain([0, maxY]).range([heightChart, 0]);

            // axis
            const axisX = d3.axisBottom()
                .scale(scaleX)
                .ticks(1)
                .tickPadding([5]);

            const axisY = d3.axisLeft()
                .scale(scaleY)
                .tickSizeInner(-widthElecciones)
                .tickPadding([8])
                .ticks(5);

            // grupos
            thisPlot.append('g')
                .attr('transform', `translate(${marginResultados.l}, ${marginResultados.t})`)
                .attr('class', 'axis axis-y');

            thisPlot.append('g')
                .attr('transform', `translate(${marginResultados.l}, ${marginResultados.t+heightChart})`)
                .attr('class', 'axis axis-x');

            thisPlot.append('g')
                .attr('transform', `translate(${marginResultados.l}, ${marginResultados.t})`)
                .attr('class', 'anotacion');

            const thisPlotRelacionEncuestas = thisPlot.append('g')
                .attr('transform', `translate(${marginResultados.l}, ${marginResultados.t})`)
                .attr('class', 'relacion');
                
            const thisPlotResultados = thisPlot.append('g')
                .attr('transform', `translate(${marginResultados.l}, ${marginResultados.t})`)
                .attr('class', 'resultados');

            thisPlot.select('.axis-x')
                .call(axisX);

            thisPlot.select('.axis-y')
                .call(axisY);
            
            // lines
            thisPlot.select('.anotacion')
                .append('text')
                .text('Resultados electorales (%)')
                .attr('x', widthElecciones / 2)
                .attr('y', - marginEncuestas.t_campaign);

            thisPlot.select('.anotacion')   
                .append('line')
                .attr('class', 'anotacion')
                .attr('x1', widthElecciones / 2)
                .attr('x2', widthElecciones / 2)
                .attr('y1', scaleY(0))
                .attr('y2', - marginEncuestas.t_campaign / 2);

            thisPlotRelacionEncuestas.selectAll('.lines')
                .data(ultimasEncuestasAvg)
                .enter()
                .append('line')
                .attr('class', d => `lines ${d.min}`)
                .attr('x1', 0)
                .attr('x2', d => scaleX(d.fecha))
                .attr('y1', d => scaleY(d.ult_encuesta))
                .attr('y2', d => scaleY(d.elecciones))
                .style('opacity', 1)
                .style('stroke', d => scaleColour(d.partido));

            // dots
            thisPlotResultados
                .selectAll('.dot')
                .data(thisData)
                .enter()
                .append('rect')
                .attr('class', d => `dot ${d.min}`)
                .attr('x', d => scaleX(d.fecha) - rectWidth / 2)
                .attr('y', d => scaleY(d.resultado) - rectWidth / 2)
                .attr('width', rectWidth)
                .attr('height', rectWidth)
                .style('opacity', 1)
                .style('fill', d => scaleColour(d.partido));

            // results
            thisPlotResultados
                .selectAll('.numbers')
                .data(thisData)
                .enter()
                .append('text')
                .attr('class', d => `numbers ${d.min}`)
                .text(d => d.resultado)
                .attr('x', d => scaleX(d.fecha) + 2 * rectWidth)
                .attr('y', d => {
                    if (d.min === 'AA' || d.min === 'DT' || d.min === 'Si') {
                        return scaleY(d.resultado) + 2 * rectWidth/2
                    }

                    if (d.min === 'PACMA' || d.min === 'No') {
                        return scaleY(d.resultado) - 2 * rectWidth/2
                    }

                    return scaleY(d.resultado) + rectWidth/2
                })
                .style('opacity', 1)
                .style('fill', d => scaleColour(d.partido));
        })
        // linea de la media
    }

function parseAndalucia(d) {
    console.log(d);
    return {
        elecciones: d.elecciones, 
        tipo: d.tipo, 
        fuente: d.Fuente,
        fecha: new Date(d.fecha),
        fecha_elaboracion: (d['fecha de elaboracion']),
        // sample: d.sample,
        participacion: checkParseValue(d.Participacion),
        resultado_PSOE: checkParseValue(d.PSOE),
        resultado_PP: checkParseValue(d.PP),
        resultado_Ciudadanos: checkParseValue(d.Ciudadanos),
        resultado_PA: checkParseValue(d['Partido Andalucista']),
        resultado_PACMA: checkParseValue(d.Pacma),
        resultado_VOX: checkParseValue(d.VOX),
        resultado_Adelante_Andalucia: checkParseValue(d['Adelante Andalucia (Podemos e IU)']),
        resultado_AxSi: checkParseValue(d.AxSi),
        margen: 0

    }
}

function parseUS(d) {

    return {
        elecciones: d.elecciones, 
        tipo: d.tipo, 
        fuente: d.Fuente,
        fecha: new Date(`${d.fecha}-2016`),
        fecha_elaboracion: d['fecha de elaboracion'],
        resultado_Hillary_Clinton: +d['Hillary Clinton'], 
        resultado_Donald_Trump: +d['Donald Trump'], 
        participacion: checkParseValue(d.Participacion),
        margen: checkParseValue(d.margin)
    }
}

function parseBrexit(d) {
    return {
        elecciones: d.elecciones, 
        tipo: d.tipo, 
        fuente: d.Fuente,
        fecha: new Date(`${d.fecha} 2016`),
        fecha_elaboracion: d['fecha de elaboracion'],
        resultado_Remain: +d.Remain, 
        resultado_Leave: +d.Leave, 
        resultado_indecisos: checkParseValue(d.Indecisos),
        participacion: checkParseValue(d.Participacion),
        margen: '-',
    }
}

function parseColombia(d) {
    return {
        elecciones: d.Elecciones, 
        tipo: d.tipo, 
        fuente: d.Fuente,
        fecha: new Date(d.fecha),
        fecha_elaboracion: d['fecha de elaboracion'],
        resultado_si: checkParseValue(d.Si),
        resultado_no: checkParseValue(d.No),
        resultado_indecisos: checkParseValue(d['NS/NC']),
        abstencion: checkParseValue(d.abstencion),
        margen: +d['Margen de error'] 
    }
}

function parseDate(date) {
    const fecha = date.split('-');
    return new Date (fecha[0])
}

function checkParseValue(n) {
    
        if (n === '-' || n === '' || n === '  ') {
            n = '-';
        } else {
            n = +n
        }
    
    return n
}
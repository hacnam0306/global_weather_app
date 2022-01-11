import React from 'react'
import styles from './MainBoard.module.scss'
import { BsClouds,BsWind,BsCloudSun,BsSnow3,BsFillCloudRainHeavyFill,BsFillClockFill } from "react-icons/bs";
import ReactLoading from 'react-loading';

const MainBoard = ({data,dailyData}) => {
    const KtoC = (K) =>{
        return (K - 273.15).toFixed(1) 
    }
    const amOrPm = (time)=>{
        
        return (time > 12)  ? time + " "  + 'PM' : time + " " + 'AM' 
    }
    return (
        <div>
           {data && dailyData ?
           <div className={styles.mainBoard}>
            <div className="row container-fluid mt-5">
                    <div className="col-md-1">
                        
                    </div>
                     <div className={` ${data.weather[0].main === 'Clear' ? styles.backgroundClear : data.weather[0].main === 'Clouds' ? styles.backgroundClouds : data.weather[0].main === 'Snow' ? styles.backgroundSnow : styles.backgroundClouds } col-md-5 me-4 p-3 `}>
                    <div className="d-flex align-items-center  ">
                        <div className={styles.weather_icon}>
                         { (data.weather[0].main === 'Clear') ? <BsCloudSun   color='orange' size='30'/> : 
                         (data.weather[0].main === 'Clouds') ? <BsClouds   color='orange' size='30' /> :
                        (data.weather[0].main === 'Snow') ? <BsSnow3   color='blue' size='30' /> : 
                        <BsFillCloudRainHeavyFill   color='blue' size='30' />
                        }    
                        </div>
                        <div>
                            <b>Weather</b>
                            <p className="fw-400">What's the weather?</p>
                        </div>
                    </div>
                    <div className='mt-5 d-flex'>
                        <h1>{KtoC(data.main.temp)}°C</h1>
                        <h2 className={`${styles.background_white} fs-6`}>{KtoC(data.main.temp_min)}°C</h2>
                    </div>
                    <p>{data.weather[0].main} 
                    </p>
                    <div className="d-flex align-items-center justify-content-between text-center">
                        <div className={`${styles.card_1}`}>
                            <p className="text-white mt-3 ">Pressure</p>
                            <h5 className="text-white">{data.main.pressure}mb</h5>
                        </div>
                        <div className={`${styles.card_2}`}>
                            <p className='mt-3'>Visibility</p>
                            <h5>{(data.visibility/1000).toFixed(1)}km</h5>
                        </div>
                        <div className={`${styles.card_3}`}>
                            <p className='mt-3'>Humidity</p>
                            <h5>{data.main.humidity}%</h5>
                        </div>
                    </div>
                        </div>
                        <div className={` ${data.weather[0].main === 'Clear' ? styles.backgroundClearRight : data.weather[0].main === 'Clouds' ? styles.backgroundCloudRight : data.weather[0].main === 'Snow' ? styles.backgroundSnowRight : styles.card__weather_2 } col-md-5 p-3 `}>
                            <div className="d-flex align-items-center ">
                                <div className={styles.weather_icon}>
                                <BsWind   color='orange' size='30'/>
                                </div>
                                <div>
                                    <b>Air Quality</b>
                                    <p className="fw-400">Main pollutan: PM 2.5</p>
                                </div>
                            </div>
                            <div className='mt-5 d-flex'>
                                <h1 className="text-white">{data.wind.deg}</h1>
                                <h2 className={`${styles.background_green} fs-6`}>AQI</h2>
                            </div>
                            <p className="text-white">West Wind</p>
                            <div className={`${styles.wind_process}`}>
                                <div className='p-4'>
                                    <div className="d-flex align-items-center justify-content-between" >
                                    <p>Good</p>
                                    <p>Hazardous</p>
                                    </div>
                                <div className={styles.progress_bar}>

                                </div>
                                </div>
                            </div>
            
                    </div>
                    <div className="col-md-1">
                        
                        </div>
           </div> 
            <div className={`row mt-5 container-fluid `}>
                <div className="col-md-1">
                </div>
                    <div className={`col-md-7 me-4  ${styles.dailyForecast} p-3`}>
                         <h2 className="ms-3 fw-light text-muted">
                         <BsFillClockFill className="me-3" color='orange' size='30'/>
                            HOURLY FORECAST
                        </h2>
                        <div className='row'>
                            {dailyData.list.slice(0,6).map( day => (
                            <div className='col-md-2 text-center'>
                                <h3 className="mb-5 mt-3">{amOrPm(new Date(day.dt_txt).getHours())}</h3>
                                
                                {day.weather[0].main === 'Clouds' ? <BsClouds color='white' size='45' /> : day.weather[0].main === 'Rain' ? <BsFillCloudRainHeavyFill color='white' size='45' /> : day.weather[0].main === 'Clear' ? <BsCloudSun color='white' size='45' /> : <BsCloudSun color='white' size='45' />  }

                                <h3 className="mt-5">{KtoC(day.main.temp)}°C</h3>
                            </div>

                            ))}
                        </div>                        
                    </div>
       
                    <div className={`col-md-3  p-4 ${styles.tomorrow}`}>
                        <p className="text-yellow">Tomorrow</p>
                        <h3 className="fw-bold text-yellow  ">{data.name}</h3>
                        <h1 className="mt-5 text-yellow fw-bold">{KtoC(dailyData.list[7].main.temp)}°C</h1>
                        <p className="text-yellow">{dailyData.list[7].weather[0].main}</p>
                    </div>
                    <div className="col-md-1">
                </div>
            </div>         
        </div> : <ReactLoading type='spinningBubbles' color='#F8822B' height={667} width={375} />}
        </div>
    )
}

export default MainBoard

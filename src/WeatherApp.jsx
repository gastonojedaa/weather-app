import {useState} from 'react';
export const WeatherApp = () => {
    
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'b4438a23daeec1c5e3fc32a781b7a20e'
    const difKelvin = 273.15
    

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setdataClima] = useState(null)
    
    const handleCityChange = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) {
            fetchClima()
        }
    }

    const fetchClima = async () => {
        try {

            const resp = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`)
            const data = await resp.json()
            setdataClima(data)
        } catch (error) {
            console.error('ocurrio el siguiente error:', error)            
        }        
    }

  return (
    <div className="container">
      <h1>Aplicacion del clima</h1>
      <form onSubmit={handleSubmit} >
        <input 
        type="text"
        value={ciudad}
        onChange={handleCityChange}
        />
        <button type="Submit">Buscar</button>
      </form>
        {dataClima && ( /*Condicional, si hay data del clima la muestra sino no*/
            <div>
                <h2>{dataClima.name}</h2>
                <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C </p>
                <p>Condicion meterológica: {dataClima?.weather[0]?.description}</p>                
                <img src={`http://openweathermap.org/img/wn/${dataClima?.weather[0]?.icon}.png`} alt="icono del clima"/>            
            </div>
        )}
    </div>
  );
};

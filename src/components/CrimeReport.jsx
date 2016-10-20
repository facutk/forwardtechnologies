import React from 'react'

const jsonp = (url, callback) => {
    var callbackName = 'JSONPCallback' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

const postReportCrime = (crime) => {
    const params = Object.keys(crime).map( function(key) {
        return key + '=' + crime[key];
    }).join('&');
    const postDelitoURI = 'https://script.google.com/macros/s/AKfycbyJWZJW2NVN6vqLLuIckBlga-bojXt-qttBYcEAZ5CQ/exec?' + params;
    jsonp(postDelitoURI, function(data) {
        alert('Crimen Reportado')
    })
}


class CrimeReport extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            crime: {
              fecha: '',
              hora: '',
              latitud: '',
              longitud: '',
              tipo: '',
              titulo: '',
              descripcion: '',
              pais: '',
              provincia: '',
              ciudad: ''
            }
        };
    }

    handleChange = (event) => {
        let updatedCrime = {
            ...this.state.crime
        }
        updatedCrime[event.target.name] = event.target.value

        this.setState({
            crime: updatedCrime
        });
    }

    handleReportCrime = () => {
        postReportCrime(this.state.crime)
    }
    render() {
        return (
            <div>
                <h1>Reportar delito</h1>
                <p><input placeholder="Fecha" type="text" name="fecha" value={this.state.crime.fecha} onChange={this.handleChange} /></p>
                <p><input placeholder="hora" type="text" name="hora" value={this.state.crime.hora} onChange={this.handleChange} /></p>
                <p><input placeholder="latitud" type="text" name="latitud" value={this.state.crime.latitud} onChange={this.handleChange} /></p>
                <p><input placeholder="longitud" type="text" name="longitud" value={this.state.crime.longitud} onChange={this.handleChange} /></p>
                <p><input placeholder="tipo" type="text" name="tipo" value={this.state.crime.tipo} onChange={this.handleChange} /></p>
                <p><input placeholder="titulo" type="text" name="titulo" value={this.state.crime.titulo} onChange={this.handleChange} /></p>
                <p><input placeholder="descripcion" type="text" name="descripcion" value={this.state.crime.descripcion} onChange={this.handleChange} /></p>
                <p><input placeholder="pais" type="text" name="pais" value={this.state.crime.pais} onChange={this.handleChange} /></p>
                <p><input placeholder="provincia" type="text" name="provincia" value={this.state.crime.provincia} onChange={this.handleChange} /></p>
                <p><input placeholder="ciudad" type="text" name="ciudad" value={this.state.crime.ciudad} onChange={this.handleChange}/ ></p>
                <p><button onClick={this.handleReportCrime}>Reportar</button></p>
            </div>
        )
    }
}

export default CrimeReport

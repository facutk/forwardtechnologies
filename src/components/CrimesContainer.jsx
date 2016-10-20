import React from 'react'
import { getWorksheet } from 'gsheets';

const getSheet = (id, sheet) => {
    return new Promise((resolve, reject) => {
        getWorksheet(id, sheet, (err, res) => {
            if (err) return reject(err)
            if (res && res.data) return resolve(res.data)
            reject('Server data not available.')
        });
    })
}

const Crime = ({
    crime = {
        fecha: null,
        hora: null,
        latitud: null,
        longitud: null,
        tipo: null,
        titulo: null,
        descripcion: null,
        pais: null,
        provincia: null,
        ciudad: null
    }
}) => {
    return (
        <tr>
            <td>{crime.fecha}</td>
            <td>{crime.hora}</td>
            <td>{crime.latitud}</td>
            <td>{crime.longitud}</td>
            <td>{crime.tipo}</td>
            <td>{crime.titulo}</td>
            <td>{crime.descripcion}</td>
            <td>{crime.pais}</td>
            <td>{crime.provincia}</td>
            <td>{crime.ciudad}</td>
        </tr>
    )
}

class CrimesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            crimes: null
        };
    }

    componentWillMount() {
        getSheet('1bKLng1v4kKjw-hJpcbvjpud7DQbOLYGvP7s_HkGG3pM', 'delitos').then((data)=>{
            this.setState({
                crimes: data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                {this.state.crimes ? (
                    <table>
                        <tbody>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Latitud</th>
                                <th>Longitud</th>
                                <th>Tipo</th>
                                <th>Titulo</th>
                                <th>Descripcion</th>
                                <th>Pais</th>
                                <th>Provincia</th>
                                <th>Ciudad</th>
                            </tr>
                            {this.state.crimes.map((crime, index)=>
                                <Crime
                                    key={index}
                                    crime={crime}
                                />
                            )}
                        </tbody>
                    </table>
                ):(
                    <div>Loading</div>
                )}
            </div>
        )

    }

}

export default CrimesContainer

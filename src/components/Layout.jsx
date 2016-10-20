import React from 'react';
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

const Delito = ({
    delito = {
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
        <div>
            <pre>{delito.fecha} - {delito.hora} @{delito.pais}, {delito.ciudad}: {delito.tipo}</pre>
        </div>
    )
}

class DelitosContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            delitos: null
        };
    }
    
    componentWillMount() {
        console.log('mounted')
        getSheet('1bKLng1v4kKjw-hJpcbvjpud7DQbOLYGvP7s_HkGG3pM', 'delitos').then((data)=>{
            this.setState({
                delitos: data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
    
    render() {
        return (
            <div>
                {this.state.delitos ? (
                    <div>
                        {this.state.delitos.map((delito, index)=>
                            <Delito
                                key={index}
                                delito={delito}
                            />
                        )}
                    </div>
                ):(
                    <div>Loading</div>
                )}
            </div>
        )
        
    }
    
}

const Layout = function() {
    return (
        <div>
            <h1>Forward Technologies</h1>
            <DelitosContainer />
        </div>
    );
}

export default Layout

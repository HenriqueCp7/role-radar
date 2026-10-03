import React, { Component } from 'react'
import { GEOAPIFY_KEY } from '../utils/chaves'
import {Button} from '@primereact/ui/button'

export default class MeuPonto extends Component {

    state = {
        agora: Date.now()
    }

    timer = null

    componentDidMount(){
        this.timer = setInterval(() => {
            this.setState({
                agora: Date.now()
            })
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
        console.log('MeuPonto removido')
    }

  render() {
    console.log("MeuPonto renderizou")
    console.log(this.props.latitude)
    console.log(this.props.longitude)
    const segundos = Math.floor(
    (this.state.agora - this.props.horarioLocalizacao) / 1000
    )

    const mapa = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${this.props.longitude},${this.props.latitude}&zoom=16&marker=lonlat:${this.props.longitude},${this.props.latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`

    return (
      <div>
        <img style={{ width: "100%" }} src={mapa} alt="Mapa da sua localização"></img>

                    <p>Latitude: {this.props.latitude.toFixed(4)} | Longitude: {this.props.longitude.toFixed(4)}</p>

                    <p>{this.props.latitude < 0 ? "Hemisfério Sul" : "Hemisfério Norte"}</p>

                    <p>Localização obtida há {segundos} s</p>

                    <Button icon="pi pi-refresh"
                        onClick={this.props.onAtualizar}>
                        "Atualizar localização"
                    </Button>                                  
      </div>
    )
  }
}

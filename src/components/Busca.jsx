import React, { Component } from 'react'
import { Button } from '@primereact/ui/button'
import { InputText} from '@primereact/ui/inputtext'

export default class Busca extends Component {

  categorias = [
    { rotulo: "Cafés", chave: "catering.cafe" },
    { rotulo: "Restaurantes", chave: "catering.restaurant" },
    { rotulo: "Parques", chave: "leisure.park" },
    { rotulo: "Farmácias", chave: "healthcare.pharmacy" },
    { rotulo: "Supermercados", chave: "commercial.supermarket" },
    { rotulo: "Museus", chave: "entertainment.museum" }
  ]


  state = {
    categoria: null,
    raio: "1000",
    erro: null
  }

  onRaioAlterado = (evento) => {
    this.setState({raio: evento.target.value})
  }

  onFormSubmit = (evento) => {
    evento.preventDefault()
  
    if (!this.state.categoria) {
      this.setState({erro: "Escolha uma categoria."})
      return
    }

    const raio = Number(this.state.raio)

    if(!Number.isInteger(raio) || raio < 100 || raio > 5000) {
      this.setState({erro: "Informe um raio inteiro entre 100 e 5000 metros."})
      return
    }

    this.setState({
      erro: null
    })

    this.props.onBuscaRealizada(this.state.categoria, raio)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        {this.categorias.map((categoria) => (
          <Button 
            key={categoria.chave} 
            type="button"
            onClick={() => this.setState({categoria: categoria.chave})}
            className={this.state.categoria === categoria.chave ? undefined : "btn-contornado"}
          >
            {categoria.rotulo}
          </Button>
        ))}

        <InputText
          value={this.state.raio}
          pt-root-onChange={this.onRaioAlterado}
          placeholder={this.props.dica}
        />

        <Button type="submit">
          <i className='pi pi-search mr-2'></i>
          Buscar
        </Button>

        

        {this.state.erro ? <p style={{ color: "red" }}>{this.state.erro}</p> : null}
      </form>
    )
  }
}

Busca.defaultProps = {
    dica: 'Raio em metros (100 a 5000)'
}

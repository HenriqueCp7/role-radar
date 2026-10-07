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
        <div className='grid'>
          {this.categorias.map((categoria) => (
            <div key={categoria.chave} className='col-4 mt-3'>
              <Button 
                type="button"
                onClick={() => this.setState({categoria: categoria.chave})}
                className={this.state.categoria === categoria.chave ? "w-full" : "w-full btn-contornado"}
              >
                {categoria.rotulo}
              </Button>
            </div>
          ))}
        </div>
        
        <div className='flex align-items-center mt-3'>
          <label className='mr-2'>
            Raio:
          </label>

          <InputText
            className="w-full"
            value={this.state.raio}
            pt-root-onChange={this.onRaioAlterado}
            placeholder={this.props.dica}
          />
        </div>
        
        <Button type="submit" className="w-full mt-3">
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

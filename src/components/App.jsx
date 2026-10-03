import Creditos from "./Creditos"
import Cartao from "./Cartao"
import Loading from "./Loading"
import MeuPonto from "./MeuPonto"
import React from "react"

class App extends React.Component {

    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null
    }

    obterLocalizacao = () => {
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                this.setState({
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude,
                    horarioLocalizacao: Date.now(),
                    mensagemDeErro: null
                })
            },
            (erro) => {
                console.log(erro)

                this.setState({
                    mensagemDeErro: "Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página."
                })
            }
        )
    }

    componentDidMount() {
        this.obterLocalizacao()
    }

    render() {
        const estiloSubtitulo = {
            color: "black",
            fontSize: 18,
            fontFamily: "Arial",
            textAlign: "center",
            marginTop: "10px",
            marginLeft: "30px"
        }

        const obterAno = () => new Date().getFullYear()       
            
        return (
            <div className="moldura">
                <h1 className="titulo">
                    <i className="pi pi-map-marker" style={{ marginRight: "10px" }}></i>
                    RolêRadar
                </h1>

                <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>

                <Creditos />

                    <Cartao cabecalho="Você está aqui">
                        {
                            !this.state.latitude && !this.state.mensagemDeErro ?
                                <Loading mensagem="Aguardando permissão de localização..." />
                            :
                            this.state.mensagemDeErro ?
                                <p>{this.state.mensagemDeErro}</p>
                            :
                            <MeuPonto
                                latitude={this.state.latitude}
                                longitude={this.state.longitude}
                                horarioLocalizacao={this.state.horarioLocalizacao}
                                onAtualizar={this.obterLocalizacao}
                            />
                        }           
                    </Cartao>   
                <footer className="footer">RolêRadar © {obterAno()}</footer>
            </div>
        )
    }
}

export default App

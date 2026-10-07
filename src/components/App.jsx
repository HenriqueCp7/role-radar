import Creditos from "./Creditos"
import Cartao from "./Cartao"
import Loading from "./Loading"
import MeuPonto from "./MeuPonto"
import React from "react"
import geoapifyClient from "../utils/geoapifyClient"
import Busca from "./Busca"
import ListaLugares from "./ListaLugares"
import MapaRadar from "./MapaRadar"

class App extends React.Component {

    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null,
        lugares: null,
        buscando: false,
        erroBusca: null,
        raioBuscado: null
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

    onBuscaRealizada = (categoria, raio) => {
        this.setState({
            buscando: true,
            erroBusca: null,
            raioBuscado: raio
        })

        geoapifyClient.get("/places", {
            params: {
                    categories: categoria,
                    filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
                    bias: `proximity:${this.state.longitude},${this.state.latitude}`,
                    limit: 20
                }
            })
            .then((result) => {
                this.setState({
                    lugares: result.data.features,
                    buscando: false
                })
            })
            .catch((erro) => {
                console.log(erro)

                this.setState({
                    buscando: false,
                    erroBusca: "Não foi possível consultar os lugares. Tente novamente."
                })
            })

        
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
            <div>
                <h1 className="titulo">
                    <i className="pi pi-map-marker" style={{ marginRight: "10px" }}></i>
                    RolêRadar
                </h1>

                <p style={estiloSubtitulo}>
                    Descubra o que existe perto de você
                </p>

                <Creditos />

                <div className="grid mr-2 ml-2">
                    <div className="col-6">
                        <div className="mt-6">
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
                        </div>
                        
                        <div className="mt-5">
                            <Cartao cabecalho="O que você procura?">
                                <Busca onBuscaRealizada={this.onBuscaRealizada} />
                            </Cartao>
                        </div>
                    </div>

                    <div className="col-6">
                        {   
                            this.state.buscando ?
                                    <Loading mensagem="Procurando lugares..."/>
                            : this.state.erroBusca ?
                                <p className="text-center">{this.state.erroBusca}</p>
                            : this.state.lugares === null ?
                                null
                            : this.state.lugares.length === 0 ?
                                    <p className="text-center">Nenhum lugar encontrado. Tente aumentar o raio.</p>         
                            :
                                <div>
                                    <p className="font-bold text-center">
                                        {this.state.lugares.length} {this.state.lugares.length === 1 ? "lugar encontrado" : "lugares encontrados"} em até {this.state.raioBuscado} m
                                    </p>
                                    
                                    <div className="mt-3">
                                        <Cartao cabecalho="Radar">
                                            <MapaRadar
                                                latitude={this.state.latitude}
                                                longitude={this.state.longitude}
                                                lugares={this.state.lugares}
                                            />
                                        </Cartao>
                                    </div>

                                    <div className="mt-5">
                                        <ListaLugares lugares={this.state.lugares} /> 
                                    </div>
                                </div>
                        }
                    </div>
                </div>

                <footer className="footer mt-3">
                    RolêRadar © {obterAno()}
                </footer>
            </div>
        )
    }
}

export default App

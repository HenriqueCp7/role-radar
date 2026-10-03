import Creditos from "./Creditos"
import Cartao from "./Cartao"

const App = () => {

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
                <i className="pi pi-map-marker" style={{marginRight: "10px"}}></i>
                RolêRadar
            </h1>

            <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>

            <Creditos/>
            
            <div className="ml-4 mt-4 w-4">
                <Cartao cabecalho="Teste" children="Conteúdo do cartão" marginTop></Cartao>
            </div>
            

            <footer className="footer">RolêRadar © {obterAno()}</footer>
        </div>
    )
}

export default App

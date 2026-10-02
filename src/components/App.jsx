import React from 'react'

const App = () => {

    const estiloSubtitulo = { 
        color: "black", 
        fontSize: 18, 
        fontFamily: "Arial",
        textAlign: "center",
        marginTop: "10px",
    }

    const obterAno = () => new Date().getFullYear()
    return (
        <div className="moldura">
            <h1 className="titulo">RolêRadar</h1>
            <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
            <footer className="footer">RolêRadar © {obterAno()}</footer>
        </div>
    )
}

export default App

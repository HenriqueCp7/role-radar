import React from 'react'

class Loading extends React.Component {
    render() {
        return (
            <div className="text-center">
                <i className="pi pi-spin pi-spinner" style={{fontSize: "2rem"}}></i>
                <div>
                    {this.props.mensagem}
                </div>
            </div>      
        )   
    }
}

Loading.defaultProps = {
    mensagem: "Carregando..."
}

export default Loading

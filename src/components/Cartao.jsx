import React from 'react'

function Cartao(props) {
  return (
    <div className="border-round-lg border-1 p-3 h-18rem">
        <div className="text-color-secondary">
            {props.cabecalho}
        </div>

        <hr />

        {props.children}
    </div>
  )
}

export default Cartao

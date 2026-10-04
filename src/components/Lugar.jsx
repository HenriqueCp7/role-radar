import Cartao from './Cartao'

function formatarDistancia(distancia) {
    return distancia < 1000 ? `${Math.round(distancia)} m` : `${(distancia/1000).toFixed(1).replace(".",",")} km`
}

export default function Lugar({numero, nome, endereco, distancia}) {
  const estiloCirculo = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    color: "white",
  }

  return(
    <Cartao cabecalho={formatarDistancia(distancia)}>
          <div style={estiloCirculo}>
            {numero}
          </div>

          <div className='font-bold'>
            {nome ? nome : "Sem nome"}
          </div>

          <div>
            {endereco}
          </div>
    </Cartao>
  )
}

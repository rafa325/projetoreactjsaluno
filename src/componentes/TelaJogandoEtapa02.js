import "./TelaJogando.css"
import { useRef, useState } from "react"
const TelaJogandoEtapa02 = ({processarLetraJogo,
    obterPalavratoJogo,
    obterCategoriatoJogo,
    //letrastoJogo,
    letrasAdivinhadasVetor,
    //letrasErradasVetor,
    tentativas,
    pontuacao   }) => {
      const [letraDigitada,setLetraDigitada] = useState ("");
      const letraDigitadaRef = useRef (null)
  
      const handleFuncaoSubmeter = (e) => {
        e.preventDefault();
        processarLetraJogo (letraDigitada);
        setLetraDigitada ("");
        letraDigitadaRef.current.focus();
      }
  
    return (
      <div className="css_telajogando">
        <p className="css_pontuacao">
          <span> Pontuação: {pontuacao} </span>
        </p>
        <h1> Advinhe a palavra </h1>
        <h3 className="css_dica"> Dica sobre a palavra.  
          <span> {obterCategoriatoJogo} </span>
        </h3>
        <p>Você ainda tem {tentativas} tentativas</p>
        {/*<button onClick={processarLetraJogo}> Finalizar Jogo</button>
        o método map vai gerar um loop e mostrar múltiplos quadrados brancos.*/}
        {/*<div className="css_container_palavra"> */}
{/*           Se a letra tiver sido advinhinhada vu mostrar ela.*/}
   {/*        { letrastoJogo.map ((letra,indice) => (
             letrasAdivinhadasVetor.includes(letra) ? 
             ((<span key={indice} className="css_letras">          {letra} </span> )) : 
             ((<span key={indice} className="css_quadrado_branco">   </span> )) 
             
            ))} */}
      {/*  </div> */}
        <div className="css_container_letra">
          <p> Tente Advinhar uma letra da palavra </p>
          <form onSubmit={handleFuncaoSubmeter}>
              <input type="text" name="Letra" maxLength="1" required 
              onChange={(e) => setLetraDigitada (e.target.value)}
              value={letraDigitada}
              ref = {letraDigitadaRef}/>
              <button>
                Jogar
              </button>
          </form>
        </div>
   {/*     <div className="css_letras_erradas">*/}
          <p> Letras já utilizadas</p>
          {/* Se a letra tiver sido advinhinhada vu mostrar ela.*/}
  {/*          { letrasErradasVetor.map ((letra,indice) => (
             (<span key={indice}> {letra}, </span> ) 
            ))}
             */}
      {/*  </div>*/}
      </div>
    )
  }
  export default TelaJogandoEtapa02
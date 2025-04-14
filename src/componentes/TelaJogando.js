import "./TelaJogando.css"
import { useRef, useState } from "react"
const TelaJogando = ({processarLetraJogo , 
    pontuacao,
    obterCategoriatoJogo,
    tentativas,
    letrasAdivinhadasVetor,
    letrastoJogo,
    letrasErradasVetor
}) => {
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
            <h1>Tela Jogando</h1>

            <p className="css_pontuacao">
                <span> Pontuação: {pontuacao} </span>
            </p>
            <h1> Advinhe a palavra </h1>
            <h3 className="css_dica"> Dica sobre a palavra.  
                <span> {obterCategoriatoJogo} </span>
            </h3>
            <p className="css_tentativa"> Você ainda tem <span> {tentativas} </span> tentativas</p>

            {/*o método map vai gerar um loop e mostrar múltiplos quadrados brancos.*/}
            {/* Se a letra tiver sido advinhinhada vu mostrar ela.*/}
            <div className="css_container_palavra"> 
                { letrastoJogo && letrastoJogo.map ((letra,indice) => (
                    letrasAdivinhadasVetor.includes(letra) ? 
                    ((<span key={indice} className="css_letras">        {letra} </span> )) : 
                    ((<span key={indice} className="css_quadrado_branco">   </span> )) 
                ))} 
            </div>

            <div className="css_container_letra">
                <p> Tente Advinhar uma letra da palavra </p>
                <form  onSubmit={handleFuncaoSubmeter} >
                    <input type="text" name="Letra" maxLength="1" required 
                    onChange={(e) => setLetraDigitada (e.target.value)}
                    value={letraDigitada}
                    ref = {letraDigitadaRef}/>
                    <button>
                        Jogar
                    </button>
                    {console.log ("Dica letraDigitada",letraDigitada)}
                </form>
            </div>

            <div className="css_letras_erradas">
                <p> Letras já utilizadas</p>
                {/* Se a letra tiver sido advinhinhada vu mostrar ela.*/}
                { letrasErradasVetor && letrasErradasVetor.map ((letra,indice) => (
                    (<span key={indice}> {letra}, </span> ) 
                ))}
            </div>

            <button onClick={processarLetraJogo}> Finalizar Jogo</button>
        </div>
    )
  }
  export default TelaJogando

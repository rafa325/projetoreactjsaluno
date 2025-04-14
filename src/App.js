import './App.css';
import TelaInicialProjeto from './componentes/TelaInicialProjeto';
import TelaJogando from './componentes/TelaJogando'; 
import TelaFimdeJogo from './componentes/TelaFimJogo';
import {useEffect,useCallback,useState} from "react"
// Para importar Usamos chaves por ser uma variável e não termos utilizado Export Default.
import {palavrasLista} from "./Util/Word"
const estagios = [
  {id:1,nome: "ini"}, // 0 
  {id:2,nome: "Jogando"}, // 1
  {id:3,nome: "Fimjogo"} ] // 2
function App() { 
  // Por usar [0] define que vai começar o programa com Inicio.
  const [estagioJogo,setEstagiodoJogo] = useState (estagios[0].nome)
  const [palavrasJogo] = useState (palavrasLista)
  console.log("Palavras do Jogo: ",palavrasJogo)

  const [obterPalavratoJogo,setObterPalavratoJogo] = useState("");
  const [obterCategoriatoJogo,setObterCategoriatoJogo] = useState("");
  const [letrastoJogo,setLetrastoJogo] = useState([]);

  const [letrasAdivinhadasVetor,setLetrasAdivinhadasVetor] = useState([])
  const [letrasErradasVetor,setLetrasErradasVetor] = useState([])
  const [tentativas,setTentativas] = useState(3)
  const [pontuacao,setPontuacao] = useState(0)

  const  reiniciarvariaveisJogo = () => {
    setLetrasAdivinhadasVetor ([])
    setLetrasErradasVetor ([])
  }
  
  useEffect (() => {
    if (tentativas <= 0 ){
      // Zerar os vetores das letras para uma nova partida
      reiniciarvariaveisJogo ()
      // envia para o fim do jogo
      setEstagiodoJogo (estagios[2].nome)
    }
  }, [tentativas])

  const gameOverRetry = () =>{
    // Antes de realmente reiniciar o jogo, vamos recolocar os valores iniciais nas variáveis.
    setTentativas (15)
    setPontuacao (0)
    setEstagiodoJogo (estagios[0].nome)
  }

  const funcaoCarregarPalavraeCategoria = useCallback ( () => {
    const listaCategorias = Object.keys(palavrasJogo)
    // Para arredondar para baixo -> Math.floor
    const categoria = listaCategorias[Math.floor(Math.random() * Object.keys(listaCategorias).length)]
    const palavraLocal = palavrasJogo[categoria][Math.floor(Math.random() * palavrasJogo[categoria].length)]
    // return usando {} - retorna um objeto, 
    // return usando [] retornaria um array.
    return {categoria,palavraLocal};
  }, [palavrasJogo] ); // Função acionada sempre que o valor desa variável alterar/mudar

  const funcaoIniciarJogo = useCallback (() =>{
    // obter palavra e categoria. Devem ter o mesmo nome utilizado no return.
    const {categoria,palavraLocal} = funcaoCarregarPalavraeCategoria();
    console.log ("Funcao Acionada Quando clicar no botão Começar o Jogo:")
    console.log ("*** Categorias:",categoria)
    console.log ("*** Palavra Local:",palavraLocal)

    let vetordaPalavra = palavraLocal.split("");
    vetordaPalavra = vetordaPalavra.map((letra) => letra.toLowerCase());
    
    setObterCategoriatoJogo (categoria);
    console.log("Palavra da categoria selecionada: ",categoria);
    setObterPalavratoJogo (palavraLocal);
    console.log("Categoria selecionada: ",palavraLocal);
    setLetrastoJogo(vetordaPalavra);
    console.log("Vetor da palavra: ",vetordaPalavra);
    setEstagiodoJogo (estagios[1].nome)
  }, [funcaoCarregarPalavraeCategoria]);

  
  useEffect (() => {
    // UseState letrastoJogo - contem todas as letras da plavra do jogo
    const listaLetrasUnicas = [...new Set (letrastoJogo)]
    console.log ("Letras unicas: ",listaLetrasUnicas)
    console.log ("Letras Adivinhadas: ",letrasAdivinhadasVetor)
    console.log ("Letras unicas (letrastoJogo): ",letrastoJogo)
    // Quando o jogador acerta a palavra soma-se 50.
    if (listaLetrasUnicas.length === letrasAdivinhadasVetor.length){
      setPontuacao ((valorAtual) => valorAtual + 50)
      // Zerar os vetores das letras para uma nova partida
      reiniciarvariaveisJogo ()
      // Reinicia o jogo
      funcaoIniciarJogo();
    }
  }, [letrasAdivinhadasVetor,funcaoIniciarJogo,letrastoJogo])

  const funcaoVoltarInicioJogo = () => {
    console.log ("finalizando o jogo")
    setEstagiodoJogo (estagios[0].nome)
  }
  /* Foi esta simples até chegar no momento de programar o jogo em si.
  const funcaoProcessarLetraJogo = () => {
    setEstagiodoJogo (estagios[2].nome)
  }*/
  const funcaoProcessarLetraJogo = (letraDigitada) =>{
    console.log("Letra digitada em TelaJogador.js: ",letraDigitada.toLowerCase)
    if (letraDigitada && letraDigitada.length > 0 ){
      const letraDigitadaNormalizada =  letraDigitada && letraDigitada.length > 0 &&letraDigitada.toLowerCase();
      // Verificar se a letra já foi utilizada
      if (letrasAdivinhadasVetor.includes(letraDigitadaNormalizada) || 
          letrasErradasVetor.includes(letraDigitadaNormalizada)){
        // da uma chance ao usuário não fazendo nada deixando ele continuar sem perder chances
        return;
      }
      if (letrastoJogo.includes(letraDigitadaNormalizada) ){
        setLetrasAdivinhadasVetor((valorAtual) => [...valorAtual,letraDigitadaNormalizada])
        setPontuacao ((ponto) => ponto + 5)
      }
      else {
        // Quando erra reduzimos a tentativa em uma unidade
        setLetrasErradasVetor((valorAtual) => [...valorAtual,letraDigitadaNormalizada])
        setTentativas ((ten) => ten - 1)
      }
    }else{
       setEstagiodoJogo (estagios[2].nome)
    }
  }


  return (
    <div className="App">
      {/* <h1>Minha primeira aplicação WEB com RectJS.</h1>*/}
      {/*<TelaInicialProjeto/>*/}
      {console.log("Dica estagioJogo: ",estagioJogo)}
      {/*{estagioJogo === "ini" && <TelaInicialProjeto/>}*/}
      {estagioJogo === "ini" && <TelaInicialProjeto iniciarJogo={funcaoIniciarJogo}/>}
      {estagioJogo === "Jogando" && <TelaJogando 
      
          processarLetraJogo={funcaoProcessarLetraJogo}
          pontuacao = {pontuacao} 
          obterCategoriatoJogo = {obterCategoriatoJogo}
          tentativas = {tentativas}
          letrasAdivinhadasVetor = {letrasAdivinhadasVetor}
          letrastoJogo = {letrastoJogo}
          letrasErradasVetor = {letrasErradasVetor}

      />}
      {estagioJogo === "Fimjogo" && <TelaFimdeJogo 
          gameOverRetry ={gameOverRetry}
          pontuacao = {pontuacao} 
      />}
    </div>
  ); 
}
export default App;
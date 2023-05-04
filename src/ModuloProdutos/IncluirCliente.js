import axios from "axios";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IncluirCliente(props) {
    const nomeRef = useRef(null);
    const cpfRef = useRef(null);
    const emailRef = useRef(null);
    const telefoneRef = useRef(null);

    function gravar() {
        console.log("clicou");

        const api = axios.create({
            baseURL: "http://localhost:3000",
        });

        // Obtendo os valores dos campos de entrada de texto utilizando refs
        const nome = nomeRef.current.value;
        const cpf = cpfRef.current.value;
        const email = emailRef.current.value;
        const telefone = telefoneRef.current.value;

        // Inserindo dados
        api
            .post("/clientes", {
                nome: nome,
                cpf: cpf,
                email: email,
                telefone: telefone

            })
            .then((response) => {
                console.log("Salvou");
                toast.success("Cliente cadastrado com sucesso!", {
                    position: "top-left",
                    autoClose: 3000,
                });

                // Limpar os campos de entrada de texto após o cadastro
                nomeRef.current.value = "";
                cpfRef.current.value = "";
                emailRef.current.value = "";
                telefoneRef.current.value = "";
            })
            .catch((error) => {
                console.error("Erro ao salvar:", error);
                toast.error("Erro ao cadastrar o cliente.", {
                    position: "top-left",
                    autoClose: 3000,
                });
            });
    }

    return (
        <div style={{ marginTop: "130px" }}>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div style={{
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                    padding: "20px",
                    borderRadius: "10px",
                }}>
                    <div className="container">
                        <h2>Formulário de cadastro</h2>
                        <label
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginBottom: "1rem",
                            }}
                        >
                            Nome:
                            <input
                                type="text"
                                ref={nomeRef}
                                name="nome"
                                style={{ marginTop: "0.5rem" }} // Adicione estilo CSS aqui
                            />
                        </label>
                        <label
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginBottom: "1rem",
                            }}
                        >
                            CPF:
                            <input
                                type="number"
                                ref={cpfRef}
                                name="cpf"
                                style={{ marginTop: "0.5rem" }} // Adicione estilo CSS aqui
                            />
                        </label>
                        <label
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginBottom: "1rem",
                            }}
                        >
                            E-mail:
                            <input
                                type="text"
                                ref={emailRef}
                                name="email"
                                style={{ marginTop: "0.5rem" }} // Adicione estilo CSS aqui
                            />
                        </label>
                        <label
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginBottom: "1rem",
                            }}
                        >
                            Telefone:
                            <input
                                type="number"
                                ref={telefoneRef}
                                name="telefone"
                                style={{ marginTop: "0.5rem" }} // Adicione estilo CSS aqui
                            />

                        </label>
                        <input type="button" value="Salvar" onClick={gravar} />

                    </div>
                </div>

            </form>
            <ToastContainer /> {/* Adicione o ToastContainer para exibir as notificações */}
        </div>
    );

}

export default IncluirCliente;

import ProjetoColumn from "./ProjetoColumn";
import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';

function ProjetoSection() {
    return (
        <section className="bg-purple-pastel p-28 rounded-3xl flex m-28 items-center justify-evenly">
            <ProjetoColumn image={<Diversity2RoundedIcon/>}
            title="Comunicação"
            text= "A comunicação é essencial para manter pais, professores, coordenadores e funcionários informados sobre o desenvolvimento e as atividades das crianças. Uma plataforma digital que permita mensagens diretas e atualizações de agenda pode ser uma ferramenta valiosa para essa comunicação."
            />
            
            <ProjetoColumn image={<InsightsRoundedIcon/>}
            title="Priorização"
            text= "A escola prioriza o bem-estar, segurança e desenvolvimento integral das crianças de 0 a 5 anos. As atividades pedagógicas e recreativas são adaptadas a cada faixa etária, com alimentação balanceada e cuidados essenciais para o crescimento saudável das crianças."
            />

            <ProjetoColumn image={<SecurityRoundedIcon/>}
            title="Segurança"
            text= "A segurança é fundamental na escola. Medidas rigorosas incluem controle de entrada e saída, supervisão constante e protocolos de emergência. Os funcionários são treinados em primeiros socorros, e os pais são informados sobre os procedimentos para situações inesperadas."
            />
        </section>
    )
}

export default ProjetoSection;
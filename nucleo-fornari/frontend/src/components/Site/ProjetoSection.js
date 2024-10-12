import ProjetoColumn from "./ProjetoColumn";
import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';

function ProjetoSection() {
    return (
        <section className="bg-blue-main p-20 rounded-3xl flex m-28 items-center justify-evenly">
            <ProjetoColumn image={<Diversity2RoundedIcon fontSize="inherit" />}
            title="Comunicação"
            text= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in consectetur justo, id vulputate dolor. Proin dignissim odio ut quam fringilla, nec tristique elit gravida."
            />
            
            <ProjetoColumn image={<InsightsRoundedIcon fontSize="inherit"/>}
            title="Priorização"
            text= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in consectetur justo, id vulputate dolor. Proin dignissim odio ut quam fringilla, nec tristique elit gravida."
            />

            <ProjetoColumn image={<SecurityRoundedIcon fontSize="inherit"/>}
            title="Segurança"
            text= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in consectetur justo, id vulputate dolor. Proin dignissim odio ut quam fringilla, nec tristique elit gravida."
            />
        </section>
    )
}

export default ProjetoSection;
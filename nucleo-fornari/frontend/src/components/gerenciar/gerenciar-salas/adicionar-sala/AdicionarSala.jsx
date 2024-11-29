import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import FormularioSala from "./FormularioSala";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#784af4",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#784af4",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
        ...theme.applyStyles("dark", {
            borderColor: theme.palette.grey[800],
        }),
    },
}));

const QontoStepIconRoot = styled("div")(({ theme }) => ({
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    "& .QontoStepIcon-completedIcon": {
        color: "#784af4",
        zIndex: 1,
        fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
    },
    ...theme.applyStyles("dark", {
        color: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                color: "#784af4",
            },
        },
    ],
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient(136deg, rgba(25,118,210,1) 50%, rgba(0,20,56,1) 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient(136deg, rgba(25,118,210,1) 50%, rgba(0,20,56,1) 100%)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1,
        ...theme.applyStyles("dark", {
            backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundImage:
                    "linear-gradient(136deg, rgba(25,118,210,1) 50%, rgba(0,20,56,1) 100%)",
                boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundImage:
                    "linear-gradient(136deg, rgba(25,118,210,1) 50%, rgba(0,20,56,1) 100%)",
            },
        },
    ],
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <PersonIcon />,
        2: <PersonAddIcon />,
        3: <AddLocationAltIcon />,
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const steps = [
    "Grupo de Sala",
    "Informações da Sala",
    "Confirmar Dados",
];

function CustomizedSteppers({ step }) {
    return (
        <section className="flex flex-row w-full justify-center p-10">
            <Stack
                sx={{
                    width: "80%",
                }}
                spacing={4}
            >
                <Stepper
                    alternativeLabel
                    activeStep={step}
                    connector={<ColorlibConnector />}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>
            <div className="text-blue-dash text-opacity-80 justify-self-end ml-14">
                <Link to={"/secretaria/gerencia/salas"}>
                    <CloseIcon fontSize="medium" color="inherit" />
                </Link>
            </div>
        </section>
    );
}

export default function CadastroSala() {
    const [step, setStep] = useState(0);

    return (
        <>
            <main className="flex items-center justify-center flex-col w-full gap-5 h-full">
                <CustomizedSteppers step={step} />
                <FormularioSala setStep={setStep} />
            </main>
        </>
    );
}

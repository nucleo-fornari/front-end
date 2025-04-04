import React, { useState } from 'react';
import './AdicionarAluno.css'
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

const Publication = () => {

    const navigate = useNavigate();

    const [partCadastro, setPartCadastro] = useState(0);
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        ra: '',
        dtNascimento: '',
        restricaoAlimentar: false,
        tipoRestricao: [],
        laudoPsicologo: false,
        Observacao: '',
        nomeCompletoResponsavel: '',
        cpfResponsavel: '',
        emailResponsavel: '',
        telefone: '',
        parentesco: '',
        cep: '',
        cidade: '',
        uf: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
    });

    const [showTable, setShowTable] = useState(false);

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.nomeCompleto) newErrors.nomeCompleto = 'Nome completo é obrigatório';
        if (!formData.ra) newErrors.ra = 'RA é obrigatório';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleRadioChange = (event) => {
        if (event.target.value === 'sim') {
            setShowTable(true);
        } else {
            setShowTable(false);
        }
      };


    const incrementPartCadastro = () => {
        if (partCadastro === 4){
            finalizarFormulario();
        }
        setPartCadastro(partCadastro + 1);
      };
    const decreasePartCadastro = () => {
        if (partCadastro === 0){
            setPartCadastro(partCadastro);
            return
        }
        setPartCadastro(partCadastro - 1)
    }
    const finalizarFormulario = () => {
        navigate('/secretaria/gerencia/aluno');
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados completos:', formData);
      };
    return (
        <div class='containner-cadastro-aluno'>
            <div class='containner-btn-interativo'>
                <div></div>
                
                <button 
                class='btn-interativo' 
                onClick={decreasePartCadastro}
                style={{ visibility: partCadastro === 0 ? 'hidden' : 'visible'}}
                >
                    Anterior
                </button>             
            </div>
            <div class='form-cadastro-aluno'>
            <header>
                <h1>Cadastro</h1>
                <div className="steps">
                    {['Aluno', 'Adicionais', 'Responsável', 'Endereços', 'Finalizar'].map((label, index) => (
                    <div key={index} className="step">
                        <div className={`circle ${index === partCadastro ? 'active' : ''}`}>{index + 1}</div>
                        <span>{label}</span>
                        {index < 4 && <hr />}
                    </div>
                    ))}
                </div>
            </header>
                <form onSubmit={handleSubmit}>
                    {partCadastro === 0 && (
                        <>
                            <TextField
                                label="Nome completo"
                                name="nomeCompleto"
                                value={formData.nomeCompleto}
                                onChange={handleInputChange}
                                error={!!errors.nomeCompleto}
                                helperText={errors.nomeCompleto}
                                fullWidth
                                margin="normal"
                            />

                            <TextField
                                label="RA"
                                name="ra"
                                value={formData.ra}
                                onChange={handleInputChange}
                                error={!!errors.ra}
                                helperText={errors.ra}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Data de nascimento"
                                name="dtNascimento"
                                type="date"
                                value={formData.dtNascimento}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </>
                    )}

                    {partCadastro === 1 && (
                        <>
                            <label>O aluno possui restrições alimentares?</label>
                            <div className="flex gap-5">
                                <div className="flex gap-2">
                                    <input 
                                    type="radio" 
                                    value="sim"
                                    name='resposta'
                                    onChange={handleRadioChange}
                                    />
                                    <label htmlFor="sim">Sim</label>
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                    type="radio" 
                                    value="nao"
                                    name='resposta'
                                    onChange={handleRadioChange}
                                    />
                                    <label htmlFor="nao">Não</label>
                                </div>
                            </div>
                            {showTable && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>TIPO</th>
                                            <th>DESCRIÇÃO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="checkbox" /></td>
                                            <td>Leite e derivados</td>
                                            <td>A criança não pode consumir leite e derivados</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" /></td>
                                            <td>Peixes e frutos do mar</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" /></td>
                                            <td>Glúten</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                            {showTable && (
                                <button className='flex justify-center items-center bg-[#3285fa] text-white-ice w-[150px] h-[30px] rounded-[7px] font-semibold'>
                                    Adicionar restrição
                                </button>
                            )}
                            <label>O aluno possui laudo psicólogico?</label>
                            <div className="flex gap-5">
                                <div className="flex gap-2">
                                    <input 
                                    type="radio" 
                                    value="sim"
                                    name='resposta'
                                    onChange={handleRadioChange}
                                    />
                                    <label htmlFor="sim">Sim</label>
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                    type="radio" 
                                    value="nao"
                                    name='resposta'
                                    onChange={handleRadioChange}
                                    />
                                    <label htmlFor="nao">Não</label>
                                </div>
                            </div>
                            <label>Observações</label>
                            <input type="text" />
                        </>
                    )}
                    {partCadastro === 2 && (
                        <>
                            <TextField
                                label="Nome completo"
                                name="nomeCompletoResponsavel"
                                value={formData.nomeCompletoResponsavel}
                                onChange={handleInputChange}
                                error={!!errors.nomeCompletoResponsavel}
                                helperText={errors.nomeCompletoResponsavel}
                                fullWidth
                                margin="normal"
                            />

                            <TextField
                                label="CPF"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleInputChange}
                                error={!!errors.cpf}
                                helperText={errors.cpf}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={formData.emailResponsavel}
                                onChange={handleInputChange}
                                error={!!errors.emailResponsavel}
                                helperText={errors.emailResponsavel}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Telefone"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleInputChange}
                                error={!!errors.telefone}
                                helperText={errors.telefone}
                                fullWidth
                                margin="normal"
                            />
                            <label>Parentesco</label>
                            <select name="" id="">
                                <option value="">Mãe</option>
                                <option value="">Pai</option>
                                <option value="">Avó</option>
                                <option value="">Avô</option>
                            </select>
                        </>
                    )}
                    {partCadastro === 3 && (
                        <>
                            <label>CEP</label>
                            <input 
                            type="text" 
                            name='cep' 
                            value={formData.cep} 
                            onChange={handleInputChange}
                            />
                            <div className='flex gap-5'>
                                <div className='flex-col'>
                                    <label>Cidade</label>
                                    <input type="text" />
                                </div>
                                <div className='flex-col'>
                                    <label>UF</label>
                                    <input type="text" />
                                </div>                                
                            </div>
                            <label>Bairro</label>
                            <input type="text" />
                            <div className='flex gap-5'>
                                <div className='flex-col'>
                                    <label>Rua</label>
                                    <input type="text" />
                                </div>
                                <div className='flex-col'>
                                    <label>Número</label>
                                    <input type="text" />
                                </div>                                
                            </div>
                            <label>Complemento</label>
                            <input type="text" />
                        </>
                    )}
                    {partCadastro === 4 && (
                        <>
                        <div className='flex gap-10 justify-between'>
                            
                        <div className='flex flex-col gap-2'>
                            <span>Nome completo aluno: </span>
                            <span>RA: </span>
                            <span>Data ascimento: </span>
                            <span>Restrição alimentar: </span>
                            <span>laudo psicologico: </span>
                            <span>Nome completo responsavel: </span>
                            <span>Cpf responsavel: </span>
                            <span>Email: </span>
                            <span>telefone: </span>
                            <span>parentesco: </span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span>Cep: </span>
                            <span>Cidade: </span>
                            <span>Uf:</span>
                            <span>Bairro: </span>
                            <span>Rua: </span>
                            <span>Número: </span>
                            <span>Complemento</span>
                        </div>
                            
                        </div>
                            
                        </>
                    )}
                    
                </form>
            </div>            
            <div class='containner-btn-interativo'>
                <Link
                to={'/secretaria/gerencia/aluno'}
                >
                    <CloseIcon fontSize="large" />
                </Link> 
                <button class='btn-interativo' onClick={incrementPartCadastro}>
                    {partCadastro === 4 ? 'Finalizar' : 'Próximo'}
                </button>
            </div>
        </div>
    );
};

export default Publication;
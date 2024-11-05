import { useState } from 'react';
import gitLogo from '../Assets/github.png';
import Input from '../componentes/Input';
import ItemRepo from '../componentes/ItemRepo';
import { Container } from './styles';
import Button from '../componentes/Button';
import { api } from '../services/api';

function App() {
  const[currentRepo, setCurrentRepo] = useState();
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`);
    
    if(data.id){
      const ifExist = repos.find(repo => repo.id === data.id)
      if(!ifExist){
      setRepos(prev => [...prev, data]);
      setCurrentRepo('');
      return
      }
    }

    alert('Repositorio não encontrado');
  }

  const handleRemoveRepo = (id) =>{
    const updateRepo = repos.filter(repo => repo.id !== id);
    setRepos(updateRepo);
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt='Logo github' />
      <Input value={currentRepo} onChange={e => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;

import { useEffect, useState, useMemo } from 'react';
import {
  AiOutlineArrowUp,
  AiOutlineEdit,
  AiOutlineDelete,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
} from './styles';
import formatPhone from '../../utils/formatPhone';
import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filtredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);
        const contactsList = await ContactsService.listContacts(orderBy);
        setContacts(contactsList);
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input value={searchTerm} type="text" placeholder="Pesquisar contato" onChange={(e) => handleChangeSearchTerm(e)} />
      </InputSearchContainer>

      <Header>
        <strong>
          {filtredContacts.length}
          {filtredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      {filtredContacts.length > 0 && (
      <ListHeader orderBy={orderBy}>
        <button type="button" onClick={handleToggleOrderBy}>
          <span>Nome</span>
          <AiOutlineArrowUp alt="Arrow" />
        </button>
      </ListHeader>
      )}

      {filtredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && (
                <small>{contact.category_name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{formatPhone(contact.phone)}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <AiOutlineEdit alt="Edit" />
            </Link>

            <AiOutlineDelete alt="Delete" />
          </div>
        </Card>
      ))}
    </Container>
  );
}

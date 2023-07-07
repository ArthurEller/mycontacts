import { useState } from 'react';
import PropTypes from 'prop-types';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import useErrors from '../../hooks/useErrors';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { Form, ButtonContainer } from './styles';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const isFormValid = name && errors.length === 0;

  function validateName(value) {
    if (!value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function validateEmail(value) {
    if (value && !isEmailValid(value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function onChangeInput(event, setAction) {
    switch (event.target?.name) {
      case 'name':
        setAction(event.target.value);
        validateName(event.target.value);
        break;
      case 'email':
        setAction(event.target.value);
        validateEmail(event.target.value);
        break;
      case 'phone':
        setAction(formatPhone(event.target.value));
        break;
      default:
        setAction(event.target.value);
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          name="name"
          placeholder="Nome *"
          value={name}
          onChange={(e) => onChangeInput(e, setName)}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => onChangeInput(e, setEmail)}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          name="phone"
          type="tel"
          placeholder="Telefone"
          maxLength="15"
          value={phone}
          onChange={(e) => onChangeInput(e, setPhone)}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={(e) => onChangeInput(e, setCategory)}
        >
          <option value="default">Categoria</option>
          <option value="work">Trabalho</option>
          <option value="personal">Pessoal</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

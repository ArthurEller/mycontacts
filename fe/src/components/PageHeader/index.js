import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Container } from './styles';

export default function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <AiOutlineArrowLeft alt="Arrow" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

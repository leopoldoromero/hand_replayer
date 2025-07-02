import { StyledContainer } from './FormCard.styles';

interface Props {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

const FormCard: React.FC<Props> = (props) => (
  <StyledContainer onSubmit={props.onSubmit} data-testid="form-card">
    {props.children}
  </StyledContainer>
);

export default FormCard;
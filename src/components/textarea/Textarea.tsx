import { StyledTextarea } from "./Textarea.styles";

interface TextareaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  name: string;
  rows?: number;
  cols?: number;
}

const Textarea: React.FC<TextareaProps> = ({ value, onChange, placeholder, rows = 4, name, cols }) => {
  return <StyledTextarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} name={name} cols={cols}/>;
};

export default Textarea;

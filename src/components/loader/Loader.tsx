import { LoaderWrapper, Spinner } from "./Loader.styles";

interface Props {
    size?: string;
    color1?: string;
    color2?: string;
}
const Loader: React.FC<Props> = ({ size, color1, color2 }) => (
  <LoaderWrapper size={size}>
    <Spinner color1={color1} color2={color2} />
  </LoaderWrapper>
);

export default Loader;
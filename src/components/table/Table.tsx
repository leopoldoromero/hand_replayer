import Block from '../block/Block';
import CardComponent from '../card/Card';
import Text from '../text/Text';
import { StyledTable } from './Table.styles';

interface TableProps {
  room: string;
  pot: number;
  cards: Array<string>;
  currency: string;
}
const TableComponent: React.FC<TableProps> = ({ pot, cards, currency }) => (
  <StyledTable>
    <Block display='flex' direction='column' justify='flex-end' height='30%'>
      <Block display='flex' direction='column' align='center' mb='m'>
        {pot ? <Text>Pot: {`${pot} ${currency}`}</Text> : null}
      </Block>
      {cards?.length ? (
        <Block display='flex' gap='4px'>
          {cards.map((card, i) => (
            <CardComponent card={card} key={i} animated />
          ))}
        </Block>
      ) : null}
    </Block>
  </StyledTable>
);

export default TableComponent;

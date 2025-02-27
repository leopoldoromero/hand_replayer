import Replayer from '@/components/replayer/Replayer';

type ParamsProps = Promise<{ id: string }>;

export default async function HandReplay(props: { params: ParamsProps }) {
  const { id } = await props.params;
  return <Replayer handId={id} />;
}

import { Button } from "@douyinfe/semi-ui";

interface ChangeUrlProps {
  url: string;
}

const ChangeUrl: React.FC<ChangeUrlProps> = ({ url }) => {
  return (
    <>
      <Button>修改url</Button>
    </>
  );
};

export default ChangeUrl;

import { Button, Popconfirm, Toast } from "@douyinfe/semi-ui";
import { deleteEventManager, getManagers } from "../../utils/event";

function DeleteManager(props) {
  const handleDelete = () => {
    console.log(props);
    deleteEventManager(props.eventid, props.userId).then((res) => {
      console.log(res);
      getManagers(props.eventid).then((res) => {
        console.log(res);
        // props.setData(res.data.data);
      });
      if (res.data.success === true) Toast.success("删除成功");
    });
  };
  return (
    <>
      <Popconfirm
        content="是否确认删除"
        title="确认"
        onConfirm={handleDelete}
        style={{ width: 320 }}
      >
        <Button>删除</Button>
      </Popconfirm>
    </>
  );
}

export default DeleteManager;

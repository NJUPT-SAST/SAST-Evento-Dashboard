import { Button,Popconfirm } from "@douyinfe/semi-ui"

function DeleteManager(props){
    const handledelete=()=>{
        console.log(props.eventid,props.userId);;
        //调用删除权限接口
    }
    return (
        <>
        <Popconfirm content='是否确认删除' title='确认' onConfirm={handledelete} style={{width:320}}>
            <Button>删除</Button>
        </Popconfirm>
        </>
    )
}

export default DeleteManager
import { useNavigate } from 'react-router-dom';
import { Card,Form,Button,Toast } from '@douyinfe/semi-ui';
import logo from '../../assets/Logo.png'
import './index.scss'
function Login(){
    const navigate=useNavigate()
    const handleSubmit = (values) => {
        console.log(values);
        //登录接口和loaclstorage
        navigate('/',{replace:true})
        Toast.info('登录成功');
    };
    return(
        <div className='login'>
            <Card className='login-container'>
               <img className='login-logo' alt='' src={logo}/>
                <Form className='login-box'
                onSubmit={values => handleSubmit(values)} 
                style={{ width: 400 }}
                >
                 {({ formState, values, formApi }) => (
                <>
                 <Form.Input field='username' label='账号' style={{ width: '100%' }}   placeholder='请输入账号'/>
                 <Form.Input mode='password' field='password' label='密码' style={{ width: '100%' }}  placeholder='请输入密码'/>
                 <Button theme='solid'  htmlType='submit' type="tertiary" style={{width: '100%'}}>Log in</Button>
                 </>
                 )} 
                </Form>
            </Card>
        </div>
    )
}

export default Login;
import { useNavigate } from 'react-router-dom';
import { Card,Form,Button,Toast } from '@douyinfe/semi-ui';
import logo from '../../assets/Logo.png'
import './index.scss'
function Login(){
    const navigate=useNavigate()
    const handleSubmit = (values) => {
        window.location.href='https://link.sast.fun/login?redirect=/auth?[%22client_id=4d6502e2-64e8-41fb-b1ff-b8374ed2f0d6%22,%22code_challenge=YillThSRrGTj6mXqFfDPinX7G35qEQ1QEyWV6PDSEuc=%22,%22code_challenge_method=S256%22,%22redirect_uri=http://localhost:3000/api/auth/callback/sastlink%22,%22response_type=code%22,%22scope=all%22,%22state=IUIAhUgiwvc8mlO25SerwjtLN20sd-GxlLUUQPSkeSg%22]'
        
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
                 {/* <Form.Input field='username' label='账号' style={{ width: '100%' }}   placeholder='请输入账号' autoComplete='off'/>
                 <Form.Input mode='password' field='password' label='密码' style={{ width: '100%' }}  placeholder='请输入密码' autoComplete='off'/> */}
                 <Button theme='solid'  htmlType='submit' type="tertiary" style={{width: '100%'}}>授权 Link 登录</Button>
                 </>
                 )} 
                </Form>
            </Card>
        </div>
    )
}

export default Login;
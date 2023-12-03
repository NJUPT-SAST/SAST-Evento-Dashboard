import { Button } from "@douyinfe/semi-ui";
import { useEffect } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { linkLogin } from "../../utils/login";

const OAuth2 = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const code = window.location.href.split('?')[1].split('&')[0].split('=')[1];
  const router = useNavigate();
  const info = 'Authorizing...';

  useEffect(() => {
    const code = String(searchParams.get('code'));
    linkLogin(code).then((res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userinfo', res.userInfo );
      router('/console/activity');
    }, (error) => {
      router('/console/login');
    });
  }, []);

  return (
    <div className='infoWarpper'>
      <p>{info}</p>
      <Button color="medium" fill='outline' onClick={() => { router.push('/home') }}>Cancel</Button>
    </div>);
};

export default OAuth2;
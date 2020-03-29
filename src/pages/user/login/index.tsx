import React, {useEffect} from 'react';
import {connect, Dispatch} from 'umi';
import {StateType} from '@/models/login';
import {LoginParamsType} from '@/services/login';
import {ConnectState} from '@/models/connect';
import LoginFrom from './components/Login';

import styles from './style.less';

const {Submit} = LoginFrom;

interface LoginProps {
    dispatch: Dispatch;
    userLogin: StateType;
    submitting?: boolean;
}

// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );

const Login: React.FC<LoginProps> = (props) => {
    const {submitting} = props;
    const getQueryString = (name: string) => {
        const url = window.location.href;
        const code = url.split('code')[1]?.substr(3);
        if (code) {
            return code
        }
        return null
        // let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        // let r = window.location.search.substr(1).match(reg);
        // if (r !== null) return unescape(r[2]);
        // return null;
    };
    useEffect(() => {
        localStorage.setItem("firstLogin", 'true');
        const code = getQueryString('code');
        code && handleSubmit({
            code,
            redirect_uri: window.location.origin + '/login.html'
        })
    }, []);
    const handleSubmit = (values: LoginParamsType) => {
        const {dispatch} = props;
        dispatch({
            type: 'login/login',
            payload: {...values},
        });

    };


    const getCode = () => {
        const origin = window.location.origin + '/login.html';
        const client_id = '52ac409c-4a2a-470f-9eb4-cbc54e80517d';
        let url = `https://idcsso.corp.cootek.com/adfs/oauth2/authorize/?response_type=code&scope=openid&client_id=${client_id}&redirect_uri=${origin}`;
        window.location.href = url
    }
    return (
        <div className={styles.main}>
            <LoginFrom onSubmit={getCode}>
                {}
                <Submit loading={submitting}>使用域账号登录</Submit>
            </LoginFrom>
        </div>
    );
};

export default connect(({login, loading}: ConnectState) => ({
    userLogin: login,
    submitting: loading.effects['login/login'],
}))(Login);

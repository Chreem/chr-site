import * as React from 'react'
import {Fragment, Component, FormEvent} from 'react'
import styled from 'styled-components'
import {Button, Checkbox, Form, Icon, Input, Spin, Modal} from 'antd'
import {FormComponentProps} from 'antd/es/form'
import FlexCenter from '~components/style/center'
import store from '../../../model'
import {actions} from '../../../model/user'
import i18n from '../../../services/i18n'
import './style.less'

const FormItem = Form.Item;
const {title} = window.CONFIG;

const ID = {
  ACCOUNT: 'account',
  PASSWORD: 'password',
  REMEMBER: 'remember'
};
const Title = styled.h1`margin-bottom: 0;text-align: center;`;
const ForgetPassword = styled.a`float: right`;
const showForgetPassword = () => {
  Modal.warning({
    title: i18n.get('forget-password'),
    content: i18n.get('forget-password-content'),
    okText: i18n.get('confirm'),
    maskClosable: true
  });
};
const showLoginFailed = () => {
  Modal.error({
    title: i18n.get('login-failed'),
    content: i18n.get('login-failed-content'),
    okText: i18n.get('confirm'),
    maskClosable: true
  })
};

const sleep = (t: number) => new Promise(r => setTimeout(r, t));

class UserLoginComponent extends Component<FormComponentProps> {
  state = {
    login: false
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) return;
      this.setState({login: true});
      const res = await store.dispatch(actions.login(...Object.values(values)));
      this.setState({login: false});
      if (res) return;
      showLoginFailed();
    });
  };

  render() {
    const {login} = this.state;
    const {getFieldDecorator} = this.props.form;

    return <Fragment>
      <FlexCenter width={320}>
        <Spin spinning={login}>
          <Form id={'user_login'} onSubmit={this.handleSubmit}>
            <FormItem><Title>{title}</Title></FormItem>
            <FormItem>
              {getFieldDecorator(
                ID.ACCOUNT,
                {rules: [{required: true, message: i18n.get('login-username-required-message')}]}
              )(<Input prefix={<Icon type="user"/>}
                       size="large"
                       placeholder={i18n.get('login-username-placeholder')}/>)}
            </FormItem>
            <FormItem>
              {getFieldDecorator(
                ID.PASSWORD,
                {rules: [{required: true, message: i18n.get('login-password-required-message')}]}
              )(<Input prefix={<Icon type="lock"/>}
                       size="large"
                       placeholder={i18n.get('login-password-placeholder')}
                       type="password"/>)}
            </FormItem>
            <FormItem>
              {getFieldDecorator(
                ID.REMEMBER,
                {valuePropName: 'checked', initialValue: true}
              )(<Checkbox>{i18n.get('keep-login')}</Checkbox>)}
              <ForgetPassword href="javascript:"
                              onClick={showForgetPassword}>{i18n.get('forget-password')}</ForgetPassword>
              <Button type="primary"
                      htmlType="submit"
                      size="large"
                      disabled={login}>{i18n.get('login-button')}</Button>
            </FormItem>
          </Form>
        </Spin>
      </FlexCenter>
    </Fragment>
  }
}

export default Form.create()(UserLoginComponent);
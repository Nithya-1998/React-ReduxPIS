import React from 'react';
import LoginTest from './login-api';
import userNameAction from './components/reactredux/actions/userNameAction';
import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';


afterEach(() => {
  cleanup()
});
it("Api Testing for matching user id", async function () {
  const response = new LoginTest();
  console.warn(response);
  console.warn(await response.apiUserId());
  const data = await response.apiUserId();
  expect(data[0].emailId).toEqual("user@gmail.com");
})
it("Api Testing for matching password", async function () {
  const response = new LoginTest();
  console.warn(await response.apiPassword());
  const data = await response.apiPassword();
  expect(data[0].password).toEqual("User@123");
})
it("Action Type Testing", () => {
  const act = userNameAction();
  console.warn(act.type);
  expect(act.type).toEqual('USER_ID');
})



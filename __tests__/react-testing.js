import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import 'jest-dom';
import Login from '../src/client/components/login';
import '@testing-library/jest-dom';

test('centralDisplay renders listings according to props passed in', () => {
  // define 'props' object as some hard-coded controlled thing
  const props = {};
});

test(load);

// render our centralDisplay with that props object passed in

// test to make sure that the page is rendering what it should based on what props were passed in

// if (when) the test fails, use TDD to make the page render based on what props are passed in
// (which involves passing in state to those props)

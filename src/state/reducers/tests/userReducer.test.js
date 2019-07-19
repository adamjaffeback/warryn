import reducer from '../userReducer';
import { setToken, clearToken } from '../../actions/userActions';

it('should exist as a function', () => {
  expect(typeof reducer).toBe('function');
});

it('should return a default state of null', () => {
  expect(reducer(undefined, {})).toBe(null);
});

it('should return a default state of null', () => {
  expect(reducer(undefined, {})).toBe(null);
});

it('should SET_TOKEN', () => {
  expect(reducer(undefined, setToken('ABC'))).toBe('ABC');
});

it('should CLEAR_TOKEN to null', () => {
  const stateWithTokenSet = reducer(undefined, setToken('ABC'));
  expect(reducer(stateWithTokenSet, clearToken())).toBe(null);
});

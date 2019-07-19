import * as Actions from '../issuesActions';

describe('addIssues', () => {
  it('should be a function', () => {
    expect(typeof Actions.addIssues).toBe('function');
  });

  it('should return an object', () => {
    expect(typeof Actions.addIssues()).toBe('object');
  });

  it('should have a type of ADD_ISSUES', () => {
    expect(Actions.addIssues().type).toBe('ADD_ISSUES');
  });

  it('should have a payload of issues', () => {
    expect(Actions.addIssues([1, 2, 3]).payload).toEqual([1, 2, 3]);
  });
});

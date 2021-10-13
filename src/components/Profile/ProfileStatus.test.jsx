import React from 'react'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import TestRenderer from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('Profile test compotent', () => {
  // test('status form props should be in the state', () => {
  //   const props = {
  //     status: 'yo yo yo',
  //   }

  // const component = TestRenderer.create(<ProfileStatusWithHooks {...props}/>)
  // const instance = component.getInstance()
  // const instanceFind = instance.find(test)
  // console.log({instanceFind})
  // console.log(component)
  // expect().toBe('yo yo yo')
  // })
  
  test('in start without <input/>', () => {
    const component = TestRenderer.create(<ProfileStatusWithHooks />)
    const root = component.root
    expect(() => {
      root.findByType('input')
    }).toThrow()
  })
  test('create <span/>', () => {
    const component = TestRenderer.create(<ProfileStatusWithHooks />)
    const root = component.root
    let span = root.findByType('span')
    expect(span.children[0]).toBe(' ')
  })
  test('after click <span/> turned to <input/>', () => {
    const component = TestRenderer.create(<ProfileStatusWithHooks status={'test input'}/>)
    const root = component.root
    let span = root.findByType('span')
    span.props.onDoubleClick()

    let input = root.findByType('input')
    expect(input.props.value).toBe('test input')
  })
  // test('callback should be called', () => {
  //   const mocCallback = jest.fn()
  //   const component = TestRenderer.create(
  //     <ProfileStatusWithHooks status={'test input'} updateStatus={mocCallback}/>
  //   )
  //   const instance = component.getInstance()
  //   instance.deactivateEditMode()
  //   expect(mocCallback.mock.calls.length).toBe(1)
  // })
})

describe('Profile test compotent with enzyme', () => {
  const mocCallback = jest.fn()
  let counter

  const props = {
    status: 'test input',
  }
  beforeEach(() => {
    counter = shallow(<ProfileStatusWithHooks {...props} updateStatus={mocCallback}/>)
  })
  
  it('callback should be called', () => {
    // counter.deactivateEditMode()
    console.log({counter})
    // expect(mocCallback.mock.calls.length).toBe(0)
    expect(counter.find('input').text()).toBe('test input')
  })
})
import React, {useRef, useState, ChangeEvent,SyntheticEvent,
  useEffect,
} from 'react';

import {
  useRive, useStateMachineInput, Layout, Fit,Alignment,UseRiveParameters, RiveState, StateMachineInput,
} from 'rive-react';

import './LoginFormComponent.css';

const STATE_MACHINE_NAME = 'Login Machine';
const User_name = 'Login';
const LOGIN_PASSWORD = 'teddy';

/**
 * Use case for a simple login experience that incorporates a Rive asset with a
 * state machine to coordinate user interaction with a form
 * @param riveProps
 */
const LoginFormComponent = (riveProps: UseRiveParameters = {}) => {
  const { rive: riveInstance, RiveComponent }: RiveState = useRive({
    src: "animatedlogin.riv" ,
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    ...riveProps,
  });
  //      holder  ,    push
  const [userValue, setUserValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
  const [loginButtonText, setLoginButtonText] = useState(User_name);
  const inputRef = useRef(null);

  const isCheckingInput: StateMachineInput | null = useStateMachineInput( riveInstance,STATE_MACHINE_NAME,'isChecking'
  );
  const numLookInput: StateMachineInput | null = useStateMachineInput( riveInstance, STATE_MACHINE_NAME, 'numLook'
  );
  const trigSuccessInput: StateMachineInput | null = useStateMachineInput(riveInstance,STATE_MACHINE_NAME,'trigSuccess'
  );
  const trigFailInput: StateMachineInput | null = useStateMachineInput( riveInstance,STATE_MACHINE_NAME,'trigFail'
  );
  const isHandsUpInput: StateMachineInput | null = useStateMachineInput(riveInstance,STATE_MACHINE_NAME,'isHandsUp'
  );

  // Divide the input width by the max value the state machine looks for in numLook.
  // This gets us a multiplier we can apply for each character typed in the input
  // to help Teddy track progress along the input line
  useEffect(() => {
    if (inputRef?.current && !inputLookMultiplier) {
      setInputLookMultiplier(
        (inputRef.current as HTMLInputElement).offsetWidth / 100
      );
    }
  }, [inputLookMultiplier, inputRef]);

  // As the user types in the username box, update the numLook value to let Teddy know where to look to according to the state machine

  // e>> event 
  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => { const newVal = e.target.value;setUserValue(newVal);
    if (!isCheckingInput!.value) {
      isCheckingInput!.value = true;
    }
    const numChars = newVal.length;
    numLookInput!.value = numChars * inputLookMultiplier;
  };

  

  //simulate password validation checking and trigger the appropriate input from the state machine
  const onSubmit = (e: SyntheticEvent) => {setLoginButtonText('Checking');
    setTimeout(() => {
      setLoginButtonText(User_name);
      passValue === LOGIN_PASSWORD
        ? trigSuccessInput!.fire()
        : trigFailInput!.fire();
    }, 1500);
    e.preventDefault();
    return false;
  };

  return (
    <div className="login-form-component-root">
      <div className="login-form-wrapper">
        <div className="rive-wrapper">
          <RiveComponent className="rive-container" />
        </div>
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <label>
              <input
                type="text"
                className="form-username"
                name="username"
                placeholder="Username"
                value={userValue}
                onChange={onUsernameChange}
                onBlur={() => (isCheckingInput!.value = false)}
                ref={inputRef}
              />
            </label>
            <label>
              <input
                type="password"
                className="form-pass"
                name="password"
                placeholder="Password (teddy123)"
                value={passValue}
                onFocus={() => (isHandsUpInput!.value = true)}
                onBlur={() => (isHandsUpInput!.value = false)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassValue(e.target.value)
                }
              />
            </label>
            <button className="login-btn">{loginButtonText}</button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default LoginFormComponent;
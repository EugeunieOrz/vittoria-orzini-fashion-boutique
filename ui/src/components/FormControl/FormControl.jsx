// @flow
import omit from 'lodash/omit';
import React from 'react';
import { Control, Errors } from 'react-redux-form';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { showErrors as defaultShowErrors, ErrorWrapper } from 'util/Form';

import type { Node, ComponentType } from 'react';
import type { FormProps } from 'util/Form';

import './FormControl.scss';

type Props = {
  id: string,
  model?: string,
  label?: string,
  help?: string,
  control?: ComponentType<*>,
  controlProps?: Object,
  component?: ComponentType<*>,
  optional?: boolean,
  feedback?: boolean,
  formProps: FormProps,
  showErrors?: FormProps => boolean,
  validators?: { [string]: (string) => boolean },
  messages?: { [string]: string },
  children?: Node,
}

/**
 * A react-redux-form based form control component.
 *
 * We show only errors, because then the form looks more tidy and consistent especially if fields are prefilled
 * and not touched.
 *
 * @param id           The control ID.
 * @param model        The model path, defaults to the ID.
 * @param label        An additional control label.
 * @param help         An additional help block.
 * @param control      Any of the base control components provided by react-redux-form, defaults to the `Control`
 *                     component.
 * @param controlProps A mapping of control-specific props that will be applied directly to the rendered control.
 * @param component    A custom component can be passed into the component={...} prop, and standard control props
 *                     and event handlers (such as onChange, onBlur, onFocus, value, etc.) will be mapped as expected.
 *                     Defaults to the react-bootstrap `FormControl` component.
 * @param optional     Indicates if the control is optional.
 * @param feedback     Indicates if the feedback indicator should be shown.
 * @param formProps    The form props.
 * @param showErrors   A helper which indicates if errors should be shown in a form.
 * @param validators   The list of validators.
 * @param messages     The list of messages for the validators.
 * @param children     An optional children to render.
 * @param rest         Additional properties that will be passed to the control.
 */
export const FormControlComponent = ({
  id,
  model,
  label,
  help,
  control,
  controlProps,
  component,
  optional,
  feedback,
  formProps,
  showErrors,
  validators,
  messages,
  children,
  ...rest
}: Props) => {
  const ControlComponent: ComponentType<*> = control || FormControlComponent.defaultProps.control;
  const hasErrors = (showErrors || defaultShowErrors)(formProps);

  const labelComponent = !label || (
    <Form.Label>
      {label}
    </Form.Label>
  );
  const optionalComponent = !optional || (
    <span className="optional">
      {optional}
    </span>
  );
  const helpComponent = !help || (
    <p className="help">
      {help}
    </p>
  );
  const feedbackComponent = !feedback || <FormControl.Feedback />;

  return (
    <Form.Group
      controlId={`custom-form-control-${id}`}
      className={`custom-form-control ${id}`}
    >
      {labelComponent}
      {' '}
      {optionalComponent}
      {helpComponent}
      <div className="control">
        <ControlComponent
          model={`.${model || id}`}
          controlProps={controlProps}
          component={component}
          autoComplete="off"
          validators={validators}
          {...omit(rest)}
        >
          {children}
        </ControlComponent>
        {feedbackComponent}
      </div>
      <Errors
        model={`.${id}`}
        show={hasErrors}
        wrapper={ErrorWrapper}
        messages={{
          ...messages,
        }}
      />
  </Form.Group>
  );
};

FormControlComponent.defaultProps = {
  model: undefined,
  label: undefined,
  help: undefined,
  control: Control,
  controlProps: undefined,
  component: FormControl,
  optional: false,
  feedback: true,
  showErrors: defaultShowErrors,
  validators: undefined,
  messages: {},
  children: undefined,
};

export default FormControlComponent;

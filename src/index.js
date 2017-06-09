// @flow
import get from 'lodash.get';
import React, { PureComponent } from 'react';

type $check = (props: Object, nextProps: Object)=>boolean;
type $onChange = (props: Object)=>any;

export default function khange(checks: Array<[$check, $onChange]> | $check, onChanges: $onChange) {
  
  function runCheck (props, nextProps) {
    if (Array.isArray(checks)) {
      checks.forEach(([check, onChange])=>{
        if (check(props, nextProps)) {
          onChange(nextProps);
        }
      });
    } else if (checks(props, nextProps)) {
      onChanges(nextProps);
    }
  }

  return (WrappedComponent: Object) => class KhangeWrapper extends PureComponent {
    componentWillMount() {
      runCheck({}, this.props)
    }
    componentWillReceiveProps(nextProps: Object) {
      runCheck(this.props, nextProps)
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export function kheck(...propPaths: string[]) {
  return (props: Object, nextProps: Object) => propPaths.reduce((finalResult, propPath) => {
    if (!finalResult) {
      if (get(props, propPath) !== get(nextProps, propPath)) {
        return true;
      }
    }
    return finalResult;
  }, false);
}
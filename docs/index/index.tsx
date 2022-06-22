/**
 * ## DUMI CONFIG ##
 * transform: true
 * inline: true
 */

import React from 'react';

export default class Home extends React.PureComponent {
  public componentDidMount() {
    if ((/^(?:\d+\.){3}\d+\$|^localhost$/ui).test(window.location.hostname)) {
      return;
    }
    window.location.reload();
  }

  public render() {
    return (
      <div />
    );
  }
}

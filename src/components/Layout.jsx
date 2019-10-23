import React from 'react';

export default function Layout(props) {
  return (
    <React.Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main>{props.children}</main>
    </React.Fragment>
  );
}

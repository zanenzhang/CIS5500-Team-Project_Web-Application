import React from 'react';

import TubeDBLogo from '../images/logo4.png';

//import { Wrapper, Content, LogoImg } from './Header.styles';

class MenuBar extends React.Component {
    render() {
        return (
            <Wrapper>
              <Content>
                <TubeDBLogo src={TubeDBLogo} alt='tubedb-logo' />
              </Content>
            </Wrapper>
          );
    }
};

export default Header;
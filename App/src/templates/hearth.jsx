import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { CreateHearth, LinkHearth } from '../actions/action'

const style = {
  container: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '10% 1fr',
    gridGap: '3rem'
  },
  login: {
    borderRight: '1px solid rgb(224, 224, 224)'
  },
  top: {
    gridArea: '1 / 1 / 2 / 3'
  },
  left: {
    gridArea: '2 / 1 / 3 / 2',
    borderRight: '1px solid rgb(224, 224, 224)'
  },
  right: {
    gridArea: '2 / 2 / 3 / 3'
  },
  button: {
    margin: '12px'
  }
}

class Hearth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newHearth: '',
      linkHearth: '',
      errorNewHearth: '',
      errorLinkHearth: ''
    };
  }

  onChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    });
  }

  handleNewHearth = () => {
    this.setState({
      errorNewHearth: this.state.newHearth ? '' : 'Veuillez saisir votre nouveau foyer'
    });
    if (this.state.newHearth) {
      CreateHearth(this.state.newHearth, this.props.handleHearth)
    }
  }

  handleLinkHearth = () => {
    this.setState({
      errorLinkHearth: this.state.linkHearth ? '' : 'Veuillez saisir le nom du foyer'
    });
    if (this.state.linkHearth) {
      try {
        LinkHearth(this.state.linkHearth, this.props.handleHearth, (err) => {
          this.setState({
            errorLinkHearth: err
          });
        })
      } catch (e) {
        console.log('error');
        console.log(e);
        this.setState({
          errorLinkHearth: e.name
        });
      }
    }
  }

  render() {
    const { token } = this.props
    return (
      <div style={style.container}>
        <div style={style.top}>
          Bonjour {token.firstName}, Vous n&apos;avez pas de foyer associé à votre profil. <br />
          Votre foyer va définir avec qui vous géré vos ressources. <br />
          Vous pouvez :
        </div>
        <div style={style.left}>
          Créer votre foyer : <br />
          <TextField
            name="newHearth"
            hintText='Ex : "Gonnord-Gorce"'
            floatingLabelText="Votre nouveau foyer"
            value={this.state.newHearth}
            errorText={this.state.errorNewHearth}
            onChange={e => this.onChange('newHearth', e)}
          /> <br />
          <RaisedButton label="Enregistrer" primary style={style.button} onClick={e => this.handleNewHearth(e)} />
        </div>
        <div style={style.right}>
          Rejoindre un foyer existant <br />
          <TextField
            name="linkHearth"
            hintText='Ex : "Gonnord-Gorce"'
            floatingLabelText="Le nom du foyer"
            value={this.state.linkHearth}
            errorText={this.state.errorLinkHearth}
            onChange={e => this.onChange('linkHearth', e)}
          /> <br />
          <RaisedButton label="Rejoindre" primary style={style.button} onClick={e => this.handleLinkHearth(e)} />
        </div>
      </div>
    );
  }
}

Hearth.propTypes = {
  token: PropTypes.number,
  handleHearth: PropTypes.func
};

export default Hearth;
